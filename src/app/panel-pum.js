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

    html.find("#sum_gma").click(() => {
      const tension = $("input[name='scene_tension']:checked").val();
      if (tension === 'calm')
        api.sumGMAction('2d100dis')
      else if (tension === 'tense')
        api.sumGMAction('2d100adv')
      else
        api.sumGMAction('1d100')
    })
    html.find("#sum_gmf").click(() => {
      const tension = $("input[name='scene_tension']:checked").val();
      if (tension === 'calm')
        api.sumGMFeedback('2d20dis')
      else if (tension === 'tense')
        api.sumGMFeedback('2d20adv')
      else
        api.sumGMFeedback('1d20')
    })
    html.find("#sum_gmw").click(api.sumGMWorld)

    html.find("#sum_npcc").click(() => {
      const disposition = $("input[name='npc_disposition']:checked").val();
      if (disposition === 'friend')
        api.sumNPCContribution('2d100dis')
      else if (disposition === 'foe')
        api.sumNPCContribution('2d100adv')
      else
        api.sumNPCContribution('1d100')
    })
    html.find("#sum_npcb").click(() => {
      const disposition = $("input[name='npc_disposition']:checked").val();
      if (disposition === 'friend')
        api.sumNPCBehavior('2d20dis')
      else if (disposition === 'foe')
        api.sumNPCBehavior('2d20adv')
      else
        api.sumNPCBehavior('1d20')
    })
    html.find("#sum_npco").click(() => {
      const disposition = $("input[name='npc_disposition']:checked").val();
      if (disposition === 'friend')
        api.sumNPCOpinion('2d20dis')
      else if (disposition === 'foe')
        api.sumNPCOpinion('2d20adv')
      else
        api.sumNPCOpinion('1d20')
    })
    html.find("#sum_npca").click(() => {
      const disposition = $("input[name='npc_disposition']:checked").val();
      if (disposition === 'friend')
        api.sumNPCAnswer('2d20dis')
      else if (disposition === 'foe')
        api.sumNPCAnswer('2d20adv')
      else
        api.sumNPCAnswer('1d20')
    })

    html.find("#sum_act").click(api.sumAction)
    html.find("#sum_sub").click(api.sumSubject)
    html.find("#sum_adj").click(api.sumAdjective)

  }

}