import MGMECore from "./scripts/mgme-core";
import MGMEVariations1 from "./scripts/mgme-variations-1";
import MGMEVariations2 from "./scripts/mgme-variations-2";
import MGMECards from "./scripts/mgme-cards";

Hooks.once('init', async () => {

  MGMECore.initSettings();
  MGMEVariations1.initSettings();
  MGMEVariations2.initSettings();
  MGMECards.initSettings();

});