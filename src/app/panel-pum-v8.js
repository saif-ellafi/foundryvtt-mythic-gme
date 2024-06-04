import MGMEPanel from "./panel-base";
import '../style/panel-pum-v8.css'

export default class PUMV8Panel extends MGMEPanel {

  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      id: "pum8_panel_window",
      title: 'Plot Unfolding Machine v8',
      template: "./modules/mythic-gme-tools/template/panel-pum-v8.hbs"
    });
  }

  getD10Formula(elem) {
    const disposition = $(`input[name=${elem}]:checked`).val();
    let formula = '1d10';
    if (disposition === 'low')
      formula = '2d10kl'
    else if (disposition === 'high')
      formula = '2d10kh'
    return formula;
  }

  activateListeners(html) {
    const api = game.modules.get('mythic-gme-tools').api;

    html.find("#pum_modified").click(api.pumV8ModifiedProposal);
    html.find("#pum_rprompt").click(api.pumV8RandomPrompt);

    html.find("#pum_compc").click(api.pumV8Complication);
    html.find("#pum_cat").click(api.pumV8Catalyst);
    html.find("#pum_chll").click(api.pumV8Challenge);
    html.find("#pum_sit").click(api.pumV8Situation);

    html.find("#pum_qqs").click(() => {api.pumV8Subjective(this.getD10Formula('pum8_qqbias'))});
    html.find("#pum_qqd").click(() => {api.pumV8Deterministic(this.getD10Formula('pum8_qqbias'))});
    html.find("#pum_qqi").click(() => {api.pumV8Interaction(this.getD10Formula('pum8_qqbias'))});

    html.find("#pum_disd").click(api.pumV8Disruption);

    html.find("#pum_who").click(api.pumV8Someone);
    html.find("#pum_want").click(api.pumV8Intent);
    html.find("#pum_doing").click(api.pumV8Activity);

    html.find("#pum_where").click(api.pumV8Place);
    html.find("#pum_why").click(api.pumV8Reason);
    html.find("#pum_how").click(api.pumV8Explain);

    html.find("#pum_focus").click(api.pumV8Focus);

    html.find("#pum_qhma").click(() => {api.pumV8HowMany(this.getD10Formula('pum8_quantbias'))});
    html.find("#pum_qhw").click(() => {api.pumV8HowWell(this.getD10Formula('pum8_quantbias'))});
    html.find("#pum_qhh").click(() => {api.pumV8HowHard(this.getD10Formula('pum8_quantbias'))});

    html.find("#pum_when").click(api.pumV8Time);
    html.find("#pum_whatfor").click(api.pumV8Object);
    html.find("#pum_skill").click(api.pumV8Fight);

    html.find("#pum_perceive").click(api.pumV8Sense);
    html.find("#pum_find").click(api.pumV8Discovery);
    html.find("#pum_risk").click(api.pumV8Stakes);

    html.find("#pum_looks").click(api.pumV8Description);

    html.find("#pum8_panel_aspect_setup").click(api.pumV8RenderAspectsList);
    html.find("#pum8_panel_aspect_roll").click(api.pumV8RollAspectsList);

    html.find("#pum8_panel_encounter_setup").click(api.pumV8RenderEncountersList);
    html.find("#pum8_panel_encounter_roll").click(api.pumV8RollEncountersList);

    html.find("#pum8_panel_find_setup").click(api.pumV8RenderFindsList);
    html.find("#pum8_panel_find_roll").click(api.pumV8RollFindsList);

    html.find("#pum8_panel_question_setup").click(api.pumV8RenderQuestionsList);
    html.find("#pum8_panel_question_roll").click(api.pumV8RollQuestionsList);

  }

}