import MGMEOracleUtils from "../utils/mgme-oracle-utils";

export default class PUMCore {

  static pumSceneDesigner() {
    MGMEOracleUtils._mgmeSimpleTableOracle(
      {name: 'Scene Designer'},
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

  static pumChallengeDesigner() {
    MGMEOracleUtils._mgmeMultipleTableOracle([
      {name: 'Challenge Designer Skill', key: 'Skill'},
      {name: 'Challenge Designer Factor', key: 'Factor'}
    ],
      'Challenge Designer',
      false
    );
  }

  static pumHighStakes() {
    MGMEOracleUtils._mgmeMultipleTableOracle([
      {name: 'High Stakes Success', key: 'On Success'},
      {name: 'High Stakes Failure', key: 'On Failure'}
    ],
      'High Stakes',
      false
    );
  }

  static pumComplicationDesigner() {
    MGMEOracleUtils._mgmeMultipleTableOracle([
      {key: 'Target', name: 'Complications Designer Target'},
      {name: 'Complications Designer Circumstance'}
    ],
      'Complications Designer',
      false
    );
  }

  static pumCombatDesigner() {
    MGMEOracleUtils._mgmeSimpleTableOracle(
      {name: 'Combat Designer'},
      'Combat Designer',
      false
    );
  }

  static pumYesOrNoEven() {
    MGMEOracleUtils._mgmeBuildOracleDialog('Yes or No - even', (input) => {
      MGMEOracleUtils._mgmeSimpleTableOracle(
        {name: 'Yes or No Question Even'},
        'Question (even)',
        false,
        input
      );
    })
  }

  static pumYesOrNoLikely() {
    MGMEOracleUtils._mgmeBuildOracleDialog('Yes or No - likely', (input) => {
      MGMEOracleUtils._mgmeSimpleTableOracle(
        {name: 'Yes or No Question Likely'},
        'Question (likely)',
        false,
        input
      );
    })
  }

  static pumYesOrNoUnlikely() {
    MGMEOracleUtils._mgmeBuildOracleDialog('Yes or No - unlikely', (input) => {
      MGMEOracleUtils._mgmeSimpleTableOracle(
        {name: 'Yes or No Question Unlikely'},
        'Question (unlikely)',
        false,
        input
      );
    })
  }

  static pumHowMany() {
    MGMEOracleUtils._mgmeBuildOracleDialog('How many?', (input) => {
      MGMEOracleUtils._mgmeSimpleTableOracle(
        {name: 'How Many?'},
        'How Many?',
        false,
        input
      );
    })
  }

  static pumHowMuch() {
    MGMEOracleUtils._mgmeBuildOracleDialog('How much?', (input) => {
      MGMEOracleUtils._mgmeSimpleTableOracle(
        {name: 'How Much?'},
        'How Much?',
        false,
        input
      );
    })
  }

  static pumHowGood() {
    MGMEOracleUtils._mgmeBuildOracleDialog('How good?', (input) => {
      MGMEOracleUtils._mgmeSimpleTableOracle(
        {name: 'How Good?'},
        'How Good?',
        false,
        input
      );
    })
  }

  static pumHowHard() {
    MGMEOracleUtils._mgmeBuildOracleDialog('How hard?', (input) => {
      MGMEOracleUtils._mgmeSimpleTableOracle(
        {name: 'How Hard?'},
        'How Hard?',
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

  static pumWhat() {
    MGMEOracleUtils._mgmeBuildOracleDialog('What', (input) => {
      MGMEOracleUtils._mgmeMultipleTableOracle([
        {key: 'Type', name: 'What Type'},
        {key: 'Subject', name: 'What Subject'}
      ], 'What',
        false,
        input
      );
    })
  }

  static pumIntent() {
    MGMEOracleUtils._mgmeBuildOracleDialog('Intent', (input) => {
      MGMEOracleUtils._mgmeMultipleTableOracle([
        {key: 'They...', name: 'Intent Do'},
        {name: 'Intent Whose'},
        {name: 'Intent What'},
        {key: 'Because of...', name: 'Intent Reason'}
      ], 'What Question',
        false,
        input
      );
    })
  }

}