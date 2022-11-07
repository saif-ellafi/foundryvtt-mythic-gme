import MGMEOracleUtils from "../utils/mgme-oracle-utils";

export default class SUMCore {

  static sumGMAction(formula) {
    MGMEOracleUtils._mgmeSimpleTableOracle(
      {name: 'GM Action', formula: formula},
      'GM Action',
      false
    );
  }

  static sumGMFeedback(formula) {
    MGMEOracleUtils._mgmeSimpleTableOracle(
      {name: 'GM Feedback', formula: formula},
      'GM Feedback',
      false
    );
  }

  static sumGMWorld() {
    MGMEOracleUtils._mgmeSimpleTableOracle(
      {name: 'GM World'},
      'GM World',
      false
    );
  }

  static sumNPCContribution(formula) {
    MGMEOracleUtils._mgmeSimpleTableOracle(
      {name: 'NPC Contribution', formula: formula},
      'NPC Contribution',
      false
    );
  }

  static sumNPCBehavior(formula) {
    MGMEOracleUtils._mgmeSimpleTableOracle(
      {name: 'NPC Behavior', formula: formula},
      'NPC Behavior',
      false
    );
  }

  static sumNPCOpinion(formula) {
    MGMEOracleUtils._mgmeSimpleTableOracle(
      {name: 'NPC Opinion', formula: formula},
      'NPC Opinion',
      false
    );
  }

  static sumNPCAnswer(formula) {
    MGMEOracleUtils._mgmeSimpleTableOracle(
      {name: 'NPC Answer', formula: formula},
      'NPC Answer',
      false
    );
  }

  static sumAction() {
    MGMEOracleUtils._mgmeSimpleTableOracle(
      {name: 'Action, Motives, Desires'},
      'Action, Motives, Desires',
      false
    );
  }

  static sumSubject() {
    MGMEOracleUtils._mgmeSimpleTableOracle(
      {name: 'Subject, Topic, Matter'},
      'Subject, Topic, Matter',
      false
    );
  }

  static sumAdjective() {
    MGMEOracleUtils._mgmeSimpleTableOracle(
      {name: 'Adjective, Descriptors, Looks'},
      'Adjective, Descriptors, Looks',
      false
    );
  }

}