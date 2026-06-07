function checkedValue(root, name) {
  return root.querySelector(`input[name="${name}"]:checked`)?.value;
}

function getPumD10Formula(root, name) {
  const disposition = checkedValue(root, name);
  if (disposition === 'low') return '2d10kl';
  if (disposition === 'high') return '2d10kh';
  return '1d10';
}

function getSumD20Formula(root) {
  const disposition = checkedValue(root, 'sum7_bias');
  if (disposition === 'favorable') return '2d20kl';
  if (disposition === 'unfavorable') return '2d20kh';
  return '1d20';
}

function getSumD100Formula(root) {
  const disposition = checkedValue(root, 'sum7_bias');
  if (disposition === 'favorable') return '2d100kl';
  if (disposition === 'unfavorable') return '2d100kh';
  return '1d100';
}

function bindClick(root, selector, callback) {
  root.querySelector(selector)?.addEventListener('click', callback);
}

export const PANEL_WINDOW_WIDTH = 470;

export const PANEL_DEFINITIONS = {
  mgme_2e: {
    id: 'mgme_2e',
    label: 'Mythic GM Emulator (2nd Edition)',
    shortLabel: 'Mythic',
    version: '2nd Edition',
    template: './modules/mythic-gme-tools/template/panel-mythic-gme-2e.hbs',
    width: PANEL_WINDOW_WIDTH,
    height: 420,
    getData: () => ({rankValue: game.settings.get('mythic-gme-tools', 'currentChaos')}),
    bind(root, api) {
      bindClick(root, '#mgme_panel_fq', api.mgmeFateChart);
      bindClick(root, '#mgme_panel_sa', api.mgmeSceneAlteration);
      bindClick(root, '#mgme_panel_re', api.mgmeRandomEvent);
      bindClick(root, '#mgme_panel_fo', api.mgmeFocusCheck);
      bindClick(root, '#mgme_panel_npc', api.mgmeRenderNPCsList2e);
      bindClick(root, '#mgme_panel_npc_roll', api.mgmeRollNPCsList2e);
      bindClick(root, '#mgme_panel_thread', api.mgmeRenderThreadsList2e);
      bindClick(root, '#mgme_panel_thread_roll', api.mgmeRollThreadsList2e);
      bindClick(root, '#mgme_panel_ci', api.mgmeIncreaseChaos);
      bindClick(root, '#mgme_panel_cd', api.mgmeDecreaseChaos);
      bindClick(root, '#mgme_el_actions', api.mgmeActions);
      bindClick(root, '#mgme_el_descriptions', api.mgmeDescriptions);
      bindClick(root, '#mgme_el_sceneadj', api.mgmeSceneAdjust);
      bindClick(root, '#mgme_el_atone', api.mgmeAdvTone);
      bindClick(root, '#mgme_el_aspecies', api.mgmeAlienSpecies);
      bindClick(root, '#mgme_el_aactions', api.mgmeAnimalActions);
      bindClick(root, '#mgme_el_army', api.mgmeArmyDescriptors);
      bindClick(root, '#mgme_el_cavern', api.mgmeCaverns);
      bindClick(root, '#mgme_el_characters', api.mgmeCharacters);
      bindClick(root, '#mgme_el_charcomb', api.mgmeCharacterCombat);
      bindClick(root, '#mgme_el_charact', api.mgmeCharacterActions);
      bindClick(root, '#mgme_el_charapp', api.mgmeCharacterAppearance);
      bindClick(root, '#mgme_el_charback', api.mgmeCharacterBackground);
      bindClick(root, '#mgme_el_charconv', api.mgmeCharacterConversation);
      bindClick(root, '#mgme_el_chardesc', api.mgmeCharacterDescriptors);
      bindClick(root, '#mgme_el_charid', api.mgmeCharacterIdentity);
      bindClick(root, '#mgme_el_charmot', api.mgmeCharacterMotivations);
      bindClick(root, '#mgme_el_charpers', api.mgmeCharacterPersonality);
      bindClick(root, '#mgme_el_charskills', api.mgmeCharacterSkills);
      bindClick(root, '#mgme_el_chartraits', api.mgmeCharacterTraits);
      bindClick(root, '#mgme_el_city', api.mgmeCityDescriptors);
      bindClick(root, '#mgme_el_civdesc', api.mgmeCivilizationDescriptors);
      bindClick(root, '#mgme_el_creatab', api.mgmeCreatureAbilities);
      bindClick(root, '#mgme_el_creatdes', api.mgmeCreatureDescriptors);
      bindClick(root, '#mgme_el_cmessage', api.mgmeCrypticMessage);
      bindClick(root, '#mgme_el_curses', api.mgmeCurses);
      bindClick(root, '#mgme_el_domicile', api.mgmeDomicile);
      bindClick(root, '#mgme_el_dungeon', api.mgmeDungeonDescriptors);
      bindClick(root, '#mgme_el_duntraps', api.mgmeDungeonTraps);
      bindClick(root, '#mgme_el_forest', api.mgmeForestDescriptors);
      bindClick(root, '#mgme_el_gods', api.mgmeGods);
      bindClick(root, '#mgme_el_legends', api.mgmeLegends);
      bindClick(root, '#mgme_el_location', api.mgmeLocations);
      bindClick(root, '#mgme_el_magicitem', api.mgmeMagicItem);
      bindClick(root, '#mgme_el_muts', api.mgmeMutationDescriptors);
      bindClick(root, '#mgme_el_charnames', api.mgmeNames);
      bindClick(root, '#mgme_el_noble', api.mgmeNobleHouse);
      bindClick(root, '#mgme_el_objects', api.mgmeObjects);
      bindClick(root, '#mgme_el_plottw', api.mgmePlotTwists);
      bindClick(root, '#mgme_el_powers', api.mgmePowers);
      bindClick(root, '#mgme_el_scavenge', api.mgmeScavengingResults);
      bindClick(root, '#mgme_el_smells', api.mgmeSmells);
      bindClick(root, '#mgme_el_sounds', api.mgmeSounds);
      bindClick(root, '#mgme_el_spells', api.mgmeSpellEffects);
      bindClick(root, '#mgme_el_starship', api.mgmeStarshipDescriptors);
      bindClick(root, '#mgme_el_terrain', api.mgmeTerrainDescriptors);
      bindClick(root, '#mgme_el_undead', api.mgmeUndeadDescriptors);
      bindClick(root, '#mgme_el_vandd', api.mgmeVisions);
    }
  },
  pum8_core: {
    id: 'pum8_core',
    label: 'Plot Unfolding Machine v8',
    shortLabel: 'PUM',
    version: 'v8',
    template: './modules/mythic-gme-tools/template/panel-pum-v8.hbs',
    width: PANEL_WINDOW_WIDTH,
    height: 250,
    bind(root, api) {
      bindClick(root, '#pum_modified', api.pumV8ModifiedProposal);
      bindClick(root, '#pum_rprompt', api.pumV8RandomPrompt);
      bindClick(root, '#pum_compc', api.pumV8Complication);
      bindClick(root, '#pum_cat', api.pumV8Catalyst);
      bindClick(root, '#pum_chll', api.pumV8Challenge);
      bindClick(root, '#pum_sit', api.pumV8Situation);
      bindClick(root, '#pum_qqs', () => api.pumV8Subjective(getPumD10Formula(root, 'pum8_qqbias')));
      bindClick(root, '#pum_qqd', () => api.pumV8Deterministic(getPumD10Formula(root, 'pum8_qqbias')));
      bindClick(root, '#pum_qqi', () => api.pumV8Interaction(getPumD10Formula(root, 'pum8_qqbias')));
      bindClick(root, '#pum_disd', api.pumV8Disruption);
      bindClick(root, '#pum_who', api.pumV8Someone);
      bindClick(root, '#pum_want', api.pumV8Intent);
      bindClick(root, '#pum_doing', api.pumV8Activity);
      bindClick(root, '#pum_where', api.pumV8Place);
      bindClick(root, '#pum_why', api.pumV8Reason);
      bindClick(root, '#pum_how', api.pumV8Explain);
      bindClick(root, '#pum_focus', api.pumV8Focus);
      bindClick(root, '#pum_qhma', () => api.pumV8HowMany(getPumD10Formula(root, 'pum8_quantbias')));
      bindClick(root, '#pum_qhw', () => api.pumV8HowWell(getPumD10Formula(root, 'pum8_quantbias')));
      bindClick(root, '#pum_qhh', () => api.pumV8HowHard(getPumD10Formula(root, 'pum8_quantbias')));
      bindClick(root, '#pum_when', api.pumV8Time);
      bindClick(root, '#pum_whatfor', api.pumV8Object);
      bindClick(root, '#pum_skill', api.pumV8Fight);
      bindClick(root, '#pum_perceive', api.pumV8Sense);
      bindClick(root, '#pum_find', api.pumV8Discovery);
      bindClick(root, '#pum_risk', api.pumV8Stakes);
      bindClick(root, '#pum_looks', api.pumV8Description);
      bindClick(root, '#pum8_panel_aspect_setup', api.pumV8RenderAspectsList);
      bindClick(root, '#pum8_panel_aspect_roll', api.pumV8RollAspectsList);
      bindClick(root, '#pum8_panel_encounter_setup', api.pumV8RenderEncountersList);
      bindClick(root, '#pum8_panel_encounter_roll', api.pumV8RollEncountersList);
      bindClick(root, '#pum8_panel_find_setup', api.pumV8RenderFindsList);
      bindClick(root, '#pum8_panel_find_roll', api.pumV8RollFindsList);
      bindClick(root, '#pum8_panel_question_setup', api.pumV8RenderQuestionsList);
      bindClick(root, '#pum8_panel_question_roll', api.pumV8RollQuestionsList);
    }
  },
  sum7_core: {
    id: 'sum7_core',
    label: 'Scene Unfolding Machine v7',
    shortLabel: 'SUM',
    version: 'v7',
    template: './modules/mythic-gme-tools/template/panel-sum-v7.hbs',
    width: PANEL_WINDOW_WIDTH,
    height: 250,
    bind(root, api) {
      bindClick(root, '#sum7_scop', () => api.sumV7SceneOpener(getSumD20Formula(root)));
      bindClick(root, '#sum7_ich', () => api.sumV7InterventionCheck(getSumD100Formula(root)));
      bindClick(root, '#sum7_acr', () => api.sumV7ActionsReaction(getSumD20Formula(root)));
      bindClick(root, '#sum7_fire', () => api.sumV7FirstReaction(getSumD20Formula(root)));
      bindClick(root, '#sum7_outi', () => api.sumV7OutsideImpression(getSumD20Formula(root)));
      bindClick(root, '#sum7_filler', () => api.sumV7FillerTalks(getSumD100Formula(root)));
      bindClick(root, '#sum7_perty', () => api.sumV7PersonalityType(getSumD20Formula(root)));
      bindClick(root, '#sum7_cont', () => api.sumV7PlotContribution(getSumD100Formula(root)));
      bindClick(root, '#sum7_opi', () => api.sumV7OpinionResponse(getSumD20Formula(root)));
      bindClick(root, '#sum7_jobp', () => api.sumV7JobProfession(getSumD20Formula(root)));
      bindClick(root, '#sum7_recan', () => api.sumV7RecentAnecdote(getSumD100Formula(root)));
      bindClick(root, '#sum7_tod', () => api.sumV7TruthOrDare(getSumD20Formula(root)));
      bindClick(root, '#sum7_parm', () => api.sumV7ParallelMatters(getSumD20Formula(root)));
      bindClick(root, '#sum7_lingb', () => api.sumV7LingeringBackstories(getSumD100Formula(root)));
      bindClick(root, '#sum7_bondr', () => api.sumV7BondingRelations(getSumD20Formula(root)));
    }
  },
  gum2_core: {
    id: 'gum2_core',
    label: 'Game Unfolding Machine v2',
    shortLabel: 'GUM',
    version: 'v2',
    template: './modules/mythic-gme-tools/template/panel-gum-v2.hbs',
    width: PANEL_WINDOW_WIDTH,
    height: 250,
    bind(root, api) {
      bindClick(root, '#gum2_qqgm_n', () => api.gum2Question(14));
      bindClick(root, '#gum2_qqgm_u', () => api.gum2Question(10));
      bindClick(root, '#gum2_qqgm_y', () => api.gum2Question(6));
      bindClick(root, '#gum2_intervention', api.gum2Intervention);
      bindClick(root, '#gum2_action', api.gum2Action);
      bindClick(root, '#gum2_adjective', api.gum2Adjective);
      bindClick(root, '#gum2_subject', api.gum2Subject);
      bindClick(root, '#gum2_exp_loc', api.gum2ExpLocation);
      bindClick(root, '#gum2_exp_skill', api.gum2ExpSkill);
      bindClick(root, '#gum2_exp_circ', api.gum2ExpCircumstance);
      bindClick(root, '#gum2_comb_loc', api.gum2CombLocation);
      bindClick(root, '#gum2_comb_tact', api.gum2CombTactics);
      bindClick(root, '#gum2_comb_comp', api.gum2CombComposition);
      bindClick(root, '#gum2_plt_clue', api.gum2PlotClue);
      bindClick(root, '#gum2_plt_find', api.gum2PlotFinding);
      bindClick(root, '#gum2_plt_act', api.gum2PlotActivities);
      bindClick(root, '#gum2_plt_occ', api.gum2PlotOccurrences);
      bindClick(root, '#gum2_npcg_att', api.gum2NPCGAttitude);
      bindClick(root, '#gum2_npcg_cont', api.gum2NPCGContribution);
      bindClick(root, '#gum2_npcg_opi', api.gum2NPCGOpinion);
      bindClick(root, '#gum2_npcg_want', api.gum2NPCGWants);
      bindClick(root, '#gum2_npce_att', api.gum2NPCEAttitude);
      bindClick(root, '#gum2_npce_imp', api.gum2NPCEImpression);
      bindClick(root, '#gum2_npce_deed', api.gum2NPCEDeeds);
      bindClick(root, '#gum2_npce_int', api.gum2NPCEIntentions);
      bindClick(root, '#gum2_mot_gmot', api.gum2MotGoodMotive);
      bindClick(root, '#gum2_mot_gact', api.gum2MotGoodActions);
      bindClick(root, '#gum2_mot_emot', api.gum2MotEvilMotive);
      bindClick(root, '#gum2_mot_eact', api.gum2MotEvilActions);
      bindClick(root, '#gum2_char_poss', api.gum2CharPossess);
      bindClick(root, '#gum2_char_looks', api.gum2CharLooks);
      bindClick(root, '#gum2_char_act', api.gum2CharActivity);
      bindClick(root, '#gum2_char_int', api.gum2CharIntention);
      bindClick(root, '#gum2_cre_type', api.gum2CreatureType);
      bindClick(root, '#gum2_cre_abi', api.gum2CreatureAbility);
      bindClick(root, '#gum2_cre_beh', api.gum2CreatureBehavior);
      bindClick(root, '#gum2_loc_feat', api.gum2LocFeature);
      bindClick(root, '#gum2_loc_worth', api.gum2LocWorth);
      bindClick(root, '#gum2_loc_purp', api.gum2LocPurpose);
      bindClick(root, '#gum2_loc_cont', api.gum2LocContent);
      bindClick(root, '#gum2_obj_func', api.gum2ObjFunction);
      bindClick(root, '#gum2_obj_form', api.gum2ObjForm);
      bindClick(root, '#gum2_obj_state', api.gum2ObjState);
      bindClick(root, '#gum2_fact_focus', api.gum2FactionFocus);
      bindClick(root, '#gum2_fact_res', api.gum2FactionResource);
      bindClick(root, '#gum2_prompt_scene', api.gum2PromptScene);
      bindClick(root, '#gum2_prompt_world', api.gum2PromptWorld);
    }
  },
  gma_cards: {
    id: 'gma_cards',
    label: 'Game Master\'s Apprentice (Cards)',
    shortLabel: 'GMA',
    version: 'Cards',
    template: './modules/mythic-gme-tools/template/panel-gma.hbs',
    width: PANEL_WINDOW_WIDTH,
    height: 250,
    bind(root, api) {
      bindClick(root, '#gma_base', () => api.gmaDraw('GMA Base Deck'));
      bindClick(root, '#gma_base2e', () => api.gmaDraw('GMA 2e Base Deck'));
      bindClick(root, '#gma_fantasy', () => api.gmaDraw('GMA Fantasy Deck'));
      bindClick(root, '#gma_horror', () => api.gmaDraw('GMA Horror Deck'));
      bindClick(root, '#gma_weird', () => api.gmaDraw('GMA Weird Horror Deck'));
      bindClick(root, '#gma_scifi', () => api.gmaDraw('GMA SciFi Deck'));
      bindClick(root, '#gma_cyberpunk', () => api.gmaDraw('GMA Cyberpunk Deck'));
      bindClick(root, '#gma_steampunk', () => api.gmaDraw('GMA Steampunk Deck'));
      bindClick(root, '#gma_sail', () => api.gmaDraw('GMA Age of Sail Deck'));
      bindClick(root, '#gma_demons', () => api.gmaDraw('GMA Demon Hunters Deck'));
    }
  }
};

export const DEFAULT_PANEL_KEYS = ['mgme_2e'];

export const ALL_PANEL_KEYS = Object.keys(PANEL_DEFINITIONS);

export function panelChoices() {
  return Object.fromEntries(Object.entries(PANEL_DEFINITIONS).map(([key, panel]) => [key, panel.label]));
}

export function normalizePanelKeys(keys) {
  if (!Array.isArray(keys)) return [...DEFAULT_PANEL_KEYS];
  return keys.filter(key => PANEL_DEFINITIONS[key]);
}
