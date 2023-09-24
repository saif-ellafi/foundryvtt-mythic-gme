import MGMEOracleUtils from "../utils/mgme-oracle-utils";
import MGMEChatJournal from "../utils/mgme-chat-journal";
import MGMECommon from "../utils/mgme-common";

export default class GUMV2Core {

  static gum2Question(threshold) {
    const roll = Roll.create("1d20");
    roll.roll().then(result => {
      if (game.dice3d) {
        game.dice3d.showForRoll(result);
      }
      const whisper = MGMECommon._mgmeGetWhisperMode();
      if (result.result > 18) {
        MGMEChatJournal._mgmeCreateChatAndLog({
          flavor: 'Yes or No',
          content: `<div style="color:green"><b>STRONG YES</b> (${result.result})</div>`,
          whisper: whisper
        });
      } else if (result.result > threshold + 2) {
        MGMEChatJournal._mgmeCreateChatAndLog({
          flavor: 'Yes or No',
          content: `<div style="color:green"><b>Yes</b> (${result.result})</div>`,
          whisper: whisper
        });
      } else if (result.result > threshold) {
        MGMEChatJournal._mgmeCreateChatAndLog({
          flavor: 'Yes or No',
          content: `<div style="color:green">Weak yes (${result.result})</div>`,
          whisper: whisper
        });
      } else if (result.result < 3) {
        MGMEChatJournal._mgmeCreateChatAndLog({
          flavor: 'Yes or No',
          content: `<div style="color:red"><b>STRONG NO</b> (${result.result})</div>`,
          whisper: whisper
        });
      } else if (result.result < threshold - 2) {
        MGMEChatJournal._mgmeCreateChatAndLog({
          flavor: 'Yes or No',
          content: `<div style="color:red"><b>No</b> (${result.result})</div>`,
          whisper: whisper
        });
      } else {
        MGMEChatJournal._mgmeCreateChatAndLog({
          flavor: 'Yes or No',
          content: `<div style="color:red">Weak no (${result.result})</div>`,
          whisper: whisper
        });
      }
      if ([1, 10, 20].includes(Number(result.result))) {
        MGMEOracleUtils._mgmeSimpleTableOracle(
            {name: 'GUM V2 Intervention'},
            'Intervention!',
            false
        );
      }
    });
  }

  static gum2Intervention() {
    MGMEOracleUtils._mgmeSimpleTableOracle(
        {name: 'GUM V2 Intervention'},
        'Intervention event',
        false
    );
  }

  static gum2ExpLocation() {
    MGMEOracleUtils._mgmeSimpleTableOracle(
        {name: 'GUM V2 Exploration Location'},
        'Exploration location',
        false
    );
  }

  static gum2ExpSkill() {
    MGMEOracleUtils._mgmeSimpleTableOracle(
        {name: 'GUM V2 Exploration Skill Test'},
        'Exploration skill test',
        false
    );
  }

  static gum2ExpCircumstance() {
    MGMEOracleUtils._mgmeSimpleTableOracle(
        {name: 'GUM V2 Exploration Circumstances'},
        'Exploration Circumstances',
        false
    );
  }

  static gum2CombLocation() {
    MGMEOracleUtils._mgmeSimpleTableOracle(
        {name: 'GUM V2 Combat Location'},
        'Combat location',
        false
    );
  }

  static gum2CombTactics() {
    MGMEOracleUtils._mgmeSimpleTableOracle(
        {name: 'GUM V2 Combat Tactics'},
        'Combat tactics',
        false
    );
  }

  static gum2CombComposition() {
    MGMEOracleUtils._mgmeSimpleTableOracle(
        {name: 'GUM V2 Combat Composition'},
        'Combat enemy composition',
        false
    );
  }

  static gum2PlotClue() {
    MGMEOracleUtils._mgmeSimpleTableOracle(
        {name: 'GUM V2 Plot Clue Type'},
        'Clue type',
        false
    );
  }

  static gum2PlotFinding() {
    MGMEOracleUtils._mgmeSimpleTableOracle(
        {name: 'GUM V2 Plot Finding'},
        'Useful finding',
        false
    );
  }

  static gum2PlotActivities() {
    MGMEOracleUtils._mgmeSimpleTableOracle(
        {name: 'GUM V2 Plot Enemy Activities'},
        'Enemy activities',
        false
    );
  }

  static gum2PlotOccurrences() {
    MGMEOracleUtils._mgmeSimpleTableOracle(
        {name: 'GUM V2 Plot Occurrences'},
        'Recent occurrences',
        false
    );
  }

  static gum2NPCGAttitude() {
    MGMEOracleUtils._mgmeSimpleTableOracle(
        {name: 'GUM V2 NPC Attitude'},
        'NPC Attitude',
        false
    );
  }

  static gum2NPCGContribution() {
    MGMEOracleUtils._mgmeSimpleTableOracle(
        {name: 'GUM V2 NPC Contribution'},
        'NPC Contribution',
        false
    );
  }

  static gum2NPCGOpinion() {
    MGMEOracleUtils._mgmeSimpleTableOracle(
        {name: 'GUM V2 NPC Opinion'},
        'NPC Opinion',
        false
    );
  }

  static gum2NPCGWants() {
    MGMEOracleUtils._mgmeSimpleTableOracle(
        {name: 'GUM V2 NPC Wants'},
        'NPC Wants',
        false
    );
  }

  static gum2NPCEAttitude() {
    MGMEOracleUtils._mgmeSimpleTableOracle(
        {name: 'GUM V2 Enemy Attitude'},
        'Enemy attitude',
        false
    );
  }

  static gum2NPCEImpression() {
    MGMEOracleUtils._mgmeSimpleTableOracle(
        {name: 'GUM V2 Enemy Impression'},
        'Enemy impression',
        false
    );
  }

  static gum2NPCEDeeds() {
    MGMEOracleUtils._mgmeSimpleTableOracle(
        {name: 'GUM V2 Enemy Deeds'},
        'Enemy recent deeds',
        false
    );
  }

  static gum2NPCEIntentions() {
    MGMEOracleUtils._mgmeSimpleTableOracle(
        {name: 'GUM V2 Enemy Intentions'},
        'Enemy imminent intentions',
        false
    );
  }

  static gum2MotGoodMotive() {
    MGMEOracleUtils._mgmeSimpleTableOracle(
        {name: 'GUM V2 Good Motivations'},
        'Good motivations',
        false
    );
  }

  static gum2MotGoodActions() {
    MGMEOracleUtils._mgmeSimpleTableOracle(
        {name: 'GUM V2 Good Actions'},
        'Good actions',
        false
    );
  }

  static gum2MotEvilMotive() {
    MGMEOracleUtils._mgmeSimpleTableOracle(
        {name: 'GUM V2 Evil Motivations'},
        'Evil motivations',
        false
    );
  }

  static gum2MotEvilActions() {
    MGMEOracleUtils._mgmeSimpleTableOracle(
        {name: 'GUM V2 Evil Actions'},
        'Evil actions',
        false
    );
  }

  static gum2CharPossess() {
    MGMEOracleUtils._mgmeSimpleTableOracle(
        {name: 'GUM V2 Character Possessions'},
        'Character by possessions',
        false
    );
  }

  static gum2CharLooks() {
    MGMEOracleUtils._mgmeSimpleTableOracle(
        {name: 'GUM V2 Character Looks'},
        'Character by looks',
        false
    );
  }

  static gum2CharActivity() {
    MGMEOracleUtils._mgmeSimpleTableOracle(
        {name: 'GUM V2 Character Activity'},
        'Character by activity',
        false
    );
  }

  static gum2ObjFunction() {
    MGMEOracleUtils._mgmeSimpleTableOracle(
        {name: 'GUM V2 Object Function'},
        'Object by function',
        false
    );
  }

  static gum2LocFeature() {
    MGMEOracleUtils._mgmeSimpleTableOracle(
        {name: 'GUM V2 Location Feature'},
        'Location by feature',
        false
    );
  }

  static gum2LocWorth() {
    MGMEOracleUtils._mgmeSimpleTableOracle(
        {name: 'GUM V2 Location Worth'},
        'Location by worth',
        false
    );
  }

  static gum2LocPurpose() {
    MGMEOracleUtils._mgmeSimpleTableOracle(
        {name: 'GUM V2 Location Purpose'},
        'Location by purpose',
        false
    );
  }

  static gum2LocContent() {
    MGMEOracleUtils._mgmeSimpleTableOracle(
        {name: 'GUM V2 Location Content'},
        'Location by content',
        false
    );
  }

  static gum2ObjForm() {
    MGMEOracleUtils._mgmeSimpleTableOracle(
        {name: 'GUM V2 Object Form'},
        'Object by form',
        false
    );
  }

  static gum2ObjState() {
    MGMEOracleUtils._mgmeSimpleTableOracle(
        {name: 'GUM V2 Object State'},
        'Object by state',
        false
    );
  }

  static gum2FactionFocus() {
    MGMEOracleUtils._mgmeSimpleTableOracle(
        {name: 'GUM V2 Faction Focus'},
        'Faction driving focus',
        false
    );
  }

  static gum2FactionResource() {
    MGMEOracleUtils._mgmeSimpleTableOracle(
        {name: 'GUM V2 Faction Resources'},
        'Faction surpluses or needs',
        false
    );
  }

  static gum2PromptScene() {
    MGMEOracleUtils._mgmeSimpleTableOracle(
        {name: 'GUM V2 Prompt Scene'},
        'Prompt questions for scenes',
        false
    );
  }

  static gum2PromptWorld() {
    MGMEOracleUtils._mgmeSimpleTableOracle(
        {name: 'GUM V2 Prompt World'},
        'Prompt questions for world building',
        false
    );
  }

}