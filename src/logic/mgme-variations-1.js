import MGMEChatJournal from "../utils/mgme-chat-journal";
import MGMECommon from "../utils/mgme-common";
import MGMEOracleUtils from "../utils/mgme-oracle-utils";
import MGMEReference from "../utils/mgme-reference";

export default class MGMEVariations1 {

  static initSettings() {
    game.settings.register('mythic-gme-tools', 'doublesIgnoreChaos', {
      name: 'Double Ignores Chaos Factor',
      hint: 'Whether to ignore CF and always hit a random event regardless',
      scope: 'world',
      config: true,
      type: Boolean,
      default: false
    });
  }

  static async mgeComplexQuestion() {
    await MGMEOracleUtils._mgePrepareOracleQuestion(MGMEReference.MGE_PROPS_TEMPLATES.COMPLEX_QUESTION)
  }

  static async mgeBackstoryGenerator() {
    const backstoryDialog = await renderTemplate('./modules/mythic-gme-tools/template/variations1-backstory-dialog.hbs', {})

    let dialogue = new Dialog({
      title: `Backstory Generator`,
      content: backstoryDialog,
      buttons: {
        submit: {
          icon: '<i class="fas fa-comments"></i>',
          label: 'To Chat',
          callback: async (html) => {
            const speaker = ChatMessage.getSpeaker();
            let eventsCount;
            const choice = html.find("#mgme_backstory_count").val();
            if (choice === 'table') {
              const eventsCountTable = await MGMECommon._mgeFindTableByName('Mythic GME: Backstory Events');
              const backstoryDraw = await eventsCountTable.roll();
              eventsCount = parseInt(backstoryDraw.results[0].getChatText());
              let triggerMsg = await backstoryDraw.roll.toMessage({
                content: `<b>${eventsCount}</b> Backstory Events${speaker.alias === 'Gamemaster' ? '' : ` for <b>${speaker.alias}</b>`}`
              });
              await MGMEChatJournal._mgeLogChatToJournal(triggerMsg);
              await MGMECommon._mgeWaitFor3DDice(triggerMsg.id);
            } else {
              eventsCount = parseInt(choice);
              await MGMEChatJournal._mgeCreateChatAndLog({
                content: `<b>${eventsCount}</b> Backstory Events${speaker.alias === 'Gamemaster' ? '' : ` for <b>${speaker.alias}</b>`}`
              })
            }
            const backstoryFocusTable = await MGMECommon._mgeFindTableByName('Mythic GME: Backstory Focus')
            const backstoryLabels = ['First', 'Second', 'Third', 'Fourth', 'Fifth', 'Sixth', 'Seventh'];
            let i = 0;
            while (i < eventsCount) {
              const backstoryFocus = (await backstoryFocusTable.roll()).results[0].getChatText();
              await MGMEOracleUtils._mgeSubmitOracleQuestion(
                `${speaker.alias === 'Gamemaster' ? '' : `<h2>${speaker.alias} - Backstory</h2>`}`,
                `${eventsCount === 1 ? 'Backstory Event' : (backstoryLabels[i] ?? i+1) + ' Backstory Event'}`,
                false,
                backstoryFocus,
                'actionTable',
                'subjectTable'
              )
              i++
            }
          }
        }
      },
      default: "submit"
    })

    dialogue.render(true)

  }
}