import MGMECore from "./logic/mgme-core";
import MGMEVariations1 from "./logic/mgme-variations-1";
import MGMEVariations2 from "./logic/mgme-variations-2";
import MGMECards from "./logic/mgme-cards";
import MGMEChatExtras from "./logic/mgme-chat-extras";
import MGMEOracleBuilder from "./logic/mgme-oracle-builder";
import MGMECrafterSeries from "./logic/mgme-crafter-series";

export default class MGMEMacroAPI {
  static mgmeIncreaseChaos = MGMECore.mgmeIncreaseChaos;
  static mgmeDecreaseChaos = MGMECore.mgmeDecreaseChaos;
  static mgmeCheckChaos = MGMECore.mgmeCheckChaos;
  static mgmeFateChart = MGMECore.mgmeFateChart;
  static mgmeRandomEvent = MGMECore.mgmeRandomEvent;
  static mgmeSceneAlteration = MGMECore.mgmeSceneAlteration;

  static mgmeComplexQuestion = MGMEVariations1.mgmeComplexQuestion;
  static mgmeBackstoryGenerator = MGMEVariations1.mgmeBackstoryGenerator;

  static mgmeFateCheck = MGMEVariations2.mgmeFateCheck;
  static mgmeEventCheck = MGMEVariations2.mgmeEventCheck;
  static mgmeDetailDescriptionCheck = MGMEVariations2.mgmeDetailDescriptionCheck;
  static mgmeDetailActionCheck = MGMEVariations2.mgmeDetailActionCheck;
  static mgmeStatisticCheck = MGMEVariations2.mgmeStatisticCheck;
  static mgmeBehaviorCheck = MGMEVariations2.mgmeBehaviorCheck;
  static mgmeDetailCheck = MGMEVariations2.mgmeDetailCheck;

  static mgmeRngLocCrafterPPInc = MGMECrafterSeries.mgmeRngLocCrafterPPInc;
  static mgmeRngLocCrafterPPDec = MGMECrafterSeries.mgmeRngLocCrafterPPDec;
  static mgmeRngLocCrafterPPReset = MGMECrafterSeries.mgmeRngLocCrafterPPReset;
  static mgmeRngLocCrafterPPStatus = MGMECrafterSeries.mgmeRngLocCrafterPPStatus;
  static mgmeRngLocCrafter = MGMECrafterSeries.mgmeRngLocCrafter;

  static mgmeDealCard = MGMECards.mgmeDealCard;

  static mgmeExportChatToJournal = MGMEChatExtras.mgmeExportChatToJournal;
  static mgmeFormattedChat = MGMEChatExtras.mgmeFormattedChat;
  static mgmeExternalRollTable = MGMEChatExtras.mgmeExternalRollTable;
  static mgmeFlavoredRollTable = MGMEChatExtras.mgmeFlavoredRollTable;

  static mgmeOracleBuilder = MGMEOracleBuilder.mgmeOracleBuilder;
  static mgmePrepareCustomOracleQuestion = MGMEOracleBuilder.mgmePrepareCustomOracleQuestion;
}