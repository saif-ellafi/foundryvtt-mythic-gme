import MGMEReference from "./utils/mgme-reference";
import MGMECommon from "./utils/mgme-common";
import MGMEOracleUtils from "./utils/mgme-oracle-utils";
import MGMEChatJournal from "./utils/mgme-chat-journal";

export default class MGMECore {

  static initSettings() {
    game.settings.register('mythic-gme-tools', 'mythicRollDebug', {
      name: 'Show dice roll details',
      hint: 'Whether to show the dice rolled in the checks. Useful when you don\'t trust me :)',
      scope: 'world',
      config: true,
      type: Boolean,
      default: false
    });

    game.settings.register('mythic-gme-tools', 'mythicAutolog', {
      name: 'Automatic Adventure Logging',
      hint: 'Automatically send all Mythic GM Emulator outputs to a Journal Entry',
      scope: 'world',
      config: true,
      type: Boolean,
      default: false,
      onChange: MGMECommon.DEBOUNCED_RELOAD
    });

    if (game.settings.get("mythic-gme-tools", "mythicAutolog")) {
      const folderName = "Mythic Journal";
      const date = new Date().toDateInputString();
      const journalName = 'Adventure Notes ' + date;
      MGMEChatJournal._mgeFindOrCreateJournal({name: journalName, folder: folderName});
    }

    game.settings.register('mythic-gme-tools', 'currentChaos', {
      name: 'Chaos Rank',
      hint: 'Current Mythic GME Chaos Rank',
      scope: 'world',
      config: false,
      type: Number,
      default: 5
    });

    game.settings.register('mythic-gme-tools', 'minChaos', {
      name: 'Minimum Chaos Factor',
      hint: 'Minimum value for Chaos Factor. Cannot be smaller than 1 or larger than the Maximum Chaos value.',
      scope: 'world',
      config: true,
      type: Number,
      default: 1,
      range: {
        min: 1,
        max: 9,
        step: 1
      },
      onChange: (newMinChaos) => {
        if (newMinChaos >= game.settings.get('mythic-gme-tools', 'maxChaos')) {
          ui.notifications.error("Mythic GME Tools: Minimum Chaos Factor must be smaller than Maximum Chaos value. Settings restored to default.");
          game.settings.set('mythic-gme-tools', 'minChaos', 1);
          game.settings.set('mythic-gme-tools', 'maxChaos', 9);
          return false;
        }
        const currentChaos = game.settings.get('mythic-gme-tools', 'currentChaos')
        if (currentChaos < newMinChaos)
          game.settings.set('mythic-gme-tools', 'currentChaos', newMinChaos)
      }
    });

    game.settings.register('mythic-gme-tools', 'maxChaos', {
      name: 'Maximum Chaos Factor',
      hint: 'Maximum value for Chaos Factor. Maximum is 9 and may not be smaller than Minimum Chaos value.',
      scope: 'world',
      config: true,
      type: Number,
      default: 9,
      range: {
        min: 1,
        max: 9,
        step: 1
      },
      onChange: (newMaxChaos) => {
        if (newMaxChaos <= game.settings.get('mythic-gme-tools', 'minChaos')) {
          ui.notifications.error("Mythic GME Tools: Maximum Chaos Factor must be larger than Minimum Chaos value. Settings restored to default.");
          game.settings.set('mythic-gme-tools', 'minChaos', 1);
          game.settings.set('mythic-gme-tools', 'maxChaos', 9);
          return false;
        }
        const currentChaos = game.settings.get('mythic-gme-tools', 'currentChaos')
        if (currentChaos > newMaxChaos)
          game.settings.set('mythic-gme-tools', 'currentChaos', newMaxChaos)
      }
    });

    if (game.dice3d) {
      game.settings.register('mythic-gme-tools', 'randomEvents3DDelay', {
        name: 'Simulate Slow Dice Rolling',
        hint: 'Rolls Mythic questions slowly, showing the answers as the dice roll. Set to 0 to disable. Larger numbers make it even slower',
        scope: 'world',
        config: true,
        type: Number,
        default: 1,
        range: {
          min: 0,
          max: 10,
          step: 1
        }
      });
      game.settings.register('mythic-gme-tools', 'v2ChaosDieColor', {
        name: 'Color for Chaos 3D Die',
        hint: 'Customize the color of your Chaos Die (Dice so Nice!) for Variations #2 rolls',
        scope: 'world',
        config: true,
        type: String,
        default: 'cold',
        choices: MGMEReference.DIE_COLORS
      });
    }

    MGMECommon._mgeGetAllMythicTables().then(tables => {
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

      game.settings.register('mythic-gme-tools', 'descriptionsAdvTable', {
        name: 'Descriptions Adverbs Table',
        hint: 'Table to use for Mythic GME V2 Detail Check Descriptor 1 Meaning. Only table names starting with Mythic are listed.',
        scope: 'world',
        config: true,
        type: String,
        choices: tables,
        default: "Mythic GME: Descriptions 1"
      });

      game.settings.register('mythic-gme-tools', 'descriptionsAdjTable', {
        name: 'Descriptions Adjectives Table',
        hint: 'Table to use for Mythic GME V2 Detail Check Descriptor 2 Meaning. Only table names starting with Mythic are listed.',
        scope: 'world',
        config: true,
        type: String,
        choices: tables,
        default: "Mythic GME: Descriptions 2"
      });
    })

  }

  static async mgeFateChart() {

    function generateOutput(question, odds, chaos, result) {
      const target = MGMEReference.FATE_CHART[odds][chaos];
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
      const debug = game.settings.get('mythic-gme-tools', 'mythicRollDebug');
      return `
        ${question ? `<h2>${question}</h2>` : ''}
        ${debug ? `<div><b>Roll:</b> ${result} at <em>${MGMEReference.CORE_ODDS_MAP[odds]}</em> with Chaos Rank[${chaos}]</div>` : ''}
        <b style="color: ${color}">${outcome}</b>
      `
    }

    const fateChartDialog = await renderTemplate('templates/core-fatechart-dialog.hbs', {chaosRankOptions: MGMECommon._mgeGenerateChaosRankOptions()});

    let dialogue = new Dialog({ // ToDo: Replace with template
      title: `Fate Chart`,
      content: fateChartDialog,
      render: html => html[0].getElementsByTagName("input").mgme_question.focus(),
      buttons: {
        submit: {
          icon: '<i class="fas fa-comments"></i>',
          label: 'To Chat',
          callback: async (html) => {
            const odds = html.find("#mgme_odds").val();
            const chaos = html.find("#mgme_chaos").val();
            const roll = new Roll(`1d100`);
            const result = roll.evaluate({async: false}).total;
            let content = generateOutput(html.find("#mgme_question").val(), odds, chaos, result);
            let doubles = false;
            if (result > 10 && result < 100) {
              const s = result.toString();
              const ignoreDoubles = game.settings.get("mythic-gme-tools", "doublesIgnoreChaos");
              if (s[0] === s[1] && (ignoreDoubles || s[0] <= parseInt(chaos))) {
                content += `<div><b>Doubles!</b></div>`
                doubles = true;
              }
            }
            roll.toMessage({
              flavor: 'Fate Chart Question',
              content: content,
              speaker: ChatMessage.getSpeaker()
            }).then(chat => MGMEChatJournal._mgeLogChatToJournal(chat));
            if (doubles) {
              if (game.dice3d)
                Hooks.once('diceSoNiceRollComplete', () => MGMEOracleUtils._mgePrepareOracleQuestion(MGMEReference.MGE_PROPS_TEMPLATES.UNEXPECTED_EVENT))
              else
                await MGMEOracleUtils._mgePrepareOracleQuestion(MGMEReference.MGE_PROPS_TEMPLATES.UNEXPECTED_EVENT);
            }
          }
        }
      },
      default: "submit"
    })

    dialogue.render(true)
  }

  static async mgeRandomEvent() {
    await MGMEOracleUtils._mgePrepareOracleQuestion(MGMEReference.MGE_PROPS_TEMPLATES.EVENT_QUESTION);
  }

  static mgeIncreaseChaos() {
    const currentChaos = game.settings.get('mythic-gme-tools', 'currentChaos');
    const maxChaos = game.settings.get('mythic-gme-tools', 'maxChaos');
    const whisper = ui.chat.getData().rollMode !== 'roll' ? [game.user] : undefined;
    if (currentChaos < maxChaos) {
      game.settings.set('mythic-gme-tools', 'currentChaos', currentChaos + 1);
      const chat = {
        flavor: 'Chaos Shift',
        content: `<h3>Chaos Increased to ${currentChaos + 1}</h3>`,
        whisper: whisper
      };
      $("#mgme_chaos").val(currentChaos + 1);
      MGMEChatJournal._mgeCreateChatAndLog(chat);
    } else {
      let chat = {
        flavor: 'Chaos Shift',
        content: `<h3>Chaos Maximum! (${currentChaos})</h3>`,
        whisper: whisper
      };
      MGMEChatJournal._mgeCreateChatAndLog(chat);
    }
  }

  static mgeDecreaseChaos() {
    const currentChaos = game.settings.get('mythic-gme-tools', 'currentChaos');
    const minChaos = game.settings.get('mythic-gme-tools', 'minChaos');
    const whisper = ui.chat.getData().rollMode !== 'roll' ? [game.user] : undefined;
    if (currentChaos > minChaos) {
      game.settings.set('mythic-gme-tools', 'currentChaos', currentChaos - 1);
      let chat = {
        flavor: 'Chaos Shift',
        content: `<h3>Chaos Decreased to ${currentChaos - 1}</h3>`,
        whisper: whisper
      };
      $("#mgme_chaos").val(currentChaos - 1);
      MGMEChatJournal._mgeCreateChatAndLog(chat);
    } else {
      let chat = {
        flavor: 'Chaos Shift',
        content: `<h3>Chaos Minimum! (${currentChaos})</h3>`,
        whisper: whisper
      };
      MGMEChatJournal._mgeCreateChatAndLog(chat);
    }
  }

  static mgeCheckChaos() {
    const currentChaos = game.settings.get('mythic-gme-tools', 'currentChaos');
    const whisper = ui.chat.getData().rollMode !== 'roll' ? [game.user] : undefined;
    let chat = {
      flavor: 'Chaos Check',
      content: `<h3>Chaos Rank (${currentChaos})</h3>`,
      whisper: whisper
    };
    MGMEChatJournal._mgeCreateChatAndLog(chat);
  }

  static async mgeSceneAlteration() {
    const sceneAlterationDialogue = await renderTemplate('templates/core-scenealteration-dialog.hbs', {chaosRankOptions: MGMECommon._mgeGenerateChaosRankOptions()});

    let dialogue = new Dialog({
      title: `Scene Alteration Check`,
      content: sceneAlterationDialogue,
      buttons: {
        submit: {
          icon: '<i class="fas fa-comments"></i>',
          label: 'To Chat',
          callback: async (html) => {
            const chaos = parseInt(html.find("#mgme_chaos").val());
            const useD8 = game.settings.get('mythic-gme-tools', 'useD8ForSceneCheck');
            const roll = new Roll(`${useD8 ? '1d8' : '1d10'}`);
            const result = roll.evaluate({async: false}).total;
            const debug = game.settings.get('mythic-gme-tools', 'mythicRollDebug');
            if (result <= chaos) {
              if (result % 2 === 0) {
                roll.toMessage({
                  flavor: 'Scene Alteration',
                  content: `<b style="color: darkred">Scene was interrupted!</b>${debug ? ' ('+result+')' : ''}`
                });
                if (game.dice3d)
                  Hooks.once('diceSoNiceRollComplete', () => MGMEOracleUtils._mgePrepareOracleQuestion(MGMEReference.MGE_PROPS_TEMPLATES.INTERRUPTION_EVENT))
                else
                  await MGMEOracleUtils._mgePrepareOracleQuestion(MGMEReference.MGE_PROPS_TEMPLATES.INTERRUPTION_EVENT);
              } else {
                return roll.toMessage({
                  flavor: 'Scene Alteration',
                  content: `<b style="color: darkred">Scene was altered!</b>${debug ? ' ('+result+')' : ''}`
                }).then(chat => {MGMEChatJournal._mgeLogChatToJournal(chat);return chat});
              }
            } else {
              return roll.toMessage({
                flavor: 'Scene Alteration Check',
                content: `<b style="color: darkgreen">Scene Proceeds Normally!</b>${debug ? ' ('+result+')' : ''}`
              }).then(chat => {MGMEChatJournal._mgeLogChatToJournal(chat);return chat});
            }
          }
        }
      },
      default: "submit"
    })

    dialogue.render(true)
  }

}
