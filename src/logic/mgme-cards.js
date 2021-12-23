import MGMECommon from "../utils/mgme-common";

export default class MGMECards {
  static initSettings() {
    game.settings.register("mythic-gme-tools", "deckPath", {
      name: "Deck Path Location",
      hint: "Folder where you store you card decks. Relative to User Data directory, where 'worlds', 'modules' and 'systems' are.",
      scope: "world",
      config: true,
      type: String,
      default: "decks",
      filePicker: 'folder'
    });
  }

  static async mgeDealCard({
                               tableName,
                               fileExtension = 'jpg',
                               useRotate = false,
                               dialogTitle = 'Dealt Card',
                               height = '580px',
                               shuffle = true
                             }) {
    const projectRoot = game.settings.get("mythic-gme-tools", "deckPath");
    const fallbackTables = await MGMECommon._mgeGetAllPacks();
    const table = game.tables.find(t => t.name === tableName) ??
      fallbackTables.find(t => t.name === tableName)

    const result = await table.draw();
    if (shuffle && result.results.length === 0) {
      table.reset();
      ui.notifications.info("The Deck has been shuffled. Please draw again.");
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
        <div style="color: red">ERROR: Cards not found. Make sure your cards are available in the following path:</div>
        <br>
        <div><em>${path}</em></div>
      `
      };
      ChatMessage.create(errorChat);
      return;
    }

    new Dialog({
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
          label: "Shuffle Deck",
          callback: () => table.reset(),
        },
        close: {
          label: "Close",
          callback: () => {
          },
        },
      },
      default: "close"
    }).render(true);
  }
}