const tables = await game.packs.get('mythic-gme-helper.mythic-gme-tables').getDocuments();

const focusTable = game.tables.contents.find(t => t.name === game.settings.get('mythic-gme-helper', 'focusTable')) ??
  tables.find(t => t.name === "Mythic GME: Event Focus");
const focusRoll = await focusTable.roll();
const focusResult = focusRoll.results[0].getChatText();

const actionTable = game.tables.contents.find(t => t.name === game.settings.get('mythic-gme-helper', 'actionTable')) ??
  tables.find(t => t.name === "Mythic GME: Action Meaning");
const actionRoll = await actionTable.roll();
const actionResult = actionRoll.results[0].getChatText();

const subjectTable = game.tables.contents.find(t => t.name === game.settings.get('mythic-gme-helper', 'subjectTable')) ??
  tables.find(t => t.name === "Mythic GME: Subject Meaning");
const subjectRoll = await subjectTable.roll();
const subjectResult = subjectRoll.results[0].getChatText();

let subjectChat = {
  content: `
    <h2>New Event</h2>
    <div><b>Focus: </b>${focusResult} (${focusRoll.roll.total})</div>
    <div><b>Action: </b>${actionResult} (${actionRoll.roll.total})</div>
    <div><b>Subject: </b>${subjectResult} (${subjectRoll.roll.total})</div>
  `
};
ChatMessage.create(subjectChat);