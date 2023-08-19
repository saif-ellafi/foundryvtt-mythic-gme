import MGMEOracleUtils from "../utils/mgme-oracle-utils";
import MGMEChatJournal from "../utils/mgme-chat-journal";
import MGMECommon from "../utils/mgme-common";

export default class TACCore {

  static tacPlotPoint() {
    MGMEOracleUtils._mgmeSimpleTableOracle(
        {name: 'GUM Actions, Good'},
        'NPC good action',
        false
    );
  }

  static tacNewCharacter() {
    MGMEOracleUtils._mgmeSimpleTableOracle(
        {name: 'GUM Actions, Good'},
        'NPC good action',
        false
    );
  }

  static async tacRenderCharactersList() {
    MGMEChatJournal._mgmeFindOrCreateRolltable('NPCs List', 'Mythic Lists').then(table => {
      table.sheet.render(true);
    });
  }

  static async tacRenderPlotlinesList() {
    MGMEChatJournal._mgmeFindOrCreateRolltable('Threads List', 'Mythic Lists').then(table => {
      table.sheet.render(true);
    });
  }

  static async tacRollCharactersList() {
    MGMEChatJournal._mgmeFindOrCreateRolltable('NPCs List', 'Mythic Lists').then(table => {
      table.normalize().then((t) => t.draw({rollMode: MGMECommon._mgmeGetRollMode()}));
    });
  }

  static async tacRollPlotlinesList() {
    MGMEChatJournal._mgmeFindOrCreateRolltable('Threads List', 'Mythic Lists').then(table => {
      table.normalize().then((t) => t.draw({rollMode: MGMECommon._mgmeGetRollMode()}));
    });
  }

}