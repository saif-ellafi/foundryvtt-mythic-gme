import MGMEPanel from "./panel-base";
import '../style/panel-pum-v8.css'

export default class SUMV6Panel extends MGMEPanel {

  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      id: "pum6_panel_window",
      title: 'Scene Unfolding Machine v6',
      template: "./modules/mythic-gme-tools/template/panel-sum-v6.hbs"
    });
  }

  activateListeners(html) {
    const api = game.modules.get('mythic-gme-tools').api;

    html.find("#sum6_ich").click(api.sumV6InterventionCheck);
    html.find("#sum6_acr").click(api.sumV6ActionsReaction);
    html.find("#sum6_livf").click(api.sumV6LivingFactions);

    html.find("#sum6_parm").click(api.sumV6ParallelMatters);
    html.find("#sum6_lingb").click(api.sumV6LingeringBackstories);
    html.find("#sum6_bondr").click(api.sumV6BondingRelations);

    html.find("#sum6_att").click(api.sumV6Attitude);
    html.find("#sum6_cont").click(api.sumV6Contribution);
    html.find("#sum6_opi").click(api.sumV6Opinion);

    html.find("#sum6_outi").click(api.sumV6OutsideImpression);
    html.find("#sum6_filler").click(api.sumV6FillerTalks);
    html.find("#sum6_tod").click(api.sumV6TruthOrDare);

  }

}