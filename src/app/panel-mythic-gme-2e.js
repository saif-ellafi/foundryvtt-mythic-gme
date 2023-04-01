import MGMEPanel from "./panel-base";
import '../style/panel-mythic.css'

export default class MGME2ePanel extends MGMEPanel {

  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      id: "m2e_panel_window",
      title: 'Mythic GME 2nd Edition',
      template: "./modules/mythic-gme-tools/template/panel-mythic-gme-2e.hbs"
    });
  }

  getData() {
    return mergeObject(super.getData(), {
      rankValue: game.settings.get('mythic-gme-tools', 'currentChaos')
    });
  }

  activateListeners(html) {
    const api = game.modules.get('mythic-gme-tools').api;

    html.find("#mgme_panel_fq").click(api.mgmeFateChart);
    html.find("#mgme_panel_sa").click(api.mgmeSceneAlteration);

    html.find("#mgme_panel_re").click(api.mgmeRandomEvent);
    html.find("#mgme_panel_fo").click(api.mgmeFocusCheck);

    html.find("#mgme_panel_npc").click(api.mgmeRenderNPCsList2e);
    html.find("#mgme_panel_npc_roll").click(api.mgmeRollNPCsList2e);
    html.find("#mgme_panel_thread").click(api.mgmeRenderThreadsList2e);
    html.find("#mgme_panel_thread_roll").click(api.mgmeRollThreadsList2e);

    html.find("#mgme_panel_ci").click(api.mgmeIncreaseChaos);
    html.find("#mgme_panel_cd").click(api.mgmeDecreaseChaos);
  }
  
}