import MGMEOracleUtils from "../utils/mgme-oracle-utils";

export default class SUMV7Core {

  static sumV7ActionsReaction(formula) {
    MGMEOracleUtils._mgmeSimpleTableOracle(
      {name: 'SUM v7 - Actions Reaction', formula: formula},
      'Action\'s reaction',
      false
    );
  }

  static sumV7FirstReaction(formula) {
    MGMEOracleUtils._mgmeSimpleTableOracle(
      {name: 'SUM v7 - First reaction', formula: formula},
      'First reaction',
      false
    );
  }

  static sumV7BondingRelations(formula) {
    MGMEOracleUtils._mgmeSimpleTableOracle(
      {name: 'SUM v7 - Bonding Relations', formula: formula},
      'Bonding relations',
      false
    );
  }

  static sumV7PlotContribution(formula) {
    MGMEOracleUtils._mgmeSimpleTableOracle(
      {name: 'SUM v7 - Plot contribution', formula: formula},
      'Plot contribution',
      false
    );
  }

  static sumV7FillerTalks(formula) {
    MGMEOracleUtils._mgmeSimpleTableOracle(
      {name: 'SUM v7 - Filler Talks', formula: formula},
      'Filler talks',
      false
    );
  }

  static sumV7InterventionCheck(formula) {
    MGMEOracleUtils._mgmeSimpleTableOracle(
      {name: 'SUM v7 - Intervention Check', formula: formula},
      'Intervention check',
      false
    );
  }

  static sumV7LingeringBackstories(formula) {
    MGMEOracleUtils._mgmeSimpleTableOracle(
      {name: 'SUM v7 - Lingering Backstories', formula: formula},
      'Lingering backstories',
      false
    );
  }

  static sumV7SceneOpener(formula) {
    MGMEOracleUtils._mgmeSimpleTableOracle(
      {name: 'SUM v7 - Scene opener', formula: formula},
      'Scene opener',
      false
    );
  }

  static sumV7OpinionResponse(formula) {
    MGMEOracleUtils._mgmeSimpleTableOracle(
      {name: 'SUM v7 - Opinion or response', formula: formula},
      'Opinion or response',
      false
    );
  }

  static sumV7PersonalityType(formula) {
    MGMEOracleUtils._mgmeSimpleTableOracle(
        {name: 'SUM v7 - Personality type', formula: formula},
        'Personality type',
        false
    );
  }

  static sumV7OutsideImpression(formula) {
    MGMEOracleUtils._mgmeSimpleTableOracle(
      {name: 'SUM v7 - Outside Impression', formula: formula},
      'Outside impression',
      false
    );
  }

  static sumV7ParallelMatters(formula) {
    MGMEOracleUtils._mgmeSimpleTableOracle(
        {name: 'SUM v7 - Parallel Matters', formula: formula},
        'Parallel matters',
        false
    );
  }

  static sumV7JobProfession(formula) {
    MGMEOracleUtils._mgmeSimpleTableOracle(
        {name: 'SUM v7 - Job or profession', formula: formula},
        'Job or profession',
        false
    );
  }

  static sumV7RecentAnecdote(formula) {
    MGMEOracleUtils._mgmeSimpleTableOracle(
        {name: 'SUM v7 - Recent anecdote', formula: formula},
        'Recent anecdote',
        false
    );
  }

  static sumV7TruthOrDare(formula) {
    MGMEOracleUtils._mgmeSimpleTableOracle(
        {name: 'SUM v7 - Truth or Dare', formula: formula},
        'Truth or dare',
        false
    );
  }

}