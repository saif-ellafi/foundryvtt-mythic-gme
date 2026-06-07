import MGMECommon from "../utils/mgme-common";

const {Dialog} = foundry.appv1.api;
const {FilePicker, ImagePopout} = foundry.applications.apps;

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

  static lastPos = 150;

  static DECK_OPTIONS = {
    'Mythic GME Deck': {
      fileExtension: 'png',
      useRotate: true,
      dialogTitle: 'Mythic GME Card'
    },
    'TAC Deck': {
      fileExtension: 'jpg',
      useRotate: true,
      dialogTitle: 'The Adventure Crafter Card'
    },
    'Countdown Galactic': {
      fileExtension: 'png',
      height: '400px',
      dialogTitle: 'Countdown Galactic Deck'
    },
    'Countdown Monster': {
      fileExtension: 'png',
      height: '400px',
      dialogTitle: 'Countdown Monster Deck'
    },
    'Countdown Saga of the Goblin Horde': {
      fileExtension: 'png',
      height: '400px',
      dialogTitle: 'Countdown SotGH Deck'
    },
    'GMA Base Deck': {dialogTitle: 'Game Master\'s Apprentice Card'},
    'GMA 2e Base Deck': {dialogTitle: 'GMA 2e Card'},
    'GMA Fantasy Deck': {dialogTitle: 'GMA Fantasy Card'},
    'GMA Horror Deck': {dialogTitle: 'GMA Horror Card'},
    'GMA Weird Horror Deck': {dialogTitle: 'GMA Weird Horror Card'},
    'GMA SciFi Deck': {dialogTitle: 'GMA SciFi Card'},
    'GMA Cyberpunk Deck': {dialogTitle: 'GMA Cyberpunk Card'},
    'GMA Steampunk Deck': {dialogTitle: 'GMA Steampunk Card'},
    'GMA Age of Sail Deck': {dialogTitle: 'GMA Age of Sail Card'},
    'GMA Demon Hunters Deck': {dialogTitle: 'GMA Demon Hunters Card'}
  };

  static dealDeck(tableName) {
    return MGMECards.mgmeDealCard({
      tableName,
      ...(MGMECards.DECK_OPTIONS[tableName] ?? {})
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
    const drawResult = result.results[0];
    const image = drawResult.name || drawResult.description;
    const isRotated = Math.random() < 0.5;
    const style = useRotate && isRotated ? " transform: rotate(181deg);" : "";

    const path = `${projectRoot}/${image}.${fileExtension}`

    try {
      await FilePicker.browse('data', path);
    } catch {
      let errorChat = {
        content: `
        <div style="color: red">${game.i18n.localize('MGME.ErrNoCards')}:</div>
        <br>
        <div><em>${path}</em></div>
      `
      };
      if (!ui.sidebar.expanded) {
        ui.sidebar.expand();
      }
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
          callback: async () => {
            const ip = new ImagePopout({
              src: path,
              window: {title: "Card", resizable: true}
            });
            await ip.render(true);
            ip.shareImage();
          }
        },
        chat: {
          label: game.i18n.localize('MGME.ToChat'),
          callback: async () => {
            if (!ui.sidebar.expanded) {
              ui.sidebar.expand();
            }
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
    dialog.render(true, {top: 200, left: MGMECards.lastPos});
    const {width: viewportWidth} = MGMECommon.getViewportSize();
    if (MGMECards.lastPos < viewportWidth - (parseInt(height) / 1.5) * 2 - 400)
      MGMECards.lastPos += parseInt(height) / 1.5 + 150;
    else
      MGMECards.lastPos = 150;
  }
}