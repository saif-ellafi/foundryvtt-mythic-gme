import MGMEPanel from "./panel-base";

export default class GUMPanel extends MGMEPanel {

  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      id: "gum_panel_window",
      title: 'Game Unfolding Machine',
      template: "./modules/mythic-gme-tools/template/panel-gum.hbs"
    });
  }

  activateListeners(html) {
    const api = game.modules.get('mythic-gme-tools').api;

    html.find("#gum_qqgm_n").click(() => {
      api.gumQuestionGM('2d20kl')
    })
    html.find("#gum_qqgm_u").click(() => {
      api.gumQuestionGM('1d20')
    })
    html.find("#gum_qqgm_y").click(() => {
      api.gumQuestionGM('2d20kh')
    })

    html.find("#gum_qqpc_n").click(() => {
      api.gumQuestionPC('2d20kl')
    })
    html.find("#gum_qqpc_u").click(() => {
      api.gumQuestionPC('1d20')
    })
    html.find("#gum_qqpc_y").click(() => {
      api.gumQuestionPC('2d20kh')
    })

    html.find("#gum_qqnpc_n").click(() => {
      api.gumQuestionNPC('2d20kl')
    })
    html.find("#gum_qqnpc_u").click(() => {
      api.gumQuestionNPC('1d20')
    })
    html.find("#gum_qqnpc_y").click(() => {
      api.gumQuestionNPC('2d20kh')
    })

    html.find("#gum_act").click(api.gumGrandAction);
    html.find("#gum_desc").click(api.gumGrandDescriptor);
    html.find("#gum_sub").click(api.gumGrandSubject);

    html.find("#gum_pc_safe").click(api.gumPlanCheckSafe);
    html.find("#gum_pc_risky").click(api.gumPlanCheckRisky);
    html.find("#gum_pc_tense").click(api.gumPlanCheckTense);
    html.find("#gum_pc_explo").click(api.gumPlanCheckExploding);

    html.find("#gum_pc_circ").click(api.gumPlanCheckCircumstance);
    html.find("#gum_pc_comp").click(api.gumPlanCheckComplication);
    html.find("#gum_pc_inc").click(api.gumPlanCheckInconvenience);
    html.find("#gum_pc_prob").click(api.gumPlanCheckProblem);

    html.find("#gum_intervention").click(api.gumGMIntervention);
    html.find("#gum_scene").click(api.gumSceneDesign);

    html.find("#gum_chskill").click(api.gumChallengeSkill);
    html.find("#gum_chsituation").click(api.gumChallengeSituation);
    html.find("#gum_chprompt").click(api.gumChallengePrompt);
    html.find("#gum_chcondition").click(api.gumChallengeCondition);

    html.find("#gum_combat_beh").click(api.gumCombatBehavior);
    html.find("#gum_combat_comp").click(api.gumCombatComposition);
    html.find("#gum_combat_cond").click(api.gumCombatConditions);
    html.find("#gum_combat_tac").click(api.gumCombatTactical);

    html.find("#gum_locid_build").click(api.gumLocationIdBuilding);
    html.find("#gum_locid_outs").click(api.gumLocationIdOutskirts);
    html.find("#gum_locid_space").click(api.gumLocationIdSpace);
    html.find("#gum_locid_special").click(api.gumLocationIdSpecial);
    html.find("#gum_locid_urban").click(api.gumLocationIdUrban);
    html.find("#gum_locid_wild").click(api.gumLocationIdWilderness);

    html.find("#gum_locdet_act").click(api.gumLocationDetActivity);
    html.find("#gum_locdet_feat").click(api.gumLocationDetFeature);
    html.find("#gum_locdet_inh").click(api.gumLocationDetInhabitants);
    html.find("#gum_locdet_looks").click(api.gumLocationDetLooks);
    html.find("#gum_locdet_purp").click(api.gumLocationDetPurpose);
    html.find("#gum_locdet_worth").click(api.gumLocationDetWorth);

    html.find("#gum_npcid_civ").click(api.gumNPCIdCivilian);
    html.find("#gum_npcid_conn").click(api.gumNPCIdConnected);
    html.find("#gum_npcid_fight").click(api.gumNPCIdFighting);
    html.find("#gum_npcid_skill").click(api.gumNPCIdSkilled);
    html.find("#gum_npcid_spec").click(api.gumNPCIdSpecial);
    html.find("#gum_npcid_vip").click(api.gumNPCIdVIP);

    html.find("#gum_npcdet_att").click(api.gumNPCDetAttitude);
    html.find("#gum_npcdet_edge").click(api.gumNPCDetEdge);
    html.find("#gum_npcdet_looks").click(api.gumNPCDetLooks);
    html.find("#gum_npcdet_quirk").click(api.gumNPCDetQuirk);
    html.find("#gum_npcdet_stuff").click(api.gumNPCDetStuff);
    html.find("#gum_npcdet_wants").click(api.gumNPCDetWants);

    html.find("#gum_mot_good").click(api.gumMotiveGood);
    html.find("#gum_mot_evil").click(api.gumMotiveEvil);
    html.find("#gum_npc_who").click(api.gumNPCWho);

    html.find("#gum_act_good").click(api.gumActionGood);
    html.find("#gum_act_evil").click(api.gumActionEvil);

    // GUM Extended

    html.find("#gume_probe_world").click(api.gumeProberWorld);
    html.find("#gume_probe_scene").click(api.gumeProberScene);
    html.find("#gume_scene_kick").click(api.gumeSceneKicker);

    html.find("#gume_interact_beh").click(api.gumeInteractionBehavior);
    html.find("#gume_interact_cont").click(api.gumeInteractionContribution);
    html.find("#gume_interact_req").click(api.gumeInteractionRequest);
    html.find("#gume_interact_res").click(api.gumeInteractionResponse);

    html.find("#gume_discovery_past").click(api.gumeDiscoveryPast);
    html.find("#gume_discovery_future").click(api.gumeDiscoveryFuture);
    html.find("#gume_discovery_clue").click(api.gumeDiscoveryClues);
    html.find("#gume_discovery_reason").click(api.gumeDiscoveryReason);

    html.find("#gume_enemy_event").click(api.gumeEnemyEvents);
    html.find("#gume_enemy_feeling").click(api.gumeEnemyFeelings);
    html.find("#gume_enemy_risk").click(api.gumeEnemyRisks);
    html.find("#gume_enemy_threat").click(api.gumeEnemyThreats);

  }

}