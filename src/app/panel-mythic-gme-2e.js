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

    html.find("#mgme_el_atone").click(() => MGMEOracleUtils._mgmeMultipleTableOracle([{key: "Adventure Tone", name: "Mythic GME: Adventure Tone (2e)"}, {name: "Mythic GME: Adventure Tone (2e)"}]));
    html.find("#mgme_el_aspecies").click(() => MGMEOracleUtils._mgmeMultipleTableOracle([{key: "Alien Species", name: "Mythic GME: Alien Species (2e)"}, {name: "Mythic GME: Alien Species (2e)"}]));
    html.find("#mgme_el_aactions").click(() => MGMEOracleUtils._mgmeMultipleTableOracle([{key: "Animal Actions", name: "Mythic GME: Animal Actions (2e)"}, {name: "Mythic GME: Alien Species (2e)"}]));
    html.find("#mgme_el_army").click(() => MGMEOracleUtils._mgmeMultipleTableOracle([{key: "Army Descriptor", name: "Mythic GME: Army Descriptors (2e)"}, {name: "Mythic GME: Army Descriptors (2e)"}]));
    html.find("#mgme_el_cavern").click(() => MGMEOracleUtils._mgmeMultipleTableOracle([{key: "Cavern", name: "Mythic GME: Cavern Descriptors (2e)"}, {name: "Mythic GME: Cavern Descriptors (2e)"}]));
    html.find("#mgme_el_characters").click(() => MGMEOracleUtils._mgmeMultipleTableOracle([{key: "Characters", name: "Mythic GME: Characters (2e)"}, {name: "Mythic GME: Characters (2e)"}]));
    html.find("#mgme_el_charcomb").click(() => MGMEOracleUtils._mgmeMultipleTableOracle([{key: "Character Combat", name: "Mythic GME: Character Actions, Combat (2e)"}, {name: "Mythic GME: Character Actions, Combat (2e)"}]));
    html.find("#mgme_el_charact").click(() => MGMEOracleUtils._mgmeMultipleTableOracle([{key: "Character Action", name: "Mythic GME: Character Actions, General (2e)"}, {name: "Mythic GME: Character Actions, General (2e)"}]));
    html.find("#mgme_el_charapp").click(() => MGMEOracleUtils._mgmeMultipleTableOracle([{key: "Character Appearance", name: "Mythic GME: Character Appearance (2e)"}, {name: "Mythic GME: Character Appearance (2e)"}]));
    html.find("#mgme_el_charback").click(() => MGMEOracleUtils._mgmeMultipleTableOracle([{key: "Character Background", name: "Mythic GME: Character Background (2e)"}, {name: "Mythic GME: Character Background (2e)"}]));
    html.find("#mgme_el_charconv").click(() => MGMEOracleUtils._mgmeMultipleTableOracle([{key: "Character Conversation", name: "Mythic GME: Character Conversations (2e)"}, {name: "Mythic GME: Character Conversations (2e)"}]));
    html.find("#mgme_el_chardesc").click(() => MGMEOracleUtils._mgmeMultipleTableOracle([{key: "Character Descriptor", name: "Mythic GME: Character Descriptors (2e)"}, {name: "Mythic GME: Character Descriptors (2e)"}]));
    html.find("#mgme_el_charid").click(() => MGMEOracleUtils._mgmeMultipleTableOracle([{key: "Character Identity", name: "Mythic GME: Character Identity (2e)"}, {name: "Mythic GME: Character Identity (2e)"}]));
    html.find("#mgme_el_charmot").click(() => MGMEOracleUtils._mgmeMultipleTableOracle([{key: "Character Motivation", name: "Mythic GME: Character Motivations (2e)"}, {name: "Mythic GME: Character Motivations (2e)"}]));
    html.find("#mgme_el_charpers").click(() => MGMEOracleUtils._mgmeMultipleTableOracle([{key: "Character Personality", name: "Mythic GME: Character Personality (2e)"}, {name: "Mythic GME: Character Personality (2e)"}]));
    html.find("#mgme_el_charskills").click(() => MGMEOracleUtils._mgmeMultipleTableOracle([{key: "Character Skill", name: "Mythic GME: Character Skills (2e)"}, {name: "Mythic GME: Character Skills (2e)"}]));
    html.find("#mgme_el_chartraits").click(() => MGMEOracleUtils._mgmeMultipleTableOracle([{key: "Character Trait", name: "Mythic GME: Character Traits & Flaws (2e)"}, {name: "Mythic GME: Character Traits & Flaws (2e)"}]));
    html.find("#mgme_el_city").click(() => MGMEOracleUtils._mgmeMultipleTableOracle([{key: "City", name: "Mythic GME: City Descriptors (2e)"}, {name: "Mythic GME: City Descriptors (2e)"}]));
    html.find("#mgme_el_civdesc").click(() => MGMEOracleUtils._mgmeMultipleTableOracle([{key: "Civilization", name: "Mythic GME: Civilization Descriptors (2e)"}, {name: "Mythic GME: Civilization Descriptors (2e)"}]));
    html.find("#mgme_el_creatab").click(() => MGMEOracleUtils._mgmeMultipleTableOracle([{key: "Creature Ability", name: "Mythic GME: Creature Abilities (2e)"}, {name: "Mythic GME: Creature Abilities (2e)"}]));
    html.find("#mgme_el_creatdes").click(() => MGMEOracleUtils._mgmeMultipleTableOracle([{key: "Creature", name: "Mythic GME: Creature Descriptors (2e)"}, {name: "Mythic GME: Creature Descriptors (2e)"}]));
    html.find("#mgme_el_cmessage").click(() => MGMEOracleUtils._mgmeMultipleTableOracle([{key: "Cryptic Message", name: "Mythic GME: Cryptic Message (2e)"}, {name: "Mythic GME: Cryptic Message (2e)"}]));
    html.find("#mgme_el_curses").click(() => MGMEOracleUtils._mgmeMultipleTableOracle([{key: "Curse", name: "Mythic GME: Curses (2e)"}, {name: "Mythic GME: Curses (2e)"}]));
    html.find("#mgme_el_domicile").click(() => MGMEOracleUtils._mgmeMultipleTableOracle([{key: "Domicile", name: "Mythic GME: Domicile Descriptors (2e)"}, {name: "Mythic GME: Domicile Descriptors (2e)"}]));
    html.find("#mgme_el_dungeon").click(() => MGMEOracleUtils._mgmeMultipleTableOracle([{key: "Dungeon", name: "Mythic GME: Dungeon Descriptors (2e)"}, {name: "Mythic GME: Dungeon Descriptors (2e)"}]));
    html.find("#mgme_el_duntraps").click(() => MGMEOracleUtils._mgmeMultipleTableOracle([{key: "Trap", name: "Mythic GME: Dungeon Traps (2e)"}, {name: "Mythic GME: Dungeon Traps (2e)"}]));
    html.find("#mgme_el_forest").click(() => MGMEOracleUtils._mgmeMultipleTableOracle([{key: "Forest", name: "Mythic GME: Forest Descriptors (2e)"}, {name: "Mythic GME: Forest Descriptors (2e)"}]));
    html.find("#mgme_el_gods").click(() => MGMEOracleUtils._mgmeMultipleTableOracle([{key: "God", name: "Mythic GME: Gods (2e)"}, {name: "Mythic GME: Gods (2e)"}]));
    html.find("#mgme_el_legends").click(() => MGMEOracleUtils._mgmeMultipleTableOracle([{key: "Legend", name: "Mythic GME: Legends (2e)"}, {name: "Mythic GME: Legends (2e)"}]));
    html.find("#mgme_el_location").click(() => MGMEOracleUtils._mgmeMultipleTableOracle([{key: "Location", name: "Mythic GME: Locations (2e)"}, {name: "Mythic GME: Locations (2e)"}]));
    html.find("#mgme_el_magicitem").click(() => MGMEOracleUtils._mgmeMultipleTableOracle([{key: "Magic Item", name: "Mythic GME: Magic Item Descriptors (2e)"}, {name: "Mythic GME: Magic Item Descriptors (2e)"}]));
    html.find("#mgme_el_muts").click(() => MGMEOracleUtils._mgmeMultipleTableOracle([{key: "Mutation", name: "Mythic GME: Mutation Descriptors (2e)"}, {name: "Mythic GME: Mutation Descriptors (2e)"}]));
    html.find("#mgme_el_charnames").click(() => MGMEOracleUtils._mgmeMultipleTableOracle([{key: "Name Part", name: "Mythic GME: Names (2e)"}, {name: "Mythic GME: Names (2e)"}]));
    html.find("#mgme_el_noble").click(() => MGMEOracleUtils._mgmeMultipleTableOracle([{key: "Noble House", name: "Mythic GME: Noble House (2e)"}, {name: "Mythic GME: Noble House (2e)"}]));
    html.find("#mgme_el_objects").click(() => MGMEOracleUtils._mgmeMultipleTableOracle([{key: "Object", name: "Mythic GME: Objects (2e)"}, {name: "Mythic GME: Objects (2e)"}]));
    html.find("#mgme_el_plottw").click(() => MGMEOracleUtils._mgmeMultipleTableOracle([{key: "Plot Twist", name: "Mythic GME: Plot Twists (2e)"}, {name: "Mythic GME: Plot Twists (2e)"}]));
    html.find("#mgme_el_powers").click(() => MGMEOracleUtils._mgmeMultipleTableOracle([{key: "Power", name: "Mythic GME: Powers (2e)"}, {name: "Mythic GME: Powers (2e)"}]));
    html.find("#mgme_el_scavenge").click(() => MGMEOracleUtils._mgmeMultipleTableOracle([{key: "Scavenging", name: "Mythic GME: Scavenging Results (2e)"}, {name: "Mythic GME: Scavenging Results (2e)"}]));
    html.find("#mgme_el_smells").click(() => MGMEOracleUtils._mgmeMultipleTableOracle([{key: "Smell", name: "Mythic GME: Smells (2e)"}, {name: "Mythic GME: Smells (2e)"}]));
    html.find("#mgme_el_sounds").click(() => MGMEOracleUtils._mgmeMultipleTableOracle([{key: "Sound", name: "Mythic GME: Sounds (2e)"}, {name: "Mythic GME: Sounds (2e)"}]));
    html.find("#mgme_el_spells").click(() => MGMEOracleUtils._mgmeMultipleTableOracle([{key: "Spell Effect", name: "Mythic GME: Spell Effects (2e)"}, {name: "Mythic GME: Spell Effects (2e)"}]));
    html.find("#mgme_el_starship").click(() => MGMEOracleUtils._mgmeMultipleTableOracle([{key: "Starship", name: "Mythic GME: Starship Descriptors (2e)"}, {name: "Mythic GME: Starship Descriptors (2e)"}]));
    html.find("#mgme_el_terrain").click(() => MGMEOracleUtils._mgmeMultipleTableOracle([{key: "Terrain", name: "Mythic GME: Terrain Descriptors (2e)"}, {name: "Mythic GME: Terrain Descriptors (2e)"}]));
    html.find("#mgme_el_undead").click(() => MGMEOracleUtils._mgmeMultipleTableOracle([{key: "Undead", name: "Mythic GME: Undead Descriptors (2e)"}, {name: "Mythic GME: Undead Descriptors (2e)"}]));
    html.find("#mgme_el_vandd").click(() => MGMEOracleUtils._mgmeMultipleTableOracle([{key: "Vision & Dream", name: "Mythic GME: Visions & Dreams (2e)"}, {name: "Mythic GME: Visions & Dreams (2e)"}]));

  }
  
}