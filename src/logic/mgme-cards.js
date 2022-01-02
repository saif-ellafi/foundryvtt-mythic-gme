import MGMECommon from "../utils/mgme-common";

export default class MGMECards {
  static CARDS_FOLDER = '_mythicShared';


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

    // Cleanup any previously shown cards
    const folder = game.folders.contents.find(f => f.name === MGMECards.CARDS_FOLDER);
    if (folder) {
      game.journal.contents.filter(j => j.folder === folder).forEach(j => j.delete());
    }
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
        reset: {
          label: game.i18n.localize('MGME.ShuffleDeck'),
          callback: () => table.reset(),
        },
        share: {
          label: game.i18n.localize('MGME.DeckShare'),
          callback: async () => {
            const folder = game.folders.contents.find(f => f.name === MGMECards.CARDS_FOLDER) ?? await Folder.create({name: MGMECards.CARDS_FOLDER, type: 'JournalEntry'});
            JournalEntry.create({name: 'card_'+new Date().toJSON(), folder: folder, img: path}).then(j => {
              j.show();
              j.sheet.render(true);
            })
          }
        },
        close: {
          label: game.i18n.localize('MGME.DeckClose'),
          callback: () => {},
        }
      },
      default: 'close'
    });
    dialog.options.resizable = true;
    dialog.render(true);
  }
}