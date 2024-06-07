import MGMEReference from "../utils/mgme-reference";
import MGMECommon from "../utils/mgme-common";
import MGMEOracleUtils from "../utils/mgme-oracle-utils";
import MGMEChatJournal from "../utils/mgme-chat-journal";

export default class MGMEVariations2 {

  static initSettings() {
    game.settings.register('mythic-gme-tools', 'useD8ForSceneCheck', {
      name: game.i18n.localize('MGME.SettingsD8ForSceneCheckName'),
      hint: game.i18n.localize('MGME.SettingsD8ForSceneCheckHint'),
      scope: 'world',
      config: true,
      type: Boolean,
      default: false
    });
  }

  static resetDefaults() {
    game.settings.set('mythic-gme-tools', 'focusTable', game.settings.settings.get('mythic-gme-tools.focusTable').default);
    game.settings.set('mythic-gme-tools', 'actionTable', game.settings.settings.get('mythic-gme-tools.actionTable').default);
    game.settings.set('mythic-gme-tools', 'subjectTable', game.settings.settings.get('mythic-gme-tools.subjectTable').default);
    game.settings.set('mythic-gme-tools', 'descriptionsAdvTable', game.settings.settings.get('mythic-gme-tools.descriptionsAdvTable').default);
    game.settings.set('mythic-gme-tools', 'descriptionsAdjTable', game.settings.settings.get('mythic-gme-tools.descriptionsAdjTable').default);
    game.settings.set('mythic-gme-tools', 'minChaos', 3);
    game.settings.set('mythic-gme-tools', 'maxChaos', 6);
  }

  static _mgmeEnsureV2Chaos(windowTitle, macroCallback) {
    const isMinChaos = game.settings.get('mythic-gme-tools', 'minChaos') >= 3
    const isMaxChaos = game.settings.get('mythic-gme-tools', 'maxChaos') <= 6
    if (isMinChaos && isMaxChaos)
      return true
    else {
      let dialogue = new Dialog({
        title: windowTitle,
        content: `<div>${game.i18n.localize('MGME.DialogV2Conversion1')}</div>
                <br>
                <div><b>${game.i18n.localize('MGME.DialogV2Conversion2')}</b></div>
                <br>
                <div style="margin-bottom:5px;">${game.i18n.localize('MGME.DialogV2Conversion3')}</div>`,
        buttons: {
          submit: {
            icon: '',
            label: game.i18n.localize('MGME.DialogV2ConversionYes'),
            callback: async () => {
              await game.settings.set('mythic-gme-tools', 'minChaos', 3);
              await game.settings.set('mythic-gme-tools', 'maxChaos', 6);
              await game.settings.set('mythic-gme-tools', 'currentChaos', 4)
              macroCallback();
            }
          },
          cancel: {
            icon: '',
            label: game.i18n.localize('MGME.DialogV2ConversionNo')
          }
        },
        default: "submit"
      });
      dialogue.render(true);
      return false;
    }
  }

  static async mgmeStatisticCheck() {
    const statisticDialog = await renderTemplate('./modules/mythic-gme-tools/template/variations2-statisticscheck-dialog.hbs', {})
    const tokenName = canvas.tokens.controlled[0]?.name;
    let dialogue = new Dialog({
      title: game.i18n.localize('MGME.StatisticCheck'),
      content: statisticDialog,
      render: function (html) {
        // in the future we can consider saving the baselines?
        // const savedBaseline = game.user.getFlag('mythic-gme-tools', 'mgmeStatisticBaseline');
        if (tokenName)
          html.find("#mgme_statistic_target").val(tokenName);
        const entriesOpen = 3; // Configurable???
        const lastPersistedStats = game.user.getFlag('mythic-gme-tools', 'mgmeLastStatistics');
        let i = 1;
        while (i <= 5) {
          const lastPersistedName = lastPersistedStats ? (lastPersistedStats[i-1]?.statName ?? '') : '';
          const lastPersistedBaseline = lastPersistedStats ? (lastPersistedStats[i-1]?.statBaseline ?? '') : '';
          let cls = (i <= entriesOpen || lastPersistedName.length) ? '' : 'stat-hidden';
          html.find("#mgme_stats_container").append(
            `
            <div id="stats_${i}" class="${cls}">
              <input id="mgme_statistic_attribute_${i}" value="${lastPersistedName}" required style="margin-bottom:10px;width:198px;height:25px;" placeholder="Attribute #${i}"/>
              <input id="mgme_statistic_baseline_${i}" value="${lastPersistedBaseline}" placeholder="Baseline" style="width:60px" type="number">
              <select id="mgme_statistic_mod_${i}" style="width:110px;margin-bottom:10px;">
                <option value="-2">${game.i18n.localize('MGME.StatisticWeak')} (-2)</option>
                <option value="0" selected>${game.i18n.localize('MGME.StatisticNoMod')}</option>
                <option value="2">${game.i18n.localize('MGME.StatisticStrong')} (+2)</option>
                <option value="4">${game.i18n.localize('MGME.StatisticPrime')} (+4)</option>
              </select>
            </div>
            `
          )
          i += 1;
        }

        html[0].getElementsByTagName("input").mgme_statistic_attribute_1.focus();
      },
      buttons: {
        submit: {
          icon: '<i class="fas fa-comments"></i>',
          label: game.i18n.localize('MGME.ToChat'),
          callback: async (html) => {
            const attribute = html.find(`#mgme_statistic_attribute_1`).val()?.trim();
            if (!attribute)
              return;
            const whisper = MGMECommon._mgmeGetWhisperMode();
            const isImportant = html.find("#mgme_statistic_important").prop('checked');
            let statisticChat = {
              flavor: game.i18n.localize('MGME.StatisticCheck'),
              content: `
            ${tokenName ? `<h1>${tokenName}</h1>` : ''}
            <div><b style="color:darkred">${isImportant ? game.i18n.localize('MGME.Important') : ''}</b></div>
            `,
              whisper: whisper,
              speaker: ChatMessage.getSpeaker()
            };
            let i = 0;
            const persistedStats = [];
            while (i < 5) {
              i += 1;
              if (html.find(`#stats_${i}`).hasClass('stat-hidden'))
                continue
              const attribute = html.find(`#mgme_statistic_attribute_${i}`).val()?.trim();
              if (!attribute.length)
                continue;
              const baseline = parseInt(html.find(`#mgme_statistic_baseline_${i}`).val()?.trim());
              persistedStats.push({
                statName: attribute,
                statBaseline: baseline
              });
              const baselineValue = isNaN(baseline) ? 0 : baseline;
              const mod = MGMECommon._mgmeParseNumberFromText(html.find(`#mgme_statistic_mod_${i}`).val());
              const modText = html.find(`#mgme_statistic_mod_${i} option:selected`).text();
              const statTable = await MGMECommon._mgmeFindTableByName('Mythic GME: Statistic Check');
              const targetRoll = new Roll(`2d10 + ${mod} + ${isImportant ? 2 : 0}`);
              const statDraw = await statTable.draw({roll: targetRoll, displayChat: false});
              const statResult = statDraw.results[0].getChatText();
              await MGMEOracleUtils._mgmeSimulateRoll(statDraw.roll);
              // In most RPGs this stat calculation is probably off on the default table (+100%) - But leaving in case players override table
              const statMultiplier = (MGMECommon._mgmeParseNumberFromText(statResult)/100)+1;
              const statFinal = baselineValue * statMultiplier;
              statisticChat.content += `
              <div><h2>${attribute}</h2></div>
              ${isNaN(baseline) ? '' : `<div><b>${game.i18n.localize('MGME.StatisticBaseline')}:</b> ${baselineValue}</div>`}
              <div><b>${game.i18n.localize('MGME.StatisticReference')}:</b> ${modText}</div>
              <div><b>${game.i18n.localize('MGME.StatisticStatistic')}:</b> ${statResult}${statFinal === 0 ? '' : ` -> ${statFinal}`}</div>
            `
            }
            game.user.setFlag('mythic-gme-tools', 'mgmeLastStatistics', persistedStats)
            await MGMEChatJournal._mgmeCreateChatAndLog(statisticChat);
          }
        }
      },
      default: "submit"
    })
    dialogue.render(true)
  }

  static async _mgmeFillRefreshDisposition(html) {
    const selectedToken = canvas.tokens.controlled[0];
    const behavior = selectedToken?.actor.getFlag('mythic-gme-tools', 'mgmeBehavior') ?? (!selectedToken && game.user.getFlag('mythic-gme-tools', 'mgmeAnonymBehavior'));
    if (!behavior)
      return;
    const baseDisposition = behavior.dispositionValue -
      (behavior.identityActive ? behavior.identityMod : 0) -
      (behavior.personalityActive ? behavior.personalityMod : 0) -
      (behavior.activityActive ? behavior.activityMod : 0);
    await MGMEVariations2._mgmeFillRandomDisposition(html, baseDisposition);
  }

  static async _mgmeFillRandomDisposition(html, baseValue) {
    const element = $(html)
    let [mod1, mod2, mod3] = [
      element.find('#mgme_behavior_identity_active').prop('checked') ? element.find('#mgme_behavior_identity_mod').val()?.trim() : 0,
      element.find('#mgme_behavior_personality_active').prop('checked') ? element.find('#mgme_behavior_personality_mod').val()?.trim() : 0,
      element.find('#mgme_behavior_activity_active').prop('checked') ? element.find('#mgme_behavior_activity_mod').val()?.trim() : 0
    ];
    const dispositionTable = await MGMECommon._mgmeFindTableByName('Mythic GME: Behavior Check');
    const formula = `${baseValue ?? '2d10'} + ${mod1} + ${mod2} + ${mod3}`;
    const dispositionRoll = await new Roll(formula).roll({async:false});
    const dispositionTotal = dispositionRoll.total;
    const dispositionResult = (await dispositionTable.draw({roll: Roll.create(dispositionTotal.toString()), displayChat: false})).results[0].getChatText();
    const selectedToken = canvas.tokens.controlled[0];
    MGMEVariations2._mgmeCheckBehaviorRankShift(selectedToken?.name, element.find('#mgme_behavior_disposition').val(), dispositionResult);
    element.find('#mgme_behavior_disposition').val(dispositionResult);
    element.find('#mgme_behavior_disposition_value').val(dispositionTotal);
    MGMEVariations2._mgmeSaveActorBehaviorFromHTML(html);
  }

  static async _mgmeAdjustDisposition(mod, actor) {
    const selectedToken = actor ?? canvas.tokens.controlled[0];
    const tableDispositions = await MGMECommon._mgmeFindTableByName('Mythic GME: Behavior Check');
    const behavior = selectedToken?.actor.getFlag('mythic-gme-tools', 'mgmeBehavior') ?? (!selectedToken && game.user.getFlag('mythic-gme-tools', 'mgmeAnonymBehavior'));
    if (!behavior)
      return;
    behavior.dispositionValue += mod;
    const dispositionRankRoll = await tableDispositions.draw({roll: Roll.create(behavior.dispositionValue.toString()), displayChat: false});
    const newDispositionRank = dispositionRankRoll.results[0].getChatText();
    MGMEVariations2._mgmeCheckBehaviorRankShift(selectedToken?.name, behavior.dispositionRank, newDispositionRank);
    behavior.dispositionRank = newDispositionRank;
    MGMEVariations2._mgmeUpdateActorBehavior(selectedToken?.actor, behavior);
    return behavior;
  }


  static _mgmeUpdateActorBehavior(actor, behavior) {
    if (actor)
      actor.setFlag('mythic-gme-tools', 'mgmeBehavior', behavior)
    else
      game.user.setFlag('mythic-gme-tools', 'mgmeAnonymBehavior', behavior);
  }

  static _mgmeCheckBehaviorRankShift(actorName, oldRank, newRank) {
    if (oldRank && newRank && oldRank !== newRank) {
      const whisper = MGMECommon._mgmeGetWhisperMode();
      let chatBehavior = {
        flavor: game.i18n.localize('MGME.BehaviorDispositionShift'),
        content: `
              ${actorName ? `<div><b>${actorName}</b> - ` : ''}${game.i18n.localize('MGME.From')} <em>${oldRank}</em> ${game.i18n.localize('MGME.To')} <em>${newRank}</em></div>
              `,
        whisper: whisper
      };
      MGMEChatJournal._mgmeCreateChatAndLog(chatBehavior);
    }
  }

  static async _mgmeFillAdjustedDisposition(html, mod) {
    const newBehavior = await MGMEVariations2._mgmeAdjustDisposition(parseInt(mod));
    if (!newBehavior)
      return;
    $(html).find("#mgme_behavior_disposition").val(newBehavior.dispositionRank);
    $(html).find("#mgme_behavior_disposition_value").val(newBehavior.dispositionValue);
    MGMEVariations2._mgmeSaveActorBehaviorFromHTML(html);
  }

  static _mgmeSaveActorBehaviorFromHTML(html, actor) {
    const elem = $(html);
    const actorBehavior = {
      theme: elem.find("#mgme_behavior_theme").val()?.trim(),
      identity: elem.find("#mgme_behavior_identity").val()?.trim(),
      identityMod: parseInt(elem.find("#mgme_behavior_identity_mod").val()),
      identityActive: elem.find("#mgme_behavior_identity_active").prop('checked'),
      personality: elem.find("#mgme_behavior_personality").val()?.trim(),
      personalityMod: parseInt(elem.find("#mgme_behavior_personality_mod").val()),
      personalityActive: elem.find("#mgme_behavior_personality_active").prop('checked'),
      activity: elem.find("#mgme_behavior_activity").val()?.trim(),
      activityMod: parseInt(elem.find("#mgme_behavior_activity_mod").val()),
      activityActive: elem.find("#mgme_behavior_activity_active").prop('checked'),
      dispositionRank: elem.find("#mgme_behavior_disposition").val()?.trim(),
      dispositionValue: parseInt(elem.find("#mgme_behavior_disposition_value").val()),
    };
    const target = actor ?? canvas.tokens.controlled[0]?.actor;
    MGMEVariations2._mgmeUpdateActorBehavior(target, actorBehavior);
    return actorBehavior;
  }

  static async _mgmeFillRandomBehavior(elementId) {
    const props = MGMEReference.PROPS_TEMPLATES.DESCRIPTION_QUESTION();
    const descriptors = await MGMEOracleUtils._mgmeGetOracleAnswers(
      game.i18n.localize('MGME.BehaviorPersonality'),
      props.tableSetting1,
      props.tableSetting2
    )
    $(elementId).val(`${descriptors.descriptor1Result} ${descriptors.descriptor2Result}`);
  }

  static async _mgmeFillRandomActivity(elementId) {
    const props = MGMEReference.PROPS_TEMPLATES.ACTION_QUESTION();
    const descriptors = await MGMEOracleUtils._mgmeGetOracleAnswers(
      game.i18n.localize('MGME.BehaviorActivity'),
      props.tableSetting1,
      props.tableSetting2
    )
    $(elementId).val(`${descriptors.descriptor1Result} ${descriptors.descriptor2Result}`);
  }

  static async _mgmeBehaviorAction(actor, behavior) {
    if (!behavior?.dispositionRank)
      return;
    const dispositionMod = MGMECommon._mgmeParseNumberFromText(behavior.dispositionRank);
    const tableOne = await MGMECommon._mgmeFindTableByName('Mythic GME: NPC Action 1');
    const tableOneDraw = await tableOne.draw({displayChat: false});
    const tableOneResult = tableOneDraw.results[0].getChatText();
    await MGMEOracleUtils._mgmeSimulateRoll(tableOneDraw.roll);
    const tableOneMod = MGMECommon._mgmeParseNumberFromText(tableOneResult);
    const whisper = MGMECommon._mgmeGetWhisperMode();
    const debug = game.settings.get('mythic-gme-tools', 'mythicRollDebug');
    // This is tricky, NPC action does NOT shift disposition - 8 or more hardcoded to be an NPC Action
    if (tableOneDraw.roll.total >= 8) { // ToDo: Test Me!!!
      const tableTwo = await MGMECommon._mgmeFindTableByName('Mythic GME: NPC Action 2');
      const tableTwoDraw = await tableTwo.draw({roll: new Roll(`2d10 + ${dispositionMod} + ${tableOneMod}`), displayChat: false});
      const tableTwoResult = tableTwoDraw.results[0].getChatText();
      await MGMEOracleUtils._mgmeSimulateRoll(tableTwoDraw.roll);
      const messageContent = `
        ${actor ? `<div><h1>${actor.name}</h1></div>` : ''}
        ${behavior.theme ? `<div><b>${game.i18n.localize('MGME.Theme')}:</b> ${behavior.theme}` : '-'}</div>
        <div><b>${game.i18n.localize('MGME.Identity')}:</b> ${behavior.identity ? behavior.identity : '-'} ${behavior.identityActive ? (behavior.identityMod > 0 ? '(+2)' : (behavior.identityMod === 0 ? '(+0)' : '(-2)')) : `(${game.i18n.localize('MGME.Inactive')})`}</div>
        <div><b>${game.i18n.localize('MGME.Personality')}:</b> ${behavior.personality ? behavior.personality : '-'} ${behavior.personalityActive ? (behavior.personalityMod > 0 ? '(+2)' : (behavior.personalityMod === 0 ? '(+0)' : '(-2)')) : `(${game.i18n.localize('MGME.Inactive')})`}</div>
        <div><b>${game.i18n.localize('MGME.Activity')}:</b> ${behavior.activity ? behavior.activity : '-'} ${behavior.activityActive ? (behavior.activityMod > 0 ? '(+2)' : (behavior.activityMod === 0 ? '(+0)' : '(-2)')) : `(${game.i18n.localize('MGME.Inactive')})`}</div>
        <div><b>${game.i18n.localize('MGME.Disposition')}:</b> ${behavior.dispositionRank ? behavior.dispositionRank : '-'}${debug ? ' [' + behavior.dispositionValue + ']' : ''}</div>
        <br>
        <div>${game.i18n.localize('MGME.BehaviorWithDisposition')}: ${behavior.dispositionRank}</div>
        <div>${game.i18n.localize('MGME.PerformsUnexpected')}: <b>${tableOneResult}</b></div>
        <div><b>${tableTwoResult}</b></div>
      `
      await MGMEChatJournal._mgmeCreateChatAndLog({flavor: game.i18n.localize('MGME.BehaviorUnexpected'), content: messageContent, whisper: whisper, speaker: ChatMessage.getSpeaker()});
    } else {
      await MGMEVariations2._mgmeAdjustDisposition(tableOneMod, actor);
      const messageContent = `
        ${actor ? `<div><h1>${actor.name}</h1></div>` : ''}
        ${behavior.theme ? `<div><b>${game.i18n.localize('MGME.Theme')}:</b> ${behavior.theme}` : '-'}</div>
        <div><b>${game.i18n.localize('MGME.Identity')}:</b> ${behavior.identity ? behavior.identity : '-'} ${behavior.identityActive ? (behavior.identityMod > 0 ? '(+2)' : (behavior.identityMod === 0 ? '(+0)' : '(-2)')) : `(${game.i18n.localize('MGME.Inactive')})`}</div>
        <div><b>${game.i18n.localize('MGME.Personality')}:</b> ${behavior.personality ? behavior.personality : '-'} ${behavior.personalityActive ? (behavior.personalityMod > 0 ? '(+2)' : (behavior.personalityMod === 0 ? '(+0)' : '(-2)')) : `(${game.i18n.localize('MGME.Inactive')})`}</div>
        <div><b>${game.i18n.localize('MGME.Activity')}:</b> ${behavior.activity ? behavior.activity : '-'} ${behavior.activityActive ? (behavior.activityMod > 0 ? '(+2)' : (behavior.activityMod === 0 ? '(+0)' : '(-2)')) : `(${game.i18n.localize('MGME.Inactive')})`}</div>
        <div><b>${game.i18n.localize('MGME.Disposition')}:</b> ${behavior.dispositionRank ? behavior.dispositionRank : '-'}${debug ? ' [' + behavior.dispositionValue + ']' : ''}</div>
        <br>
        <div>${game.i18n.localize('MGME.BehaviorWithDisposition')}: ${behavior.dispositionRank}</div>
        <div>${tableOneMod !== 0 ? `<b>Disposition Shift</b>: ${tableOneMod}` : game.i18n.localize('MGME.BehaviorNoChange')}</div>
        <div>${game.i18n.localize('MGME.PerformsExpected')} <b>${tableOneResult}</b></div>
      `
      await MGMEChatJournal._mgmeCreateChatAndLog({flavor: game.i18n.localize('MGME.BehaviorExpected'), content: messageContent, whisper: whisper, speaker: ChatMessage.getSpeaker()});
    }
  }

  static async mgmeFateCheck() {
    if (!MGMEVariations2._mgmeEnsureV2Chaos(game.i18n.localize('MGME.FateCheck'), MGMEVariations2.mgmeFateCheck))
      return;
    const currentChaosFactor = game.settings.get('mythic-gme-tools', 'currentChaos')
    const fateCheckDialog = await renderTemplate('./modules/mythic-gme-tools/template/variations2-fatecheck-dialog.hbs', {})

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
        outcome = game.i18n.localize('MGME.Yes');
        color = 'green';
      } else {
        outcome = game.i18n.localize('MGME.No');
        color = 'red';
      }
      if (chaosDie <= chaosFactor) {
        if (fateDice1 === fateDice2) { // both are the same - Exceptional + Random Event
          randomEvent = true;
          outcome = `${game.i18n.localize('MGME.Exceptional')} ${outcome} ${game.i18n.localize('MGME.WithRandomEvent')}`;
          if (checkYes)
            color = 'blueviolet';
          else
            color = 'orangered';
        } else if (fateDice1 % 2 === 0 && fateDice2 % 2 === 0) { // both are even - Random Event
          randomEvent = true;
          outcome = `${outcome} ${game.i18n.localize('MGME.WithRandomEvent')}`
          if (checkYes)
            color = 'lightseagreen';
          else
            color = 'darkred';
        } else if (fateDice1 % 2 !== 0 && fateDice2 % 2 !== 0) { // both are odd - Exceptional
          outcome = `${game.i18n.localize('MGME.Exceptional')}  ${outcome}`;
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
      title: game.i18n.localize('MGME.FateCheck'),
      content: fateCheckDialog,
      render: html => {
        html.find("#mgme_chaos").val(currentChaosFactor.toString()); // ToDo: test this
        html[0].getElementsByTagName("input").mgme_v2_question.focus();
      },
      buttons: {
        submit: {
          icon: '<i class="fas fa-comments"></i>',
          label: game.i18n.localize('MGME.ToChat'),
          callback: async (html) => {
            const odds = html.find("#mgme_v2_odds").val();
            const chaosFactor = html.find("#mgme_chaos").val();
            const yesFavorable = html.find("#mgme_v2_yesfav").prop('checked');
            const roll = await Roll.create('2d10 + 1d10[cold]').roll();
            const fateResult = roll.terms[0].total;
            const fateLeft = roll.terms[0].results[0].result;
            const fateRight = roll.terms[0].results[1].result;
            const chaosResult = roll.terms[2].total;
            const oddsProps = MGMEReference.ODDS_MAP_VARS2[odds];
            let output = generateOutput(oddsProps.mod, chaosFactor, yesFavorable, fateResult, fateLeft, fateRight, chaosResult);
            const debug = game.settings.get('mythic-gme-tools', 'mythicRollDebug');
            const content = `
              ${html.find("#mgme_v2_question").val()?.trim() ? `<h2>${html.find("#mgme_v2_question").val()?.trim()} <em>(${game.i18n.localize(oddsProps.key)})</em></h2>` : `<h2><em>${game.i18n.localize(oddsProps.key)}</em></h2>`}
              ${debug ? `<div><b>Roll:</b> ${fateLeft}+${fateRight} (${chaosResult}) with Chaos[${chaosFactor}]</div>` : ''}
              <b style="color: ${output.outcomeColor}">${output.outcomeText}</b>
            `;
            roll.toMessage({
              flavor: game.i18n.localize('MGME.FateCheckQuestion'),
              content: content,
              speaker: ChatMessage.getSpeaker()
            }, {rollMode: MGMECommon._mgmeGetRollMode()}).then(chat => MGMEChatJournal._mgmeLogChatToJournal(chat));
            if (output.randomEvent) {
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

  static async mgmeEventCheck() {
    await MGMEOracleUtils._mgmePrepareOracleQuestion(MGMEReference.PROPS_TEMPLATES.EVENT_CHECK());
  }

  static async mgmeDetailDescriptionCheck() {
    await MGMEOracleUtils._mgmePrepareOracleQuestion(MGMEReference.PROPS_TEMPLATES.DESCRIPTION_QUESTION());
  }

  static async mgmeDetailActionCheck() {
    await MGMEOracleUtils._mgmePrepareOracleQuestion(MGMEReference.PROPS_TEMPLATES.ACTION_QUESTION());
  }

  static async mgmeBehaviorCheck() {
    const selectedToken = canvas.tokens.controlled[0];

    const behaviorCheckDialog = await renderTemplate('./modules/mythic-gme-tools/template/variations2-behaviorcheck-dialog.hbs', {tokenName: selectedToken?.name ?? game.i18n.localize('MGME.WarnNoTokenSelected')})

    let dialogue = new Dialog({
      title: game.i18n.localize('MGME.BehaviorCheck'),
      content: behaviorCheckDialog,
      render: html => {
        const tokenBehavior = selectedToken?.actor.getFlag('mythic-gme-tools', 'mgmeBehavior') ?? (!selectedToken && game.user.getFlag('mythic-gme-tools', 'mgmeAnonymBehavior'));
        if (tokenBehavior) {
          html.find("#mgme_behavior_theme").val(tokenBehavior.theme);
          html.find("#mgme_behavior_identity").val(tokenBehavior.identity);
          html.find("#mgme_behavior_identity_mod").val(tokenBehavior.identityMod);
          html.find("#mgme_behavior_identity_active").prop('checked', tokenBehavior.identityActive);
          html.find("#mgme_behavior_personality").val(tokenBehavior.personality);
          html.find("#mgme_behavior_personality_mod").val(tokenBehavior.personalityMod);
          html.find("#mgme_behavior_personality_active").prop('checked', tokenBehavior.personalityActive);
          html.find("#mgme_behavior_activity").val(tokenBehavior.activity);
          html.find("#mgme_behavior_activity_mod").val(tokenBehavior.activityMod);
          html.find("#mgme_behavior_activity_active").prop('checked', tokenBehavior.activityActive);
          html.find("#mgme_behavior_disposition").val(tokenBehavior.dispositionRank)
          html.find("#mgme_behavior_disposition_value").val(tokenBehavior.dispositionValue)
        }
        html.find(".mgme_change_save").change(() => MGMEVariations2._mgmeSaveActorBehaviorFromHTML(html));
        html.find(".mgme_change_refresh").change(() => MGMEVariations2._mgmeFillRefreshDisposition(html));

        html.find("#mgme_behavior_rng").click(() => MGMEVariations2._mgmeFillRandomBehavior("#mgme_behavior_personality"));
        html.find("#mgme_activity_rng").click(() => MGMEVariations2._mgmeFillRandomActivity("#mgme_behavior_activity"));

        html.find("#mgme_disposition_rng").click(() => MGMEVariations2._mgmeFillRandomDisposition(html));
        html.find("#mgme_disposition_up").click(() => MGMEVariations2._mgmeFillAdjustedDisposition(html, 2));
        html.find("#mgme_disposition_down").click(() => MGMEVariations2._mgmeFillAdjustedDisposition(html, -2));
      },
      buttons: {
        rollAction: {
          icon: '<i class="fas fa-fist-raised"></i>',
          label: `${game.i18n.localize('MGME.Action')}!`,
          callback: async (html) => {
            if (!html.find("#mgme_behavior_disposition").val()?.trim())
              await MGMEVariations2._mgmeFillRandomDisposition(html);
            const actorBehavior = MGMEVariations2._mgmeSaveActorBehaviorFromHTML(html, selectedToken?.actor);
            await MGMEVariations2._mgmeBehaviorAction(selectedToken, actorBehavior);
          }
        },
        sendChat: {
          icon: '<i class="fas fa-comments"></i>',
          label: game.i18n.localize('MGME.ToChat'),
          callback: async (html) => {
            if (!html.find("#mgme_behavior_disposition").val()?.trim())
              await MGMEVariations2._mgmeFillRandomDisposition(html);
            const actorBehavior = MGMEVariations2._mgmeSaveActorBehaviorFromHTML(html, selectedToken?.actor);
            const whisper = MGMECommon._mgmeGetWhisperMode();
            const debug = game.settings.get('mythic-gme-tools', 'mythicRollDebug');
            let chatBehavior = {
              flavor: game.i18n.localize('MGME.BehaviorCheck'),
              content: `
            ${selectedToken ? `<div><h1>${selectedToken.name}</h1></div>` : ''}
            ${actorBehavior.theme ? `<div><b>${game.i18n.localize('MGME.Theme')}:</b> ${actorBehavior.theme}` : '-'}</div>
            <div><b>${game.i18n.localize('MGME.Identity')}:</b> ${actorBehavior.identity ? actorBehavior.identity : '-'} ${actorBehavior.identityActive ? (actorBehavior.identityMod > 0 ? '(+2)' : (actorBehavior.identityMod === 0 ? '(+0)' : '(-2)')) : `(${game.i18n.localize('MGME.Inactive')})`}</div>
            <div><b>${game.i18n.localize('MGME.Personality')}:</b> ${actorBehavior.personality ? actorBehavior.personality : '-'} ${actorBehavior.personalityActive ? (actorBehavior.personalityMod > 0 ? '(+2)' : (actorBehavior.personalityMod === 0 ? '(+0)' : '(-2)')) : `(${game.i18n.localize('MGME.Inactive')})`}</div>
            <div><b>${game.i18n.localize('MGME.Activity')}:</b> ${actorBehavior.activity ? actorBehavior.activity : '-'} ${actorBehavior.activityActive ? (actorBehavior.activityMod > 0 ? '(+2)' : (actorBehavior.activityMod === 0 ? '(+0)' : '(-2)')) : `(${game.i18n.localize('MGME.Inactive')})`}</div>
            <div><b>${game.i18n.localize('MGME.Disposition')}:</b> ${actorBehavior.dispositionRank ? actorBehavior.dispositionRank : '-'}${debug ? ' [' + actorBehavior.dispositionValue + ']' : ''}</div>
            `,
              whisper: whisper
            };
            await MGMEChatJournal._mgmeCreateChatAndLog(chatBehavior);
          }
        }
      },
      default: "sendChat"
    })

    dialogue.render(true)
  }

  static async mgmeDetailCheck() {
    if (!MGMEVariations2._mgmeEnsureV2Chaos(game.i18n.localize('MGME.DetailCheck'), MGMEVariations2.mgmeDetailCheck))
      return;

    const detailQuestionDialog = await renderTemplate('./modules/mythic-gme-tools/template/variations2-detailcheck-dialog.hbs', {});

    let dialogue = new Dialog({
      title: game.i18n.localize('MGME.DetailCheck'),
      content: detailQuestionDialog,
      render: html => html[0].getElementsByTagName("input").mgme_v2_detail_check.focus(),
      buttons: {
        submit: {
          icon: '<i class="fas fa-comments"></i>',
          label: game.i18n.localize('MGME.ToChat'),
          callback: async (html) => {
            const speaker = ChatMessage.getSpeaker();
            const whisper = MGMECommon._mgmeGetWhisperMode();
            const currentChaos = game.settings.get('mythic-gme-tools', 'currentChaos');
            const detailCheckTable = await MGMECommon._mgmeFindTableByName('Mythic GME: Detail Check');
            const detailCheckRoll = new Roll(`2d10 + ${currentChaos === 3 ? 2 : 0} + ${currentChaos === 6 ? -2 : 0}`);
            const detailCheckResult = (await detailCheckTable.draw({roll: detailCheckRoll, displayChat: false})).results[0].getChatText();
            const includeDescription = html.find("#mgme_v2_include_desc_detail").prop('checked');
            const includeAction = html.find("#mgme_v2_include_act_detail").prop('checked');
            let content = html.find("#mgme_v2_detail_check").val() === '' ? '' : `<h1>${html.find("#mgme_v2_detail_check").val()}</h1>`
            if (!includeDescription && !includeAction)
              content += `<div><h2>${detailCheckResult}</h2></div>`;
            let chatConfig = {
              flavor: game.i18n.localize('MGME.DetailCheck') + (includeAction ? ` (${game.i18n.localize('MGME.Action')})` : '') + (includeDescription ? ` (${game.i18n.localize('MGME.Description')})` : ''),
              content: content,
              speaker: speaker,
              whisper: whisper
            };
            let baseDetailChat;
            if (includeDescription || includeAction)
              // NOTE: Do not log to journal YET (because it needs to be enhanced first)
              baseDetailChat = await ChatMessage.create(chatConfig);
            else
              baseDetailChat = await MGMEChatJournal._mgmeCreateChatAndLog(chatConfig);
            if (includeDescription) {
              await MGMEOracleUtils._mgmePrepareOracleQuestion({
                purpose: '<h2>Description Detail Check</h2>',
                focusValue: detailCheckResult,
                tableSetting1: 'descriptionsAdvTable',
                tableSetting2: 'descriptionsAdjTable'
              }, baseDetailChat);
            }
            if (includeAction) {
              await MGMEOracleUtils._mgmePrepareOracleQuestion({
                purpose: '<h2>Action Detail Check</h2>',
                focusValue: detailCheckResult,
                tableSetting1: 'actionTable',
                tableSetting2: 'subjectTable'
              }, baseDetailChat);
            }
          }
        }
      },
      default: "submit"
    })

    dialogue.render(true)
  }

}