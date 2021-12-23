import MGMEChatJournal from "../utils/mgme-chat-journal";

export default class MGMEChatExtras {

  static async mgmeExportChatToJournal() {
    const defaultJournalName = `Mythic Adventure Log ${new Date().toDateInputString()}`;
    const exportDialog = await renderTemplate('./modules/mythic-gme-tools/template/extras-exportchat-dialog.hbs', {defaultJournalName: defaultJournalName});
    let dialogue = new Dialog({
      title: 'Export all Chat to Journal',
      content: exportDialog,
      buttons: {
        submit: {
          icon: '<i class="fas fa-comments"></i>',
          label: 'Export',
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

  static mgmeFormattedChat() {
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
          icon: '<i class="fas fa-comments"></i>',
          label: 'To Chat',
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