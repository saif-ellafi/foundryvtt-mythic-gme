import MGMEReference from "./utils/mgme-reference";
import MGMECommon from "./utils/mgme-common";
import MGMEOracleUtils from "./utils/mgme-oracle-utils";
import MGMEChatJournal from "./utils/mgme-chat-journal";

export default class MGMEVariations2 {

  static initSettings() {
    game.settings.register('mythic-gme-tools', 'useD8ForSceneCheck', {
      name: 'Use D8 for Scene Alteration checks',
      hint: 'A special rule for Variations #2 changing scene alteration probabilities',
      scope: 'world',
      config: true,
      type: Boolean,
      default: false
    });
  }

  static mgeFateCheck() {
    if (!MGMEVariations2._mgeEnsureV2Chaos('Fate Check', MGMEVariations2.mgeFateCheck))
      return;
    const currentChaosFactor = game.settings.get('mythic-gme-tools', 'currentChaos')
    const fateCheckDialog = renderTemplate('templates/variations2-fatecheck.hbs', {})

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
        } else if (fateDice1 % 2 === 0 && fateDice2 % 2 === 0) { // both are even - Random Event
          randomEvent = true;
          outcome = outcome + ' With Random Event'
          if (checkYes)
            color = 'lightseagreen';
          else
            color = 'darkred';
        } else if (fateDice1 % 2 !== 0 && fateDice2 % 2 !== 0) { // both are odd - Exceptional
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
      title: `Fate Check`,
      content: fateCheckDialog,
      render: html => {
        html.find("#mgme_chaos").val(currentChaosFactor.toString()); // ToDo: test this
        html[0].getElementsByTagName("input").mgme_v2_question.focus();
      },
      buttons: {
        submit: {
          icon: '<i class="fas fa-comments"></i>',
          label: 'To Chat',
          callback: async (html) => {
            const odds = html.find("#mgme_v2_odds").val();
            const chaosFactor = html.find("#mgme_chaos").val();
            const yesFavorable = html.find("#mgme_v2_yesfav").prop('checked');
            const roll = Roll.create('2d10 + 1d10[cold]').roll({async: false});
            const fateResult = roll.terms[0].total;
            const fateLeft = roll.terms[0].results[0].result;
            const fateRight = roll.terms[0].results[1].result;
            const chaosResult = roll.terms[2].total;
            let output = generateOutput(MGMEReference.VARIATIONS2_ODDS_MAP[odds].mod, chaosFactor, yesFavorable, fateResult, fateLeft, fateRight, chaosResult);
            const debug = game.settings.get('mythic-gme-tools', 'mythicRollDebug');
            const content = `
              ${html.find("#mgme_v2_question").val() ? `<h2>${html.find("#mgme_v2_question").val()}</h2>` : ''}
              ${debug ? `<div><b>Roll:</b> ${fateLeft}+${fateRight} (${chaosResult}) at <em>${MGMEReference.VARIATIONS2_ODDS_MAP[odds].label}</em> with Chaos[${chaosFactor}]</div>` : ''}
              <b style="color: ${output.outcomeColor}">${output.outcomeText}</b>
            `;
            roll.toMessage({
              flavor: "Fate Check Question",
              content: content,
              speaker: ChatMessage.getSpeaker()
            }).then(chat => MGMEChatJournal._mgeLogChatToJournal(chat));
            if (output.randomEvent) {
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

  static async mgeEventCheck() {
    await MGMEOracleUtils._mgePrepareOracleQuestion(MGMEReference.MGE_PROPS_TEMPLATES.EVENT_CHECK);
  }

  static async mgeDetailDescriptionCheck() {
    await MGMEOracleUtils._mgePrepareOracleQuestion(MGMEReference.MGE_PROPS_TEMPLATES.DESCRIPTION_QUESTION);
  }

  static async mgeDetailActionCheck() {
    await MGMEOracleUtils._mgePrepareOracleQuestion(MGMEReference.MGE_PROPS_TEMPLATES.ACTION_QUESTION);
  }

  static _mgeEnsureV2Chaos(windowTitle, macroCallback) {
    const isMinChaos = game.settings.get('mythic-gme-tools', 'minChaos') >= 3
    const isMaxChaos = game.settings.get('mythic-gme-tools', 'maxChaos') <= 6
    if (isMinChaos && isMaxChaos)
      return true
    else {
      let dialogue = new Dialog({
        title: windowTitle,
        content: `<div>This rule is based on Mythic Variations #2 Chaos Factor rules and needs Chaos Range settings between <b>3</b> and <b>6</b>.</div>
                <br>
                <div><b>Would you like me to change these settings for you?</b></div>
                <br>
                <div style="margin-bottom:5px;">Note: This can be configured in Module Settings.</div>`,
        buttons: {
          submit: {
            icon: '',
            label: 'Yes, Please',
            callback: async () => {
              await game.settings.set('mythic-gme-tools', 'minChaos', 3);
              await game.settings.set('mythic-gme-tools', 'maxChaos', 6);
              await game.settings.set('mythic-gme-tools', 'currentChaos', 4)
              macroCallback();
            }
          },
          cancel: {
            icon: '',
            label: 'No, Thanks'
          }
        },
        default: "submit"
      });
      dialogue.render(true);
      return false;
    }
  }

  static mgeStatisticCheck() {

    const statisticDialog = renderTemplate('templates/variations2-statisticscheck-dialog.hbs', {})
    const tokenName = canvas.tokens.controlled[0]?.name;
    let dialogue = new Dialog({
      title: 'Statistic Check',
      content: statisticDialog,
      render: function (html) {
        // in the future we can consider saving the baselines?
        // const savedBaseline = game.user.getFlag('mythic-gme-tools', 'mgeStatisticBaseline');
        if (tokenName)
          html.find("#mgme_statistic_target").val(tokenName);
        const entriesOpen = 3; // Configurable???
        const lastPersistedStats = game.user.getFlag('mythic-gme-tools', 'mgeLastStatistics');
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
                <option value="-2">Weak (-2)</option>
                <option value="0" selected>No Modifier</option>
                <option value="2">Strong (+2)</option>
                <option value="4">Prime (+4)</option>
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
          label: 'To Chat',
          callback: async (html) => {
            const attribute = html.find(`#mgme_statistic_attribute_1`).val();
            if (!attribute)
              return;
            const whisper = ui.chat.getData().rollMode !== 'roll' ? [game.user] : undefined;
            const isImportant = html.find("#mgme_statistic_important").prop('checked');
            let statisticChat = {
              flavor: 'Statistic Check',
              content: `
            ${tokenName ? `<h1>${tokenName}</h1>` : ''}
            <div><b style="color:darkred">${isImportant ? 'IMPORTANT' : ''}</b></div>
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
              const attribute = html.find(`#mgme_statistic_attribute_${i}`).val();
              if (!attribute.length)
                continue;
              const baseline = parseInt(html.find(`#mgme_statistic_baseline_${i}`).val());
              persistedStats.push({
                statName: attribute,
                statBaseline: baseline
              });
              const baselineValue = isNaN(baseline) ? 0 : baseline;
              const mod = MGMECommon._mgeParseNumberFromText(html.find(`#mgme_statistic_mod_${i}`).val());
              const modText = html.find(`#mgme_statistic_mod_${i} option:selected`).text();
              const statTable = await MGMECommon._mgeFindTableByName('Mythic GME: Statistic Check');
              const targetRoll = new Roll(`2d10 + ${mod} + ${isImportant ? 2 : 0}`);
              const statDraw = await statTable.draw({roll: targetRoll, displayChat: false});
              const statResult = statDraw.results[0].getChatText();
              await MGMEOracleUtils._mgeSimulateRoll(statDraw.roll);
              // In most RPGs this stat calculation is probably off on the default table (+100%) - But leaving in case players override table
              const statMultiplier = (MGMECommon._mgeParseNumberFromText(statResult)/100)+1;
              const statFinal = baselineValue * statMultiplier;
              statisticChat.content += `
              <div><h2>${attribute}</h2></div>
              ${isNaN(baseline) ? '' : `<div><b>Baseline:</b> ${baselineValue}</div>`}
              <div><b>Reference:</b> ${modText}</div>
              <div><b>Statistic:</b> ${statResult}${statFinal === 0 ? '' : ` -> ${statFinal}`}</div>
            `
            }
            game.user.setFlag('mythic-gme-tools', 'mgeLastStatistics', persistedStats)
            await MGMEChatJournal._mgeCreateChatAndLog(statisticChat);
          }
        }
      },
      default: "submit"
    })
    dialogue.render(true)
  }

}

async function _mgeFillRefreshDisposition(html) {
  const selectedToken = canvas.tokens.controlled[0];
  if (!selectedToken) {
    ui.notifications.warn("No Token selected!");
    return;
  }
  const behavior = selectedToken.actor.getFlag('mythic-gme-tools', 'mgeBehavior');
  if (!behavior)
    return;
  const baseDisposition = behavior.dispositionValue -
    (behavior.identityActive ? behavior.identityMod : 0) -
    (behavior.personalityActive ? behavior.personalityMod : 0) -
    (behavior.activityActive ? behavior.activityMod : 0);
  await _mgeFillRandomDisposition(html, baseDisposition);
  _mgeSaveActorBehaviorFromHTML(html)
}

async function _mgeFillRandomDisposition(html, baseValue) {
  const selectedToken = canvas.tokens.controlled[0];
  if (!selectedToken)
    return;
  const element = $(html)
  let [mod1, mod2, mod3] = [
    element.find('#mgme_behavior_identity_active').prop('checked') ? element.find('#mgme_behavior_identity_mod').val() : 0,
    element.find('#mgme_behavior_personality_active').prop('checked') ? element.find('#mgme_behavior_personality_mod').val() : 0,
    element.find('#mgme_behavior_activity_active').prop('checked') ? element.find('#mgme_behavior_activity_mod').val() : 0
  ];
  const dispositionTable = await MGMECommon._mgeFindTableByName('Mythic GME: Behavior Check');
  const formula = `${baseValue ?? '2d10'} + ${mod1} + ${mod2} + ${mod3}`;
  const dispositionRoll = await new Roll(formula).roll({async:false});
  const dispositionTotal = dispositionRoll.total;
  const dispositionResult = (await dispositionTable.draw({roll: Roll.create(dispositionTotal.toString()), displayChat: false})).results[0].getChatText();
  _mgeCheckBehaviorRankShift(selectedToken.name, element.find('#mgme_behavior_disposition').val(), dispositionResult);
  element.find('#mgme_behavior_disposition').val(dispositionResult);
  element.find('#mgme_behavior_disposition_value').val(dispositionTotal);
  _mgeSaveActorBehaviorFromHTML(html);
}

async function _mgeAdjustDisposition(mod, actor) {
  const selectedToken = actor ?? canvas.tokens.controlled[0];
  if (!selectedToken) {
    ui.notifications.warn("Mythic GME: No tokens selected!");
    return;
  }
  const tableDispositions = await MGMECommon._mgeFindTableByName('Mythic GME: Behavior Check');
  const behavior = selectedToken.actor.getFlag('mythic-gme-tools', 'mgeBehavior');
  if (!behavior)
    return;
  behavior.dispositionValue += mod;
  const dispositionRankRoll = await tableDispositions.draw({roll: Roll.create(behavior.dispositionValue.toString()), displayChat: false});
  const newDispositionRank = dispositionRankRoll.results[0].getChatText();
  _mgeCheckBehaviorRankShift(selectedToken.name, behavior.dispositionRank, newDispositionRank);
  behavior.dispositionRank = newDispositionRank;
  _mgeUpdateActorBehavior(selectedToken.actor, behavior);
  return behavior;
}


function _mgeUpdateActorBehavior(actor, behavior) {
  actor.setFlag('mythic-gme-tools', 'mgeBehavior', behavior)
}

function _mgeCheckBehaviorRankShift(actorName, oldRank, newRank) {
  if (oldRank && newRank && oldRank !== newRank) {
    const whisper = ui.chat.getData().rollMode !== 'roll' ? [game.user] : undefined;
    let chatBehavior = {
      content: `
              <div><h2>Disposition Shift!</h2></div>
              <div><b>${actorName}</b> shifted from <em>${oldRank}</em> to <em>${newRank}</em></div>
              `,
      whisper: whisper
    };
    MGMEChatJournal._mgeCreateChatAndLog(chatBehavior);
  }
}

async function _mgeFillAdjustedDisposition(html, mod) {
  const newBehavior = await _mgeAdjustDisposition(parseInt(mod));
  if (!newBehavior)
    return;
  $(html).find("#mgme_behavior_disposition").val(newBehavior.dispositionRank);
  $(html).find("#mgme_behavior_disposition_value").val(newBehavior.dispositionValue);
  _mgeSaveActorBehaviorFromHTML(html);
}

function _mgeSaveActorBehaviorFromHTML(html, actor) {
  const elem = $(html);
  const actorBehavior = {
    theme: elem.find("#mgme_behavior_theme").val(),
    identity: elem.find("#mgme_behavior_identity").val(),
    identityMod: parseInt(elem.find("#mgme_behavior_identity_mod").val()),
    identityActive: elem.find("#mgme_behavior_identity_active").prop('checked'),
    personality: elem.find("#mgme_behavior_personality").val(),
    personalityMod: parseInt(elem.find("#mgme_behavior_personality_mod").val()),
    personalityActive: elem.find("#mgme_behavior_personality_active").prop('checked'),
    activity: elem.find("#mgme_behavior_activity").val(),
    activityMod: parseInt(elem.find("#mgme_behavior_activity_mod").val()),
    activityActive: elem.find("#mgme_behavior_activity_active").prop('checked'),
    dispositionRank: elem.find("#mgme_behavior_disposition").val(),
    dispositionValue: parseInt(elem.find("#mgme_behavior_disposition_value").val()),
  };
  const target = actor ?? canvas.tokens.controlled[0].actor;
  if (!target) {
    ui.notifications.warn("Mythic GME: No tokens selected!");
    return;
  }
  _mgeUpdateActorBehavior(target, actorBehavior);
  return actorBehavior;
}

async function _mgeFillRandomBehavior(elementId) {
  const descriptors = await MGMEOracleUtils._mgeGetOracleAnswers(
    'Behavior Personality',
    MGMEReference.MGE_PROPS_TEMPLATES.DESCRIPTION_QUESTION.tableSetting1,
    MGMEReference.MGE_PROPS_TEMPLATES.DESCRIPTION_QUESTION.tableSetting2
  )
  $(elementId).val(`${descriptors.descriptor1Result} ${descriptors.descriptor2Result}`);
}

async function _mgeFillRandomActivity(elementId) {
  const descriptors = await MGMEOracleUtils._mgeGetOracleAnswers(
    'Behavior Activity',
    MGMEReference.MGE_PROPS_TEMPLATES.ACTION_QUESTION.tableSetting1,
    MGMEReference.MGE_PROPS_TEMPLATES.ACTION_QUESTION.tableSetting2
  )
  $(elementId).val(`${descriptors.descriptor1Result} ${descriptors.descriptor2Result}`);
}

async function _mgeBehaviorAction(actor, behavior) {
  if (!behavior.dispositionRank)
    return;
  const dispositionMod = MGMECommon._mgeParseNumberFromText(behavior.dispositionRank);
  const tableOne = await MGMECommon._mgeFindTableByName('Mythic GME: NPC Action 1');
  const tableOneDraw = await tableOne.draw({displayChat: false});
  const tableOneResult = tableOneDraw.results[0].getChatText();
  await MGMEOracleUtils._mgeSimulateRoll(tableOneDraw.roll);
  const tableOneMod = MGMECommon._mgeParseNumberFromText(tableOneResult);
  const whisper = ui.chat.getData().rollMode !== 'roll' ? [game.user] : undefined;
  // This is tricky, NPC action does NOT shift disposition
  if (tableOneResult.includes('NPC Action')) {
    const tableTwo = await MGMECommon._mgeFindTableByName('Mythic GME: NPC Action 2');
    const tableTwoDraw = await tableTwo.draw({roll: new Roll(`2d10 + ${dispositionMod} + ${tableOneMod}`), displayChat: false});
    const tableTwoResult = tableTwoDraw.results[0].getChatText();
    await MGMEOracleUtils._mgeSimulateRoll(tableTwoDraw.roll);
    const messageContent = `
    <div><h1>${actor.name}</h1></div>
    <div>With disposition: ${behavior.dispositionRank}</div>
    <div>Performs an <b>unexpected ${tableOneResult}</b></div>
    <div><b>${tableTwoResult}</b></div>
    `
    await MGMEChatJournal._mgeCreateChatAndLog({flavor: 'Behavior Unexpected Action', content: messageContent, whisper: whisper, speaker: ChatMessage.getSpeaker()});
  } else {
    await _mgeAdjustDisposition(tableOneMod, actor);
    const messageContent = `
    <div><h1>${actor.name}</h1></div>
    <div>With disposition: ${behavior.dispositionRank}</div>
    <div>${tableOneMod !== 0 ? `<b>Disposition Shift</b>: ${tableOneMod}` : 'No changes in disposition'}</div>
    <div>Performs an expected <b>${tableOneResult}</b></div>
    `
    await MGMEChatJournal._mgeCreateChatAndLog({flavor: 'Behavior Expected Action', content: messageContent, whisper: whisper, speaker: ChatMessage.getSpeaker()});
  }
}

async function mgeBehaviorCheck() {
  const selectedToken = canvas.tokens.controlled[0];

  if (!selectedToken) {
    ui.notifications.warn("Behavior Checks only work with a selected Token");
    return
  }

  const behaviorCheckDialog = await renderTemplate('templates/variations2-behaviorcheck-dialog.hbs', {tokenName: selectedToken.name})

  let dialogue = new Dialog({
    title: `Behavior Check`,
    content: behaviorCheckDialog,
    render: html => {
      const tokenBehavior = selectedToken.actor.getFlag('mythic-gme-tools', 'mgeBehavior');
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
    },
    buttons: {
      rollAction: {
        icon: '<i class="fas fa-fist-raised"></i>',
        label: 'Action!',
        callback: async (html) => {
          if (!html.find("#mgme_behavior_disposition").val())
            await _mgeFillRandomDisposition(html);
          const actorBehavior = _mgeSaveActorBehaviorFromHTML(html, selectedToken.actor);
          await _mgeBehaviorAction(selectedToken, actorBehavior);
        }
      },
      sendChat: {
        icon: '<i class="fas fa-comments"></i>',
        label: 'To Chat',
        callback: async (html) => {
          if (!html.find("#mgme_behavior_disposition").val())
            await _mgeFillRandomDisposition(html);
          const actorBehavior = _mgeSaveActorBehaviorFromHTML(html, selectedToken.actor);
          const whisper = ui.chat.getData().rollMode !== 'roll' ? [game.user] : undefined;
          const debug = game.settings.get('mythic-gme-tools', 'mythicRollDebug');
          let chatBehavior = {
            flavor: 'Behavior Check',
            content: `
            <div><h1>${selectedToken.name}</h1></div>
            <div><b>Theme:</b> ${actorBehavior.theme ? actorBehavior.theme : '-'}</div>
            <div><b>Identity:</b> ${actorBehavior.identity ? actorBehavior.identity : '-'} ${actorBehavior.identityActive ? (actorBehavior.identityMod > 0 ? '(+2)' : (actorBehavior.identityMod === 0 ? '(+0)' : '(-2)')) : '(inactive)'}</div>
            <div><b>Personality:</b> ${actorBehavior.personality ? actorBehavior.personality : '-'} ${actorBehavior.personalityActive ? (actorBehavior.personalityMod > 0 ? '(+2)' : (actorBehavior.personalityMod === 0 ? '(+0)' : '(-2)')) : '(inactive)'}</div>
            <div><b>Activity:</b> ${actorBehavior.activity ? actorBehavior.activity : '-'} ${actorBehavior.activityActive ? (actorBehavior.activityMod > 0 ? '(+2)' : (actorBehavior.activityMod === 0 ? '(+0)' : '(-2)')) : '(inactive)'}</div>
            <div><b>Disposition:</b> ${actorBehavior.dispositionRank ? actorBehavior.dispositionRank : '-'}${debug ? ' [' + actorBehavior.dispositionValue + ']' : ''}</div>
            `,
            whisper: whisper
          };
          await MGMEChatJournal._mgeCreateChatAndLog(chatBehavior);
        }
      }
    },
    default: "sendChat"
  })

  dialogue.render(true)
}

async function mgeDetailCheck() {
  if (!MGMEVariations2._mgeEnsureV2Chaos(`Detail Check`, mgeDetailCheck))
    return;

  const detailQuestionDialog = await renderTemplate('templates/variations2-detailcheck-dialog.hbs', {});

  let dialogue = new Dialog({
    title: `Detail Check`,
    content: detailQuestionDialog,
    render: html => html[0].getElementsByTagName("input").mgme_v2_detail_check.focus(),
    buttons: {
      submit: {
        icon: '<i class="fas fa-comments"></i>',
        label: 'To Chat',
        callback: async (html) => {
          const speaker = ChatMessage.getSpeaker();
          const whisper = ui.chat.getData().rollMode !== 'roll' ? [game.user] : undefined;
          const currentChaos = game.settings.get('mythic-gme-tools', 'currentChaos');
          const detailCheckTable = await MGMECommon._mgeFindTableByName('Mythic GME: Detail Check');
          const detailCheckRoll = new Roll(`2d10 + ${currentChaos === 3 ? 2 : 0} + ${currentChaos === 6 ? -2 : 0}`);
          const detailCheckResult = (await detailCheckTable.draw({roll: detailCheckRoll, displayChat: false})).results[0].getChatText();
          const includeDescription = html.find("#mgme_v2_include_desc_detail").prop('checked');
          const includeAction = html.find("#mgme_v2_include_act_detail").prop('checked');
          let content = html.find("#mgme_v2_detail_check").val() === '' ? '' : `<h1>${html.find("#mgme_v2_detail_check").val()}</h1>`
          if (!includeDescription && !includeAction)
            content += `<div><h2>${detailCheckResult}</h2></div>`;
          let chatConfig = {
            flavor: 'Detail Check' + (includeAction ? ' (Action)' : '') + (includeDescription ? ' (Description)' : ''),
            content: content,
            speaker: speaker,
            whisper: whisper
          };
          let baseDetailChat;
          if (includeDescription || includeAction)
            baseDetailChat = await ChatMessage.create(chatConfig);
          else
            baseDetailChat = await _mgeCreateChatAndLog(chatConfig);
          if (includeDescription) {
            await MGMEOracleUtils._mgePrepareOracleQuestion({
              purpose: '<h2>Description Detail Check</h2>',
              focusValue: detailCheckResult,
              tableSetting1: 'descriptionsAdvTable',
              tableSetting2: 'descriptionsAdjTable'
            }, baseDetailChat);
          }
          if (includeAction) {
            await MGMEOracleUtils._mgePrepareOracleQuestion({
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