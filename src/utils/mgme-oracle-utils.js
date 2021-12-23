import MGMEChatJournal from "./mgme-chat-journal";
import MGMECommon from "./mgme-common";

export default class MGMEOracleUtils {

  static async _mgeSimulateRoll(targetRoll) {
    const randomEventsIn3D = (targetRoll && game.dice3d && game.settings.get('mythic-gme-tools', 'randomEvents3DDelay') > 0);
    if (randomEventsIn3D) {
      await game.dice3d.showForRoll(targetRoll);
    }
    return targetRoll;
  }

  static async _mgeUpdateChatSimulation(baseChat, newMessage) {
    await baseChat.update({content: baseChat.data.content + newMessage});
    ui.chat.scrollBottom();
    const popOutChat = Object.values(ui.windows).find(w => w.constructor.name === 'ChatLog')
    if (popOutChat) {
      popOutChat.scrollBottom();
    }
    const randomEventsIn3D = (game.dice3d && game.settings.get('mythic-gme-tools', 'randomEvents3DDelay') > 0);
    if (randomEventsIn3D) {
      await new Promise(r => setTimeout(r, game.settings.get('mythic-gme-tools', 'randomEvents3DDelay')*1000));
    }
  }

  static async _mgeGetOracleAnswers(eventFocus, tableSetting1, tableSetting2) {
    let focusResult;
    let focusRoll;

    if (eventFocus)
      focusResult = eventFocus;
    else {
      const focusTable = await MGMECommon._mgeFindTableBySetting('focusTable');
      focusRoll = await focusTable.roll();
      focusResult = focusRoll.results[0].getChatText();
    }

    const descriptor1Table = await MGMECommon._mgeFindTableBySetting(tableSetting1);
    const descriptor1Roll = await descriptor1Table.roll();
    const descriptor1Result = descriptor1Roll.results[0].getChatText();

    const descriptor2Table = await MGMECommon._mgeFindTableBySetting(tableSetting2);
    const descriptor2Roll = await descriptor2Table.roll();
    const descriptor2Result = descriptor2Roll.results[0].getChatText();

    return {
      focusResult: focusResult,
      focusRoll: focusRoll,
      descriptor1Result: descriptor1Result,
      descriptor1Roll: descriptor1Roll,
      descriptor2Result: descriptor2Result,
      descriptor2Roll: descriptor2Roll
    };
  }

  static async _mgeSubmitOracleQuestion(eventTitle, eventFlavor, useSpeaker, eventFocus, tableSetting1, tableSetting2, baseChat) {
    const randomAnswers = await MGMEOracleUtils._mgeGetOracleAnswers(eventFocus, tableSetting1, tableSetting2);
    let chatMessage;
    if (baseChat) {
      chatMessage = baseChat;
    } else {
      const whisper = ui.chat.getData().rollMode !== 'roll' ? [game.user] : undefined;
      let chatConfig = {
        flavor: eventFlavor,
        content: eventTitle,
        speaker: useSpeaker ? ChatMessage.getSpeaker() : undefined,
        whisper: whisper
      };
      chatMessage = await ChatMessage.create(chatConfig);
    }
    let oldHide;
    if (game.dice3d) {
      oldHide = game.user.getFlag('dice-so-nice', 'settings').timeBeforeHide;
      game.user.getFlag('dice-so-nice', 'settings').timeBeforeHide = game.settings.get('mythic-gme-tools', 'randomEvents3DDelay')*1000*1.1;
    }
    const debug = game.settings.get('mythic-gme-tools', 'mythicRollDebug');
    if (randomAnswers.focusResult !== '_') {// Special exception for non-focus based oracle questions
      const focusRoll = (await MGMEOracleUtils._mgeSimulateRoll(randomAnswers.focusRoll?.roll))?.total ?? '*';
      const focusDebug = debug ? `(${focusRoll})` : '';
      await MGMEOracleUtils._mgeUpdateChatSimulation(chatMessage, `<div><b><u>${randomAnswers.focusResult}</u></b>${focusDebug}</div>`);
    }
    const desc1roll = (await MGMEOracleUtils._mgeSimulateRoll(randomAnswers.descriptor1Roll.roll)).total;
    const desc1debug = debug ? ` (${desc1roll})</div>` : '';
    await MGMEOracleUtils._mgeUpdateChatSimulation(chatMessage, `<div>${randomAnswers.descriptor1Result}${desc1debug}`);
    const desc2roll = (await MGMEOracleUtils._mgeSimulateRoll(randomAnswers.descriptor2Roll.roll)).total;
    const desc2debug = debug ? ` (${desc2roll})` : '';
    await MGMEOracleUtils._mgeUpdateChatSimulation(chatMessage, `<div>${randomAnswers.descriptor2Result}${desc2debug}</div>`);
    await MGMEChatJournal._mgeLogChatToJournal(chatMessage);
    if (game.dice3d && oldHide) {
      Hooks.once('diceSoNiceRollComplete', async () => {
        game.user.getFlag('dice-so-nice', 'settings').timeBeforeHide = oldHide;
      })
    }
  }

  static async _mgePrepareOracleQuestion(questionProps, baseChat) {
    if (!questionProps.purpose) {
      const questionDialog = `
      <form>
      <div>
      <label for="reQuestion">${questionProps.label} (optional):</label>
      <input name="reQuestion" id="mgme_re_question" style="margin-bottom:10px;width:220px" placeholder="${questionProps.placeholder}"/>
      </div>

      <div>
      ${questionProps.useFocusTable ? `
        <label for="reFocus" style="display:inline-block;">Event Focus:</label>
        <select name="reFocus" id="mgme_re_efocus" style="width:312px;margin-bottom: 10px;"></select>
      ` : ''}
      </div>
      </form>
    `
      let dialogue = new Dialog({
        title: questionProps.label,
        content: questionDialog,
        render: async function (html) {
          if (questionProps.useFocusTable) {
            const eFocusElement = $("#mgme_re_efocus");
            const focusTableName = game.settings.get('mythic-gme-tools', 'focusTable');
            eFocusElement.append(`<option value="Random">${focusTableName}</option>`);
            const focusResults = (await MGMECommon._mgeFindTableByName(focusTableName)).results.contents.map(c => c.getChatText());
            focusResults.forEach(focus => {
              eFocusElement.append(`<option value="${focus}">${focus}</option>`);
            });
          }
          html[0].getElementsByTagName("input").mgme_re_question.focus();
        },
        buttons: {
          submit: {
            icon: '<i class="fas fa-comments"></i>',
            label: 'To Chat',
            callback: (html) => {
              let text = html[0].getElementsByTagName("input").mgme_re_question.value;
              const focusValue = $("#mgme_re_efocus");
              const eventFocus = focusValue.val() === 'Random' ? undefined : (focusValue.val() ?? '_');
              MGMEOracleUtils._mgeSubmitOracleQuestion(
                text.length ? `<h2>${text}</h2>` : '',
                questionProps.label,
                true,
                eventFocus,
                questionProps.tableSetting1,
                questionProps.tableSetting2,
                baseChat
              );
            }
          }
        },
        default: "submit"
      })
      dialogue.render(true)
    } else {
      await MGMEOracleUtils._mgeSubmitOracleQuestion(
        questionProps.purpose,
        questionProps.label,
        false,
        questionProps.focusValue,
        questionProps.tableSetting1,
        questionProps.tableSetting2,
        baseChat
      );
    }
  }
}