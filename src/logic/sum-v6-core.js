import MGMEOracleUtils from "../utils/mgme-oracle-utils";

export default class SUMV6Core {

  static sumV6ActionsReaction() {
    MGMEOracleUtils._mgmeSimpleTableOracle(
      {name: 'SUM v6 - Actions Reaction'},
      'Action\'s reaction',
      false
    );
  }

  static sumV6Attitude() {
    MGMEOracleUtils._mgmeSimpleTableOracle(
      {name: 'SUM v6 - Attitude'},
      'Attitude',
      false
    );
  }

  static sumV6BondingRelations() {
    MGMEOracleUtils._mgmeSimpleTableOracle(
      {name: 'SUM v6 - Bonding Relations'},
      'Bonding relations',
      false
    );
  }

  static sumV6Contribution() {
    MGMEOracleUtils._mgmeSimpleTableOracle(
      {name: 'SUM v6 - Contribution'},
      'Contribution',
      false
    );
  }

  static sumV6FillerTalks() {
    MGMEOracleUtils._mgmeSimpleTableOracle(
      {name: 'SUM v6 - Filler Talks'},
      'Filler talks',
      false
    );
  }

  static sumV6InterventionCheck() {
    MGMEOracleUtils._mgmeSimpleTableOracle(
      {name: 'SUM v6 - Intervention Check'},
      'Intervention check',
      false
    );
  }

  static sumV6LingeringBackstories() {
    MGMEOracleUtils._mgmeSimpleTableOracle(
      {name: 'SUM v6 - Lingering Backstories'},
      'Lingering backstories',
      false
    );
  }

  static sumV6LivingFactions() {
    MGMEOracleUtils._mgmeSimpleTableOracle(
      {name: 'SUM v6 - Living Factions'},
      'Living factions',
      false
    );
  }

  static sumV6Opinion() {
    MGMEOracleUtils._mgmeSimpleTableOracle(
      {name: 'SUM v6 - Opinion'},
      'Opinion',
      false
    );
  }

  static sumV6OutsideImpression() {
    MGMEOracleUtils._mgmeSimpleTableOracle(
      {name: 'SUM v6 - Outside Impression'},
      'Outside impression',
      false
    );
  }

  static sumV6ParallelMatters() {
    MGMEOracleUtils._mgmeSimpleTableOracle(
        {name: 'SUM v6 - Parallel Matters'},
        'Parallel materrs',
        false
    );
  }

  static sumV6TruthOrDare() {
    MGMEOracleUtils._mgmeSimpleTableOracle(
        {name: 'SUM v6 - Truth or Dare'},
        'Truth or dare',
        false
    );
  }

}