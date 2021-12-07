Hooks.once('ready', async () => {

  game.settings.register('mythic-gme-tools', 'currentChaosFactor', {
    name: 'Chaos Factor',
    hint: 'Current Mythic GME Variations 2 Chaos Factor',
    scope: 'world',
    config: false,
    type: Number,
    default: 4
  });

  game.settings.register('mythic-gme-tools', 'useD8ForSceneCheck', {
    name: 'Use D8 for Scene Alteration checks',
    hint: 'A special rule for Variations #2 changing scene alteration probabilities',
    scope: 'world',
    config: true,
    type: Boolean,
    default: false
  });

});

function mgeFateCheck() {
  const currentChaosFactor = game.settings.get('mythic-gme-tools', 'currentChaosFactor')
  const fateCheckDialog = `
    <form>
    <label for="odds">Odds:</label>
    <select name="odds" id="mgme_v2_odds" style="margin-bottom: 10px;">
      <option value="imp">Impossible</option>
      <option value="nw">No way</option>
      <option value="vu">Very unlikely</option>
      <option value="u">Unlikely</option>
      <option value="ff" selected>50/50</option>
      <option value="l">Likely</option>
      <option value="vl">Very likely</option>
      <option value="st">Sure thing</option>
      <option value="htb">Has to be</option>
    </select>
    <label for="chaos" style="margin-left: 5px;">Chaos Factor:</label>
    <select name="chaos" id="mgme_v2_chaos" style="margin-bottom: 10px;">
        <option value="6" ${currentChaosFactor === 6 ? 'selected' : ''}>6</option>
        <option value="5" ${currentChaosFactor === 5 ? 'selected' : ''}>5</option>
        <option value="4" ${currentChaosFactor === 4 ? 'selected' : ''}>4</option>
        <option value="3" ${currentChaosFactor === 3 ? 'selected' : ''}>3</option>
    </select><br>
    <label for="question">Question (optional):</label>
    <input name="question" id="mgme_v2_question" style="margin-bottom: 10px" placeholder="Fate Check Question"/>
    <input name="yesfav" type="checkbox" id="mgme_v2_yesfav">
    <label for="yesfav">Yes is favorable</label>
    </form>
    `

  const oddsMap = {
    'imp': {label: 'Impossible', mod: -8},
    'nw': {label: 'No way', mod: -6},
    'vu': {label: 'Very unlikely', mod: -4},
    'u': {label: 'Unlikely', mod: -2},
    'ff': {label: '50/50', mod: 0},
    'l': {label: 'Likely', mod: 2},
    'vl': {label: 'Very likely', mod: 4},
    'st': {label: 'Sure thing', mod: 6},
    'htb': {label: 'Has to be', mod: 8}
  }

  function generateOutput(oddsMod, chaosFactor, yesFavorable, fateTotal, fateDice1, fateDice2, chaosDie) {
    let outcome;
    let color;
    let randomEvent = false;
    const checkTotal = (
      fateTotal + oddsMod +
      (chaosFactor === 3 ? (yesFavorable ? 2 : -2) : 0) +
      (chaosFactor === 6 ? (yesFavorable ? -2 : 2) : 0)
    );
    const checkYes = checkTotal >= 11;
    if (checkYes) {
      outcome = 'Yes!';
      color = 'green';
    } else {
      outcome = 'No!';
      color = 'red';
    }
    if (chaosDie <= chaosFactor) {
      if (fateDice1 === fateDice2) { // both are the same - Exceptional + Random Event
        randomEvent = true;
        outcome = 'Exceptional ' + outcome + ' With Random Event';
        if (checkYes)
          color = 'blueviolet';
        else
          color = 'orangered';
      } else if (fateDice1 % 2 === 0 && fateDice2 % 2 === 0) { // both are even - Exceptional
        randomEvent = true;
        outcome = outcome + ' With Random Event'
      } else if (fateDice1 % 2 !== 0 && fateDice2 % 2 !== 0) { // both are odd - Random Event
        outcome = 'Exceptional ' + outcome;
        if (checkYes)
          color = 'lightseagreen';
        else
          color = 'darkred';
      }
    }
    return {
      checkTotal: checkTotal,
      randomEvent: randomEvent,
      outcomeText: outcome,
      outcomeColor: color
    }
  }

  let dialogue = new Dialog({
    title: `Fate Chart`,
    content: fateCheckDialog,
    render: html => html[0].getElementsByTagName("input").mgme_v2_question.focus(),
    buttons: {
      submit: {
        icon: '',
        label: 'Submit',
        callback: async (html) => {
          const question = html.find("#mgme_v2_question").val() === '' ? "Fate Chart Question" : `<h2><b>${html.find("#mgme_v2_question").val()}</b></h2>`;
          const odds = html.find("#mgme_v2_odds").val();
          const chaosFactor = html.find("#mgme_v2_chaos").val();
          const yesFavorable = html.find("#mgme_v2_yesfav").val();
          const roll = Roll.create('2d10 + 1d10[fire]').roll();
          const fateResult = roll.results[0];
          const fateLeft = roll.terms[0].results[0].result;
          const fateRight = roll.terms[0].results[1].result;
          const chaosResult = roll.results[2];
          let output = generateOutput(oddsMap[odds].mod, chaosFactor, yesFavorable, fateResult, fateLeft, fateRight, chaosResult);
          const content = `
          <div><b>Roll:</b> ${output.checkTotal} at <em>${oddsMap[odds].label}</em> with Chaos Factor[${chaosFactor}]</div>
          <b style="color: ${output.outcomeColor}">${output.outcomeText}</b>
          `;
          await roll.toMessage({
            flavor: question,
            content: content,
            speaker: ChatMessage.getSpeaker()
          })
          if (output.randomEvent) {
            if (game.dice3d)
              Hooks.once('diceSoNiceRollComplete', () => mgeRandomEvent('Unexpected Random Event'))
            else
              mgeRandomEvent('Unexpected Random Event');
          }
        }
      }
    },
    default: "submit"
  })

  dialogue.render(true)
}