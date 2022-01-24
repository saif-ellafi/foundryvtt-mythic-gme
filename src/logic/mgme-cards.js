import MGMECommon from "../utils/mgme-common";

export default class MGMECards {

  static initSettings() {
    game.settings.register("mythic-gme-tools", "deckPath", {
      name: game.i18n.localize('MGME.SettingDeckPathName'),
      hint: game.i18n.localize('MGME.SettingDeckPathHint'),
      scope: "world",
      config: true,
      type: String,
      default: "decks",
      filePicker: 'folder'
    });
  }

  static async mgmeDealCard({
                               tableName,
                               fileExtension = 'jpg',
                               useRotate = false,
                               dialogTitle = 'Dealt Card',
                               height = '580px',
                               shuffle = true
                             }) {
    const projectRoot = game.settings.get("mythic-gme-tools", "deckPath");
    const fallbackTables = await MGMECommon._mgmeGetAllPackTables();
    const table = game.tables.find(t => t.name === tableName) ??
      fallbackTables.find(t => t.name === tableName)

    const result = await table.draw({displayChat: false});
    if (shuffle && result.results.length === 0) {
      table.reset();
      ui.notifications.info(game.i18n.localize('MGME.InfoShuffled'));
      return false;
    }
    const image = await result.results[0].data.text;
    const isRotated = Math.random() < 0.5;
    const style = useRotate && isRotated ? " transform: rotate(181deg);" : "";

    const path = `${projectRoot}/${image}.${fileExtension}`

    try {
      await FilePicker.browse('user', path);
    } catch {
      let errorChat = {
        content: `
        <div style="color: red">${game.i18n.localize('MGME.ErrNoCards')}:</div>
        <br>
        <div><em>${path}</em></div>
      `
      };
      ChatMessage.create(errorChat);
      return;
    }

    const dialog = new Dialog({
      title: dialogTitle,
      content: `
      <div style="height: ${height};">
        <img
          style="border-radius: 5px; margin-bottom: 1em; ${style}"
          src="${path}"
         alt="card"/>
      <div>`,
      buttons: {
        share: {
          label: game.i18n.localize('MGME.DeckShow'),
          callback: () => {
            const ip = new ImagePopout(path, {
              editable: false,
              shareable: true
            });
            ip._render(true, {title: "Card", height: parseInt(height), width: parseInt(height) / 1.5}).then(() => ip.shareImage());
          }
        },
        chat: {
          label: game.i18n.localize('MGME.ToChat'),
          callback: async () => {
            ChatMessage.create({
              flavor: tableName,
              content: `
              <img
                style="border-radius: 5px; margin-bottom: 1em; ${style}"
                src="${path}"
              alt="card"/>`
            })
          }
        },
        reset: {
          label: game.i18n.localize('MGME.ShuffleDeck'),
          callback: () => table.reset()
        },
        close: {
          label: game.i18n.localize('MGME.DeckClose')
        }
      },
      default: 'close'
    });
    dialog.options.resizable = true;
    dialog.render(true);
  }
}