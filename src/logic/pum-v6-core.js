import MGMEOracleUtils from "../utils/mgme-oracle-utils";
import MGMEChatJournal from "../utils/mgme-chat-journal";
import MGMECommon from "../utils/mgme-common";

export default class PUMV6Core {

  static async adjustTable(table) {
    let size = table.results.size;
    if (size < 5) {
      let adjustBy = 5 - size;
      let newResults = [];
      let i = 0;
      while (i < adjustBy) {
        newResults.push({
          text: (i < 2 && adjustBy > 4) ? 'Add new' : 'Choose one',
          range: [size + i + 1, size + i + 1],
          weight: 1
        })
        i += 1;
      }
      await table.createEmbeddedDocuments('TableResult', newResults);
    }
    return table
  }

  static pumV6Prompt() {
    MGMEOracleUtils._mgmeSimpleTableOracle(
      {name: 'PUM v6 - Scene Prompt'},
      'Scene Prompt',
      false
    );
  }

  static pumV6Check() {
    MGMEOracleUtils._mgmeSimpleTableOracle(
      {name: 'PUM v6 - Scene Check'},
      'Scene Check',
      false
    );
  }

  static pumV6Complication() {
    MGMEOracleUtils._mgmeSimpleTableOracle(
          {name: 'PUM v6 - Complication'},
        'Scene Complication',
        false
    );
  }

  static pumV6Catalyst() {
    MGMEOracleUtils._mgmeSimpleTableOracle(
          {name: 'PUM v6 - Catalyst'},
        'Scene Catalyst',
        false
    );
  }

  static pumV6Challenge() {
    MGMEOracleUtils._mgmeSimpleTableOracle(
      {name: 'PUM v6 - Challenge'},
      'Scene Challenge',
      false
    );
  }

  static pumV6Situation() {
    MGMEOracleUtils._mgmeSimpleTableOracle(
      {name: 'PUM v6 - Situation'},
      'Scene Situation',
      false
    );
  }

  static pumV6RenderAspectsList() {
    MGMEChatJournal._mgmeFindOrCreateRolltable('World aspects', 'PUM Plot Nodes').then(table => {
      PUMV6Core.adjustTable(table, 'MGME.TableResultChoose2e').then(t => t.normalize().then(t => t.sheet.render(true)));
    });
  }

  static pumV6RenderActorsList() {
    MGMEChatJournal._mgmeFindOrCreateRolltable('Relevant actors', 'PUM Plot Nodes').then(table => {
      PUMV6Core.adjustTable(table, 'MGME.TableResultChoose2e').then(t => t.normalize().then(t => t.sheet.render(true)));
    });
  }

  static pumV6RenderTroublesList() {
    MGMEChatJournal._mgmeFindOrCreateRolltable('Story troubles', 'PUM Plot Nodes').then(table => {
      PUMV6Core.adjustTable(table, 'MGME.TableResultChoose2e').then(t => t.normalize().then(t => t.sheet.render(true)));
    });
  }

  static pumV6RenderThreadsList() {
    MGMEChatJournal._mgmeFindOrCreateRolltable('Active threads', 'PUM Plot Nodes').then(table => {
      PUMV6Core.adjustTable(table, 'MGME.TableResultChoose2e').then(t => t.normalize().then(t => t.sheet.render(true)));
    });
  }

  static pumV6RollAspectsList() {
    MGMEChatJournal._mgmeFindOrCreateRolltable('World aspects', 'PUM Plot Nodes').then(table => {
      PUMV6Core.adjustTable(table, 'MGME.TableResultChoose2e').then((t) => t.normalize()).then((t) => t.draw({rollMode: MGMECommon._mgmeGetRollMode()}));
    });
  }

  static pumV6RollActorsList() {
    MGMEChatJournal._mgmeFindOrCreateRolltable('Relevant actors', 'PUM Plot Nodes').then(table => {
      PUMV6Core.adjustTable(table, 'MGME.TableResultChoose2e').then((t) => t.normalize()).then((t) => t.draw({rollMode: MGMECommon._mgmeGetRollMode()}));
    });
  }

  static pumV6RollTroublesList() {
    MGMEChatJournal._mgmeFindOrCreateRolltable('Story troubles', 'PUM Plot Nodes').then(table => {
      PUMV6Core.adjustTable(table, 'MGME.TableResultChoose2e').then((t) => t.normalize()).then((t) => t.draw({rollMode: MGMECommon._mgmeGetRollMode()}));
    });
  }

  static pumV6RollThreadsList() {
    MGMEChatJournal._mgmeFindOrCreateRolltable('Active threads', 'PUM Plot Nodes').then(table => {
      PUMV6Core.adjustTable(table, 'MGME.TableResultChoose2e').then((t) => t.normalize()).then((t) => t.draw({rollMode: MGMECommon._mgmeGetRollMode()}));
    });
  }

  static pumYesOrNoEven() {
    MGMEOracleUtils._mgmeMultipleTableOracle(
      [
        {name: 'Yes or No Question Even'},
        {name: 'Yes or No Answer Caveat'}
      ],
      'Question (even)',
      false
    );
  }

  static pumYesOrNoLikely() {
    MGMEOracleUtils._mgmeMultipleTableOracle(
      [
        {name: 'Yes or No Question Likely'},
        {name: 'Yes or No Answer Caveat'}
      ],
      'Question (likely)',
      false
    );
  }

  static pumYesOrNoUnlikely() {
    MGMEOracleUtils._mgmeMultipleTableOracle(
      [
        {name: 'Yes or No Question Unlikely'},
        {name: 'Yes or No Answer Caveat'}
      ],
      'Question (unlikely)',
      false
    );
  }

  static pumLooksArea() {
    MGMEOracleUtils._mgmeMultipleTableOracle([
      {name: 'Looks Adverb'},
      {name: 'Looks Area'}
    ], 'Looks (area)',
      false
    );
  }

  static pumLooksNPC() {
    MGMEOracleUtils._mgmeMultipleTableOracle([
      {name: 'Looks Adverb'},
      {name: 'Looks NPC'}
    ], 'Looks (npc)',
      false
    );
  }

  static pumLooksObject() {
    MGMEOracleUtils._mgmeMultipleTableOracle([
      {name: 'Looks Adverb'},
      {name: 'Looks Object'}
    ], 'Looks (object)',
      false
    );
  }

  static pumLooksItem() {
    MGMEOracleUtils._mgmeMultipleTableOracle([
          {name: 'Looks Adverb'},
          {name: 'Looks Item'}
        ], 'Looks (item)',
        false
    );
  }

  static pumLooksMonster() {
    MGMEOracleUtils._mgmeMultipleTableOracle([
          {name: 'Looks Adverb'},
          {name: 'Looks Monster'}
        ], 'Looks (monster)',
        false
    );
  }

  static pumWho() {
    MGMEOracleUtils._mgmeMultipleTableOracle([
        {key: 'Subject', name: 'Who Subject'},
        {key: 'Type', name: 'Who Type'}
      ], 'Who',
      false
    );
  }

  static pumWhat() {
    MGMEOracleUtils._mgmeMultipleTableOracle([
        {name: 'What Type'},
        {name: 'What Subject'}
      ], 'What',
      false
    );
  }

  static pumIntent() {
    MGMEOracleUtils._mgmeMultipleTableOracle([
      {key: 'They', name: 'Intent Do'},
      {name: 'Intent What'}
    ], 'Intent',
      false
    );
  }

  static pumActivity() {
    MGMEOracleUtils._mgmeMultipleTableOracle([
        {key: 'They are', name: 'Activity Do'},
        {name: 'Activity What'}
      ], 'Activity',
      false
    );
  }

  static pumReason() {
    MGMEOracleUtils._mgmeMultipleTableOracle([
        {name: 'Reason Action'},
        {name: 'Reason Motive'},
      ], 'Reason',
      false
    );
  }

}