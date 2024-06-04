import MGMEReference from "../utils/mgme-reference";
import MGMECore from "../logic/mgme-core";
import MGMEVariations1 from "../logic/mgme-variations-1";
import MGMEVariations2 from "../logic/mgme-variations-2";
import MGMEMacroAPI from "../mgme-macros";

export default class MGMEPanel extends Application {

  constructor(secondary= false) {
    super();
    this.is_secondary_panel = secondary
  }

  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      popOut: true
    });
  }

  async close(options) {
    if (options?.force) {
      return super.close(options);
    }
  }

  _getHeaderButtons() {
    const buttons = [
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
    if (this.is_secondary_panel)
      buttons.push({
        "label": "",
        "class": "close",
        "icon": "fas fa-times",
        "onclick": () => this.close({force: true})
      });
    return buttons;
  }

  _configurePanel() {
    const configureDialog = `
      <form>
      <div style="margin-bottom: 5px;">
      <label for="panConfigure">${game.i18n.localize('MGME.PanelConfigureLayout')}:</label>
      <select name="panConfigure" id="mgme_pan_config" style="width: 308px;"></select>
      <div><input type="checkbox" name="open_separate" id="open_separate" style="position:relative;top:5px"><label for="open_separate">Open separately</label></div>
      <div style="text-align:right;margin-bottom:5px;margin-top:5px;font-size:11px"><a href="https://ko-fi.com/jeansenvaars">would you buy me a coffee?</a> :)</div>
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
            const api = game.modules.get('mythic-gme-tools').api;
            let panelSelection = html.find("#mgme_pan_config").val();
            if (panelSelection === 'nopanel') {
              if (api.win) {
                api.win?.close({force: true});
                delete api.win;
              }
              game.settings.set('mythic-gme-tools', 'panelKey', 'nopanel');
              new Dialog({
                title: "Mythic GME Tools",
                content: "<div>Mythic GME Tools Panel can be enabled again in Module Settings.</div>",
                buttons: {
                  submit: {
                    label: 'OK'
                  }
                }
              }).render(true, {width: 250})
            } else if ($("#open_separate").prop('checked')) {
              MGMEMacroAPI.mgmeRenderPanel(panelSelection, true);
            } else if (game.settings.get('mythic-gme-tools', 'panelKey') !== panelSelection) {
              game.settings.set('mythic-gme-tools', 'panelKey', panelSelection);
            }
          }
        }
      },
      default: "submit"
    });
    dialogue.render(true);
  }

}