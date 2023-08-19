import MGMEPanel from "./panel-base";
import '../style/panel-mythic.css'

export default class MGMETACPanel extends MGMEPanel {

  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      id: "tac_panel_window",
      title: 'The Adventure Crafter',
      template: "./modules/mythic-gme-tools/template/panel-adventure-crafter.hbs"
    });
  }

  getData() {
    return mergeObject(super.getData(), {
      rankValue: game.settings.get('mythic-gme-tools', 'currentChaos')
    });
  }

  activateListeners(html) {
    const api = game.modules.get('mythic-gme-tools').api;

    html.find("#mgme_panel_tac_pp").click(api.tacPlotPoint);
    html.find("#mgme_panel_tac_nc").click(api.tacNewCharacter);

    html.find("#mgme_panel_tac_chars").click(api.tacRenderCharactersList);
    html.find("#mgme_panel_tac_chars_roll").click(api.tacRollCharactersList);
    html.find("#mgme_panel_tac_plotlines").click(api.tacRenderPlotlinesList);
    html.find("#mgme_panel_tac_plotlines_roll").click(api.tacRollPlotlinesList);

  }
  
}