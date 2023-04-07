import MGMEOracleUtils from "../utils/mgme-oracle-utils";

export default class GUMCore {

  static gumActionGood() {
    MGMEOracleUtils._mgmeSimpleTableOracle(
        {name: 'GUM Actions, Good'},
        'NPC good action',
        false
    );
  }

  static gumActionEvil() {
    MGMEOracleUtils._mgmeSimpleTableOracle(
        {name: 'GUM Actions, Evil'},
        'NPC evil action',
        false
    );
  }

  static gumCombatBehavior() {
    MGMEOracleUtils._mgmeSimpleTableOracle(
        {name: 'GUM Combat, Behavior'},
        'Behavior in combat',
        false
    );
  }

  static gumCombatComposition() {
    MGMEOracleUtils._mgmeSimpleTableOracle(
        {name: 'GUM Combat, Composition'},
        'Enemy composition',
        false
    );
  }

  static gumCombatConditions() {
    MGMEOracleUtils._mgmeSimpleTableOracle(
        {name: 'GUM Combat, Conditions'},
        'Conflict conditions',
        false
    );
  }

  static gumCombatTactical() {
    MGMEOracleUtils._mgmeSimpleTableOracle(
        {name: 'GUM Combat, Tactical'},
        'Combat tactics',
        false
    );
  }

  static gumGMIntervention() {
    MGMEOracleUtils._mgmeSimpleTableOracle(
        {name: 'GUM GM Intervention'},
        'GM intervention check',
        false
    );
  }

  static gumGrandAction() {
    MGMEOracleUtils._mgmeSimpleTableOracle(
        {name: 'GUM Grand Oracle, Action'},
        'Action',
        false
    );
  }

  static gumGrandDescriptor() {
    MGMEOracleUtils._mgmeSimpleTableOracle(
        {name: 'GUM Grand Oracle, Descriptor'},
        'Descriptor',
        false
    );
  }

  static gumGrandSubject() {
    MGMEOracleUtils._mgmeSimpleTableOracle(
        {name: 'GUM Grand Oracle, Subject'},
        'Subject',
        false
    );
  }

  static gumLocationDetActivity() {
    MGMEOracleUtils._mgmeSimpleTableOracle(
        {name: 'GUM Location Detail, Activity'},
        'Activity of a location',
        false
    );
  }

  static gumLocationDetFeature() {
    MGMEOracleUtils._mgmeSimpleTableOracle(
        {name: 'GUM Location Detail, Feature'},
        'Feature of a location',
        false
    );
  }

  static gumLocationDetInhabitants() {
    MGMEOracleUtils._mgmeSimpleTableOracle(
        {name: 'GUM Location Detail, Inhabitants'},
        'Inhabitants of a location',
        false
    );
  }

  static gumLocationDetLooks() {
    MGMEOracleUtils._mgmeSimpleTableOracle(
        {name: 'GUM Location Detail, Looks'},
        'Looks of a location',
        false
    );
  }

  static gumLocationDetPurpose() {
    MGMEOracleUtils._mgmeSimpleTableOracle(
        {name: 'GUM Location Detail, Purpose'},
        'Purpose of a location',
        false
    );
  }

  static gumLocationDetWorth() {
    MGMEOracleUtils._mgmeSimpleTableOracle(
        {name: 'GUM Location Detail, Worth'},
        'Worth of a location',
        false
    );
  }

  static gumLocationIdBuilding() {
    MGMEOracleUtils._mgmeSimpleTableOracle(
        {name: 'GUM Location Identity, Building'},
        'Building location',
        false
    );
  }

  static gumLocationIdOutskirts() {
    MGMEOracleUtils._mgmeSimpleTableOracle(
        {name: 'GUM Location Identity, Outskirts'},
        'Outskirts location',
        false
    );
  }

  static gumLocationIdSpace() {
    MGMEOracleUtils._mgmeSimpleTableOracle(
        {name: 'GUM Location Identity, Space'},
        'Space location',
        false
    );
  }

  static gumLocationIdSpecial() {
    MGMEOracleUtils._mgmeSimpleTableOracle(
        {name: 'GUM Location Identity, Special'},
        'Special location',
        false
    );
  }

  static gumLocationIdUrban() {
    MGMEOracleUtils._mgmeSimpleTableOracle(
        {name: 'GUM Location Identity, Urban'},
        'Urban location',
        false
    );
  }

  static gumLocationIdWilderness() {
    MGMEOracleUtils._mgmeSimpleTableOracle(
        {name: 'GUM Location Identity, Wilderness'},
        'Wilderness location',
        false
    );
  }

  static gumMotiveGood() {
    MGMEOracleUtils._mgmeSimpleTableOracle(
        {name: 'GUM Motivation, Good'},
        'NPC good motivation',
        false
    );
  }

  static gumMotiveEvil() {
    MGMEOracleUtils._mgmeSimpleTableOracle(
        {name: 'GUM Motivation, Evil'},
        'NPC evil motivation',
        false
    );
  }

  static gumNPCWho() {
    MGMEOracleUtils._mgmeSimpleTableOracle(
        {name: 'GUM NPC, Who?'},
        'NPC, who?',
        false
    );
  }

  static gumNPCDetAttitude() {
    MGMEOracleUtils._mgmeSimpleTableOracle(
        {name: 'GUM NPC Detail, Attitude'},
        'NPC Attitude',
        false
    );
  }

  static gumNPCDetEdge() {
    MGMEOracleUtils._mgmeSimpleTableOracle(
        {name: 'GUM NPC Detail, Edge'},
        'NPC Edge',
        false
    );
  }

  static gumNPCDetLooks() {
    MGMEOracleUtils._mgmeSimpleTableOracle(
        {name: 'GUM NPC Detail, Looks'},
        'NPC Looks',
        false
    );
  }

  static gumNPCDetQuirk() {
    MGMEOracleUtils._mgmeSimpleTableOracle(
        {name: 'GUM NPC Detail, Quirk'},
        'NPC Quirk',
        false
    );
  }

  static gumNPCDetStuff() {
    MGMEOracleUtils._mgmeSimpleTableOracle(
        {name: 'GUM NPC Detail, Stuff'},
        'NPC Stuff',
        false
    );
  }

  static gumNPCDetWants() {
    MGMEOracleUtils._mgmeSimpleTableOracle(
        {name: 'GUM NPC Detail, Wants'},
        'NPC Wants',
        false
    );
  }

  static gumNPCIdCivilian() {
    MGMEOracleUtils._mgmeSimpleTableOracle(
        {name: 'GUM NPC Identity, Civilian'},
        'Civilian kind of NPC',
        false
    );
  }

  static gumNPCIdConnected() {
    MGMEOracleUtils._mgmeSimpleTableOracle(
        {name: 'GUM NPC Identity, Connected'},
        'Connected kind of NPC',
        false
    );
  }

  static gumNPCIdFighting() {
    MGMEOracleUtils._mgmeSimpleTableOracle(
        {name: 'GUM NPC Identity, Fighting'},
        'Fighting kind of NPC',
        false
    );
  }

  static gumNPCIdSkilled() {
    MGMEOracleUtils._mgmeSimpleTableOracle(
        {name: 'GUM NPC Identity, Skilled'},
        'Skilled kind of NPC',
        false
    );
  }

  static gumNPCIdSpecial() {
    MGMEOracleUtils._mgmeSimpleTableOracle(
        {name: 'GUM NPC Identity, Special'},
        'Special kind of NPC',
        false
    );
  }

  static gumNPCIdVIP() {
    MGMEOracleUtils._mgmeSimpleTableOracle(
        {name: 'GUM NPC Identity, VIP'},
        'VIP kind of NPC',
        false
    );
  }

  static gumPlanCheckSafe() {
    MGMEOracleUtils._mgmeSimpleTableOracle(
        {name: 'GUM Plan Check, Safe'},
        'Plan Check (safe)',
        false
    );
  }

  static gumPlanCheckRisky() {
    MGMEOracleUtils._mgmeSimpleTableOracle(
        {name: 'GUM Plan Check, Risky'},
        'Plan Check (risky)',
        false
    );
  }

  static gumPlanCheckTense() {
    MGMEOracleUtils._mgmeSimpleTableOracle(
        {name: 'GUM Plan Check, Tense'},
        'Plan Check (tense)',
        false
    );
  }

  static gumPlanCheckExploding() {
    MGMEOracleUtils._mgmeSimpleTableOracle(
        {name: 'GUM Plan Check, Exploding'},
        'Plan Check (exploding)',
        false
    );
  }

  static gumPlanCheckCircumstance() {
    MGMEOracleUtils._mgmeSimpleTableOracle(
        {name: 'GUM Plan Check, Circumstance'},
        'Plan alteration (circumstance)',
        false
    );
  }

  static gumPlanCheckComplication() {
    MGMEOracleUtils._mgmeSimpleTableOracle(
        {name: 'GUM Plan Check, Complication'},
        'Plan alteration (complication)',
        false
    );
  }

  static gumPlanCheckInconvenience() {
    MGMEOracleUtils._mgmeSimpleTableOracle(
        {name: 'GUM Plan Check, Inconvenience'},
        'Plan alteration (inconvenience)',
        false
    );
  }

  static gumPlanCheckProblem() {
    MGMEOracleUtils._mgmeSimpleTableOracle(
        {name: 'GUM Plan Check, Problem'},
        'Plan alteration (problem)',
        false
    );
  }

  static gumQuestionGM(formula) {
    MGMEOracleUtils._mgmeSimpleTableOracle(
        {name: 'GUM Question, GM', formula: formula},
        'Question as GM',
        false
    );
  }

  static gumQuestionPC(formula) {
    MGMEOracleUtils._mgmeSimpleTableOracle(
        {name: 'GUM Question, PC', formula: formula},
        'Question as PC',
        false
    );
  }

  static gumQuestionNPC(formula) {
    MGMEOracleUtils._mgmeSimpleTableOracle(
        {name: 'GUM Question, NPC', formula: formula},
        'Question to an NPC',
        false
    );
  }

  static gumSceneDesign() {
    MGMEOracleUtils._mgmeSimpleTableOracle(
        {name: 'GUM Scene Designer'},
        'Scene Design',
        false
    );
  }

  static gumChallenge() {
    MGMEOracleUtils._mgmeMultipleTableOracle([
      {name: 'GUM Challenge Skill Test', key: 'Skill'},
      {name: 'GUM Challenge Conditions', key: 'Condition'}
    ],
      'Scene Challenge',
      false
    );
  }

}