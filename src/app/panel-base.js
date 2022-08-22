import MGMEReference from "../utils/mgme-reference";

export default class MGMEPanel extends Application {

  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      popOut: true
    });
  }

  async close(options) {
    if (options?.force) {
      return super.close(options);
    }
  }

  _getHeaderButtons() {
    return [
      {
        label: "",
        class: "minimize",
        icon: "far fa-window-minimize",
        onclick: function () {
          if (this._minimized)
            this.maximize();
          else {
            this.minimize();
            //* Dirty hack to prevent "double minimize" after rapidly double-clicking on the minimize button
            var _bkpMinimize = this.minimize;
            this.minimize = () => {};
            setTimeout(() => {
              this.minimize = _bkpMinimize;
            }, 200)
          }
        }.bind(this)
      },
      {
        "label": game.i18n.localize('MGME.Export'),
        "class": "configure-sheet",
        "icon": "fas fa-book-open",
        "onclick": () => {
          const api = game.modules.get('mythic-gme-tools').api;
          api.mgmeExportChatToJournal();
        }
      },
      {
        "label": game.i18n.localize('MGME.PanelConfigureLabel'),
        "class": "export-to-journal",
        "icon": "fas fa-cog",
        "onclick": () => this._configurePanel()
      }
    ];
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
            if (panelSelection === 'nopanel') {
              new Dialog({
                title: "Mythic GME Tools",
                content: "<div>Mythic GME Tools Panel can be enabled again in Module Settings.</div>",
                buttons: {
                  submit: {
                    label: 'OK'
                  }
                }
              }).render(true, {width: 250})
            } else if (game.settings.get('mythic-gme-tools', 'panelKey') !== panelSelection) {
              game.settings.set('mythic-gme-tools', 'panelKey', panelSelection)
            }
          }
        }
      },
      default: "submit"
    });
    dialogue.render(true);
  }

}