import MGMECore from "./src/logic/mgme-core";
import MGMEVariations1 from "./src/logic/mgme-variations-1";
import MGMEVariations2 from "./src/logic/mgme-variations-2";
import MGMECards from "./src/logic/mgme-cards";
import MGMEMacroAPI from "./src/mgme-macros";

Hooks.once('ready', () => {

  MGMECore.initSettings();
  MGMEVariations1.initSettings();
  MGMEVariations2.initSettings();
  MGMECards.initSettings();

  game.modules.get('mythic-gme-tools').api = MGMEMacroAPI;

});

/** DEPRECATION DANGER - This is just here for retrcompatibility - Delete by V10? */

// Core Macros
globalThis.mgeIncreaseChaos = MGMEMacroAPI.mgeIncreaseChaos;
globalThis.mgeDecreaseChaos = MGMEMacroAPI.mgeDecreaseChaos;
globalThis.mgeCheckChaos = MGMEMacroAPI.mgeCheckChaos;
globalThis.mgeFateChart = MGMEMacroAPI.mgeFateChart;
globalThis.mgeRandomEvent = MGMEMacroAPI.mgeRandomEvent;
globalThis.mgeSceneAlteration = MGMEMacroAPI.mgeSceneAlteration;

// Variations 1 Macros
globalThis.mgeComplexQuestion = MGMEMacroAPI.mgeComplexQuestion;
globalThis.mgeBackstoryGenerator = MGMEMacroAPI.mgeBackstoryGenerator;

// Variations 2 Macros
globalThis.mgeFateCheck = MGMEMacroAPI.mgeFateCheck;
globalThis.mgeEventCheck = MGMEMacroAPI.mgeEventCheck;
globalThis.mgeDetailDescriptionCheck = MGMEMacroAPI.mgeDetailDescriptionCheck;
globalThis.mgeDetailActionCheck = MGMEMacroAPI.mgeDetailActionCheck;
globalThis.mgeStatisticCheck = MGMEMacroAPI.mgeStatisticCheck;
globalThis.mgeBehaviorCheck = MGMEMacroAPI.mgeBehaviorCheck;
globalThis.mgeDetailCheck = MGMEMacroAPI.mgeDetailCheck;

// Cards
globalThis.mgeDealCard = MGMEMacroAPI.mgeDealCard;

// Extras
globalThis.mgeExportChatToJournal = MGMEMacroAPI.mgeExportChatToJournal;
globalThis.mgeFormattedChat = MGMEMacroAPI.mgeFormattedChat;

// Oracle Builder
globalThis.mgeOracleBuilder = MGMEMacroAPI.mgeOracleBuilder;
globalThis.mgePrepareCustomOracleQuestion = MGMEMacroAPI.mgePrepareCustomOracleQuestion;

/** --- */