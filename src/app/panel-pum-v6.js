import MGMEPanel from "./panel-base";
import '../style/panel-pum6.css'

export default class PUMV6Panel extends MGMEPanel {

  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      id: "pum6_panel_window",
      title: 'Plot Unfolding Machine V6',
      template: "./modules/mythic-gme-tools/template/panel-pum-v6.hbs"
    });
  }

  activateListeners(html) {
    const api = game.modules.get('mythic-gme-tools').api;

    html.find("#pum6_panel_aspect").click(api.pumV6RenderAspectsList);
    html.find("#pum6_panel_aspect_roll").click(api.pumV6RollAspectsList);

    html.find("#pum6_panel_actor").click(api.pumV6RenderActorsList);
    html.find("#pum6_panel_actor_roll").click(api.pumV6RollActorsList);

    html.find("#pum6_panel_trouble").click(api.pumV6RenderTroublesList);
    html.find("#pum6_panel_trouble_roll").click(api.pumV6RollTroublesList);

    html.find("#pum6_panel_thread").click(api.pumV6RenderThreadsList);
    html.find("#pum6_panel_thread_roll").click(api.pumV6RollThreadsList);

    html.find("#pum_check").click(api.pumV6Check);
    html.find("#pum_prompt").click(api.pumV6Prompt);

    html.find("#pum_compc").click(api.pumV6Complication);
    html.find("#pum_cat").click(api.pumV6Catalyst);
    html.find("#pum_chll").click(api.pumV6Challenge);
    html.find("#pum_sit").click(api.pumV6Situation);

    html.find("#pum_qqe").click(api.pumYesOrNoEven);
    html.find("#pum_qql").click(api.pumYesOrNoLikely);
    html.find("#pum_qqu").click(api.pumYesOrNoUnlikely);

    html.find("#pum_area").click(api.pumLooksArea);
    html.find("#pum_npc").click(api.pumLooksNPC);
    html.find("#pum_obj").click(api.pumLooksObject);
    html.find("#pum_item").click(api.pumLooksItem);
    html.find("#pum_mon").click(api.pumLooksMonster);

    html.find("#pum_who").click(api.pumWho);
    html.find("#pum_wha").click(api.pumWhat);

    html.find("#pum_in").click(api.pumIntent);
    html.find("#pum_act").click(api.pumActivity);
    html.find("#pum_re").click(api.pumReason);

  }

}