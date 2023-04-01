import MGMEChatJournal from "../utils/mgme-chat-journal";

export default class MGMECore2e {

    static async adjustTable(table) {
        let size = table.results.size;
        console.log(size);
        if (size === 0 || size % 5) {
            let adjustBy = 5 - size % 5;
            let newResults = [];
            let i = 0;
            while (i < adjustBy) {
                newResults.push({
                    text: game.i18n.localize('MGME.TableResultChoose2e'),
                    range: [size+i+1, size+i+1],
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
            MGMECore2e.adjustTable(table).then((t) => t.normalize()).then((t) => t.draw());
        });
    }

    static mgmeRollThreadsList2e() {
        MGMEChatJournal._mgmeFindOrCreateRolltable('Threads List', 'Mythic Lists').then(table => {
            MGMECore2e.adjustTable(table).then((t) => t.normalize()).then((t) => t.draw());
        });
    }

}