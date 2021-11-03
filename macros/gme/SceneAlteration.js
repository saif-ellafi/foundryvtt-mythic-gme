MYTHIC_GME_CHECK_VERSION(this.name, 0);

const currentChaos = game.settings.get('mythic-gme-tools', 'currentChaos')
const sceneAlterationDialogue = `
<form>
<label for="chaos" style="margin-left: 5px;">Chaos Rank:</label>
<select name="chaos" id="mgme_chaos" style="margin-bottom: 10px;">
  <option value="9" ${currentChaos === 9 ? 'selected' : ''}>9</option>
  <option value="8" ${currentChaos === 8 ? 'selected' : ''}>8</option>
  <option value="7" ${currentChaos === 7 ? 'selected' : ''}>7</option>
  <option value="6" ${currentChaos === 6 ? 'selected' : ''}>6</option>
  <option value="5" ${currentChaos === 5 ? 'selected' : ''}>5</option>
  <option value="4" ${currentChaos === 4 ? 'selected' : ''}>4</option>
  <option value="3" ${currentChaos === 3 ? 'selected' : ''}>3</option>
  <option value="2" ${currentChaos === 2 ? 'selected' : ''}>2</option>
  <option value="1" ${currentChaos === 1 ? 'selected' : ''}>1</option>
</select>
</form>
`

let dialogue = new Dialog({
  title: `Scene Alteration Check`,
  content: sceneAlterationDialogue,
  buttons: {
    one: {
      icon: '',
      label: 'Submit',
      callback: async (html) => {
        const chaos = parseInt(html.find("#mgme_chaos").val());
        const roll = new Roll(`1d10`);
        const result = roll.evaluate({async: false}).total;
        if (result <= chaos) {
          if (result % 2 === 0) {
            await roll.toMessage({
              content: `<b style="color: darkred">Scene was interrupted!</b> (${result})`
            });
            const macros = await game.packs.get('mythic-gme-tools.mythic-gme-macros').getDocuments();
            return macros.find(m => m.name === "Random Event").execute();
          } else {
            return roll.toMessage({
              content: `<b style="color: darkred">Scene was altered!</b> (${result})`
            });
          }
        } else {
          return roll.toMessage({
            content: `<b style="color: darkgreen">Scene Proceeds Normally!</b> (${result})`
          });
        }
      }
    }
  }
})

dialogue.render(true)