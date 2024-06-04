import MGMEPanel from "./panel-base";

export default class GUM2Panel extends MGMEPanel {

  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      id: "gum2_panel_window",
      title: 'Game Unfolding Machine v2',
      template: "./modules/mythic-gme-tools/template/panel-gum-v2.hbs"
    });
  }

  activateListeners(html) {
    const api = game.modules.get('mythic-gme-tools').api;

    html.find("#gum2_qqgm_n").click(() => api.gum2Question(14));
    html.find("#gum2_qqgm_u").click(() => api.gum2Question(10));
    html.find("#gum2_qqgm_y").click(() => api.gum2Question(6));

    html.find("#gum2_intervention").click(api.gum2Intervention);

    html.find("#gum2_action").click(api.gum2Action);
    html.find("#gum2_adjective").click(api.gum2Adjective);
    html.find("#gum2_subject").click(api.gum2Subject);

    html.find("#gum2_exp_loc").click(api.gum2ExpLocation);
    html.find("#gum2_exp_skill").click(api.gum2ExpSkill);
    html.find("#gum2_exp_circ").click(api.gum2ExpCircumstance);

    html.find("#gum2_comb_loc").click(api.gum2CombLocation);
    html.find("#gum2_comb_tact").click(api.gum2CombTactics);
    html.find("#gum2_comb_comp").click(api.gum2CombComposition);

    html.find("#gum2_plt_clue").click(api.gum2PlotClue);
    html.find("#gum2_plt_find").click(api.gum2PlotFinding);
    html.find("#gum2_plt_act").click(api.gum2PlotActivities);
    html.find("#gum2_plt_occ").click(api.gum2PlotOccurrences);

    html.find("#gum2_npcg_att").click(api.gum2NPCGAttitude);
    html.find("#gum2_npcg_cont").click(api.gum2NPCGContribution);
    html.find("#gum2_npcg_opi").click(api.gum2NPCGOpinion);
    html.find("#gum2_npcg_want").click(api.gum2NPCGWants);

    html.find("#gum2_npce_att").click(api.gum2NPCEAttitude);
    html.find("#gum2_npce_imp").click(api.gum2NPCEImpression);
    html.find("#gum2_npce_deed").click(api.gum2NPCEDeeds);
    html.find("#gum2_npce_int").click(api.gum2NPCEIntentions);

    html.find("#gum2_mot_gmot").click(api.gum2MotGoodMotive);
    html.find("#gum2_mot_gact").click(api.gum2MotGoodActions);
    html.find("#gum2_mot_emot").click(api.gum2MotEvilMotive);
    html.find("#gum2_mot_eact").click(api.gum2MotEvilActions);

    html.find("#gum2_char_poss").click(api.gum2CharPossess);
    html.find("#gum2_char_looks").click(api.gum2CharLooks);
    html.find("#gum2_char_act").click(api.gum2CharActivity);
    html.find("#gum2_char_int").click(api.gum2CharIntention);

    html.find("#gum2_cre_type").click(api.gum2CreatureType);
    html.find("#gum2_cre_abi").click(api.gum2CreatureAbility);
    html.find("#gum2_cre_beh").click(api.gum2CreatureBehavior);

    html.find("#gum2_loc_feat").click(api.gum2LocFeature);
    html.find("#gum2_loc_worth").click(api.gum2LocWorth);
    html.find("#gum2_loc_purp").click(api.gum2LocPurpose);
    html.find("#gum2_loc_cont").click(api.gum2LocContent);

    html.find("#gum2_obj_func").click(api.gum2ObjFunction);
    html.find("#gum2_obj_form").click(api.gum2ObjForm);
    html.find("#gum2_obj_state").click(api.gum2ObjState);

    html.find("#gum2_fact_focus").click(api.gum2FactionFocus);
    html.find("#gum2_fact_res").click(api.gum2FactionResource);

    html.find("#gum2_prompt_scene").click(api.gum2PromptScene);
    html.find("#gum2_prompt_world").click(api.gum2PromptWorld);

  }

}