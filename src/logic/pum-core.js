import MGMEOracleUtils from "../utils/mgme-oracle-utils";

export default class PUMCore {

  static pumScenePrompt() {
    MGMEOracleUtils._mgmeSimpleTableOracle(
      {name: 'Scene Prompt'},
      'Scene Type',
      false
    );
  }

  static pumExpectationChecker() {
    MGMEOracleUtils._mgmeSimpleTableOracle(
      {name: 'Expectation Checker'},
      'Expectation Checker',
      false
    );
  }

  static pumChallenge() {
    MGMEOracleUtils._mgmeMultipleTableOracle([
      {name: 'Scene Challenge', key: 'Skill'}
    ],
      'Scene Challenge',
      false
    );
  }

  static pumSceneDiscovery() {
    MGMEOracleUtils._mgmeMultipleTableOracle([
      {name: 'Scene Discovery', key: 'Discovery'},
    ],
      'Scene Discovery',
      false
    );
  }

  static pumSceneRisk() {
    MGMEOracleUtils._mgmeMultipleTableOracle([
        {name: 'Scene Risk', key: 'Risk'}
      ],
      'Scene Risk',
      false
    );
  }

  static pumContext() {
    MGMEOracleUtils._mgmeMultipleTableOracle([
        {name: 'Scene Catalyst'}
      ],
      'Scene Catalyst',
      false
    );
  }

  static pumComplication() {
    MGMEOracleUtils._mgmeMultipleTableOracle([
        {key: 'Target', name: 'Scene Subject'},
        {key: 'Is...', name: 'Scene Complication'}
    ],
      'Scene Complication',
      false
    );
  }

  static pumCircumstance() {
    MGMEOracleUtils._mgmeMultipleTableOracle([
      {key: 'Circumstance', name: 'Scene Circumstance'}
      ],
      'Scene Circumstance',
      false
    );
  }

  static pumYesOrNoEven() {
    MGMEOracleUtils._mgmeBuildOracleDialog('Question (even)', (input) => {
      MGMEOracleUtils._mgmeMultipleTableOracle(
          [
            {name: 'Yes or No Question Even'},
            {name: 'Yes or No Answer Caveat'}
          ],
          'Question (even)',
          false,
          input
      );
    });
  }

  static pumYesOrNoLikely() {
    MGMEOracleUtils._mgmeBuildOracleDialog('Question (likely)', (input) => {
      MGMEOracleUtils._mgmeMultipleTableOracle(
          [
            {name: 'Yes or No Question Likely'},
            {name: 'Yes or No Answer Caveat'}
          ],
          'Question (likely)',
          false,
          input
      );
    });
  }

  static pumYesOrNoUnlikely() {
    MGMEOracleUtils._mgmeBuildOracleDialog('Question (unlikely)', (input) => {
      MGMEOracleUtils._mgmeMultipleTableOracle(
          [
            {name: 'Yes or No Question Unlikely'},
            {name: 'Yes or No Answer Caveat'}
          ],
          'Question (unlikely)',
          false,
          input
      );
    });
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

  static pumWho() {
    MGMEOracleUtils._mgmeMultipleTableOracle([
        {key: 'Subject', name: 'Who Subject'},
        {key: 'Type', name: 'Who Type'}
      ], 'Who',
      false
    );
  }

  static pumSubject() {
    MGMEOracleUtils._mgmeSimpleTableOracle(
      {name: 'Scene Subject'},
      'Subject',
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

  static pumKindOfItem() {
    MGMEOracleUtils._mgmeSimpleTableOracle(
      {name: 'Kind of Item'},
      'Kind of Item',
      false
    );
  }

  static pumKindOfAbility() {
    MGMEOracleUtils._mgmeSimpleTableOracle(
      {name: 'Kind of Ability'},
      'Kind of Ability',
      false
    );
  }

  static pumKindOfPerson() {
    MGMEOracleUtils._mgmeSimpleTableOracle(
      {name: 'Kind of Person'},
      'Kind of Person',
      false
    );
  }

  static pumKindOfEnemy() {
    MGMEOracleUtils._mgmeSimpleTableOracle(
      {name: 'Kind of Enemy'},
      'Kind of Enemy',
      false
    );
  }

  static pumKindOfDanger() {
    MGMEOracleUtils._mgmeSimpleTableOracle(
      {name: 'Kind of Danger'},
      'Kind of Danger',
      false
    );
  }

}