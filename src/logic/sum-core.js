import MGMEOracleUtils from "../utils/mgme-oracle-utils";

export default class SUMCore {
  static sumGM(formula) {
    MGMEOracleUtils._mgmeSimpleTableOracle(
      {name: 'GM Actions', formula: formula},
      'GM Action: ' + formula,
      false
    );
  }

  static sumGMB() {
    MGMEOracleUtils._mgmeSimpleTableOracle(
      {name: 'GM Action Building'},
      'GM Action (Building)',
      false
    );
  }

  static sumGMT() {
    MGMEOracleUtils._mgmeSimpleTableOracle(
      {name: 'GM Action Tension'},
      'GM Action (Tension)',
      false
    );
  }

  static sumNPCG() {
    MGMEOracleUtils._mgmeSimpleTableOracle(
      {name: 'NPC Action Good'},
      'NPC Actions (Good)',
      false
    );
  }

  static sumNPCB() {
    MGMEOracleUtils._mgmeSimpleTableOracle(
      {name: 'NPC Action Bad'},
      'NPC Actions (Bad)',
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