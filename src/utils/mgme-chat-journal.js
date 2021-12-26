export default class MGMEChatJournal {
  static async _mgmeFindOrCreateJournal() {
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

  static _mgmeBuildLogChatHtml(baseChat, includeTimestamp, includeActorImg, highlightFlavor) {
    let content = '';
    let speaker = baseChat.data.speaker.alias ? `${baseChat.data.speaker.alias}` : `${game.user.name}`;
    if (highlightFlavor && baseChat.data.flavor)
      speaker = 'Gamemaster<FLAVOR>';
    const speakerChange = MGMEChatJournal._mgmeLastChatExportSpeaker && speaker !== MGMEChatJournal._mgmeLastChatExportSpeaker;
    if (speakerChange) {
      content += '</div>';
      content += '<br>';
      if (speaker === 'Gamemaster')
        content += '<div style="background-color:#3a4daf3d">';
      else if (speaker === 'Gamemaster<FLAVOR>')
        content += '<div style="background-color:#c5926d54">';
      else {
        content += `<div>`;
        let htmlImg;
        if (includeActorImg) {
          const actorImg = game.actors.contents.find(a => a.id === baseChat.data.speaker.actor)?.img;
          htmlImg = `<img alt="-" src="${actorImg}" width="36" height="36" class="message-portrait" style="border: 2px solid rgb(40, 111, 204);vertical-align: middle;">`;
        }
        content += `<b class="message-sender"><em><b>${htmlImg ?? ' •'} ${speaker}</b></em></b>`;
        if (includeTimestamp)
          content += ` (${new Date(baseChat.data.timestamp).toTimeInputString()}) `;
      }
    } else if (!speakerChange && baseChat.data.flavor) // Space between repeated rolls
      content += '<br>';
    MGMEChatJournal._mgmeLastChatExportSpeaker = speaker;
    content += baseChat.data.flavor ? `<div><u><span class="flavor-text">${baseChat.data.flavor}</span></u></div>` : '';
    content += `<div class="message-content">
    ${baseChat.data.content
      .replaceAll('<h1>', '<b>')
      .replaceAll('</h1>', '</b>')
      .replaceAll('<h2>', '<b>')
      .replaceAll('</h2>', '</b>')
    }
    </div>`;
    if (baseChat.id === ui.chat._lastId)
      content += '</div>';
    return content;
  }

  static async _mgmeLogChatToJournal(chat) {
    if (game.settings.get("mythic-gme-tools", "mythicAutolog")) {
      const journal = await MGMEChatJournal._mgmeFindOrCreateJournal();
      await journal.update({content: journal.data.content + MGMEChatJournal._mgmeBuildLogChatHtml(
        chat,false, true, true
      )});
    }
  }

  static async _mgmeCreateChatAndLog(props) {
    const chatMsg = ChatMessage.create(props);
    chatMsg.then(createdChat => {
      MGMEChatJournal._mgmeLogChatToJournal(createdChat)
    });
    return chatMsg;
  }
}