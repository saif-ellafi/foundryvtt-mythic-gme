import MGMEChatJournal from "../utils/mgme-chat-journal";

export default class MGMEChatExtras {

  static async mgmeExportChatToJournal() {
    const defaultJournalName = `${game.i18n.localize('MGME.MythicAdventureLog')} ${new Date().toDateInputString()}`;
    const exportDialog = await renderTemplate('./modules/mythic-gme-tools/template/extras-exportchat-dialog.hbs', {defaultJournalName: defaultJournalName});
    let dialogue = new Dialog({
      title: game.i18n.localize('MGME.ExportAllToJournal'),
      content: exportDialog,
      buttons: {
        submit: {
          icon: '<i class="fas fa-comments"></i>',
          label: game.i18n.localize('MGME.Export'),
          callback: (html) => {
            const journalName = html.find("#mgme_export_journal_name").val();
            const includeAuthor = html.find("#mgme_export_include_meta").prop('checked');
            const clearChat = html.find("#mgme_export_clear_chat").prop('checked');
            let entries = [];
            ui.chat.collection.contents.forEach(chat => {
              entries.push(MGMEChatJournal._mgmeBuildLogChatHtml(chat, includeAuthor));
            });
            const targetJournal = game.journal.contents.find(j => j.name === journalName);
            let journalCreation;
            if (journalName.length && targetJournal) {
              journalCreation = targetJournal.update({content: targetJournal.data.content + '\n' + entries.join('\n')});
            } else {
              journalCreation = JournalEntry.create({
                name: `${journalName.length ? journalName : defaultJournalName}`,
                content: entries.join('\n')
              });
            }
            if (clearChat)
              journalCreation.then(() => game.messages.flush());
          }
        }
      },
      default: "submit"
    })
    dialogue.render(true)
  }

  static async mgmeFormattedChat() {
    const tokens = game.scenes.active.tokens.contents;

    const formattedChatDialog = await renderTemplate('./modules/mythic-gme-tools/template/extras-formattedchat-dialog.hbs', {})

    let dialogue = new Dialog({
      title: game.i18n.localize('MGME.FormattedText'),
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
          icon: '<i class="fas fa-comments"></i>',
          label: game.i18n.localize('MGME.ToChat'),
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
            let chatConfig = {
              content: message,
              speaker: selectedSpeaker
            };
            MGMEChatJournal._mgmeCreateChatAndLog(chatConfig);
          }
        }
      },
      default: "submit"
    })
    dialogue.render(true)
  }

}