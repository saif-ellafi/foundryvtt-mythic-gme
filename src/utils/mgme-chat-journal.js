export default class MGMEChatJournal {
  static async _mgmeFindOrCreateJournal(name, pageName) {
    const journalName = name?.length ? name : `${game.i18n.localize('MGME.MythicAdventureLog')}`;
    let journal = game.journal.contents.find(j => j.name === journalName);
    if (!journal) {
      journal = await JournalEntry.create({
        name: journalName,
        pages: [
          {type: "text", name: `${new Date().toDateInputString()}${pageName ? pageName : ' #1'}`, text: {content: ''}}
        ]
      });
    } else if (pageName) {
      const targetPage = journal.pages.contents.find(p => p.name === pageName);
      if (!targetPage) {
        await journal.createEmbeddedDocuments('JournalEntryPage', [
          {type: "text", name: pageName, text: {content: ''}}
        ])
      }
    } else {
      await journal.createEmbeddedDocuments('JournalEntryPage', [
        {type: "text", name: `${new Date().toDateInputString()} #${journal.pages.contents.length+1}`, text: {content: ''}}
      ])
    }
    return journal;
  }

  static async _mgmeFindOrCreateRolltable(tableName, folderName) {
    let table = game.tables.contents.find(t => t.name === tableName && t.folder?.name === folderName);
    if (!table) {
      let folder = game.folders.contents.find(f => f.name === folderName);
      if (!folder)
        folder = await Folder.create({name: folderName, type: 'RollTable'});
      table = await RollTable.create({name: tableName, folder: folder});
    }
    return table;
  }

  static _mgmeBuildLogChatHtml(baseChat, includeTimestamp, includeActorImg, highlightFlavor) {
    let content = '';
    const speaker = baseChat.speaker.alias ? `${baseChat.speaker.alias}` : `${game.user.name}`;
    let isFlavor = false;
    if (highlightFlavor && baseChat.flavor)
      isFlavor = true;
    const speakerChange = speaker !== MGMEChatJournal._mgmeLastChatExportSpeaker;
    if (MGMEChatJournal._mgmeLastChatExportSpeaker && speakerChange)
      content += '<br>'; // Add spacing between messages before changing speaker
    if (speaker === game.user.name)
      content += '<div style="background-color:#3a4daf3d">';
    else if (isFlavor)
      content += '<div style="background-color:#c5926d54">';
    else
      content += `<div>`;
    if (!speakerChange)
      content += '<br>' // Add spacing between messages of same speaker
    let htmlImg;
    if (speakerChange && includeActorImg) {
      if (speaker !== game.user.name) {
        const actorImg = game.actors.contents.find(a => a.id === baseChat.speaker.actor)?.img;
        htmlImg = `<img alt="-" src="${actorImg}" width="36" height="36" class="message-portrait" style="border: 2px solid rgb(40, 111, 204);vertical-align: middle;">`;
      }
      content += `<b class="message-sender"><em><b>${htmlImg ?? ' •'} ${speaker}</b></em></b>`;
    }
    if (includeTimestamp)
      content += ` (${new Date(baseChat.timestamp).toTimeInputString()}) `;
    content += baseChat.flavor ? `<div><u><span class="flavor-text">${baseChat.flavor}</span></u></div>` : '';
    content += `<div class="message-content">
    ${baseChat.content
      .replaceAll('<h1>', '<b><u>')
      .replaceAll('</h1>', '</u></b><br>')
      .replaceAll('<h2>', '<b>')
      .replaceAll('</h2>', '</b><br>')
    }
    </div>`;
    content += '</div>';
    if (baseChat.id === ui.chat.collection.contents[ui.chat.collection.contents.length-1].id) {
      content += '</div>';
      MGMEChatJournal._mgmeLastChatExportSpeaker = undefined;
    } else {
      MGMEChatJournal._mgmeLastChatExportSpeaker = speaker;
    }
    return content;
  }

  static async _mgmeLogChatToJournal(chat) {
    if (game.settings.get("mythic-gme-tools", "mythicAutolog")) {
      const pageName = `${new Date().toDateInputString()} Autolog`;
      const journal = await MGMEChatJournal._mgmeFindOrCreateJournal(undefined, pageName);
      const targetPage = journal.pages.contents.find(p => p.name === pageName);
      await targetPage.update({text: {content: targetPage.text.content + '<br>' + MGMEChatJournal._mgmeBuildLogChatHtml(
            chat, false, true, true
          )}});
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