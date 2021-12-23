export default class MGMEChatJournal {
  static async _mgeFindOrCreateJournal() {
    const date = new Date().toDateInputString();
    const folderName = "Mythic Journal";
    const journalName = 'Adventure Notes ' + date;
    let journal = game.journal.contents.find(j => j.name === journalName && j.folder?.name === folderName);
    if (!journal) {
      let folder = game.folders.contents.find(f => f.name === folderName);
      if (!folder)
        folder = await Folder.create({name: folderName, type: 'JournalEntry'});
      journal = await JournalEntry.create({name: journalName, folder: folder});
    }
    return journal;
  }

  static _mgeBuildLogChatHtml(baseChat, includeAuthor) {
    let content = '';
    if (includeAuthor) {
      content += baseChat.data.speaker.alias ? `<h4 class="message-sender">
        <em>${baseChat.data.speaker.alias ? `${baseChat.data.speaker.alias}` : `${game.user.name}`}</em> - ${new Date(baseChat.data.timestamp).toTimeInputString()}
      </h4>` : '';
    }
    content += baseChat.data.flavor ? `<span class="flavor-text">${baseChat.data.flavor}</span>` : '';
    content += `<div class="message-content">${baseChat.data.content}</div>`;
    content += '<hr style="border: 1px dashed black;">\n';
    return content;
  }

  static async _mgeLogChatToJournal(chat) {
    if (game.settings.get("mythic-gme-tools", "mythicAutolog")) {
      const journal = await MGMEChatJournal._mgeFindOrCreateJournal();
      await journal.update({content: journal.data.content + MGMEChatJournal._mgeBuildLogChatHtml(chat, true)});
    }
  }

  static async _mgeCreateChatAndLog(props) {
    const chatMsg = ChatMessage.create(props);
    chatMsg.then(createdChat => {
      MGMEChatJournal._mgeLogChatToJournal(createdChat)
    });
    return chatMsg;
  }
}