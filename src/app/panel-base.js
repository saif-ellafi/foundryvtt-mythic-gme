import MGMEReference from "../utils/mgme-reference";

export default class MGMEPanel extends Application {

  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      popOut: true,
      title: 'Mythic GM Emulator'
    });
  }

  async close(options) {
    if (options?.force) {
      return super.close(options);
    }
  }

  _getHeaderButtons() {
    return [{
      "label": game.i18n.localize('MGME.PanelConfigureLabel'),
      "class": "configure-sheet",
      "icon": "fas fa-cog",
      "onclick": () => this._configurePanel()
    }];
  }

  _configurePanel() {
    const configureDialog = `
      <form>
      <div style="margin-bottom: 5px;">
      <label for="panConfigure">${game.i18n.localize('MGME.PanelConfigureLayout')}:</label>
      <select name="panConfigure" id="mgme_pan_config" style="width: 308px;"></select>
      </div>
      </form>
    `;

    let dialogue = new Dialog({
      title: 'Configure Mythic GME Tools Panel',
      content: configureDialog,
      render: async function (html) {
        const panelKey = game.settings.get('mythic-gme-tools', 'panelKey')
        const panelSelect = html.find("#mgme_pan_config");
        for (const [key, value] of Object.entries(MGMEReference.MYTHIC_PANELS)) {
          panelSelect.append(`<option value=${key}>${value}</option>`);
        }
        html.find("#mgme_pan_config").val(panelKey);
      },
      buttons: {
        submit: {
          icon: '<i class="fas fa-comments"></i>',
          label: game.i18n.localize('MGME.PanelConfigureSubmit'),
          callback: (html) => {
            let panelSelection = html.find("#mgme_pan_config").val();
            game.settings.set('mythic-gme-tools', 'panelKey', panelSelection)
            const api = game.modules.get('mythic-gme-tools').api;
            return super.close().then(api.mgmeLaunchPanel);
          }
        }
      },
      default: "submit"
    });
    dialogue.render(true);
  }

}