async function _mgeGetAllPacks() {
  const packsCore = await game.packs.get('mythic-gme-tools.mythic-gme-tables').getDocuments();
  const packsV1 = await game.packs.get('mythic-gme-tools.mythic-gme-v1-tables').getDocuments();
  const packsV2 = await game.packs.get('mythic-gme-tools.mythic-gme-v2-tables').getDocuments()
  return packsCore.concat(packsV1).concat(packsV2)
}

async function _mgeSimulateRoll(targetRoll) {
  const randomEventsIn3D = (targetRoll && game.dice3d && game.settings.get('mythic-gme-tools', 'randomEvents3D'));
  if (randomEventsIn3D) {
    await game.dice3d.showForRoll(targetRoll);
  }
  return targetRoll;
}

async function _mgeUpdateChatSimulation(baseChat, newMessage) {
  await baseChat.update({content: baseChat.data.content + newMessage});
  ui.chat.scrollBottom();
  const randomEventsIn3D = (game.dice3d && game.settings.get('mythic-gme-tools', 'randomEvents3D'));
  if (randomEventsIn3D) {
    await new Promise(r => setTimeout(r, game.settings.get('mythic-gme-tools', 'randomEvents3DDelay')*1000));
  }
}

async function _mgeFindTableBySetting(setting) {
  const fallbackTables = await _mgeGetAllPacks();
  const name = game.settings.get('mythic-gme-tools', setting);
  const baseSetting = game.settings.settings.get(`mythic-gme-tools.${setting}`);
  return game.tables.contents.find(t => t.name === name) ??
    fallbackTables.find(t => t.name === name) ??
    fallbackTables.find(t => t.name === baseSetting.default);
}

async function _mgeFindTableByName(tableName) {
  return Object.values(
    game.tables.contents.concat((await _mgeGetAllPacks()))
  ).find(t => t.name === tableName);
}

async function _mgeGetRandomEventResults(eventFocus) {

  let focusResult;
  let focusRoll;

  if (eventFocus)
    focusResult = eventFocus;
  else {
    const focusTable = await _mgeFindTableBySetting('focusTable');
    focusRoll = await focusTable.roll();
    focusResult = focusRoll.results[0].getChatText();
  }

  const actionTable = await _mgeFindTableBySetting('actionTable');
  const actionRoll = await actionTable.roll();
  const actionResult = actionRoll.results[0].getChatText();

  const subjectTable = await _mgeFindTableBySetting('subjectTable');
  const subjectRoll = await subjectTable.roll();
  const subjectResult = subjectRoll.results[0].getChatText();

  return {
    focusResult: focusResult,
    focusRoll: focusRoll,
    actionResult: actionResult,
    actionRoll: actionRoll,
    subjectResult: subjectResult,
    subjectRoll: subjectRoll
  };

}

Hooks.once('ready', async () => {

  const tables = Object.fromEntries((await _mgeGetAllPacks())
    .concat(game.tables.contents)
    .filter(e => e.name.startsWith('Mythic'))
    .map(e => [e.name, e.name]));

  game.settings.register('mythic-gme-tools', 'currentChaos', {
    name: 'Chaos Rank',
    hint: 'Current Mythic GME Chaos Rank',
    scope: 'world',
    config: false,
    type: Number,
    default: 5
  });

  if (game.dice3d) {
    game.settings.register('mythic-gme-tools', 'randomEvents3D', {
      name: 'Slow Simulation of Random Events',
      hint: 'All random event related rolls will slowly appear as 3D dice show results. Adds tension but slows down results.',
      scope: 'world',
      config: true,
      type: Boolean,
      default: !!game.dice3d
    });
    game.settings.register('mythic-gme-tools', 'randomEvents3DDelay', {
      name: 'Slow Simulation Delay in Seconds',
      hint: 'If Slow Simulation is enabled, how much to wait between roll steps. Default: 1',
      scope: 'world',
      config: true,
      type: Number,
      default: 1
    });
  }

  game.settings.register('mythic-gme-tools', 'doublesIgnoreChaos', {
    name: 'Double Ignores Chaos Factor',
    hint: 'Whether to ignore CF and always hit a random event regardless',
    scope: 'world',
    config: true,
    type: Boolean,
    default: false
  });

  game.settings.register('mythic-gme-tools', 'minChaos', {
    name: 'Minimum Chaos Factor',
    hint: 'Minimum value for Chaos Factor',
    scope: 'world',
    config: true,
    type: Number,
    default: 1,
    onChange: (newMinChaos) => {
      const currentChaos = game.settings.get('mythic-gme-tools', 'currentChaos')
      if (currentChaos < newMinChaos)
        game.settings.set('mythic-gme-tools', 'currentChaos', newMinChaos)
    }
  });

  game.settings.register('mythic-gme-tools', 'maxChaos', {
    name: 'Maximum Chaos Factor',
    hint: 'Maximum value for Chaos Factor',
    scope: 'world',
    config: true,
    type: Number,
    default: 9,
    onChange: (newMaxChaos) => {
      const currentChaos = game.settings.get('mythic-gme-tools', 'currentChaos')
      if (currentChaos > newMaxChaos)
        game.settings.set('mythic-gme-tools', 'currentChaos', newMaxChaos)
    }
  });

  game.settings.register('mythic-gme-tools', 'focusTable', {
    name: 'Focus Table',
    hint: 'Table to use for Random Event focus. Only table names starting with Mythic are listed.',
    scope: 'world',
    config: true,
    type: String,
    choices: tables,
    default: "Mythic GME: Event Focus"
  });

  game.settings.register('mythic-gme-tools', 'actionTable', {
    name: 'Action Table',
    hint: 'Table to use for Mythic GME Random Event action meaning. Only table names starting with Mythic are listed.',
    scope: 'world',
    config: true,
    type: String,
    choices: tables,
    default: "Mythic GME: Action Meaning"
  });

  game.settings.register('mythic-gme-tools', 'subjectTable', {
    name: 'Subject Table',
    hint: 'Table to use for Mythic GME Random Event subject meaning. Only table names starting with Mythic are listed.',
    scope: 'world',
    config: true,
    type: String,
    choices: tables,
    default: "Mythic GME: Subject Meaning"
  });

  game.settings.register("mythic-gme-tools", "deckPath", {
    name: "Deck Path Location",
    hint: "Folder where you store you card decks. Relative to User Data directory.",
    scope: "world",
    config: true,
    type: String,
    default: "decks",
  });

});

function mgeIncreaseChaos() {

  const currentChaos = game.settings.get('mythic-gme-tools', 'currentChaos');
  const maxChaos = game.settings.get('mythic-gme-tools', 'maxChaos');
  if (currentChaos < maxChaos) {
    game.settings.set('mythic-gme-tools', 'currentChaos', currentChaos + 1);
    let chat = {
      content: `<h2>Chaos Increased to ${currentChaos + 1}</h2>`
    };
    $("#mgme_chaos").val(currentChaos + 1);
    ChatMessage.create(chat);
  } else {
    let chat = {
      content: `<h2>Chaos Maximum! (${currentChaos})</h2>`
    };
    ChatMessage.create(chat);
  }

}

function mgeDecreaseChaos() {

  const currentChaos = game.settings.get('mythic-gme-tools', 'currentChaos');
  const minChaos = game.settings.get('mythic-gme-tools', 'minChaos');
  if (currentChaos > minChaos) {
    game.settings.set('mythic-gme-tools', 'currentChaos', currentChaos - 1);
    let chat = {
      content: `<h2>Chaos Decreased to ${currentChaos - 1}</h2>`
    };
    $("#mgme_chaos").val(currentChaos - 1);
    ChatMessage.create(chat);
  } else {
    let chat = {
      content: `<h2>Chaos Minimum! (${currentChaos})</h2>`
    };
    ChatMessage.create(chat);
  }

}

function mgeFateChart() {

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
    <input id="mgme_question" style="margin-bottom: 10px" placeholder="Fate Chart Question"/>
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
    const ex_no_bound = 100 - ((100 - target) * 0.2)
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
    render: html => html[0].getElementsByTagName("input").mgme_question.focus(),
    buttons: {
      submit: {
        icon: '',
        label: 'Submit',
        callback: async (html) => {
          const question = html.find("#mgme_question").val() === '' ? "Fate Chart Question" : `<h2><b>${html.find("#mgme_question").val()}</b></h2>`;
          const odds = html.find("#mgme_odds").val();
          const chaos = html.find("#mgme_chaos").val();
          const roll = new Roll(`1d100`);
          const result = roll.evaluate({async: false}).total;
          let content = generateOutput(odds, chaos, result);
          let doubles = false;
          if (result > 10 && result < 100) {
            const s = result.toString();
            const ignoreDoubles = game.settings.get("mythic-gme-tools", "doublesIgnoreChaos");
            if (s[0] === s[1] && (ignoreDoubles || s[0] <= parseInt(chaos))) {
              content += `<div><b>Doubles!</b></div>`
              doubles = true;
            }
          }
          await roll.toMessage({
            flavor: question,
            content: content,
            speaker: ChatMessage.getSpeaker()
          })
          if (doubles) await mgeRandomEvent('Unexpected Event');
        }
      }
    },
    default: "submit"
  })

  dialogue.render(true)

}

function mgeRandomEvent(randomEventTitle) {

  async function submitRandomEvent(eventTitle, eventFocus) {
    const randomEvent = await _mgeGetRandomEventResults(eventFocus);
    let subjectChat = {
      content: eventTitle
    };
    let chatMessage = await ChatMessage.create(subjectChat);
    await _mgeUpdateChatSimulation(chatMessage, `<div><b>Focus: </b>${randomEvent.focusResult} (${(await _mgeSimulateRoll(randomEvent.focusRoll?.roll))?.total ?? '*'})</div>`);
    await _mgeUpdateChatSimulation(chatMessage, `<div><b>Action: </b>${randomEvent.actionResult} (${(await _mgeSimulateRoll(randomEvent.actionRoll.roll)).total})</div>`);
    await _mgeUpdateChatSimulation(chatMessage, `<div><b>Subject: </b>${randomEvent.subjectResult} (${(await _mgeSimulateRoll(randomEvent.subjectRoll.roll)).total})</div>`);
  }

  if (!randomEventTitle) {
    const complexQuestionDialog = `
      <form>
      <label for="mgme_re_question">Event Reason (optional):</label>
      <input id="mgme_re_question" style="margin-bottom: 10px" placeholder="Random Event"/>
      <label for="mgme_re_efocus" style="display:inline-block;">Event Focus:</label>
      <select id="mgme_re_efocus" style="width:250px;margin-bottom: 10px;"></select>
      </form>
    `
    let dialogue = new Dialog({
      title: `Random Event`,
      content: complexQuestionDialog,
      render: async function (html) {
        const eFocusElement = $("#mgme_re_efocus");
        const focusTableName = game.settings.get('mythic-gme-tools', 'focusTable');
        eFocusElement.append(`<option value="Random">${focusTableName}</option>`);
        const focusResults = (await _mgeFindTableByName(focusTableName)).results.contents.map(c => c.getChatText());
        focusResults.forEach(focus => {
          eFocusElement.append(`<option value="${focus}">${focus}</option>`);
        });
        html[0].getElementsByTagName("input").mgme_re_question.focus();
      },
      buttons: {
        submit: {
          icon: '',
          label: 'Submit',
          callback: (html) => {
            let text = html[0].getElementsByTagName("input").mgme_re_question.value;
            const focusValue = $("#mgme_re_efocus");
            const eventFocus = focusValue.val() === 'Random' ? undefined : focusValue.val();
            submitRandomEvent(text.length ? `<h2>${text}</h2>` : 'Random Event', eventFocus);
          }
        }
      },
      default: "submit"
    })
    dialogue.render(true)
  } else {
    submitRandomEvent(randomEventTitle);
  }

}

function mgeSceneAlteration() {

  const currentChaos = game.settings.get('mythic-gme-tools', 'currentChaos')
  const sceneAlterationDialogue = `
    <form>
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
    </select>
    </form>
`

  let dialogue = new Dialog({
    title: `Scene Alteration Check`,
    content: sceneAlterationDialogue,
    buttons: {
      submit: {
        icon: '',
        label: 'Submit',
        callback: async (html) => {
          const chaos = parseInt(html.find("#mgme_chaos").val());
          const roll = new Roll(`1d10`);
          const result = roll.evaluate({async: false}).total;
          if (result <= chaos) {
            if (result % 2 === 0) {
              await roll.toMessage({
                content: `<b style="color: darkred">Scene was interrupted!</b> (${result})`
              });
              if (game.dice3d)
                Hooks.once('diceSoNiceRollComplete', async () => await mgeRandomEvent('Interruption Scene'))
              else
                await mgeRandomEvent('Interruption Scene');
            } else {
              return roll.toMessage({
                content: `<b style="color: darkred">Scene was altered!</b> (${result})`
              });
            }
          } else {
            return roll.toMessage({
              content: `<b style="color: darkgreen">Scene Proceeds Normally!</b> (${result})`
            });
          }
        }
      }
    },
    default: "submit"
  })

  dialogue.render(true)

}

async function mgeComplexQuestion() {

  const complexQuestionDialog = `
    <form>
    <label for="mgme_complex_question">Question (optional):</label>
    <input id="mgme_complex_question" style="margin-bottom: 10px" placeholder="Complex Question"/>
    </form>
    `

  let dialogue = new Dialog({
    title: `Complex Question`,
    content: complexQuestionDialog,
    render: html => html[0].getElementsByTagName("input").mgme_complex_question.focus(),
    buttons: {
      submit: {
        icon: '',
        label: 'Submit',
        callback: async (html) => {
          const randomEvent = await _mgeGetRandomEventResults();
          let subjectChat = {
            content: html.find("#mgme_complex_question").val() === '' ? 'Complex Question' : `<h2><b>${html.find("#mgme_complex_question").val()}</b></h2>`,
            speaker: ChatMessage.getSpeaker()
          };
          let chatMessage = await ChatMessage.create(subjectChat);
          await _mgeUpdateChatSimulation(chatMessage, `<div><b>Action: </b>${randomEvent.actionResult} (${(await _mgeSimulateRoll(randomEvent.actionRoll.roll)).total})</div>`);
          await _mgeUpdateChatSimulation(chatMessage, `<div><b>Subject: </b>${randomEvent.subjectResult} (${(await _mgeSimulateRoll(randomEvent.subjectRoll.roll)).total})</div>`);
        }
      }
    },
    default: "submit"
  })

  dialogue.render(true)

}

async function mgeDealCard({
                             tableName,
                             fileExtension = 'jpg',
                             useRotate = false,
                             dialogTitle = 'Dealt Card',
                             height = '580px',
                             shuffle = true
                           }) {
  const projectRoot = game.settings.get("mythic-gme-tools", "deckPath");
  const fallbackTables = await _mgeGetAllPacks();
  const table = game.tables.find(t => t.name === tableName) ??
    fallbackTables.find(t => t.name === tableName)

  const result = await table.draw();
  if (shuffle && result.results.length === 0) {
    table.reset();
    ui.notifications.info("The Deck has been shuffled. Please draw again.");
    return false;
  }
  const image = await result.results[0].data.text;
  const isRotated = Math.random() < 0.5;
  const style = useRotate && isRotated ? " transform: rotate(181deg);" : "";

  const path = `${projectRoot}/${image}.${fileExtension}`

  try {
    await FilePicker.browse('user', path);
  } catch {
    let errorChat = {
      content: `
        <div style="color: red">ERROR: Cards not found. Make sure your cards are available in the following path:</div>
        <br>
        <div><em>${path}</em></div>
      `
    };
    ChatMessage.create(errorChat);
    return;
  }

  new Dialog({
    title: dialogTitle,
    content: `
      <div style="height: ${height};">
        <img
          style="border-radius: 5px; margin-bottom: 1em; ${style}"
          src="${path}"
        />
      <div>`,
    buttons: {
      reset: {
        label: "Shuffle Deck",
        callback: () => table.reset(),
      },
      close: {
        label: "Close",
        callback: () => {
        },
      },
    },
    default: "close"
  }).render(true);
}

function mgeFormattedChat() {

  const tokens = game.scenes.active.tokens.contents;

  const formattedChatDialog = `
    <form>
    <label for="mgme_format_style">Style:</label>
    <select id="mgme_format_style" style="margin-bottom: 10px;">
      <option value="title" selected>Title</option>
      <option value="subtitle">Subtitle</option>
      <option value="bold">Bold</option>
      <option value="italic">Italic</option>
      <option value="underline">Underline</option>
      <option value="normal">Normal</option>
    </select>
    <label for="mgme_format_speaker">Speaker:</label>
    <select id="mgme_format_speaker" style="margin-bottom: 10px;width:180px"></select>
    <label for="mgme_format_color" style="margin-bottom:10px;">Color:</label>
    <input id="mgme_format_color" style="margin-bottom:10px;width:60px;" placeholder="default"/>
    <label for="mgme_format_text">Message:</label>
    <input id="mgme_format_text" style="margin-bottom:10px;width: 200px;"/>
    </form>
    `

  let dialogue = new Dialog({
    title: `Formatted Text`,
    content: formattedChatDialog,
    render: html => {
      const curSpeaker = ChatMessage.getSpeaker();
      const speakerElement = $("#mgme_format_speaker");
      speakerElement.append(`<option value="Gamemaster">Gamemaster</option>`);
      tokens.forEach(token => {
        if (token.actor)
          speakerElement.append(`<option value=${token.actor.id} selected>${token.name}</option>`);
      });
      speakerElement.val(curSpeaker.actor ?? curSpeaker.alias);
      html[0].getElementsByTagName("input").mgme_format_text.focus()
    },
    buttons: {
      submit: {
        icon: '',
        label: 'Submit',
        callback: () => {
          let message;
          let color = $("#mgme_format_color").val();
          if (color && color !== '') {
            color = `style="color:${color};"`;
          } else {
            `style="color:inherit;"`;
          }
          let text = $("#mgme_format_text").val();
          if (!text || text === '') return;
          switch ($("#mgme_format_style").val()) {
            case '':
            case 'normal':
            case undefined: {
              message = `<span ${color}>${text}</span>`;
              break;
            }
            case 'title': {
              message = `<h1 ${color}>${text}</h1>`;
              break;
            }
            case 'subtitle': {
              message = `<h2 ${color}>${text}</h2>`;
              break;
            }
            case 'bold': {
              message = `<b ${color}>${text}</b>`;
              break;
            }
            case 'italic': {
              message = `<em ${color}>${text}</em>`;
              break;
            }
            case 'underline': {
              message = `<u ${color}>${text}</u>`;
              break;
            }
          }

          const speakerElementVal = $("#mgme_format_speaker").val();
          const selectedSpeaker = speakerElementVal === 'Gamemaster' ? {alias: "Gamemaster"} : {actor: tokens.find(t => t.actor.id === speakerElementVal).actor.id};
          let subjectChat = {
            content: message,
            speaker: selectedSpeaker
          };
          ChatMessage.create(subjectChat);
        }
      }
    },
    default: "submit"
  })
  dialogue.render(true)
}

async function mgeBackstoryGenerator() {
  const speaker = ChatMessage.getSpeaker();
  const eventsCountTable = await _mgeFindTableByName('Mythic GME: Backstory Events');
  const eventsCount = parseInt((await eventsCountTable.roll()).results[0].getChatText());
  let backstoryChat = {
    content: `<b>${eventsCount}</b> Backstory Events${speaker.alias === 'Gamemaster' ? '' : ` for <b>${speaker.alias}</b>`}`,
    speaker: ChatMessage.getSpeaker()
  };
  ChatMessage.create(backstoryChat);
  const backstoryFocusTable = await _mgeFindTableByName('Mythic GME: Backstory Focus')
  const backstoryLabels = ['First', 'Second', 'Third', 'Fourth', 'Fifth', 'Sixth', 'Seventh'];
  let i = 0;
  while (i < eventsCount) {
    const backstoryFocus = (await backstoryFocusTable.roll()).roll.result;
    const backstoryEvent = await _mgeGetRandomEventResults(backstoryFocus);
    let backstoryEventChat = {
      content: `<h2>${backstoryLabels[i] ?? i+1} Backstory Event</h2>`,
      speaker: ChatMessage.getSpeaker()
    };
    let chatMessage = await ChatMessage.create(backstoryEventChat);
    await _mgeUpdateChatSimulation(chatMessage, `<div><b>Action: </b>${backstoryEvent.actionResult} (${(await _mgeSimulateRoll(backstoryEvent.actionRoll.roll)).total})</div>`);
    await _mgeUpdateChatSimulation(chatMessage, `<div><b>Subject: </b>${backstoryEvent.subjectResult} (${(await _mgeSimulateRoll(backstoryEvent.subjectRoll.roll)).total})</div>`);
    i++
  }
}