import MGMEMythicPanel from "./panel-mythic-base";

export default class MGMEVars2Panel extends MGMEMythicPanel {

  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      id: "mgme_panel_window",
      template: "./modules/mythic-gme-tools/template/panel-mythic-vars2.hbs"
    });
  }

  activateListeners(html) {
    const api = game.modules.get('mythic-gme-tools').api;

    html.find("#mgme_panel_fc").click(api.mgmeFateCheck);
    html.find("#mgme_panel_sa").click(api.mgmeSceneAlteration);

    html.find("#mgme_panel_ec").click(api.mgmeEventCheck);
    html.find("#mgme_panel_dc").click(api.mgmeDetailCheck);


    html.find("#mgme_panel_ac").click(api.mgmeDetailActionCheck);
    html.find("#mgme_panel_desc").click(api.mgmeDetailDescriptionCheck);

    html.find("#mgme_panel_bc").click(api.mgmeBehaviorCheck);
    html.find("#mgme_panel_sc").click(api.mgmeStatisticCheck);

    html.find("#mgme_panel_ci").click(api.mgmeIncreaseChaos);
    html.find("#mgme_panel_cd").click(api.mgmeDecreaseChaos);
  }

}