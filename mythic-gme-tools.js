const MYTHIC_GME_TOOLS_METADATA = {
  'Fate Chart': 0,
  'Random Event': 0,
  'Scene Alteration': 0,
  'Increase Chaos': 0,
  'Decrease Chaos': 0,
  'Complex Question': 0
}

function MYTHIC_GME_CHECK_VERSION(name, version) {
  if (MYTHIC_GME_TOOLS_METADATA[name] !== undefined && MYTHIC_GME_TOOLS_METADATA[name] > version) {
    let versionChat = {
      content: `<div style="color:red">
      <div>This Macro (${name}) is outdated!</div>
      <div>Please re-import from Mythic GME Tools Compendium!</div>
      </div>`
    };
    ChatMessage.create(versionChat);
  }
}

Hooks.once('init', () => {

  game.settings.register('mythic-gme-tools', 'currentChaos', {
    name: 'Chaos Rank',
    hint: 'Current Mythic GME Chaos Rank',
    scope: 'world',
    config: false,
    type: Number,
    default: 5
  });

  game.settings.register('mythic-gme-tools', 'focusTable', {
    name: 'Focus Table',
    hint: 'Table to use for Random Event focus. Falls back to default if not found.',
    scope: 'world',
    config: true,
    type: String,
    default: "Mythic GME: Event Focus"
  });

  game.settings.register('mythic-gme-tools', 'actionTable', {
    name: 'Action Table',
    hint: 'Table to use for Mythic GME Random Event action meaning. Falls back to default if not found.',
    scope: 'world',
    config: true,
    type: String,
    default: "Mythic GME: Action Meaning"
  });

  game.settings.register('mythic-gme-tools', 'subjectTable', {
    name: 'Subject Table',
    hint: 'Table to use for Mythic GME Random Event subject meaning. Falls back to default if not found.',
    scope: 'world',
    config: true,
    type: String,
    default: "Mythic GME: Subject Meaning"
  });

});