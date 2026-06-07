import {DEFAULT_PANEL_KEYS, normalizePanelKeys, PANEL_DEFINITIONS, PANEL_WINDOW_WIDTH} from "./panel-registry";
import '../style/panel-mythic.css';
import '../style/panel-pum-v8.css';
import '../style/panel-oracles.css';

const {ApplicationV2, DialogV2, HandlebarsApplicationMixin} = foundry.applications.api;
const {renderTemplate} = foundry.applications.handlebars;

export default class MGMEPanel extends HandlebarsApplicationMixin(ApplicationV2) {

  static DEFAULT_OPTIONS = {
    id: "mgme_oracle_panel_window",
    classes: ["themed"],
    window: {
      title: "Mythic GME Tools",
      resizable: true,
      controls: [
        {
          icon: "fas fa-book-open",
          label: "MGME.Export",
          action: "exportChat"
        },
        {
          icon: "fas fa-cog",
          label: "MGME.PanelConfigureLabel",
          action: "configureTabs"
        }
      ]
    },
    position: {
      width: PANEL_WINDOW_WIDTH,
      height: 420
    },
    actions: {
      exportChat: MGMEPanel._onExportChat,
      configureTabs: MGMEPanel._onConfigureTabs
    }
  };

  static PARTS = {
    main: {
      template: "./modules/mythic-gme-tools/template/panel-oracles.hbs"
    }
  };

  constructor(panelKeys, options={}) {
    super(options);
    this.panelKeys = normalizePanelKeys(panelKeys ?? game.settings.get('mythic-gme-tools', 'panelKeys'));
    this.activePanelKey = this.panelKeys[0] ?? DEFAULT_PANEL_KEYS[0];
  }

  static _onExportChat() {
    game.modules.get('mythic-gme-tools').api.mgmeExportChatToJournal();
  }

  static _onConfigureTabs() {
    this._configurePanel();
  }

  async close(options={}) {
    if (options?.force) return super.close(options);
  }

  async _preClose(options) {
    if (!options?.force) return false;
  }

  _prePosition(position) {
    if (position.width < PANEL_WINDOW_WIDTH) {
      position.width = PANEL_WINDOW_WIDTH;
    }
    const definition = PANEL_DEFINITIONS[this.activePanelKey];
    if (definition?.height && position.height < definition.height) {
      position.height = definition.height;
    }
  }

  async _prepareContext(options) {
    const context = await super._prepareContext(options);
    const panels = [];
    for (const key of this.panelKeys) {
      const definition = PANEL_DEFINITIONS[key];
      if (!definition) continue;
      const data = definition.getData ? definition.getData() : {};
      panels.push({
        id: key,
        label: definition.label,
        shortLabel: definition.shortLabel,
        active: key === this.activePanelKey,
        content: await renderTemplate(definition.template, data)
      });
    }
    return foundry.utils.mergeObject(context, {
      hasPanels: panels.length > 0,
      panels: panels
    });
  }

  _onRender(context, options) {
    super._onRender(context, options);

    if (this.window?.close) this.window.close.hidden = true;

    if (!this.panelKeys.length) return;

    const root = this.window?.content ?? this.element;
    const api = game.modules.get('mythic-gme-tools').api;
    const tabNav = root.querySelector(".mgme-oracle-tabs");

    if (tabNav && this._tabNav !== tabNav) {
      tabNav.addEventListener("click", event => {
        const tab = event.target.closest(".mgme-tab-link");
        if (!tab) return;
        event.preventDefault();
        this._activateTab(tab.dataset.tab);
      });
      this._tabNav = tabNav;
    }

    for (const key of this.panelKeys) {
      const panel = root.querySelector(`.mgme-oracle-tab[data-tab="${key}"]`);
      PANEL_DEFINITIONS[key]?.bind(panel, api);
    }

    this._activateTab(this.activePanelKey);
  }

  _activateTab(panelKey) {
    if (!PANEL_DEFINITIONS[panelKey]) return;
    this.activePanelKey = panelKey;

    const root = this.window?.content ?? this.element;
    root.querySelectorAll(".mgme-tab-link").forEach(tab => {
      tab.classList.toggle("active", tab.dataset.tab === panelKey);
    });
    root.querySelectorAll(".mgme-oracle-tab").forEach(tab => {
      const isActive = tab.dataset.tab === panelKey;
      tab.classList.toggle("active", isActive);
      tab.hidden = !isActive;
    });

  }

  async _configurePanel() {
    const selectedKeys = new Set(this.panelKeys);
    const content = `
      <form>
        <p class="mgme-configure-tabs__hint">Enable one or more oracle systems as tabs in the panel.</p>
        <div class="mgme-configure-tabs">
          ${Object.values(PANEL_DEFINITIONS).map(panel => `
            <label class="mgme-configure-tabs__choice">
              <input type="checkbox" name="panelKeys" value="${panel.id}" ${selectedKeys.has(panel.id) ? 'checked' : ''}/>
              <span>${panel.label}</span>
            </label>
          `).join('')}
        </div>
        <div style="text-align:right;margin-bottom:5px;margin-top:5px;font-size:11px">
          <a href="https://ko-fi.com/jeansenvaars">Consider a donation</a> if you like this module :)
        </div>
      </form>
    `;

    await DialogV2.wait({
      rejectClose: false,
      window: {title: 'Configure Mythic GME Tools Panel'},
      content: content,
      buttons: [
        {
          action: 'submit',
          icon: 'fas fa-check',
          label: game.i18n.localize('MGME.PanelConfigureSubmit'),
          callback: async (_event, button) => {
            const form = button.form;
            const panelKeys = Array.from(form.querySelectorAll('input[name="panelKeys"]:checked')).map(input => input.value);
            if (!panelKeys.length) {
              ui.notifications.warn("Select at least one Mythic GME Tools tab.");
              return false;
            }
            await game.settings.set('mythic-gme-tools', 'panelKeys', panelKeys);
          },
          default: true
        }
      ]
    });
  }

}
