import MGMEPanel from "./panel-base";
import '../style/panel-mythic.css'

export default class MGME2ePanel extends MGMEPanel {

  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      id: "m2e_panel_window",
      title: 'Mythic GME 2nd Edition',
      template: "./modules/mythic-gme-tools/template/panel-mythic-gme-2e.hbs"
    });
  }

  getData() {
    return foundry.utils.mergeObject(super.getData(), {
      rankValue: game.settings.get('mythic-gme-tools', 'currentChaos')
    });
  }

  activateListeners(html) {
    const api = game.modules.get('mythic-gme-tools').api;

    html.find("#mgme_panel_fq").click(api.mgmeFateChart);
    html.find("#mgme_panel_sa").click(api.mgmeSceneAlteration);

    html.find("#mgme_panel_re").click(api.mgmeRandomEvent);
    html.find("#mgme_panel_fo").click(api.mgmeFocusCheck);

    html.find("#mgme_panel_npc").click(api.mgmeRenderNPCsList2e);
    html.find("#mgme_panel_npc_roll").click(api.mgmeRollNPCsList2e);
    html.find("#mgme_panel_thread").click(api.mgmeRenderThreadsList2e);
    html.find("#mgme_panel_thread_roll").click(api.mgmeRollThreadsList2e);

    html.find("#mgme_panel_ci").click(api.mgmeIncreaseChaos);
    html.find("#mgme_panel_cd").click(api.mgmeDecreaseChaos);

    html.find("#mgme_el_actions").click(api.mgmeActions);
    html.find("#mgme_el_descriptions").click(api.mgmeDescriptions);
    html.find("#mgme_el_sceneadj").click(api.mgmeSceneAdjust);

    html.find("#mgme_el_atone").click(api.mgmeAdvTone);
    html.find("#mgme_el_aspecies").click(api.mgmeAlienSpecies);
    html.find("#mgme_el_aactions").click(api.mgmeAnimalActions);
    html.find("#mgme_el_army").click(api.mgmeArmyDescriptors);
    html.find("#mgme_el_cavern").click(api.mgmeCaverns);
    html.find("#mgme_el_characters").click(api.mgmeCharacters);
    html.find("#mgme_el_charcomb").click(api.mgmeCharacterCombat);
    html.find("#mgme_el_charact").click(api.mgmeCharacterActions);
    html.find("#mgme_el_charapp").click(api.mgmeCharacterAppearance);
    html.find("#mgme_el_charback").click(api.mgmeCharacterBackground);
    html.find("#mgme_el_charconv").click(api.mgmeCharacterConversation);
    html.find("#mgme_el_chardesc").click(api.mgmeCharacterDescriptors);
    html.find("#mgme_el_charid").click(api.mgmeCharacterIdentity);
    html.find("#mgme_el_charmot").click(api.mgmeCharacterMotivations);
    html.find("#mgme_el_charpers").click(api.mgmeCharacterPersonality);
    html.find("#mgme_el_charskills").click(api.mgmeCharacterSkills);
    html.find("#mgme_el_chartraits").click(api.mgmeCharacterTraits);
    html.find("#mgme_el_city").click(api.mgmeCityDescriptors);
    html.find("#mgme_el_civdesc").click(api.mgmeCivilizationDescriptors);
    html.find("#mgme_el_creatab").click(api.mgmeCreatureAbilities);
    html.find("#mgme_el_creatdes").click(api.mgmeCreatureDescriptors);
    html.find("#mgme_el_cmessage").click(api.mgmeCrypticMessage);
    html.find("#mgme_el_curses").click(api.mgmeCurses);
    html.find("#mgme_el_domicile").click(api.mgmeDomicile);
    html.find("#mgme_el_dungeon").click(api.mgmeDungeonDescriptors);
    html.find("#mgme_el_duntraps").click(api.mgmeDungeonTraps);
    html.find("#mgme_el_forest").click(api.mgmeForestDescriptors);
    html.find("#mgme_el_gods").click(api.mgmeGods);
    html.find("#mgme_el_legends").click(api.mgmeLegends);
    html.find("#mgme_el_location").click(api.mgmeLocations);
    html.find("#mgme_el_magicitem").click(api.mgmeMagicItem);
    html.find("#mgme_el_muts").click(api.mgmeMutationDescriptors);
    html.find("#mgme_el_charnames").click(api.mgmeNames);
    html.find("#mgme_el_noble").click(api.mgmeNobleHouse);
    html.find("#mgme_el_objects").click(api.mgmeObjects);
    html.find("#mgme_el_plottw").click(api.mgmePlotTwists);
    html.find("#mgme_el_powers").click(api.mgmePowers);
    html.find("#mgme_el_scavenge").click(api.mgmeScavengingResults);
    html.find("#mgme_el_smells").click(api.mgmeSmells);
    html.find("#mgme_el_sounds").click(api.mgmeSounds);
    html.find("#mgme_el_spells").click(api.mgmeSpellEffects);
    html.find("#mgme_el_starship").click(api.mgmeStarshipDescriptors);
    html.find("#mgme_el_terrain").click(api.mgmeTerrainDescriptors);
    html.find("#mgme_el_undead").click(api.mgmeUndeadDescriptors);
    html.find("#mgme_el_vandd").click(api.mgmeVisions);

  }
  
}