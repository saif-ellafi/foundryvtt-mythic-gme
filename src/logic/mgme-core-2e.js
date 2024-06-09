import MGMEChatJournal from "../utils/mgme-chat-journal";
import MGMECommon from "../utils/mgme-common";
import MGMEOracleUtils from "../utils/mgme-oracle-utils";

export default class MGMECore2e {

    static async adjustTable(table) {
        let size = table.results.size;
        if (size === 0 || size % 5) {
            let adjustBy = 5 - size % 5;
            let newResults = [];
            let i = 0;
            while (i < adjustBy) {
                newResults.push({
                    text: game.i18n.localize('MGME.TableResultChoose2e'),
                    range: [size + i + 1, size + i + 1],
                    weight: 1
                })
                i += 1;
            }
            await table.createEmbeddedDocuments('TableResult', newResults);
        }
        return table
    }

    static mgmeRenderNPCsList2e() {
        MGMEChatJournal._mgmeFindOrCreateRolltable('NPCs List', 'Mythic Lists').then(table => {
            MGMECore2e.adjustTable(table).then(t => t.normalize().then(t => t.sheet.render(true)));
        });
    }

    static mgmeRenderThreadsList2e() {
        MGMEChatJournal._mgmeFindOrCreateRolltable('Threads List', 'Mythic Lists').then(table => {
            MGMECore2e.adjustTable(table).then(t => t.normalize().then(t => t.sheet.render(true)));
        });
    }

    static mgmeRollNPCsList2e() {
        MGMEChatJournal._mgmeFindOrCreateRolltable('NPCs List', 'Mythic Lists').then(table => {
            MGMECore2e.adjustTable(table).then((t) => t.normalize()).then((t) => t.draw({rollMode: MGMECommon._mgmeGetRollMode()}));
        });
    }

    static mgmeRollThreadsList2e() {
        MGMEChatJournal._mgmeFindOrCreateRolltable('Threads List', 'Mythic Lists').then(table => {
            MGMECore2e.adjustTable(table).then((t) => t.normalize()).then((t) => t.draw({rollMode: MGMECommon._mgmeGetRollMode()}));
        });
    }

    static mgmeActions() {
        MGMEOracleUtils._mgmeMultipleTableOracle([{name: MGMECommon._mgmeFindValueBySetting('actionTable')}, {name: MGMECommon._mgmeFindValueBySetting('subjectTable')}], "Action Meaning");
    }

    static mgmeDescriptions() {
        MGMEOracleUtils._mgmeMultipleTableOracle([{name: MGMECommon._mgmeFindValueBySetting('descriptionsAdvTable')}, {name: MGMECommon._mgmeFindValueBySetting('descriptionsAdjTable')}], "Description Meaning");
    }

    static mgmeSceneAdjust() {
        MGMEOracleUtils._mgmeSimpleTableOracle({name: "Mythic GME: Scene Adjustment Table (2e)"}, "Scene Adjustment");
    }

    static mgmeAdvTone() {
        MGMEOracleUtils._mgmeMultipleTableOracle([{
            key: "Adventure Tone",
            name: "Mythic GME: Adventure Tone (2e)"
        }, {name: "Mythic GME: Adventure Tone (2e)"}])
    }

    static mgmeAlienSpecies() {
        MGMEOracleUtils._mgmeMultipleTableOracle([{
            key: "Alien Species",
            name: "Mythic GME: Alien Species (2e)"
        }, {name: "Mythic GME: Alien Species (2e)"}]);
    }

    static mgmeAnimalActions() {
        MGMEOracleUtils._mgmeMultipleTableOracle([{
            key: "Animal Actions",
            name: "Mythic GME: Animal Actions (2e)"
        }, {name: "Mythic GME: Alien Species (2e)"}])
    }

    static mgmeArmyDescriptors() {
        MGMEOracleUtils._mgmeMultipleTableOracle([{
            key: "Army Descriptor",
            name: "Mythic GME: Army Descriptors (2e)"
        }, {name: "Mythic GME: Army Descriptors (2e)"}])
    }

    static mgmeCaverns() {
        MGMEOracleUtils._mgmeMultipleTableOracle([{
            key: "Cavern",
            name: "Mythic GME: Cavern Descriptors (2e)"
        }, {name: "Mythic GME: Cavern Descriptors (2e)"}])
    }

    static mgmeCharacters() {
        MGMEOracleUtils._mgmeMultipleTableOracle([{
            key: "Characters",
            name: "Mythic GME: Characters (2e)"
        }, {name: "Mythic GME: Characters (2e)"}])
    }

    static mgmeCharacterCombat() {
        MGMEOracleUtils._mgmeMultipleTableOracle([{
            key: "Character Combat",
            name: "Mythic GME: Character Actions, Combat (2e)"
        }, {name: "Mythic GME: Character Actions, Combat (2e)"}])
    }

    static mgmeCharacterActions() {
        MGMEOracleUtils._mgmeMultipleTableOracle([{
            key: "Character Action",
            name: "Mythic GME: Character Actions, General (2e)"
        }, {name: "Mythic GME: Character Actions, General (2e)"}])
    }

    static mgmeCharacterAppearance() {
        MGMEOracleUtils._mgmeMultipleTableOracle([{
            key: "Character Appearance",
            name: "Mythic GME: Character Appearance (2e)"
        }, {name: "Mythic GME: Character Appearance (2e)"}])
    }

    static mgmeCharacterBackground() {
        MGMEOracleUtils._mgmeMultipleTableOracle([{
            key: "Character Background",
            name: "Mythic GME: Character Background (2e)"
        }, {name: "Mythic GME: Character Background (2e)"}])
    }

    static mgmeCharacterConversation() {
        MGMEOracleUtils._mgmeMultipleTableOracle([{
            key: "Character Conversation",
            name: "Mythic GME: Character Conversations (2e)"
        }, {name: "Mythic GME: Character Conversations (2e)"}])
    }

    static mgmeCharacterDescriptors() {
        MGMEOracleUtils._mgmeMultipleTableOracle([{
            key: "Character Descriptor",
            name: "Mythic GME: Character Descriptors (2e)"
        }, {name: "Mythic GME: Character Descriptors (2e)"}])
    }

    static mgmeCharacterIdentity() {
        MGMEOracleUtils._mgmeMultipleTableOracle([{
            key: "Character Identity",
            name: "Mythic GME: Character Identity (2e)"
        }, {name: "Mythic GME: Character Identity (2e)"}])
    }

    static mgmeCharacterMotivations() {
        MGMEOracleUtils._mgmeMultipleTableOracle([{
            key: "Character Motivation",
            name: "Mythic GME: Character Motivations (2e)"
        }, {name: "Mythic GME: Character Motivations (2e)"}])
    }

    static mgmeCharacterPersonality() {
        MGMEOracleUtils._mgmeMultipleTableOracle([{
            key: "Character Personality",
            name: "Mythic GME: Character Personality (2e)"
        }, {name: "Mythic GME: Character Personality (2e)"}])
    }

    static mgmeCharacterSkills() {
        MGMEOracleUtils._mgmeMultipleTableOracle([{
            key: "Character Skill",
            name: "Mythic GME: Character Skills (2e)"
        }, {name: "Mythic GME: Character Skills (2e)"}])
    }

    static mgmeCharacterTraits() {
        MGMEOracleUtils._mgmeMultipleTableOracle([{
            key: "Character Trait",
            name: "Mythic GME: Character Traits & Flaws (2e)"
        }, {name: "Mythic GME: Character Traits & Flaws (2e)"}])
    }

    static mgmeCityDescriptors() {
        MGMEOracleUtils._mgmeMultipleTableOracle([{
            key: "City",
            name: "Mythic GME: City Descriptors (2e)"
        }, {name: "Mythic GME: City Descriptors (2e)"}])
    }

    static mgmeCivilizationDescriptors() {
        MGMEOracleUtils._mgmeMultipleTableOracle([{
            key: "Civilization",
            name: "Mythic GME: Civilization Descriptors (2e)"
        }, {name: "Mythic GME: Civilization Descriptors (2e)"}])
    }

    static mgmeCreatureAbilities() {
        MGMEOracleUtils._mgmeMultipleTableOracle([{
            key: "Creature Ability",
            name: "Mythic GME: Creature Abilities (2e)"
        }, {name: "Mythic GME: Creature Abilities (2e)"}])
    }

    static mgmeCreatureDescriptors() {
        MGMEOracleUtils._mgmeMultipleTableOracle([{
            key: "Creature",
            name: "Mythic GME: Creature Descriptors (2e)"
        }, {name: "Mythic GME: Creature Descriptors (2e)"}])
    }

    static mgmeCrypticMessage() {
        MGMEOracleUtils._mgmeMultipleTableOracle([{
            key: "Cryptic Message",
            name: "Mythic GME: Cryptic Message (2e)"
        }, {name: "Mythic GME: Cryptic Message (2e)"}])
    }

    static mgmeCurses() {
        MGMEOracleUtils._mgmeMultipleTableOracle([{
            key: "Curse",
            name: "Mythic GME: Curses (2e)"
        }, {name: "Mythic GME: Curses (2e)"}])
    }

    static mgmeDomicile() {
        MGMEOracleUtils._mgmeMultipleTableOracle([{
            key: "Domicile",
            name: "Mythic GME: Domicile Descriptors (2e)"
        }, {name: "Mythic GME: Domicile Descriptors (2e)"}])
    }

    static mgmeDungeonDescriptors() {
        MGMEOracleUtils._mgmeMultipleTableOracle([{
            key: "Dungeon",
            name: "Mythic GME: Dungeon Descriptors (2e)"
        }, {name: "Mythic GME: Dungeon Descriptors (2e)"}])
    }

    static mgmeDungeonTraps() {
        MGMEOracleUtils._mgmeMultipleTableOracle([{
            key: "Trap",
            name: "Mythic GME: Dungeon Traps (2e)"
        }, {name: "Mythic GME: Dungeon Traps (2e)"}])
    }

    static mgmeForestDescriptors() {
        MGMEOracleUtils._mgmeMultipleTableOracle([{
            key: "Forest",
            name: "Mythic GME: Forest Descriptors (2e)"
        }, {name: "Mythic GME: Forest Descriptors (2e)"}])
    }

    static mgmeGods() {
        MGMEOracleUtils._mgmeMultipleTableOracle([{
            key: "God",
            name: "Mythic GME: Gods (2e)"
        }, {name: "Mythic GME: Gods (2e)"}])
    }

    static mgmeLegends() {
        MGMEOracleUtils._mgmeMultipleTableOracle([{
            key: "Legend",
            name: "Mythic GME: Legends (2e)"
        }, {name: "Mythic GME: Legends (2e)"}])
    }

    static mgmeLocations() {
        MGMEOracleUtils._mgmeMultipleTableOracle([{
            key: "Location",
            name: "Mythic GME: Locations (2e)"
        }, {name: "Mythic GME: Locations (2e)"}])
    }

    static mgmeMagicItem() {
        MGMEOracleUtils._mgmeMultipleTableOracle([{
            key: "Magic Item",
            name: "Mythic GME: Magic Item Descriptors (2e)"
        }, {name: "Mythic GME: Magic Item Descriptors (2e)"}])
    }

    static mgmeMutationDescriptors() {
        MGMEOracleUtils._mgmeMultipleTableOracle([{
            key: "Mutation",
            name: "Mythic GME: Mutation Descriptors (2e)"
        }, {name: "Mythic GME: Mutation Descriptors (2e)"}])
    }

    static mgmeNames() {
        MGMEOracleUtils._mgmeMultipleTableOracle([{
            key: "Name Part",
            name: "Mythic GME: Names (2e)"
        }, {name: "Mythic GME: Names (2e)"}])
    }

    static mgmeNobleHouse() {
        MGMEOracleUtils._mgmeMultipleTableOracle([{
            key: "Noble House",
            name: "Mythic GME: Noble House (2e)"
        }, {name: "Mythic GME: Noble House (2e)"}])
    }

    static mgmeObjects() {
        MGMEOracleUtils._mgmeMultipleTableOracle([{
            key: "Object",
            name: "Mythic GME: Objects (2e)"
        }, {name: "Mythic GME: Objects (2e)"}])
    }

    static mgmePlotTwists() {
        MGMEOracleUtils._mgmeMultipleTableOracle([{
            key: "Plot Twist",
            name: "Mythic GME: Plot Twists (2e)"
        }, {name: "Mythic GME: Plot Twists (2e)"}])
    }

    static mgmePowers() {
        MGMEOracleUtils._mgmeMultipleTableOracle([{
            key: "Power",
            name: "Mythic GME: Powers (2e)"
        }, {name: "Mythic GME: Powers (2e)"}])
    }

    static mgmeScavengingResults() {
        MGMEOracleUtils._mgmeMultipleTableOracle([{
            key: "Scavenging",
            name: "Mythic GME: Scavenging Results (2e)"
        }, {name: "Mythic GME: Scavenging Results (2e)"}])
    }

    static mgmeSmells() {
        MGMEOracleUtils._mgmeMultipleTableOracle([{
            key: "Smell",
            name: "Mythic GME: Smells (2e)"
        }, {name: "Mythic GME: Smells (2e)"}])
    }

    static mgmeSounds() {
        MGMEOracleUtils._mgmeMultipleTableOracle([{
            key: "Sound",
            name: "Mythic GME: Sounds (2e)"
        }, {name: "Mythic GME: Sounds (2e)"}])
    }

    static mgmeSpellEffects() {
        MGMEOracleUtils._mgmeMultipleTableOracle([{
            key: "Spell Effect",
            name: "Mythic GME: Spell Effects (2e)"
        }, {name: "Mythic GME: Spell Effects (2e)"}])
    }

    static mgmeStarshipDescriptors() {
        MGMEOracleUtils._mgmeMultipleTableOracle([{
            key: "Starship",
            name: "Mythic GME: Starship Descriptors (2e)"
        }, {name: "Mythic GME: Starship Descriptors (2e)"}])
    }

    static mgmeTerrainDescriptors() {
        MGMEOracleUtils._mgmeMultipleTableOracle([{
            key: "Terrain",
            name: "Mythic GME: Terrain Descriptors (2e)"
        }, {name: "Mythic GME: Terrain Descriptors (2e)"}])
    }

    static mgmeUndeadDescriptors() {
        MGMEOracleUtils._mgmeMultipleTableOracle([{
            key: "Undead",
            name: "Mythic GME: Undead Descriptors (2e)"
        }, {name: "Mythic GME: Undead Descriptors (2e)"}])
    }

    static mgmeVisions() {
        MGMEOracleUtils._mgmeMultipleTableOracle([{
            key: "Vision & Dream",
            name: "Mythic GME: Visions & Dreams (2e)"
        }, {name: "Mythic GME: Visions & Dreams (2e)"}])
    }

}