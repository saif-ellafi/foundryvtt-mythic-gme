import MGMECore from "./logic/mgme-core";
import MGMEVariations1 from "./logic/mgme-variations-1";
import MGMEVariations2 from "./logic/mgme-variations-2";
import MGMECards from "./logic/mgme-cards";
import MGMEChatExtras from "./logic/mgme-chat-extras";
import MGMEOracleBuilder from "./logic/mgme-oracle-builder";
import MGMECrafterSeries from "./logic/mgme-crafter-series";
import MGME1ePanel from "./app/panel-mythic-gme-1e";
import MGME2ePanel from "./app/panel-mythic-gme-2e";
import MGMEVars1Panel from "./app/panel-mythic-vars1";
import MGMEVars2Panel from "./app/panel-mythic-vars2";
import PUMCore from "./logic/pum-core";
import PUMPanel from "./app/panel-pum";
import SUMCore from "./logic/sum-core";
import GUMPanel from "./app/panel-gum";
import GUMCore from "./logic/gum-core";
import MGMECore2e from "./logic/mgme-core-2e";

export default class MGMEMacroAPI {
  static mgmeIncreaseChaos = MGMECore.mgmeIncreaseChaos;
  static mgmeDecreaseChaos = MGMECore.mgmeDecreaseChaos;
  static mgmeCheckChaos = MGMECore.mgmeCheckChaos;
  static mgmeFateChart = MGMECore.mgmeFateChart;
  static mgmeRandomEvent = MGMECore.mgmeRandomEvent;
  static mgmeFocusCheck = MGMECore.mgmeFocusCheck;
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

  static mgmeRngLocCrafterPPShift = MGMECrafterSeries.mgmeRngLocCrafterPPShift;
  static mgmeRngLocCrafter = MGMECrafterSeries.mgmeRngLocCrafter;

  static mgmeDealCard = MGMECards.mgmeDealCard;

  static mgmeExportChatToJournal = MGMEChatExtras.mgmeExportChatToJournal;
  static mgmeFormattedChat = MGMEChatExtras.mgmeFormattedChat;
  static mgmeExternalRollTable = MGMEChatExtras.mgmeExternalRollTable;
  static mgmeFlavoredRollTable = MGMEChatExtras.mgmeFlavoredRollTable;

  static mgmeOracleBuilder = MGMEOracleBuilder.mgmeOracleBuilder;
  static mgmePrepareCustomOracleQuestion = MGMEOracleBuilder.mgmePrepareCustomOracleQuestion;

  static mgmeRenderNPCsList = MGMEChatExtras.mgmeRenderNPCsList;
  static mgmeRollNPCsList = MGMEChatExtras.mgmeRollNPCsList;
  static mgmeRenderThreadsList = MGMEChatExtras.mgmeRenderThreadsList;
  static mgmeRollThreadsList = MGMEChatExtras.mgmeRollThreadsList;

  static mgmeRenderNPCsList2e = MGMECore2e.mgmeRenderNPCsList2e;
  static mgmeRollNPCsList2e = MGMECore2e.mgmeRollNPCsList2e;
  static mgmeRenderThreadsList2e = MGMECore2e.mgmeRenderThreadsList2e;
  static mgmeRollThreadsList2e = MGMECore2e.mgmeRollThreadsList2e;

  static mgmeLaunchPanel() {
    if (game.settings.get('mythic-gme-tools', 'panelPermission') === 'onlygm' && !game.user.isGM) {
      return
    }
    const key = game.settings.get('mythic-gme-tools', 'panelKey');
    const api = game.modules.get('mythic-gme-tools').api;
    if (api.win) {
      api.win?.close({force: true});
      delete api.win;
    }
    if (key === 'nopanel') return;
    let winWidth = 400;
    let minHeight = 320;
    let maxHeight = undefined;
    let resizable = false;
    let win;
    switch (key) {
      case 'mgme_1e': {
        win = new MGME1ePanel();
        break;
      }
      case 'mgme_2e': {
        win = new MGME2ePanel();
        minHeight = 375;
        maxHeight = 300;
        winWidth = 420;
        resizable = true;
        break;
      }      
      case 'mgme_vars1': {
        win = new MGMEVars1Panel();
        break;
      }
      case 'mgme_vars2': {
        win = new MGMEVars2Panel();
        break;
      }
      case 'pum_core': {
        win = new PUMPanel();
        minHeight = 275;
        maxHeight = 250;
        winWidth = 420;
        resizable = true;
        break;
      }
      case 'gum_core': {
        win = new GUMPanel();
        minHeight = 275;
        maxHeight = 250;
        winWidth = 420;
        resizable = true;
        break;
      }
    }
    win?.render(true, {
      width: winWidth,
      left: (canvas.app.screen.width - ui.sidebar.element.width() - winWidth - 20),
      top: canvas.app.screen.height - minHeight,
      height: maxHeight,
      resizable: resizable
    });
    api.win = win;
  }

  static pumScenePrompt = PUMCore.pumScenePrompt;
  static pumExpectationChecker = PUMCore.pumExpectationChecker;
  static pumChallenge = PUMCore.pumChallenge;
  static pumSceneDiscovery = PUMCore.pumSceneDiscovery;
  static pumSceneRisk = PUMCore.pumSceneRisk;
  static pumContext = PUMCore.pumContext;
  static pumComplication = PUMCore.pumComplication;
  static pumCircumstance = PUMCore.pumCircumstance;
  static pumYesOrNoEven = PUMCore.pumYesOrNoEven;
  static pumYesOrNoLikely = PUMCore.pumYesOrNoLikely;
  static pumYesOrNoUnlikely = PUMCore.pumYesOrNoUnlikely;
  static pumLooksArea = PUMCore.pumLooksArea;
  static pumLooksNPC = PUMCore.pumLooksNPC;
  static pumLooksObject = PUMCore.pumLooksObject;
  static pumWho = PUMCore.pumWho;
  static pumSubject = PUMCore.pumSubject;
  static pumWhat = PUMCore.pumWhat;
  static pumIntent = PUMCore.pumIntent;
  static pumActivity = PUMCore.pumActivity;
  static pumReason = PUMCore.pumReason;
  static pumKindOfItem = PUMCore.pumKindOfItem;
  static pumKindOfAbility = PUMCore.pumKindOfAbility;
  static pumKindOfPerson = PUMCore.pumKindOfPerson;
  static pumKindOfEnemy = PUMCore.pumKindOfEnemy;
  static pumKindOfDanger = PUMCore.pumKindOfDanger;

  static sumGMAction = (formula) => SUMCore.sumGMAction(formula);
  static sumGMFeedback = (formula) => SUMCore.sumGMFeedback(formula);
  static sumGMWorld = () => SUMCore.sumGMWorld();
  static sumNPCContribution = (formula) => SUMCore.sumNPCContribution(formula);
  static sumNPCBehavior = (formula) => SUMCore.sumNPCBehavior(formula);
  static sumNPCOpinion = (formula) => SUMCore.sumNPCOpinion(formula);
  static sumNPCAnswer = (formula) => SUMCore.sumNPCAnswer(formula);

  static sumAction = SUMCore.sumAction;
  static sumSubject = SUMCore.sumSubject;
  static sumAdjective = SUMCore.sumAdjective;

  static gumActionGood = GUMCore.gumActionGood;
  static gumActionEvil = GUMCore.gumActionEvil;
  static gumCombatBehavior = GUMCore.gumCombatBehavior;
  static gumCombatComposition = GUMCore.gumCombatComposition;
  static gumCombatConditions = GUMCore.gumCombatConditions;
  static gumCombatTactical = GUMCore.gumCombatTactical;
  static gumGMIntervention = GUMCore.gumGMIntervention;
  static gumGrandAction = GUMCore.gumGrandAction;
  static gumGrandDescriptor = GUMCore.gumGrandDescriptor;
  static gumGrandSubject = GUMCore.gumGrandSubject;
  static gumLocationDetActivity = GUMCore.gumLocationDetActivity;
  static gumLocationDetFeature = GUMCore.gumLocationDetFeature;
  static gumLocationDetInhabitants = GUMCore.gumLocationDetInhabitants;
  static gumLocationDetLooks = GUMCore.gumLocationDetLooks;
  static gumLocationDetPurpose = GUMCore.gumLocationDetPurpose;
  static gumLocationDetWorth = GUMCore.gumLocationDetWorth;
  static gumLocationIdBuilding = GUMCore.gumLocationIdBuilding;
  static gumLocationIdOutskirts = GUMCore.gumLocationIdOutskirts;
  static gumLocationIdSpace = GUMCore.gumLocationIdSpace;
  static gumLocationIdSpecial = GUMCore.gumLocationIdSpecial;
  static gumLocationIdUrban = GUMCore.gumLocationIdUrban;
  static gumLocationIdWilderness = GUMCore.gumLocationIdWilderness;
  static gumMotiveGood = GUMCore.gumMotiveGood;
  static gumMotiveEvil = GUMCore.gumMotiveEvil;

  static gumNPCWho = GUMCore.gumNPCWho;
  static gumNPCDetAttitude = GUMCore.gumNPCDetAttitude;
  static gumNPCDetEdge = GUMCore.gumNPCDetEdge;
  static gumNPCDetLooks = GUMCore.gumNPCDetLooks;
  static gumNPCDetQuirk = GUMCore.gumNPCDetQuirk;
  static gumNPCDetStuff = GUMCore.gumNPCDetStuff;
  static gumNPCDetWants = GUMCore.gumNPCDetWants;
  static gumNPCIdCivilian = GUMCore.gumNPCIdCivilian;
  static gumNPCIdConnected = GUMCore.gumNPCIdConnected;
  static gumNPCIdFighting = GUMCore.gumNPCIdFighting;
  static gumNPCIdSkilled = GUMCore.gumNPCIdSkilled;
  static gumNPCIdSpecial = GUMCore.gumNPCIdSpecial;
  static gumNPCIdVIP = GUMCore.gumNPCIdVIP;

  static gumPlanCheckSafe = GUMCore.gumPlanCheckSafe;
  static gumPlanCheckRisky = GUMCore.gumPlanCheckRisky;
  static gumPlanCheckTense = GUMCore.gumPlanCheckTense;
  static gumPlanCheckExploding = GUMCore.gumPlanCheckExploding;

  static gumPlanCheckCircumstance = GUMCore.gumPlanCheckCircumstance;
  static gumPlanCheckComplication = GUMCore.gumPlanCheckComplication;
  static gumPlanCheckInconvenience = GUMCore.gumPlanCheckInconvenience;
  static gumPlanCheckProblem = GUMCore.gumPlanCheckProblem;

  static gumQuestionGM = (formula) => GUMCore.gumQuestionGM(formula);
  static gumQuestionPC = (formula) => GUMCore.gumQuestionPC(formula);
  static gumQuestionNPC = (formula) => GUMCore.gumQuestionNPC(formula);

  static gumSceneDesign = GUMCore.gumSceneDesign;
  static gumChallenge = GUMCore.gumChallenge;

}