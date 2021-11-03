MYTHIC_GME_CHECK_VERSION(this.name, 0);

const tables = await game.packs.get('mythic-gme-tools.mythic-gme-tables').getDocuments();
const complexQuestionDialog = `
<form>
<label for="mgme_complex_question">Question (optional):</label>
<input id="mgme_complex_question" style="margin-bottom: 10px" placeholder="Fate Chart Question">
</form>
`

let dialogue = new Dialog({
  title: `Complex Question`,
  content: complexQuestionDialog,
  buttons: {
    one: {
      icon: '',
      label: 'Submit',
      callback: async (html) => {
        const actionTable = game.tables.contents.find(t => t.name === game.settings.get('mythic-gme-tools', 'actionTable')) ??
            tables.find(t => t.name === "Mythic GME: Action Meaning");
        const actionRoll = await actionTable.roll();
        const actionResult = actionRoll.results[0].getChatText();

        const subjectTable = game.tables.contents.find(t => t.name === game.settings.get('mythic-gme-tools', 'subjectTable')) ??
            tables.find(t => t.name === "Mythic GME: Subject Meaning");
        const subjectRoll = await subjectTable.roll();
        const subjectResult = subjectRoll.results[0].getChatText();

        let subjectChat = {
          content: `
            ${html.find("#mgme_complex_question").val() === '' ? '<h2><b>"Complex Question"</b></h2>' : `<h2><b>${html.find("#mgme_complex_question").val()}</b></h2>`}
            <div><b>Action: </b>${actionResult} (${actionRoll.roll.total})</div>
            <div><b>Subject: </b>${subjectResult} (${subjectRoll.roll.total})</div>
          `
        };
        ChatMessage.create(subjectChat);
      }
    }
  }
})

dialogue.render(true)