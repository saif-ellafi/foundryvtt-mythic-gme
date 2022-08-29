import MGMECore from "./logic/mgme-core";
import MGMEVariations1 from "./logic/mgme-variations-1";
import MGMEVariations2 from "./logic/mgme-variations-2";
import MGMECards from "./logic/mgme-cards";
import MGMEChatExtras from "./logic/mgme-chat-extras";
import MGMEOracleBuilder from "./logic/mgme-oracle-builder";
import MGMECrafterSeries from "./logic/mgme-crafter-series";
import MGMEBluePanel from "./app/panel-mythic-gme";
import MGMEVars1Panel from "./app/panel-mythic-vars1";
import MGMEVars2Panel from "./app/panel-mythic-vars2";
import PUMCore from "./logic/pum-core";
import PUMPanel from "./app/panel-pum";
import SUMCore from "./logic/sum-core";

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

  static mgmeLaunchPanel() {
    if (game.settings.get('mythic-gme-tools', 'panelPermission') === 'onlygm' && !game.user.isGM) {
      return
    }
    const api = game.modules.get('mythic-gme-tools').api;
    if (api.win) {
      api.win?.close({force: true});
      delete api.win;
    }
    const key = game.settings.get('mythic-gme-tools', 'panelKey');
    let winWidth = 400;
    let minHeight = 320;
    let win;
    switch (key) {
      case 'mgme_blue': {
        win = new MGMEBluePanel();
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
        winWidth = 550;
        minHeight = 520;
        win = new PUMPanel();
        break;
      }
    }
    win?.render(true, {
      width: winWidth,
      left: (canvas.app.screen.width - ui.sidebar.element.width() - winWidth - 20),
      top: canvas.app.screen.height - minHeight
    });
    api.win = win;
  }

  static pumSceneDesigner = PUMCore.pumSceneDesigner;
  static pumExpectationChecker = PUMCore.pumExpectationChecker;
  static pumChallengeDesigner = PUMCore.pumChallengeDesigner;
  static pumHighStakes = PUMCore.pumHighStakes;
  static pumComplicationDesigner = PUMCore.pumComplicationDesigner;
  static pumCombatDesigner = PUMCore.pumCombatDesigner;
  static pumYesOrNoEven = PUMCore.pumYesOrNoEven;
  static pumYesOrNoLikely = PUMCore.pumYesOrNoLikely;
  static pumYesOrNoUnlikely = PUMCore.pumYesOrNoUnlikely;
  static pumHowMany = PUMCore.pumHowMany;
  static pumHowMuch = PUMCore.pumHowMuch;
  static pumHowGood = PUMCore.pumHowGood;
  static pumHowHard = PUMCore.pumHowHard;
  static pumHowToDo = PUMCore.pumHowToDo;
  static pumLooksArea = PUMCore.pumLooksArea;
  static pumLooksNPC = PUMCore.pumLooksNPC;
  static pumLooksObject = PUMCore.pumLooksObject;
  static pumWho = PUMCore.pumWho;
  static pumWhat = PUMCore.pumWhat;
  static pumIntent = PUMCore.pumIntent;
  static pumActivity = PUMCore.pumActivity;
  static pumReason = PUMCore.pumReason;

  static sumGM0 = () => SUMCore.sumGM('1d20+0');
  static sumGM1 = () => SUMCore.sumGM('1d20+10');
  static sumGM2 = () => SUMCore.sumGM('1d20+20');
  static sumGM3 = () => SUMCore.sumGM('1d20+30');

  static sumNPCGood = SUMCore.sumNPCGood;
  static sumNPCBad = SUMCore.sumNPCBad;

  static sumNPC0 = () => SUMCore.sumNPC('1d20+0');
  static sumNPC1 = () => SUMCore.sumNPC('1d20+10');
  static sumNPC2 = () => SUMCore.sumNPC('1d20+20');
  static sumNPC3 = () => SUMCore.sumNPC('1d20+30');

  static sumAction = SUMCore.sumAction;
  static sumSubject = SUMCore.sumSubject;
  static sumAdjective = SUMCore.sumAdjective;

}