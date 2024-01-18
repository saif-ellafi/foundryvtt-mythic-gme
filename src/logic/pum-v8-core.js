import MGMEOracleUtils from "../utils/mgme-oracle-utils";
import MGMEChatJournal from "../utils/mgme-chat-journal";
import MGMECommon from "../utils/mgme-common";

export default class PUMV8Core {

  static async adjustTable(table) {
    let size = table.results.size;
    if (size === 0 || size % 5 > 0) {
      let adjustBy = size === 0 ? 5 : (Math.ceil(size/5)*5) - size;
      let newResults = [];
      let i = 0;
      while (i < adjustBy - 1) {
        newResults.push({
          text: 'Choose or reroll',
          range: [size + i + 1, size + i + 1],
          weight: 1
        });
        i += 1;
      }
      // Add the last entry as to add new
      newResults.push({
        text: 'Add new or reroll',
        range: [size + i + 1, size + i + 1],
        weight: 1
      });
      await table.createEmbeddedDocuments('TableResult', newResults);
    }
    return table
  }

  static pumV8RandomPrompt() {
    MGMEOracleUtils._mgmeSimpleTableOracle(
      {name: 'PUM v8 - Random Prompt'},
      'Random Prompt',
      false
    );
  }

  static pumV8ModifiedProposal() {
    MGMEOracleUtils._mgmeSimpleTableOracle(
      {name: 'PUM v8 - Modified Proposal'},
      'Modified Proposal',
      false
    );
  }

  static pumV8Complication() {
    MGMEOracleUtils._mgmeSimpleTableOracle(
          {name: 'PUM v8 - Complication'},
        'Scene Complication',
        false
    );
  }

  static pumV8Catalyst() {
    MGMEOracleUtils._mgmeSimpleTableOracle(
          {name: 'PUM v8 - Catalyst'},
        'Scene Catalyst',
        false
    );
  }

  static pumV8Challenge() {
    MGMEOracleUtils._mgmeSimpleTableOracle(
      {name: 'PUM v8 - Challenge'},
      'Scene Challenge',
      false
    );
  }

  static pumV8Situation() {
    MGMEOracleUtils._mgmeSimpleTableOracle(
      {name: 'PUM v8 - Situation'},
      'Scene Situation',
      false
    );
  }

  static pumV8RenderAspectsList() {
    MGMEChatJournal._mgmeFindOrCreateRolltable('Game or world elements', 'PUM Plot Nodes').then(table => {
      PUMV8Core.adjustTable(table, 'MGME.TableResultChoose2e').then(t => t.normalize().then(t => t.sheet.render(true)));
    });
  }

  static pumV8RenderEncountersList() {
    MGMEChatJournal._mgmeFindOrCreateRolltable('Meaningful encounters', 'PUM Plot Nodes').then(table => {
      PUMV8Core.adjustTable(table, 'MGME.TableResultChoose2e').then(t => t.normalize().then(t => t.sheet.render(true)));
    });
  }

  static pumV8RenderFindsList() {
    MGMEChatJournal._mgmeFindOrCreateRolltable('Things to be found', 'PUM Plot Nodes').then(table => {
      PUMV8Core.adjustTable(table, 'MGME.TableResultChoose2e').then(t => t.normalize().then(t => t.sheet.render(true)));
    });
  }

  static pumV8RenderQuestionsList() {
    MGMEChatJournal._mgmeFindOrCreateRolltable('Pending questions', 'PUM Plot Nodes').then(table => {
      PUMV8Core.adjustTable(table, 'MGME.TableResultChoose2e').then(t => t.normalize().then(t => t.sheet.render(true)));
    });
  }

  static pumV8RollAspectsList() {
    MGMEChatJournal._mgmeFindOrCreateRolltable('Game or world elements', 'PUM Plot Nodes').then(table => {
      PUMV8Core.adjustTable(table, 'MGME.TableResultChoose2e').then((t) => t.normalize()).then((t) => t.draw({rollMode: MGMECommon._mgmeGetRollMode()}));
    });
  }

  static pumV8RollEncountersList() {
    MGMEChatJournal._mgmeFindOrCreateRolltable('Meaningful encounters', 'PUM Plot Nodes').then(table => {
      PUMV8Core.adjustTable(table, 'MGME.TableResultChoose2e').then((t) => t.normalize()).then((t) => t.draw({rollMode: MGMECommon._mgmeGetRollMode()}));
    });
  }

  static pumV8RollFindsList() {
    MGMEChatJournal._mgmeFindOrCreateRolltable('Things to be found', 'PUM Plot Nodes').then(table => {
      PUMV8Core.adjustTable(table, 'MGME.TableResultChoose2e').then((t) => t.normalize()).then((t) => t.draw({rollMode: MGMECommon._mgmeGetRollMode()}));
    });
  }

  static pumV8RollQuestionsList() {
    MGMEChatJournal._mgmeFindOrCreateRolltable('Pending questions', 'PUM Plot Nodes').then(table => {
      PUMV8Core.adjustTable(table, 'MGME.TableResultChoose2e').then((t) => t.normalize()).then((t) => t.draw({rollMode: MGMECommon._mgmeGetRollMode()}));
    });
  }

  static pumV8Subjective() {
    MGMEOracleUtils._mgmeSimpleTableOracle(
        {name: 'PUM v8 - Yes or No (Subjective)'},
        'Question (Subjective)',
        false
    );
  }

  static pumV8Deterministic() {
    MGMEOracleUtils._mgmeSimpleTableOracle(
        {name: 'PUM v8 - Yes or No (Deterministic)'},
        'Question (Deterministic)',
        false
    );
  }

  static pumV8Interaction() {
    MGMEOracleUtils._mgmeSimpleTableOracle(
        {name: 'PUM v8 - Yes or No (Interaction)'},
        'Question (Interaction)',
        false
    );
  }

  static pumV8Someone() {
    MGMEOracleUtils._mgmeSimpleTableOracle(
        {name: 'PUM v8 - Someone'},
        'Someone (who?)',
        false
    );
  }

  static pumV8Intent() {
    MGMEOracleUtils._mgmeSimpleTableOracle(
        {name: 'PUM v8 - Intent'},
        'Intent (want)',
        false
    );
  }

  static pumV8Activity() {
    MGMEOracleUtils._mgmeSimpleTableOracle(
        {name: 'PUM v8 - Activity'},
        'Activity (doing)',
        false
    );
  }

  static pumV8Place() {
    MGMEOracleUtils._mgmeSimpleTableOracle(
        {name: 'PUM v8 - Place'},
        'Place (where?)',
        false
    );
  }

  static pumV8Reason() {
    MGMEOracleUtils._mgmeSimpleTableOracle(
        {name: 'PUM v8 - Reason'},
        'Reason (why?)',
        false
    );
  }

  static pumV8Explain() {
    MGMEOracleUtils._mgmeSimpleTableOracle(
        {name: 'PUM v8 - Explain'},
        'Explain (how?)',
        false
    );
  }

  static pumV8Focus() {
    MGMEOracleUtils._mgmeSimpleTableOracle(
        {name: 'PUM v8 - Focus'},
        'Focus (what?)',
        false
    );
  }

  static pumV8HowMany() {
    MGMEOracleUtils._mgmeSimpleTableOracle(
        {name: 'PUM v8 - Quantifier (Many)'},
        'Quantifier (Many)',
        false
    );
  }

  static pumV8HowMuch() {
    MGMEOracleUtils._mgmeSimpleTableOracle(
        {name: 'PUM v8 - Quantifier (Much)'},
        'Quantifier (Much)',
        false
    );
  }

  static pumV8HowWell() {
    MGMEOracleUtils._mgmeSimpleTableOracle(
        {name: 'PUM v8 - Quantifier (Well)'},
        'Quantifier (Well)',
        false
    );
  }

  static pumV8HowHard() {
    MGMEOracleUtils._mgmeSimpleTableOracle(
        {name: 'PUM v8 - Quantifier (Hard)'},
        'Quantifier (Hard)',
        false
    );
  }

  static pumV8Time() {
    MGMEOracleUtils._mgmeSimpleTableOracle(
        {name: 'PUM v8 - Time'},
        'Time (when?)',
        false
    );
  }

  static pumV8Object() {
    MGMEOracleUtils._mgmeSimpleTableOracle(
        {name: 'PUM v8 - Object'},
        'Object (what for?)',
        false
    );
  }

  static pumV8Fight() {
    MGMEOracleUtils._mgmeSimpleTableOracle(
        {name: 'PUM v8 - Fight'},
        'Fight (skills)',
        false
    );
  }

  static pumV8Sense() {
    MGMEOracleUtils._mgmeSimpleTableOracle(
        {name: 'PUM v8 - Sense'},
        'Sense (perceive)',
        false
    );
  }

  static pumV8Discovery() {
    MGMEOracleUtils._mgmeSimpleTableOracle(
        {name: 'PUM v8 - Discovery'},
        'Discovery (find)',
        false
    );
  }

  static pumV8Stakes() {
    MGMEOracleUtils._mgmeSimpleTableOracle(
        {name: 'PUM v8 - Stakes'},
        'Stakes (risk)',
        false
    );
  }

  static pumV8Description() {
    MGMEOracleUtils._mgmeSimpleTableOracle(
        {name: 'PUM v8 - Description'},
        'Description (looks)',
        false
    );
  }

}