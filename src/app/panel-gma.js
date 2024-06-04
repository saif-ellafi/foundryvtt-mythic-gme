import MGMEPanel from "./panel-base";

export default class GMAPanel extends MGMEPanel {

  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      id: "gma_panel_window",
      title: 'Game Master\'s Apprentice',
      template: "./modules/mythic-gme-tools/template/panel-gma.hbs"
    });
  }

  activateListeners(html) {
    const api = game.modules.get('mythic-gme-tools').api;

    html.find("#gma_base").click(() => api.gmaDraw('GMA Base Deck'));
    html.find("#gma_fantasy").click(() => api.gmaDraw('GMA Fantasy Deck'));
    html.find("#gma_horror").click(() => api.gmaDraw('GMA Horror Deck'));
    html.find("#gma_weird").click(() => api.gmaDraw('GMA Weird Horror Deck'));
    html.find("#gma_scifi").click(() => api.gmaDraw('GMA SciFi Deck'));
    html.find("#gma_cyberpunk").click(() => api.gmaDraw('GMA Cyberpunk Deck'));
    html.find("#gma_steampunk").click(() => api.gmaDraw('GMA Steampunk Deck'));
    html.find("#gma_sail").click(() => api.gmaDraw('GMA Age of Sail Deck'));
    html.find("#gma_demons").click(() => api.gmaDraw('GMA Demon Hunters Deck'));

  }

}