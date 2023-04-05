import MGMEPanel from "./panel-base";
import '../style/panel-mythic.css'
import MGMEOracleUtils from "../utils/mgme-oracle-utils";

export default class MGME2ePanel extends MGMEPanel {

  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      id: "m2e_panel_window",
      title: 'Mythic GME 2nd Edition',
      template: "./modules/mythic-gme-tools/template/panel-mythic-gme-2e.hbs"
    });
  }

  getData() {
    return mergeObject(super.getData(), {
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

    html.find("#mgme_el_actions").click(() =>
      MGMEOracleUtils._mgmeMultipleTableOracle([{name: "Mythic GME: Action 1 (2e)"}, {name: "Mythic GME: Action 2 (2e)"}], "Action Meaning")
    );
    html.find("#mgme_el_descriptions").click(() =>
      MGMEOracleUtils._mgmeMultipleTableOracle([{name: "Mythic GME: Description 1 (2e)"}, {name: "Mythic GME: Description 2 (2e)"}], "Description Meaning")
    );
    html.find("#mgme_el_sceneadj").click(() => MGMEOracleUtils._mgmeSimpleTableOracle({name: "Mythic GME: Scene Adjustment Table (2e)"}, "Scene Adjustment"));

    html.find("#mgme_el_atone").click(() => MGMEOracleUtils._mgmeSimpleTableOracle({key: "Adventure Tone", name: "Mythic GME: Adventure Tone (2e)"}));
    html.find("#mgme_el_aspecies").click(() => MGMEOracleUtils._mgmeSimpleTableOracle({key: "Alien Species", name: "Mythic GME: Alien Species (2e)"}));
    html.find("#mgme_el_aactions").click(() => MGMEOracleUtils._mgmeSimpleTableOracle({key: "Animal Actions", name: "Mythic GME: Animal Actions (2e)"}));
    html.find("#mgme_el_army").click(() => MGMEOracleUtils._mgmeSimpleTableOracle({key: "Army Descriptor", name: "Mythic GME: Army Descriptors (2e)"}));
    html.find("#mgme_el_cavern").click(() => MGMEOracleUtils._mgmeSimpleTableOracle({key: "Cavern", name: "Mythic GME: Cavern Descriptors (2e)"}));
    html.find("#mgme_el_characters").click(() => MGMEOracleUtils._mgmeSimpleTableOracle({key: "Characters", name: "Mythic GME: Characters (2e)"}));
    html.find("#mgme_el_charcomb").click(() => MGMEOracleUtils._mgmeSimpleTableOracle({key: "Character Combat", name: "Mythic GME: Character Actions, Combat (2e)"}));
    html.find("#mgme_el_charact").click(() => MGMEOracleUtils._mgmeSimpleTableOracle({key: "Character Action", name: "Mythic GME: Character Actions, General (2e)"}));
    html.find("#mgme_el_charapp").click(() => MGMEOracleUtils._mgmeSimpleTableOracle({key: "Character Appearance", name: "Mythic GME: Character Appearance (2e)"}));
    html.find("#mgme_el_charback").click(() => MGMEOracleUtils._mgmeSimpleTableOracle({key: "Character Background", name: "Mythic GME: Character Background (2e)"}));
    html.find("#mgme_el_charconv").click(() => MGMEOracleUtils._mgmeSimpleTableOracle({key: "Character Conversation", name: "Mythic GME: Character Conversations (2e)"}));
    html.find("#mgme_el_chardesc").click(() => MGMEOracleUtils._mgmeSimpleTableOracle({key: "Character Descriptor", name: "Mythic GME: Character Descriptors (2e)"}));
    html.find("#mgme_el_charid").click(() => MGMEOracleUtils._mgmeSimpleTableOracle({key: "Character Identity", name: "Mythic GME: Character Identity (2e)"}));
    html.find("#mgme_el_charmot").click(() => MGMEOracleUtils._mgmeSimpleTableOracle({key: "Character Motivation", name: "Mythic GME: Character Motivations (2e)"}));
    html.find("#mgme_el_charpers").click(() => MGMEOracleUtils._mgmeSimpleTableOracle({key: "Character Personality", name: "Mythic GME: Character Personality (2e)"}));
    html.find("#mgme_el_charskills").click(() => MGMEOracleUtils._mgmeSimpleTableOracle({key: "Character Skill", name: "Mythic GME: Character Skills (2e)"}));
    html.find("#mgme_el_chartraits").click(() => MGMEOracleUtils._mgmeSimpleTableOracle({key: "Character Trait", name: "Mythic GME: Character Traits & Flaws (2e)"}));
    html.find("#mgme_el_city").click(() => MGMEOracleUtils._mgmeSimpleTableOracle({key: "City", name: "Mythic GME: City Descriptors (2e)"}));
    html.find("#mgme_el_civdesc").click(() => MGMEOracleUtils._mgmeSimpleTableOracle({key: "Civilization", name: "Mythic GME: Civilization Descriptors (2e)"}));
    html.find("#mgme_el_creatab").click(() => MGMEOracleUtils._mgmeSimpleTableOracle({key: "Creature Ability", name: "Mythic GME: Creature Abilities (2e)"}));
    html.find("#mgme_el_creatdes").click(() => MGMEOracleUtils._mgmeSimpleTableOracle({key: "Creature", name: "Mythic GME: Creature Descriptors (2e)"}));
    html.find("#mgme_el_cmessage").click(() => MGMEOracleUtils._mgmeSimpleTableOracle({key: "Cryptic Message", name: "Mythic GME: Cryptic Message (2e)"}));
    html.find("#mgme_el_curses").click(() => MGMEOracleUtils._mgmeSimpleTableOracle({key: "Curse", name: "Mythic GME: Curses (2e)"}));
    html.find("#mgme_el_domicile").click(() => MGMEOracleUtils._mgmeSimpleTableOracle({key: "Domicile", name: "Mythic GME: Domicile Descriptors (2e)"}));
    html.find("#mgme_el_dungeon").click(() => MGMEOracleUtils._mgmeSimpleTableOracle({key: "Dungeon", name: "Mythic GME: Dungeon Descriptors (2e)"}));
    html.find("#mgme_el_duntraps").click(() => MGMEOracleUtils._mgmeSimpleTableOracle({key: "Trap", name: "Mythic GME: Dungeon Traps (2e)"}));
    html.find("#mgme_el_forest").click(() => MGMEOracleUtils._mgmeSimpleTableOracle({key: "Forest", name: "Mythic GME: Forest Descriptors (2e)"}));
    html.find("#mgme_el_gods").click(() => MGMEOracleUtils._mgmeSimpleTableOracle({key: "God", name: "Mythic GME: Gods (2e)"}));
    html.find("#mgme_el_legends").click(() => MGMEOracleUtils._mgmeSimpleTableOracle({key: "Legend", name: "Mythic GME: Legends (2e)"}));
    html.find("#mgme_el_location").click(() => MGMEOracleUtils._mgmeSimpleTableOracle({key: "Location", name: "Mythic GME: Locations (2e)"}));
    html.find("#mgme_el_magicitem").click(() => MGMEOracleUtils._mgmeSimpleTableOracle({key: "Magic Item", name: "Mythic GME: Magic Item Descriptors (2e)"}));
    html.find("#mgme_el_muts").click(() => MGMEOracleUtils._mgmeSimpleTableOracle({key: "Mutation", name: "Mythic GME: Mutation Descriptors (2e)"}));
    html.find("#mgme_el_charnames").click(() => MGMEOracleUtils._mgmeSimpleTableOracle({key: "Name Part", name: "Mythic GME: Names (2e)"}));
    html.find("#mgme_el_noble").click(() => MGMEOracleUtils._mgmeSimpleTableOracle({key: "Noble House", name: "Mythic GME: Noble House (2e)"}));
    html.find("#mgme_el_objects").click(() => MGMEOracleUtils._mgmeSimpleTableOracle({key: "Object", name: "Mythic GME: Objects (2e)"}));
    html.find("#mgme_el_plottw").click(() => MGMEOracleUtils._mgmeSimpleTableOracle({key: "Plot Twist", name: "Mythic GME: Plot Twists (2e)"}));
    html.find("#mgme_el_powers").click(() => MGMEOracleUtils._mgmeSimpleTableOracle({key: "Power", name: "Mythic GME: Powers (2e)"}));
    html.find("#mgme_el_scavenge").click(() => MGMEOracleUtils._mgmeSimpleTableOracle({key: "Scavenging", name: "Mythic GME: Scavenging Results (2e)"}));
    html.find("#mgme_el_smells").click(() => MGMEOracleUtils._mgmeSimpleTableOracle({key: "Smell", name: "Mythic GME: Smells (2e)"}));
    html.find("#mgme_el_sounds").click(() => MGMEOracleUtils._mgmeSimpleTableOracle({key: "Sound", name: "Mythic GME: Sounds (2e)"}));
    html.find("#mgme_el_spells").click(() => MGMEOracleUtils._mgmeSimpleTableOracle({key: "Spell Effect", name: "Mythic GME: Spell Effects (2e)"}));
    html.find("#mgme_el_starship").click(() => MGMEOracleUtils._mgmeSimpleTableOracle({key: "Starship", name: "Mythic GME: Starship Descriptors (2e)"}));
    html.find("#mgme_el_terrain").click(() => MGMEOracleUtils._mgmeSimpleTableOracle({key: "Terrain", name: "Mythic GME: Terrain Descriptors (2e)"}));
    html.find("#mgme_el_undead").click(() => MGMEOracleUtils._mgmeSimpleTableOracle({key: "Undead", name: "Mythic GME: Undead Descriptors (2e)"}));
    html.find("#mgme_el_vandd").click(() => MGMEOracleUtils._mgmeSimpleTableOracle({key: "Vision & Dream", name: "Mythic GME: Visions & Dreams (2e)"}));

  }
  
}