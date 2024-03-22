import MGMEPanel from "./panel-base";

export default class PUMPanel extends MGMEPanel {

  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      id: "pum_panel_window",
      title: 'Plot Unfolding Machine',
      template: "./modules/mythic-gme-tools/template/panel-pum.hbs"
    });
  }

  activateListeners(html) {
    const api = game.modules.get('mythic-gme-tools').api;

    html.find("#pum_sd").click(api.pumScenePrompt);
    html.find("#pum_ex").click(api.pumExpectationChecker);
    html.find("#pum_cd").click(api.pumSceneDiscovery);
    html.find("#pum_hs").click(api.pumSceneRisk);

    html.find("#pum_chll").click(api.pumChallenge);
    html.find("#pum_circ").click(api.pumCircumstance);
    html.find("#pum_contx").click(api.pumContext);
    html.find("#pum_compc").click(api.pumComplication);

    html.find("#pum_qqe").click(api.pumYesOrNoEven);
    html.find("#pum_qql").click(api.pumYesOrNoLikely);
    html.find("#pum_qqu").click(api.pumYesOrNoUnlikely);

    html.find("#pum_area").click(api.pumLooksArea);
    html.find("#pum_npc").click(api.pumLooksNPC);
    html.find("#pum_obj").click(api.pumLooksObject);

    html.find("#pum_who").click(api.pumWho);
    html.find("#pum_subj").click(api.pumSubject);
    html.find("#pum_wha").click(api.pumWhat);

    html.find("#pum_in").click(api.pumIntent);
    html.find("#pum_act").click(api.pumActivity);
    html.find("#pum_re").click(api.pumReason);

    html.find("#pum_kindi").click(api.pumKindOfItem);
    html.find("#pum_kinda").click(api.pumKindOfAbility);
    html.find("#pum_kindp").click(api.pumKindOfPerson);
    html.find("#pum_kinde").click(api.pumKindOfEnemy);
    html.find("#pum_kindd").click(api.pumKindOfDanger);

  }

}