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

  static pumSceneGain() {
    MGMEOracleUtils._mgmeMultipleTableOracle([
      {name: 'Scene Gain', key: 'Gain'},
    ],
      'Scene Gain',
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
        {name: 'Scene Context'}
      ],
      'Scene Context',
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
    MGMEOracleUtils._mgmeBuildOracleDialog('Yes or No - even', (input) => {
      MGMEOracleUtils._mgmeMultipleTableOracle(
        [
          {name: 'Yes or No Question Even'},
          {name: 'Yes or No Answer Caveat'}
        ],
        'Question (even)',
        false,
        input
      );
    })
  }

  static pumYesOrNoLikely() {
    MGMEOracleUtils._mgmeBuildOracleDialog('Yes or No - likely', (input) => {
      MGMEOracleUtils._mgmeMultipleTableOracle(
        [
          {name: 'Yes or No Question Likely'},
          {name: 'Yes or No Answer Caveat'}
        ],
        'Question (likely)',
        false,
        input
      );
    })
  }

  static pumYesOrNoUnlikely() {
    MGMEOracleUtils._mgmeBuildOracleDialog('Yes or No - unlikely', (input) => {
      MGMEOracleUtils._mgmeMultipleTableOracle(
        [
          {name: 'Yes or No Question Unlikely'},
          {name: 'Yes or No Answer Caveat'}
        ],
        'Question (unlikely)',
        false,
        input
      );
    })
  }

  static pumLooksArea() {
    MGMEOracleUtils._mgmeBuildOracleDialog('Area looks', (input) => {
      MGMEOracleUtils._mgmeMultipleTableOracle([
        {name: 'Looks Adverb'},
        {name: 'Looks Area'}
      ], 'Looks (area)',
        false,
        input
      );
    })
  }

  static pumLooksNPC() {
    MGMEOracleUtils._mgmeBuildOracleDialog('NPC looks', (input) => {
      MGMEOracleUtils._mgmeMultipleTableOracle([
        {name: 'Looks Adverb'},
        {name: 'Looks NPC'}
      ], 'Looks (npc)',
        false,
        input
      );
    })
  }

  static pumLooksObject() {
    MGMEOracleUtils._mgmeBuildOracleDialog('Object looks', (input) => {
      MGMEOracleUtils._mgmeMultipleTableOracle([
        {name: 'Looks Adverb'},
        {name: 'Looks Object'}
      ], 'Looks (object)',
        false,
        input
      );
    })
  }

  static pumWho() {
    MGMEOracleUtils._mgmeBuildOracleDialog('Who', (input) => {
      MGMEOracleUtils._mgmeMultipleTableOracle([
          {key: 'Subject', name: 'Who Subject'},
          {key: 'Type', name: 'Who Type'}
        ], 'Who',
        false,
        input
      );
    })
  }

  static pumSubject() {
    MGMEOracleUtils._mgmeBuildOracleDialog('Subject', (input) => {
      MGMEOracleUtils._mgmeSimpleTableOracle(
        {name: 'Scene Subject'},
        'Subject',
        false
      );
    })
  }

  static pumWhat() {
    MGMEOracleUtils._mgmeBuildOracleDialog('What', (input) => {
      MGMEOracleUtils._mgmeMultipleTableOracle([
        {name: 'What Action'},
        {name: 'What Type'},
        {name: 'What Subject'}
      ], 'What',
        false,
        input
      );
    })
  }

  static pumIntent() {
    MGMEOracleUtils._mgmeBuildOracleDialog('Intent', (input) => {
      MGMEOracleUtils._mgmeMultipleTableOracle([
        {key: 'They', name: 'Intent Do'},
        {name: 'Intent What'}
      ], 'Intent',
        false,
        input
      );
    })
  }

  static pumActivity() {
    MGMEOracleUtils._mgmeBuildOracleDialog('Activity', (input) => {
      MGMEOracleUtils._mgmeMultipleTableOracle([
          {key: 'They are', name: 'Activity Do'},
          {name: 'Activity What'}
        ], 'Activity',
        false,
        input
      );
    })
  }

  static pumReason() {
    MGMEOracleUtils._mgmeBuildOracleDialog('Reason', (input) => {
      MGMEOracleUtils._mgmeMultipleTableOracle([
          {name: 'Reason Action'},
          {name: 'Reason Motive'},
        ], 'Reason',
        false,
        input
      );
    })
  }

  static pumKindOfItem() {
    MGMEOracleUtils._mgmeBuildOracleDialog('Kind of Item', (input) => {
      MGMEOracleUtils._mgmeSimpleTableOracle(
        {name: 'Kind of Item'},
        'Kind of Item',
        false
      );
    })
  }

  static pumKindOfAbility() {
    MGMEOracleUtils._mgmeBuildOracleDialog('Kind of Ability', (input) => {
      MGMEOracleUtils._mgmeSimpleTableOracle(
        {name: 'Kind of Ability'},
        'Kind of Ability',
        false
      );
    })
  }

  static pumKindOfPerson() {
    MGMEOracleUtils._mgmeBuildOracleDialog('Kind of Person', (input) => {
      MGMEOracleUtils._mgmeSimpleTableOracle(
        {name: 'Kind of Person'},
        'Kind of Person',
        false
      );
    })
  }

  static pumKindOfEnemy() {
    MGMEOracleUtils._mgmeBuildOracleDialog('Kind of Enemy', (input) => {
      MGMEOracleUtils._mgmeSimpleTableOracle(
        {name: 'Kind of Enemy'},
        'Kind of Enemy',
        false
      );
    })
  }

}