import MGMEPanel from "./panel-base";
import '../style/panel-pum-v8.css'

export default class SUMV7Panel extends MGMEPanel {

  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      id: "pum6_panel_window",
      title: 'Scene Unfolding Machine v7',
      template: "./modules/mythic-gme-tools/template/panel-sum-v7.hbs"
    });
  }

  activateListeners(html) {
    const api = game.modules.get('mythic-gme-tools').api;

    html.find("#sum7_scop").click(api.sumV7SceneOpener);
    html.find("#sum7_ich").click(api.sumV7InterventionCheck);
    html.find("#sum7_acr").click(api.sumV7ActionsReaction);

    html.find("#sum7_fire").click(api.sumV7FirstReaction);
    html.find("#sum7_outi").click(api.sumV7OutsideImpression);
    html.find("#sum7_filler").click(api.sumV7FillerTalks);

    html.find("#sum7_perty").click(api.sumV7PersonalityType);
    html.find("#sum7_cont").click(api.sumV7PlotContribution);
    html.find("#sum7_opi").click(api.sumV7OpinionResponse);

    html.find("#sum7_jobp").click(api.sumV7JobProfession);
    html.find("#sum7_recan").click(api.sumV7RecentAnecdote);
    html.find("#sum7_tod").click(api.sumV7TruthOrDare);

    html.find("#sum7_parm").click(api.sumV7ParallelMatters);
    html.find("#sum7_lingb").click(api.sumV7LingeringBackstories);
    html.find("#sum7_bondr").click(api.sumV7BondingRelations);

  }

}