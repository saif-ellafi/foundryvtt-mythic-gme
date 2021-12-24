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
globalThis.mgeIncreaseChaos = MGMEMacroAPI.mgmeIncreaseChaos;
globalThis.mgeDecreaseChaos = MGMEMacroAPI.mgmeDecreaseChaos;
globalThis.mgeCheckChaos = MGMEMacroAPI.mgmeCheckChaos;
globalThis.mgeFateChart = MGMEMacroAPI.mgmeFateChart;
globalThis.mgeRandomEvent = MGMEMacroAPI.mgmeRandomEvent;
globalThis.mgeSceneAlteration = MGMEMacroAPI.mgmeSceneAlteration;

// Variations 1 Macros
globalThis.mgeComplexQuestion = MGMEMacroAPI.mgmeComplexQuestion;
globalThis.mgeBackstoryGenerator = MGMEMacroAPI.mgmeBackstoryGenerator;

// Variations 2 Macros
globalThis.mgeFateCheck = MGMEMacroAPI.mgmeFateCheck;
globalThis.mgeEventCheck = MGMEMacroAPI.mgmeEventCheck;
globalThis.mgeDetailDescriptionCheck = MGMEMacroAPI.mgmeDetailDescriptionCheck;
globalThis.mgeDetailActionCheck = MGMEMacroAPI.mgmeDetailActionCheck;
globalThis.mgeStatisticCheck = MGMEMacroAPI.mgmeStatisticCheck;
globalThis.mgeBehaviorCheck = MGMEMacroAPI.mgmeBehaviorCheck;
globalThis.mgeDetailCheck = MGMEMacroAPI.mgmeDetailCheck;

// Cards
globalThis.mgeDealCard = MGMEMacroAPI.mgmeDealCard;

// Extras
globalThis.mgeExportChatToJournal = MGMEMacroAPI.mgmeExportChatToJournal;
globalThis.mgeFormattedChat = MGMEMacroAPI.mgmeFormattedChat;

// Oracle Builder
globalThis.mgeOracleBuilder = MGMEMacroAPI.mgmeOracleBuilder;
globalThis.mgePrepareCustomOracleQuestion = MGMEMacroAPI.mgmePrepareCustomOracleQuestion;

/** --- */