import MGMEPanel from "./panel-base";

export default class SUMV7Panel extends MGMEPanel {

  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      id: "sum7_panel_window",
      title: 'Scene Unfolding Machine v7',
      template: "./modules/mythic-gme-tools/template/panel-sum-v7.hbs"
    });
  }

  getD20Formula() {
    const disposition = $("input[name='sum7_bias']:checked").val();
    let formula = '1d20';
    if (disposition === 'favorable')
      formula = '2d20kl'
    else if (disposition === 'unfavorable')
      formula = '2d20kh'
    return formula;
}

  getD100Formula() {
    const disposition = $("input[name='sum7_bias']:checked").val();
    let formula = '1d100';
    if (disposition === 'favorable')
      formula = '2d100kl'
    else if (disposition === 'unfavorable')
      formula = '2d100kh'
    return formula;
  }

  activateListeners(html) {
    const api = game.modules.get('mythic-gme-tools').api;
    html.find("#sum7_scop").click(() => {api.sumV7SceneOpener(this.getD20Formula())});
    html.find("#sum7_ich").click(() => {api.sumV7InterventionCheck(this.getD100Formula())});
    html.find("#sum7_acr").click(() => {api.sumV7ActionsReaction(this.getD20Formula())});

    html.find("#sum7_fire").click(() => {api.sumV7FirstReaction(this.getD20Formula())});
    html.find("#sum7_outi").click(() => {api.sumV7OutsideImpression(this.getD20Formula())});
    html.find("#sum7_filler").click(() => {api.sumV7FillerTalks(this.getD100Formula())});

    html.find("#sum7_perty").click(() => {api.sumV7PersonalityType(this.getD20Formula())});
    html.find("#sum7_cont").click(() => {api.sumV7PlotContribution(this.getD100Formula())});
    html.find("#sum7_opi").click(() => {api.sumV7OpinionResponse(this.getD20Formula())});

    html.find("#sum7_jobp").click(() => {api.sumV7JobProfession(this.getD20Formula())});
    html.find("#sum7_recan").click(() => {api.sumV7RecentAnecdote(this.getD100Formula())});
    html.find("#sum7_tod").click(() => {api.sumV7TruthOrDare(this.getD20Formula())});

    html.find("#sum7_parm").click(() => {api.sumV7ParallelMatters(this.getD20Formula())});
    html.find("#sum7_lingb").click(() => {api.sumV7LingeringBackstories(this.getD100Formula())});
    html.find("#sum7_bondr").click(() => {api.sumV7BondingRelations(this.getD20Formula())});

  }

}