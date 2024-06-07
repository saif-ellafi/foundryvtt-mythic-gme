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

    game.settings.register('mythic-gme-tools', 'panelKey', {
      name: game.i18n.localize('MGME.SettingsPanelKeyName'),
      hint: game.i18n.localize('MGME.SettingsPanelKeyHint'),
      scope: 'client',
      config: true,
      type: String,
      choices: MGMEReference.MYTHIC_PANELS,
      default: 'mgme_2e',
      onChange: (panelKey) => {
        game.modules.get('mythic-gme-tools').api.mgmeResetRuleDefaults(panelKey);
        game.modules.get('mythic-gme-tools').api.mgmeLaunchPanel()
      }
    });

    game.settings.register('mythic-gme-tools', 'panelPermission', {
      name: game.i18n.localize('MGME.SettingsPanelPermissionName'),
      hint: game.i18n.localize('MGME.SettingsPanelPermissionHint'),
      scope: 'world',
      config: true,
      type: String,
      choices: {
        'onlygm': game.i18n.localize('MGME.SettingsPanelGMsVal'),
        'players': game.i18n.localize('MGME.SettingsPanelPlayersVal')
      },
      default: 'onlygm',
      restricted: true,
      onChange: MGMECommon.DEBOUNCED_RELOAD
    });

    game.settings.register('mythic-gme-tools', 'autoInterrupt', {
      name: game.i18n.localize('MGME.SettingsAutoInterruptName'),
      hint: game.i18n.localize('MGME.SettingsAutoInterruptHint'),
      scope: 'world',
      config: true,
      type: Boolean,
      default: true
    });

    game.settings.register('mythic-gme-tools', 'mythicRollDebug', {
      name: game.i18n.localize('MGME.SettingsRollDebugName'),
      hint: game.i18n.localize('MGME.SettingsRollDebugHint'),
      scope: 'world',
      config: true,
      type: Boolean,
      default: false
    });

    game.settings.register('mythic-gme-tools', 'mythicRollPrivately', {
      name: game.i18n.localize('MGME.SettingsRollPrivatelyName'),
      hint: game.i18n.localize('MGME.SettingsRollPrivatelyHint'),
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

      game.settings.register('mythic-gme-tools', 'backstoryFocusTable', {
        name: game.i18n.localize('MGME.SettingsBackstoryFocusTableName'),
        hint: game.i18n.localize('MGME.SettingsBackstoryFocusTableHint'),
        scope: 'world',
        config: true,
        type: String,
        choices: tables,
        default: "Mythic GME: Backstory Focus"
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

  static resetDefaults() {
    game.settings.set('mythic-gme-tools', 'focusTable', game.settings.settings.get('mythic-gme-tools.focusTable').default);
    game.settings.set('mythic-gme-tools', 'actionTable', game.settings.settings.get('mythic-gme-tools.actionTable').default);
    game.settings.set('mythic-gme-tools', 'subjectTable', game.settings.settings.get('mythic-gme-tools.subjectTable').default);
    game.settings.set('mythic-gme-tools', 'minChaos', 1);
    game.settings.set('mythic-gme-tools', 'maxChaos', 9);
  }

  static resetDefaults2e() {
    game.settings.set('mythic-gme-tools', 'focusTable', 'Mythic GME: Event Focus (2e)');
    game.settings.set('mythic-gme-tools', 'actionTable', game.settings.settings.get('mythic-gme-tools.actionTable').default);
    game.settings.set('mythic-gme-tools', 'subjectTable', game.settings.settings.get('mythic-gme-tools.subjectTable').default);
    game.settings.set('mythic-gme-tools', 'minChaos', 1);
    game.settings.set('mythic-gme-tools', 'maxChaos', 9);
  }

  static async mgmeFateChart() {

    function generateOutput(question, odds, chaos, result) {
      const version = game.settings.get('mythic-gme-tools', 'panelKey');
      const chart = version !== 'mgme_2e' ?
        MGMEReference.FATE_CHART : MGMEReference.FATE_CHART_2E;
      const target = chart[odds][chaos];
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
      const oddsKey = version !== 'mgme_2e' ?
        MGMEReference.ODDS_MAP_CORE[odds] :
        MGMEReference.ODDS_MAP_2E[odds]['key'];
      return `
        ${question ? `<h2>${question} <em>(${game.i18n.localize(oddsKey)})</em></h2>` : `<h2><em>${game.i18n.localize(oddsKey)}</em></h2>`}
        ${debug ? `<div><b>Roll:</b> ${result} Chaos [${chaos}]</div>` : ''}
        <b style="color: ${color}">${outcome}</b>
      `
    }

    const version = game.settings.get('mythic-gme-tools', 'panelKey');
    const fateChartTemplate = version !== 'mgme_2e'  ?
      './modules/mythic-gme-tools/template/core-fatechart-dialog.hbs' :
      './modules/mythic-gme-tools/template/core-fatechart-2e-dialog.hbs';
    const fateChartDialog = await renderTemplate(fateChartTemplate, {chaosRankOptions: new Handlebars.SafeString(MGMECommon._mgmeGenerateChaosRankOptions())});

    let dialogue = new Dialog({
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
            const result = (await roll.evaluate()).total;
            let content = generateOutput(html.find("#mgme_question").val()?.trim(), odds, chaos, result);
            let doubles = false;
            if (result > 10) {
              const s = result.toString();
              const ignoreDoubles = game.settings.get("mythic-gme-tools", "doublesIgnoreChaos");
              if (((result === 100) || (s[0] === s[1])) && (ignoreDoubles || s[1] <= parseInt(chaos))) {
                content += `<div><b>${game.i18n.localize('MGME.Doubles')}</b></div>`
                doubles = true;
              }
            }
            roll.toMessage({
              flavor: game.i18n.localize('MGME.FateChartQuestion'),
              content: content,
              speaker: ChatMessage.getSpeaker()
            }, {rollMode: MGMECommon._mgmeGetRollMode()}).then(chat => MGMEChatJournal._mgmeLogChatToJournal(chat));
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

  static async mgmeFocusCheck() {
    await MGMEOracleUtils._mgmePrepareOracleQuestion(MGMEReference.PROPS_TEMPLATES.FOCUS_CHECK());
  }

  static async mgmeRandomEvent() {
    await MGMEOracleUtils._mgmePrepareOracleQuestion(MGMEReference.PROPS_TEMPLATES.EVENT_QUESTION());
  }

  static mgmeIncreaseChaos() {
    const currentChaos = game.settings.get('mythic-gme-tools', 'currentChaos');
    const maxChaos = game.settings.get('mythic-gme-tools', 'maxChaos');
    const whisper = MGMECommon._mgmeGetWhisperMode();
    if (currentChaos < maxChaos) {
      game.settings.set('mythic-gme-tools', 'currentChaos', currentChaos + 1);
      const chat = {
        flavor: game.i18n.localize('MGME.ChaosShift'),
        content: `<h3>${game.i18n.localize('MGME.ChaosIncreasedTo')} ${currentChaos + 1}</h3>`,
        whisper: whisper
      };
      $("#mgme_chaos").val(currentChaos + 1);
      $("#mgme_panel_cc").text(currentChaos + 1);
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
    const whisper = MGMECommon._mgmeGetWhisperMode();
    if (currentChaos > minChaos) {
      game.settings.set('mythic-gme-tools', 'currentChaos', currentChaos - 1);
      let chat = {
        flavor: game.i18n.localize('MGME.ChaosShift'),
        content: `<h3>${game.i18n.localize('MGME.ChaosDecreasedTo')} ${currentChaos - 1}</h3>`,
        whisper: whisper
      };
      $("#mgme_chaos").val(currentChaos - 1);
      $("#mgme_panel_cc").text(currentChaos - 1);
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
    const whisper = MGMECommon._mgmeGetWhisperMode();
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
            const result = (await roll.evaluate()).total;
            const debug = game.settings.get('mythic-gme-tools', 'mythicRollDebug');
            if (result <= chaos) {
              if (result % 2 === 0) {
                roll.toMessage({
                  flavor: game.i18n.localize('MGME.SceneAlterationCheck'),
                  content: `<b style="color: darkred">${game.i18n.localize("MGME.SceneInterrupted")}</b>${debug ? ' ('+result+')' : ''}`
                }, {rollMode: MGMECommon._mgmeGetRollMode()});
                if (game.settings.get('mythic-gme-tools', 'autoInterrupt')) {
                  if (game.dice3d)
                    Hooks.once('diceSoNiceRollComplete', () => MGMEOracleUtils._mgmePrepareOracleQuestion(MGMEReference.PROPS_TEMPLATES.INTERRUPTION_EVENT()))
                  else
                    await MGMEOracleUtils._mgmePrepareOracleQuestion(MGMEReference.PROPS_TEMPLATES.INTERRUPTION_EVENT());
                }
              } else {
                return roll.toMessage({
                  flavor: game.i18n.localize('MGME.SceneAlterationCheck'),
                  content: `<b style="color: darkred">${game.i18n.localize('MGME.SceneAltered')}</b>${debug ? ' ('+result+')' : ''}`
                }, {rollMode: MGMECommon._mgmeGetRollMode()}).then(chat => {MGMEChatJournal._mgmeLogChatToJournal(chat);return chat});
              }
            } else {
              return roll.toMessage({
                flavor: game.i18n.localize('MGME.SceneAlterationCheck'),
                content: `<b style="color: darkgreen">${game.i18n.localize('MGME.SceneNormal')}</b>${debug ? ' ('+result+')' : ''}`
              }, {rollMode: MGMECommon._mgmeGetRollMode()}).then(chat => {MGMEChatJournal._mgmeLogChatToJournal(chat);return chat});
            }
          }
        }
      },
      default: "submit"
    })

    dialogue.render(true)
  }

}