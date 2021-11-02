Hooks.once('init', () => {

  game.settings.register('mythic-gme-helper', 'currentChaos', {
    name: 'Chaos Rank',
    hint: 'Current Mythic GME Chaos Rank',
    scope: 'world',
    config: false,
    type: Number,
    default: 5
  });

  game.settings.register('mythic-gme-helper', 'focusTable', {
    name: 'Focus Table',
    hint: 'Table to use for Random Event focus. Falls back to default if not found.',
    scope: 'world',
    config: true,
    type: String,
    default: "Mythic GME: Event Focus"
  });

  game.settings.register('mythic-gme-helper', 'actionTable', {
    name: 'Action Table',
    hint: 'Table to use for Mythic GME Random Event action meaning. Falls back to default if not found.',
    scope: 'world',
    config: true,
    type: String,
    default: "Mythic GME: Action Meaning"
  });

  game.settings.register('mythic-gme-helper', 'subjectTable', {
    name: 'Subject Table',
    hint: 'Table to use for Mythic GME Random Event subject meaning. Falls back to default if not found.',
    scope: 'world',
    config: true,
    type: String,
    default: "Mythic GME: Subject Meaning"
  });

});