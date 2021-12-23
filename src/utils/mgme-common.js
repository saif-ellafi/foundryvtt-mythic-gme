export default class MGMECommon {

  static DEBOUNCED_RELOAD = debounce(() => window.location.reload(), 100);

  static async _mgmeGetAllPackTables() {
    const packsCore = await game.packs.get('mythic-gme-tools.mythic-gme-tables').getDocuments();
    const packsV1 = await game.packs.get('mythic-gme-tools.mythic-gme-v1-tables').getDocuments();
    const packsV2 = await game.packs.get('mythic-gme-tools.mythic-gme-v2-tables').getDocuments();
    const packsDecks = await game.packs.get('mythic-gme-tools.mythic-decks-tables').getDocuments();
    return packsCore.concat(packsV1).concat(packsV2).concat(packsDecks);
  }

  static async _mgmeFindTableBySetting(setting) {
    const fallbackTables = await MGMECommon._mgmeGetAllPackTables();
    const name = game.settings.get('mythic-gme-tools', setting);
    const baseSetting = game.settings.settings.get(`mythic-gme-tools.${setting}`);
    return game.tables.contents.find(t => t.name === name) ??
      fallbackTables.find(t => t.name === name) ??
      fallbackTables.find(t => t.name === baseSetting.default);
  }

  static async _mgmeFindTableByName(tableName) {
    return Object.values(
      game.tables.contents.concat((await MGMECommon._mgmeGetAllPackTables()))
    ).find(t => t.name === tableName);
  }

  static async _mgmeGetAllMythicTables() {
    return Object.fromEntries((await MGMECommon._mgmeGetAllPackTables())
      .concat(game.tables.contents)
      .filter(e => e.name.startsWith('Mythic'))
      .map(e => [e.name, e.name]));
  }

  static _mgmeWaitFor3DDice(targetMessageId) {
    function buildHook(resolve) {
      Hooks.once('diceSoNiceRollComplete', (messageId) => {
        if (targetMessageId === messageId)
          resolve(true);
        else
          buildHook(resolve)
      });
    }
    return new Promise((resolve,reject) => {
      if(game.dice3d){
        buildHook(resolve);
      } else {
        resolve(true);
      }
    });
  }

  static _mgmeGenerateChaosRankOptions() {
    const currentChaos = game.settings.get('mythic-gme-tools', 'currentChaos');
    const maxChaos = game.settings.get('mythic-gme-tools', 'maxChaos');
    const minChaos = game.settings.get('mythic-gme-tools', 'minChaos');
    let options = '';
    let i = 1;
    while (i <= maxChaos) {
      if (i >= minChaos)
        options += `<option value="${i}" ${currentChaos === i ? 'selected' : ''}>${i}</option>`;
      i++;
    }
    return options
  }

  static _mgmeParseNumberFromText(tableOutcome) {
    return parseInt(tableOutcome.match(/[-\d+]+/)[0]);
  }

}