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

  static CORE_ODDS_MAP = {
    'i': 'Impossible',
    'nw': 'No way',
    'vu': 'Very unlikely',
    'u': 'Unlikely',
    'ff': '50/50',
    'sl': 'Somewhat likely',
    'l': 'Likely',
    'vl': 'Very likely',
    'nst': 'Near sure thing',
    'ast': 'A sure thing',
    'htb': 'Has to be'
  }

  static VARIATIONS2_ODDS_MAP = {
    'imp': {label: 'Impossible', mod: -8},
    'nw': {label: 'No way', mod: -6},
    'vu': {label: 'Very unlikely', mod: -4},
    'u': {label: 'Unlikely', mod: -2},
    'ff': {label: '50/50', mod: 0},
    'l': {label: 'Likely', mod: 2},
    'vl': {label: 'Very likely', mod: 4},
    'st': {label: 'Sure thing', mod: 6},
    'htb': {label: 'Has to be', mod: 8}
  }

  static MGE_PROPS_TEMPLATES = {
    UNEXPECTED_EVENT: {
      purpose: 'Unexpected Random Event',
      tableSetting1: 'actionTable',
      tableSetting2: 'subjectTable'
    },
    INTERRUPTION_EVENT: {
      purpose: 'Interruption Event>',
      tableSetting1: 'actionTable',
      tableSetting2: 'subjectTable'
    },
    EVENT_QUESTION: {
      label: 'Random Event',
      placeholder: 'Reason',
      useFocusTable: true,
      tableSetting1: 'actionTable',
      tableSetting2: 'subjectTable'
    },
    EVENT_CHECK: {
      label: 'Event Check',
      placeholder: 'Reason',
      useFocusTable: true,
      tableSetting1: 'actionTable',
      tableSetting2: 'subjectTable'
    },
    COMPLEX_QUESTION: {
      label: 'Complex Question',
      placeholder: 'Question',
      useFocusTable: false,
      tableSetting1: 'actionTable',
      tableSetting2: 'subjectTable'
    },
    DESCRIPTION_QUESTION: {
      label: 'Detail Question',
      placeholder: 'Describe...',
      useFocusTable: false,
      tableSetting1: 'descriptionsAdvTable',
      tableSetting2: 'descriptionsAdjTable'
    },
    ACTION_QUESTION: {
      label: 'Action Question',
      placeholder: 'Action...',
      useFocusTable: false,
      tableSetting1: 'actionTable',
      tableSetting2: 'subjectTable'
    }
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
}