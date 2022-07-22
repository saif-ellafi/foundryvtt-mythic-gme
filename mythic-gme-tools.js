import MGMECore from "./src/logic/mgme-core";
import MGMEVariations1 from "./src/logic/mgme-variations-1";
import MGMEVariations2 from "./src/logic/mgme-variations-2";
import MGMECards from "./src/logic/mgme-cards";
import MGMEMacroAPI from "./src/mgme-macros";
import MGMECrafterSeries from "./src/logic/mgme-crafter-series";
import PUMCore from "./src/logic/pum-core";

Hooks.once('ready', () => {

  MGMECore.initSettings();
  MGMEVariations1.initSettings();
  MGMEVariations2.initSettings();
  MGMECrafterSeries.initSettings();
  MGMECards.initSettings();

  game.modules.get('mythic-gme-tools').api = MGMEMacroAPI;

  MGMEMacroAPI.mgmeLaunchPanel();

});
