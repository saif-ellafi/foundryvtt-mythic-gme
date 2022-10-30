import MGMEChatJournal from "../utils/mgme-chat-journal";
import MGMECommon from "../utils/mgme-common";
import MGMEOracleUtils from "../utils/mgme-oracle-utils";
import MGMEReference from "../utils/mgme-reference";

export default class MGMEVariations1 {

  static initSettings() {
    game.settings.register('mythic-gme-tools', 'doublesIgnoreChaos', {
      name: game.i18n.localize('MGME.SettingsDoubleIgnoreChaosName'),
      hint: game.i18n.localize('MGME.SettingsDoubleIgnoreChaosHint'),
      scope: 'world',
      config: true,
      type: Boolean,
      default: false
    });
  }

  static async mgmeComplexQuestion() {
    await MGMEOracleUtils._mgmePrepareOracleQuestion(MGMEReference.PROPS_TEMPLATES.COMPLEX_QUESTION())
  }

  static async mgmeBackstoryGenerator() {
    const backstoryFocus = game.settings.get('mythic-gme-tools', 'backstoryFocusTable');
    const backstoryDialog = await renderTemplate('./modules/mythic-gme-tools/template/variations1-backstory-dialog.hbs', {backstoryFocus: backstoryFocus})

    let dialogue = new Dialog({
      title: game.i18n.localize('MGME.BackstoryGenerator'),
      content: backstoryDialog,
      buttons: {
        submit: {
          icon: '<i class="fas fa-comments"></i>',
          label: game.i18n.localize('MGME.ToChat'),
          callback: async (html) => {
            const speaker = ChatMessage.getSpeaker();
            let eventsCount;
            const choice = html.find("#mgme_backstory_count").val();
            const whisper = MGMECommon._mgmeGetWhisperMode();
            if (choice === 'table') {
              const eventsCountTable = await MGMECommon._mgmeFindTableByName('Mythic GME: Backstory Events');
              const backstoryDraw = await eventsCountTable.roll();
              eventsCount = parseInt(backstoryDraw.results[0].getChatText());
              let triggerMsg = await backstoryDraw.roll.toMessage({
                whisper: whisper,
                flavor: game.i18n.localize('MGME.BackstoryEvents'),
                content: `<b>${eventsCount}</b> ${game.i18n.localize('MGME.BackstoryEvents')}${speaker.alias === game.user.name ? '' : ` ${game.i18n.localize('MGME.For')} <b>${speaker.alias}</b>`}`
              });
              await MGMEChatJournal._mgmeLogChatToJournal(triggerMsg);
              await MGMECommon._mgmeWaitFor3DDice(triggerMsg.id);
            } else {
              eventsCount = parseInt(choice);
              await MGMEChatJournal._mgmeCreateChatAndLog({
                whisper: whisper,
                flavor: game.i18n.localize('MGME.BackstoryEvents'),
                content: `<b>${eventsCount}</b> ${game.i18n.localize('MGME.BackstoryEvents')}${speaker.alias === game.user.name ? '' : ` ${game.i18n.localize('MGME.For')} <b>${speaker.alias}</b>`}`
              })
            }
            const backstoryFocusTable = await MGMECommon._mgmeFindTableByName(backstoryFocus)
            const backstoryLabels = [
              game.i18n.localize('MGME.BackstoryFirst'),
              game.i18n.localize('MGME.BackstorySecond'),
              game.i18n.localize('MGME.BackstoryThird'),
              game.i18n.localize('MGME.BackstoryFourth'),
              game.i18n.localize('MGME.BackstoryFifth'),
              game.i18n.localize('MGME.BackstorySixth'),
              game.i18n.localize('MGME.BackstorySeventh')
            ];
            let i = 0;
            while (i < eventsCount) {
              const backstoryFocus = (await backstoryFocusTable.roll()).results[0].getChatText();
              await MGMEOracleUtils._mgmeSubmitOracleQuestion(
                `${speaker.alias === game.user.name ? '' : `<h2>${speaker.alias} - ${game.i18n.localize('MGME.Backstory')}</h2>`}`,
                `${eventsCount === 1 ? game.i18n.localize('MGME.BackstoryEvent') : (backstoryLabels[i] ?? i+1) + ' Backstory Event'}`,
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