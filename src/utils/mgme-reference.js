export default class MGMEReference {
  static FATE_CHART = {
    'i': {
      '9': 50,
      '8': 25,
      '7': 15,
      '6': 10,
      '5': 5,
      '4': 5,
      '3': 0,
      '2': 0,
      '1': -20
    },
    'nw': {
      '9': 75,
      '8': 50,
      '7': 35,
      '6': 25,
      '5': 15,
      '4': 10,
      '3': 5,
      '2': 5,
      '1': 0
    },
    'vu': {
      '9': 85,
      '8': 65,
      '7': 50,
      '6': 45,
      '5': 25,
      '4': 15,
      '3': 10,
      '2': 5,
      '1': 5
    },
    'u': {
      '9': 90,
      '8': 75,
      '7': 55,
      '6': 50,
      '5': 35,
      '4': 20,
      '3': 15,
      '2': 10,
      '1': 5
    },
    'ff': {
      '9': 95,
      '8': 85,
      '7': 75,
      '6': 65,
      '5': 50,
      '4': 35,
      '3': 25,
      '2': 15,
      '1': 10
    },
    'sl': {
      '9': 95,
      '8': 90,
      '7': 85,
      '6': 80,
      '5': 65,
      '4': 50,
      '3': 45,
      '2': 25,
      '1': 20
    },
    'l': {
      '9': 100,
      '8': 95,
      '7': 90,
      '6': 85,
      '5': 75,
      '4': 55,
      '3': 50,
      '2': 35,
      '1': 25
    },
    'vl': {
      '9': 105,
      '8': 95,
      '7': 95,
      '6': 90,
      '5': 85,
      '4': 75,
      '3': 65,
      '2': 50,
      '1': 45
    },
    'nst': {
      '9': 115,
      '8': 100,
      '7': 95,
      '6': 95,
      '5': 90,
      '4': 80,
      '3': 75,
      '2': 55,
      '1': 50
    },
    'ast': {
      '9': 125,
      '8': 110,
      '7': 95,
      '6': 95,
      '5': 90,
      '4': 85,
      '3': 80,
      '2': 65,
      '1': 55
    },
    'htb': {
      '9': 145,
      '8': 130,
      '7': 100,
      '6': 100,
      '5': 95,
      '4': 95,
      '3': 90,
      '2': 85,
      '1': 80
    }
  }

  static FATE_CHART_2E = {
    'i': {
      '9': 50,
      '8': 35,
      '7': 25,
      '6': 15,
      '5': 10,
      '4': 5,
      '3': 1,
      '2': 1,
      '1': 1
    },
    'ni': {
      '9': 65,
      '8': 50,
      '7': 35,
      '6': 25,
      '5': 15,
      '4': 10,
      '3': 5,
      '2': 1,
      '1': 1
    },
    'vu': {
      '9': 75,
      '8': 65,
      '7': 50,
      '6': 35,
      '5': 25,
      '4': 15,
      '3': 10,
      '2': 5,
      '1': 1
    },
    'u': {
      '9': 85,
      '8': 75,
      '7': 65,
      '6': 50,
      '5': 35,
      '4': 25,
      '3': 15,
      '2': 10,
      '1': 5
    },
    'ff': {
      '9': 90,
      '8': 85,
      '7': 75,
      '6': 65,
      '5': 50,
      '4': 35,
      '3': 25,
      '2': 15,
      '1': 10
    },
    'l': {
      '9': 95,
      '8': 90,
      '7': 85,
      '6': 75,
      '5': 65,
      '4': 50,
      '3': 35,
      '2': 25,
      '1': 15
    },
    'vl': {
      '9': 99,
      '8': 95,
      '7': 90,
      '6': 85,
      '5': 75,
      '4': 65,
      '3': 50,
      '2': 35,
      '1': 25
    },
    'nc': {
      '9': 99,
      '8': 99,
      '7': 95,
      '6': 90,
      '5': 85,
      '4': 75,
      '3': 65,
      '2': 50,
      '1': 35
    },
    'c': {
      '9': 99,
      '8': 99,
      '7': 99,
      '6': 95,
      '5': 90,
      '4': 85,
      '3': 75,
      '2': 65,
      '1': 50
    }
  }

  static MYTHIC_PANELS = {
    'nopanel': 'Disabled',
    'mgme_1e': 'Mythic GM Emulator (Blue Book)',
    'mgme_2e': 'Mythic GM Emulator (2nd Edition)',
    'mgme_vars1': 'Mythic Variations 1 (Orange Book)',
    'mgme_vars2': 'Mythic Variations 2 (Green Book)',
    'gma_cards': 'Game Master\'s Apprentice (Cards)',
    'pum_core': 'Plot Unfolding Machine (free version)',
    'sum_core': 'Scene Unfolding Machine (free version)',
    'gum_core': 'Game Unfolding Machine (free version)',
    'pum8_core': 'Plot Unfolding Machine v8',
    'sum7_core': 'Scene Unfolding Machine v7',
    'gum2_core': 'Game Unfolding Machine v2'
  }

  static DIE_COLORS = {
    'black': 'Black',
    'white': 'White',
    'rainbow': 'Rainbow',
    'acid': 'Acid',
    'air': 'Air',
    'cold': 'Cold',
    'earth': 'Earth',
    'fire': 'Fire',
    'force': 'Force',
    'ice': 'Ice',
    'lightning': 'Lightning',
    'necrotic': 'Necrotic',
    'poison': 'Poison',
    'psychic': 'Psychic',
    'radiant': 'Radiant',
    'thunder': 'Thunder',
    'water': 'Water'
  }

  static ODDS_MAP_CORE = {
    'i': 'MGME.Impossible',
    'nw': 'MGME.NoWay',
    'vu': 'MGME.VeryUnlikely',
    'u': 'MGME.Unlikely',
    'ff': 'MGME.fiftyfifty',
    'sl': 'MGME.SomewhatLikely',
    'l': 'MGME.Likely',
    'vl': 'MGME.VeryLikely',
    'nst': 'MGME.NearSureThing',
    'ast': 'MGME.SureThing',
    'htb': 'MGME.HasToBe'
  }

  static ODDS_MAP_2E = {
    'i': {key: 'MGME.Impossible', mod: -5},
    'ni': {key: 'MGME.NearlyImpossible', mod: -4},
    'vu': {key: 'MGME.VeryUnlikely', mod: -2},
    'u': {key: 'MGME.Unlikely', mod: -1},
    'ff': {key: 'MGME.fiftyfifty', mod: 0},
    'l': {key: 'MGME.Likely', mod: 1},
    'vl': {key: 'MGME.VeryLikely', mod: 2},
    'nc': {key: 'MGME.NearlyCertain', mod: 4},
    'c': {key: 'MGME.Certain', mod: 5}
  }

  static ODDS_MAP_VARS2 = {
    'imp': {key: 'MGME.Impossible', mod: -8},
    'nw': {key: 'MGME.NoWay', mod: -6},
    'vu': {key: 'MGME.VeryUnlikely', mod: -4},
    'u': {key: 'MGME.Unlikely', mod: -2},
    'ff': {key: 'MGME.fiftyfifty', mod: 0},
    'l': {key: 'MGME.Likely', mod: 2},
    'vl': {key: 'MGME.VeryLikely', mod: 4},
    'st': {key: 'MGME.SureThing', mod: 6},
    'htb': {key: 'MGME.HasToBe', mod: 8}
  }

  static PROPS_TEMPLATES = {
    UNEXPECTED_EVENT: () => { return {
      label: game.i18n.localize('MGME.RandomEvent'),
      purpose: game.i18n.localize('MGME.UnexpectedRandomEvent'),
      tableSetting1: 'actionTable',
      tableSetting2: 'subjectTable'
    }},
    INTERRUPTION_EVENT: () => { return {
      label: game.i18n.localize('MGME.RandomEvent'),
      purpose: game.i18n.localize('MGME.UnexpectedInterruptionEvent'),
      tableSetting1: 'actionTable',
      tableSetting2: 'subjectTable'
    }},
    FOCUS_CHECK: () => { return {
      label: game.i18n.localize('MGME.EventFocus'),
      placeholder: game.i18n.localize('MGME.Reason'),
      useFocusTable: true
    }},
    EVENT_QUESTION: () => { return {
      label: game.i18n.localize('MGME.RandomEvent'),
      placeholder: game.i18n.localize('MGME.Reason'),
      useFocusTable: true,
      tableSetting1: 'actionTable',
      tableSetting2: 'subjectTable'
    }},
    EVENT_CHECK: () => { return {
      label: game.i18n.localize('MGME.EventCheck'),
      placeholder: game.i18n.localize('MGME.Reason'),
      useFocusTable: true,
      tableSetting1: 'actionTable',
      tableSetting2: 'subjectTable'
    }},
    COMPLEX_QUESTION: () => { return {
      label: game.i18n.localize('MGME.ComplexQuestion'),
      placeholder: game.i18n.localize('MGME.Question'),
      useFocusTable: false,
      tableSetting1: 'actionTable',
      tableSetting2: 'subjectTable'
    }},
    DESCRIPTION_QUESTION: () => { return {
      label: game.i18n.localize('MGME.DescriptionQuestion'),
      placeholder: game.i18n.localize('MGME.Describe'),
      useFocusTable: false,
      tableSetting1: 'descriptionsAdvTable',
      tableSetting2: 'descriptionsAdjTable'
    }},
    ACTION_QUESTION: () => { return {
      label: game.i18n.localize('MGME.ActionQuestion'),
      placeholder: game.i18n.localize('MGME.Action'),
      useFocusTable: false,
      tableSetting1: 'actionTable',
      tableSetting2: 'subjectTable'
    }}
  }
}