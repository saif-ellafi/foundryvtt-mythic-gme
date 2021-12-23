import MGMEReference from "../utils/mgme-reference";
import MGMECommon from "../utils/mgme-common";
import MGMEOracleUtils from "../utils/mgme-oracle-utils";
import MGMEChatJournal from "../utils/mgme-chat-journal";

export default class MGMECore {

  static initSettings() {
    /** Not a Config */
    game.settings.register('mythic-gme-tools', 'currentChaos', {
      name: 'Chaos Rank',
      hint: 'Current Mythic GME Chaos Rank',
      scope: 'world',
      config: false,
      type: Number,
      default: 5
    });

    game.settings.register('mythic-gme-tools', 'mythicRollDebug', {
      name: game.i18n.localize('MGME.SettingsRollDebugName'),
      hint: game.i18n.localize('MGME.SettingsRollDebugHint'),
      scope: 'world',
      config: true,
      type: Boolean,
      default: false
    });

    game.settings.register('mythic-gme-tools', 'mythicAutolog', {
      name: game.i18n.localize('MGME.SettingsAutologName'),
      hint: game.i18n.localize('MGME.SettingsAutologHint'),
      scope: 'world',
      config: true,
      type: Boolean,
      default: false,
      onChange: MGMECommon.DEBOUNCED_RELOAD
    });

    game.settings.register('mythic-gme-tools', 'minChaos', {
      name: game.i18n.localize('MGME.SettingsMinChaosName'),
      hint: game.i18n.localize('MGME.SettingsMinChaosHint'),
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
      name: game.i18n.localize('MGME.SettingsMaxChaosName'),
      hint: game.i18n.localize('MGME.SettingsMaxChaosHint'),
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

    if (game.modules.get('dice-so-nice')?.active) {
      game.settings.register('mythic-gme-tools', 'randomEvents3DDelay', {
        name: game.i18n.localize('MGME.Settings3DDelayName'),
        hint: game.i18n.localize('MGME.Settings3DDelayHint'),
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
        name: game.i18n.localize('MGME.Settings3DChaosColorName'),
        hint: game.i18n.localize('MGME.Settings3DChaosColorHint'),
        scope: 'world',
        config: true,
        type: String,
        default: 'cold',
        choices: MGMEReference.DIE_COLORS
      });
    }

    MGMECommon._mgmeGetAllMythicTables().then(tables => {
      game.settings.register('mythic-gme-tools', 'focusTable', {
        name: game.i18n.localize('MGME.SettingsFocusTableName'),
        hint: game.i18n.localize('MGME.SettingsFocusTableHint'),
        scope: 'world',
        config: true,
        type: String,
        choices: tables,
        default: "Mythic GME: Event Focus"
      });

      game.settings.register('mythic-gme-tools', 'actionTable', {
        name: game.i18n.localize('MGME.SettingsActionTableName'),
        hint: game.i18n.localize('MGME.SettingsActionTableHint'),
        scope: 'world',
        config: true,
        type: String,
        choices: tables,
        default: "Mythic GME: Action Meaning"
      });

      game.settings.register('mythic-gme-tools', 'subjectTable', {
        name: game.i18n.localize('MGME.SettingsSubjectTableName'),
        hint: game.i18n.localize('MGME.SettingsSubjectTableHint'),
        scope: 'world',
        config: true,
        type: String,
        choices: tables,
        default: "Mythic GME: Subject Meaning"
      });

      game.settings.register('mythic-gme-tools', 'descriptionsAdvTable', {
        name: game.i18n.localize('MGME.SettingsAdverbsTableName'),
        hint: game.i18n.localize('MGME.SettingsAdverbsTableHint'),
        scope: 'world',
        config: true,
        type: String,
        choices: tables,
        default: "Mythic GME: Descriptions 1"
      });

      game.settings.register('mythic-gme-tools', 'descriptionsAdjTable', {
        name: game.i18n.localize('MGME.SettingsAdjectivesTableName'),
        hint: game.i18n.localize('MGME.SettingsAdjectivesTableHint'),
        scope: 'world',
        config: true,
        type: String,
        choices: tables,
        default: "Mythic GME: Descriptions 2"
      });
    })

  }

  static async mgmeFateChart() {

    function generateOutput(question, odds, chaos, result) {
      const target = MGMEReference.FATE_CHART[odds][chaos];
      const ex_yes_bound = target * 0.2;
      const ex_no_bound = 100 - ((100 - target) * 0.2)
      let outcome = game.i18n.localize('MGME.Yes');
      let color = 'green';
      if (result <= ex_yes_bound) {
        color = 'lightseagreen';
        outcome = game.i18n.localize('MGME.ExceptionalYes');
      } else if (result > ex_no_bound) {
        color = 'red';
        outcome = game.i18n.localize('MGME.ExceptionalNo');
      } else if (result > target) {
        color = 'darkred';
        outcome = game.i18n.localize('MGME.No');
      }
      const debug = game.settings.get('mythic-gme-tools', 'mythicRollDebug');
      return `
        ${question ? `<h2>${question}</h2>` : ''}
        ${debug ? `<div><b>Roll:</b> ${result} <em>${game.i18n.localize(MGMEReference.ODDS_MAP_CORE[odds])}</em> Chaos [${chaos}]</div>` : ''}
        <b style="color: ${color}">${outcome}</b>
      `
    }

    const fateChartDialog = await renderTemplate('./modules/mythic-gme-tools/template/core-fatechart-dialog.hbs', {chaosRankOptions: new Handlebars.SafeString(MGMECommon._mgmeGenerateChaosRankOptions())});

    let dialogue = new Dialog({ // ToDo: Replace with template
      title: game.i18n.localize('MGME.FateChart'),
      content: fateChartDialog,
      render: html => html[0].getElementsByTagName("input").mgme_question.focus(),
      buttons: {
        submit: {
          icon: '<i class="fas fa-comments"></i>',
          label: game.i18n.localize('MGME.ToChat'),
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
                content += `<div><b>${game.i18n.localize('MGME.Doubles')}</b></div>`
                doubles = true;
              }
            }
            roll.toMessage({
              flavor: game.i18n.localize('MGME.FateChartQuestion'),
              content: content,
              speaker: ChatMessage.getSpeaker()
            }).then(chat => MGMEChatJournal._mgmeLogChatToJournal(chat));
            if (doubles) {
              if (game.dice3d)
                Hooks.once('diceSoNiceRollComplete', () => MGMEOracleUtils._mgmePrepareOracleQuestion(MGMEReference.PROPS_TEMPLATES.UNEXPECTED_EVENT()))
              else
                await MGMEOracleUtils._mgmePrepareOracleQuestion(MGMEReference.PROPS_TEMPLATES.UNEXPECTED_EVENT());
            }
          }
        }
      },
      default: "submit"
    })

    dialogue.render(true)
  }

  static async mgmeRandomEvent() {
    await MGMEOracleUtils._mgmePrepareOracleQuestion(MGMEReference.PROPS_TEMPLATES.EVENT_QUESTION());
  }

  static mgmeIncreaseChaos() {
    const currentChaos = game.settings.get('mythic-gme-tools', 'currentChaos');
    const maxChaos = game.settings.get('mythic-gme-tools', 'maxChaos');
    const whisper = ui.chat.getData().rollMode !== 'roll' ? [game.user] : undefined;
    if (currentChaos < maxChaos) {
      game.settings.set('mythic-gme-tools', 'currentChaos', currentChaos + 1);
      const chat = {
        flavor: game.i18n.localize('MGME.ChaosShift'),
        content: `<h3>${game.i18n.localize('MGME.ChaosIncreasedTo')} ${currentChaos + 1}</h3>`,
        whisper: whisper
      };
      $("#mgme_chaos").val(currentChaos + 1);
      MGMEChatJournal._mgmeCreateChatAndLog(chat);
    } else {
      let chat = {
        flavor: game.i18n.localize('MGME.ChaosShift'),
        content: `<h3>${game.i18n.localize('MGME.ChaosIsMax')} (${currentChaos})</h3>`,
        whisper: whisper
      };
      MGMEChatJournal._mgmeCreateChatAndLog(chat);
    }
  }

  static mgmeDecreaseChaos() {
    const currentChaos = game.settings.get('mythic-gme-tools', 'currentChaos');
    const minChaos = game.settings.get('mythic-gme-tools', 'minChaos');
    const whisper = ui.chat.getData().rollMode !== 'roll' ? [game.user] : undefined;
    if (currentChaos > minChaos) {
      game.settings.set('mythic-gme-tools', 'currentChaos', currentChaos - 1);
      let chat = {
        flavor: game.i18n.localize('MGME.ChaosShift'),
        content: `<h3>${game.i18n.localize('MGME.ChaosDecreasedTo')} ${currentChaos - 1}</h3>`,
        whisper: whisper
      };
      $("#mgme_chaos").val(currentChaos - 1);
      MGMEChatJournal._mgmeCreateChatAndLog(chat);
    } else {
      let chat = {
        flavor: game.i18n.localize('MGME.ChaosShift'),
        content: `<h3>${game.i18n.localize('MGME.ChaosIsMin')} (${currentChaos})</h3>`,
        whisper: whisper
      };
      MGMEChatJournal._mgmeCreateChatAndLog(chat);
    }
  }

  static mgmeCheckChaos() {
    const currentChaos = game.settings.get('mythic-gme-tools', 'currentChaos');
    const whisper = ui.chat.getData().rollMode !== 'roll' ? [game.user] : undefined;
    let chat = {
      flavor: game.i18n.localize('MGME.ChaosCheck'),
      content: `<h3>${game.i18n.localize('MGME.ChaosRank')} (${currentChaos})</h3>`,
      whisper: whisper
    };
    MGMEChatJournal._mgmeCreateChatAndLog(chat);
  }

  static async mgmeSceneAlteration() {
    const sceneAlterationDialogue = await renderTemplate('./modules/mythic-gme-tools/template/core-scenealteration-dialog.hbs', {chaosRankOptions: new Handlebars.SafeString(MGMECommon._mgmeGenerateChaosRankOptions())});

    let dialogue = new Dialog({
      title: game.i18n.localize('MGME.SceneAlterationCheck'),
      content: sceneAlterationDialogue,
      buttons: {
        submit: {
          icon: '<i class="fas fa-comments"></i>',
          label: game.i18n.localize('MGME.ToChat'),
          callback: async (html) => {
            const chaos = parseInt(html.find("#mgme_chaos").val());
            const useD8 = game.settings.get('mythic-gme-tools', 'useD8ForSceneCheck');
            const roll = new Roll(`${useD8 ? '1d8' : '1d10'}`);
            const result = roll.evaluate({async: false}).total;
            const debug = game.settings.get('mythic-gme-tools', 'mythicRollDebug');
            if (result <= chaos) {
              if (result % 2 === 0) {
                roll.toMessage({
                  flavor: game.i18n.localize('MGME.SceneAlteration'),
                  content: `<b style="color: darkred">${game.i18n.localize("MGME.SceneInterrupted")}</b>${debug ? ' ('+result+')' : ''}`
                });
                if (game.dice3d)
                  Hooks.once('diceSoNiceRollComplete', () => MGMEOracleUtils._mgmePrepareOracleQuestion(MGMEReference.PROPS_TEMPLATES.INTERRUPTION_EVENT()))
                else
                  await MGMEOracleUtils._mgmePrepareOracleQuestion(MGMEReference.PROPS_TEMPLATES.INTERRUPTION_EVENT());
              } else {
                return roll.toMessage({
                  flavor: game.i18n.localize('MGME.SceneAlteration'),
                  content: `<b style="color: darkred">${game.i18n.localize('MGME.SceneAltered')}</b>${debug ? ' ('+result+')' : ''}`
                }).then(chat => {MGMEChatJournal._mgmeLogChatToJournal(chat);return chat});
              }
            } else {
              return roll.toMessage({
                flavor: game.i18n.localize('MGME.SceneAlterationCheck'),
                content: `<b style="color: darkgreen">${game.i18n.localize('MGME.SceneNormal')}</b>${debug ? ' ('+result+')' : ''}`
              }).then(chat => {MGMEChatJournal._mgmeLogChatToJournal(chat);return chat});
            }
          }
        }
      },
      default: "submit"
    })

    dialogue.render(true)
  }

}