import MGMEPanel from "./panel-base";
import '../style/panel-mythic.css'
import MGMEBluePanel from "./panel-mythic-gme";

export default class MGME2ePanel extends MGMEBluePanel {

  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      id: "m2e_panel_window",
      title: 'Mythic GM Emulator 2e',
      template: "./modules/mythic-gme-tools/template/panel-mythic-gme-2e.hbs"
    });
  }
  
}