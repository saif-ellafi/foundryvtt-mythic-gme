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
    html.find("#pum_cd").click(api.pumSceneGoal);
    html.find("#pum_hs").click(api.pumSceneRisk);

    html.find("#pum_intr").click(api.pumInteraction);
    html.find("#pum_circ").click(api.pumCircumstance);
    html.find("#pum_disc").click(api.pumDiscovery);
    html.find("#pum_revl").click(api.pumRevelation);

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

    html.find("#sum_gm0").click(api.sumGM0)
    html.find("#sum_gm1").click(api.sumGM1)
    html.find("#sum_gm2").click(api.sumGM2)
    html.find("#sum_gm3").click(api.sumGM3)

    html.find("#sum_npcd0").click(api.sumNPCD0)
    html.find("#sum_npcd1").click(api.sumNPCD1)
    html.find("#sum_npcd2").click(api.sumNPCD2)
    html.find("#sum_npcd3").click(api.sumNPCD3)

    html.find("#sum_npc0").click(api.sumNPC0)
    html.find("#sum_npc1").click(api.sumNPC1)
    html.find("#sum_npc2").click(api.sumNPC2)
    html.find("#sum_npc3").click(api.sumNPC3)

    html.find("#sum_act").click(api.sumAction)
    html.find("#sum_sub").click(api.sumSubject)
    html.find("#sum_adj").click(api.sumAdjective)

  }

}