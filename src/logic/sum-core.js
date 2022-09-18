import MGMEOracleUtils from "../utils/mgme-oracle-utils";

export default class SUMCore {
  static sumGM(formula) {
    MGMEOracleUtils._mgmeSimpleTableOracle(
      {name: 'GM Actions', formula: formula},
      'GM Action: ' + formula,
      false
    );
  }

  static sumNPCD(formula) {
    MGMEOracleUtils._mgmeSimpleTableOracle(
      {name: 'NPC Disposition', formula: formula},
      'NPC Disposition: ' + formula,
      false
    );
  }

  static sumNPC(formula) {
    MGMEOracleUtils._mgmeSimpleTableOracle(
      {name: 'NPC Actions', formula: formula},
      'NPC Action: ' + formula,
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