import MGMEPanel from "./panel-base";

export default class SUMPanel extends MGMEPanel {

  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      id: "sum_panel_window",
      title: 'Scene Unfolding Machine',
      template: "./modules/mythic-gme-tools/template/panel-sum.hbs"
    });
  }

  activateListeners(html) {
    const api = game.modules.get('mythic-gme-tools').api;

    html.find("#sum_gma").click(() => {
      const tension = $("input[name='scene_tension']:checked").val();
      if (tension === 'calm')
        api.sumGMAction('2d100kl')
      else if (tension === 'tense')
        api.sumGMAction('2d100kh')
      else
        api.sumGMAction('1d100')
    })
    html.find("#sum_gmf").click(() => {
      const tension = $("input[name='scene_tension']:checked").val();
      if (tension === 'calm')
        api.sumGMFeedback('2d20kl')
      else if (tension === 'tense')
        api.sumGMFeedback('2d20kh')
      else
        api.sumGMFeedback('1d20')
    })
    html.find("#sum_gmw").click(api.sumGMWorld)

    html.find("#sum_npcc").click(() => {
      const disposition = $("input[name='npc_disposition']:checked").val();
      if (disposition === 'friend')
        api.sumNPCContribution('2d100kl')
      else if (disposition === 'foe')
        api.sumNPCContribution('2d100kh')
      else
        api.sumNPCContribution('1d100')
    })
    html.find("#sum_npcb").click(() => {
      const disposition = $("input[name='npc_disposition']:checked").val();
      if (disposition === 'friend')
        api.sumNPCBehavior('2d20kl')
      else if (disposition === 'foe')
        api.sumNPCBehavior('2d20kh')
      else
        api.sumNPCBehavior('1d20')
    })
    html.find("#sum_npco").click(() => {
      const disposition = $("input[name='npc_disposition']:checked").val();
      if (disposition === 'friend')
        api.sumNPCOpinion('2d20kl')
      else if (disposition === 'foe')
        api.sumNPCOpinion('2d20kh')
      else
        api.sumNPCOpinion('1d20')
    })
    html.find("#sum_npca").click(() => {
      const disposition = $("input[name='npc_disposition']:checked").val();
      if (disposition === 'friend')
        api.sumNPCAnswer('2d20kl')
      else if (disposition === 'foe')
        api.sumNPCAnswer('2d20kh')
      else
        api.sumNPCAnswer('1d20')
    })

    html.find("#sum_act").click(api.sumAction)
    html.find("#sum_sub").click(api.sumSubject)
    html.find("#sum_adj").click(api.sumAdjective)

  }

}