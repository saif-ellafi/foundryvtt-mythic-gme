import MGMECore from "./logic/mgme-core";
import MGMEVariations1 from "./logic/mgme-variations-1";
import MGMEVariations2 from "./logic/mgme-variations-2";
import MGMECards from "./logic/mgme-cards";
import MGMEChatExtras from "./logic/mgme-chat-extras";
import MGMEOracleBuilder from "./logic/mgme-oracle-builder";

export default class MGMEMacroAPI {
  static mgeIncreaseChaos = MGMECore.mgeIncreaseChaos;
  static mgeDecreaseChaos = MGMECore.mgeDecreaseChaos;
  static mgeCheckChaos = MGMECore.mgeCheckChaos;
  static mgeFateChart = MGMECore.mgeFateChart;
  static mgeRandomEvent = MGMECore.mgeRandomEvent;
  static mgeSceneAlteration = MGMECore.mgeSceneAlteration;

  static mgeComplexQuestion = MGMEVariations1.mgeComplexQuestion;
  static mgeBackstoryGenerator = MGMEVariations1.mgeBackstoryGenerator;

  static mgeFateCheck = MGMEVariations2.mgeFateCheck;
  static mgeEventCheck = MGMEVariations2.mgeEventCheck;
  static mgeDetailDescriptionCheck = MGMEVariations2.mgeDetailDescriptionCheck;
  static mgeDetailActionCheck = MGMEVariations2.mgeDetailActionCheck;
  static mgeStatisticCheck = MGMEVariations2.mgeStatisticCheck;
  static mgeBehaviorCheck = MGMEVariations2.mgeBehaviorCheck;
  static mgeDetailCheck = MGMEVariations2.mgeDetailCheck;

  static mgeDealCard = MGMECards.mgeDealCard;

  static mgeExportChatToJournal = MGMEChatExtras.mgeExportChatToJournal;
  static mgeFormattedChat = MGMEChatExtras.mgeFormattedChat;

  static mgeOracleBuilder = MGMEOracleBuilder.mgeOracleBuilder;
  static mgePrepareCustomOracleQuestion = MGMEOracleBuilder.mgePrepareCustomOracleQuestion;
}