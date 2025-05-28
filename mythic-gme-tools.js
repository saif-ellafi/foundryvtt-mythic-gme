import MGMECore from "./src/logic/mgme-core";
import MGMECards from "./src/logic/mgme-cards";
import MGMEMacroAPI from "./src/mgme-macros";

Hooks.once('ready', () => {

  MGMECore.initSettings();
  MGMECards.initSettings();

  game.modules.get('mythic-gme-tools').api = MGMEMacroAPI;

  MGMEMacroAPI.mgmeLaunchPanel();

});
