MYTHIC_GME_CHECK_VERSION(this.name, 0);

const currentChaos = game.settings.get('mythic-gme-tools', 'currentChaos')
const fateChartDialog = `
<form>
<label for="odds">Odds:</label>
<select name="odds" id="mgme_odds" style="margin-bottom: 10px;">
  <option value="i">Impossible</option>
  <option value="nw">No way</option>
  <option value="vu">Very unlikely</option>
  <option value="u">Unlikely</option>
  <option value="ff" selected>50/50</option>
  <option value="sl">Somewhat likely</option>
  <option value="l">Likely</option>
  <option value="vl">Very likely</option>
  <option value="nst">Near sure thing</option>
  <option value="ast">A sure thing</option>
  <option value="htb">Has to be</option>
</select> 
<label for="chaos" style="margin-left: 5px;">Chaos Rank:</label>
<select name="chaos" id="mgme_chaos" style="margin-bottom: 10px;">
  <option value="9" ${currentChaos === 9 ? 'selected' : ''}>9</option>
  <option value="8" ${currentChaos === 8 ? 'selected' : ''}>8</option>
  <option value="7" ${currentChaos === 7 ? 'selected' : ''}>7</option>
  <option value="6" ${currentChaos === 6 ? 'selected' : ''}>6</option>
  <option value="5" ${currentChaos === 5 ? 'selected' : ''}>5</option>
  <option value="4" ${currentChaos === 4 ? 'selected' : ''}>4</option>
  <option value="3" ${currentChaos === 3 ? 'selected' : ''}>3</option>
  <option value="2" ${currentChaos === 2 ? 'selected' : ''}>2</option>
  <option value="1" ${currentChaos === 1 ? 'selected' : ''}>1</option>
</select><br>
<label for="question">Question (optional):</label>
<input id="mgme_question" style="margin-bottom: 10px" placeholder="Fate Chart Question">
</form>
`

const odds_id_map = {
  'i': 'Impossible',
  'nw': 'No way',
  'vu': 'Very unlikely',
  'u': 'Unlikely',
  'ff': '50/50',
  'sl': 'Somewhat likely',
  'l': 'Likely',
  'vl': 'Very likely',
  'nst': 'Near sure thing',
  'ast': 'A sure thing',
  'htb': 'Has to be'
}

const chart = {
  'i': {
    '9': 50,
    '8': 25,
    '7': 15,
    '6': 10,
    '5': 5,
    '4': 5,
    '3': 0,
    '2': 0,
    '1': -20
  },
  'nw': {
    '9': 75,
    '8': 50,
    '7': 35,
    '6': 25,
    '5': 15,
    '4': 10,
    '3': 5,
    '2': 5,
    '1': 0
  },
  'vu': {
    '9': 85,
    '8': 65,
    '7': 50,
    '6': 45,
    '5': 25,
    '4': 15,
    '3': 10,
    '2': 5,
    '1': 5
  },
  'u': {
    '9': 90,
    '8': 75,
    '7': 55,
    '6': 50,
    '5': 35,
    '4': 20,
    '3': 15,
    '2': 10,
    '1': 5
  },
  'ff': {
    '9': 95,
    '8': 85,
    '7': 75,
    '6': 65,
    '5': 50,
    '4': 35,
    '3': 25,
    '2': 15,
    '1': 10
  },
  'sl': {
    '9': 95,
    '8': 90,
    '7': 85,
    '6': 80,
    '5': 65,
    '4': 50,
    '3': 45,
    '2': 25,
    '1': 20
  },
  'l': {
    '9': 100,
    '8': 95,
    '7': 90,
    '6': 85,
    '5': 75,
    '4': 55,
    '3': 50,
    '2': 35,
    '1': 25
  },
  'vl': {
    '9': 105,
    '8': 95,
    '7': 95,
    '6': 90,
    '5': 85,
    '4': 75,
    '3': 65,
    '2': 50,
    '1': 45
  },
  'nst': {
    '9': 115,
    '8': 100,
    '7': 95,
    '6': 95,
    '5': 90,
    '4': 80,
    '3': 75,
    '2': 55,
    '1': 50
  },
  'ast': {
    '9': 125,
    '8': 110,
    '7': 95,
    '6': 95,
    '5': 90,
    '4': 85,
    '3': 80,
    '2': 65,
    '1': 55
  },
  'htb': {
    '9': 145,
    '8': 130,
    '7': 100,
    '6': 100,
    '5': 95,
    '4': 95,
    '3': 90,
    '2': 85,
    '1': 80
  }
}

function generateOutput(odds, chaos, result) {
  const target = chart[odds][chaos];
  const ex_yes_bound = target * 0.2;
  const ex_no_bound = 100-((100-target)*0.2)
  let outcome = 'Yes!';
  let color = 'green';
  if (result <= ex_yes_bound) {
    color = 'lightseagreen';
    outcome = 'Exceptional Yes!';
  } else if (result > ex_no_bound) {
    color = 'red';
    outcome = 'Exceptional No!';
  } else if (result > target) {
    color = 'darkred';
    outcome = 'No!';
  }
  return `
  <div><b>Roll:</b> ${result} at <em>${odds_id_map[odds]}</em> with Chaos[${chaos}]</div>
  <b style="color: ${color}">${outcome}</b>
  `
}

let dialogue = new Dialog({
  title: `Fate Chart`,
  content: fateChartDialog,
  buttons: {
    one: {
      icon: '',
      label: 'Submit',
      callback: async (html) => {
        const question = html.find("#mgme_question").val() === '' ? "Fate Chart Question" : `<h2><b>${html.find("#mgme_question").val()}</b></h2>`;
        const odds = html.find("#mgme_odds").val();
        const chaos = html.find("#mgme_chaos").val();
        const roll = new Roll(`1d100`);
        const result = roll.evaluate({async: false}).total;
        let content = generateOutput(odds, chaos, result);
        if (result > 10 && result < 100) {
          const s = result.toString();
          const macros = await game.packs.get('mythic-gme-tools.mythic-gme-macros').getDocuments();
          if (s[0] === s[1] && s[0] <= parseInt(chaos)) {
            content += `<div><b>Doubles!</b></div>`
            macros.find(m => m.name === "Random Event").execute();
          }
        }
        return roll.toMessage({
          flavor: question,
          content: content
        })
      }
    }
  }
})

dialogue.render(true)