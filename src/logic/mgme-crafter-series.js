import MGMECommon from "../utils/mgme-common";
import MGMEChatJournal from "../utils/mgme-chat-journal";

export default class MGMECrafterSeries {
  static initSettings() {
    game.settings.register('mythic-gme-tools', 'progressPoints', {
      name: 'Progress Points',
      hint: 'PP for Random Location Crafter',
      scope: 'world',
      config: false,
      type: Object,
      default: {locations: 0, encounters: 0, objects: 0}
    });
  }

  static _mgmeUpdateOpenDialogs(currPP) {
    $("#mgme_rng_loc_crafter_formula_1").val('1d10+'+currPP['locations']);
    $("#mgme_rng_loc_crafter_formula_2").val('1d10+'+currPP['encounters']);
    $("#mgme_rng_loc_crafter_formula_3").val('1d10+'+currPP['objects']);
  }

  static mgmeRngLocCrafterPPInc(n, which) {
    const currPP = game.settings.get('mythic-gme-tools', 'progressPoints');
    const whisper = MGMECommon._mgmeGetWhisperMode();
    if (which in currPP) {
      currPP[which] += n;
    } else {
      Object.keys(currPP).forEach(which => {
        currPP[which] += n;
      })
    }
    MGMECrafterSeries._mgmeUpdateOpenDialogs(currPP);
    game.settings.set('mythic-gme-tools', 'progressPoints', currPP);
    MGMEChatJournal._mgmeCreateChatAndLog({
      flavor: game.i18n.localize('MGME.CrafterRngLocCrafterPPShift'),
      content: `<div><b>Locations:</b> ${currPP.locations}</div><div><b>Encounters:</b> ${currPP.encounters}</div><div><b>Objects:</b> ${currPP.objects}</div>`,
      whisper: whisper
    })
  }

  static mgmeRngLocCrafterPPDec(n, which) {
    const currPP = game.settings.get('mythic-gme-tools', 'progressPoints');
    const whisper = MGMECommon._mgmeGetWhisperMode();
    if (which in currPP) {
      currPP[which] = Math.max(0, currPP[which] - n);
    } else {
      Object.keys(currPP).forEach(which => {
        currPP[which] = Math.max(0, currPP[which] - n);
      })
    }
    MGMECrafterSeries._mgmeUpdateOpenDialogs(currPP);
    game.settings.set('mythic-gme-tools', 'progressPoints', currPP);
    MGMEChatJournal._mgmeCreateChatAndLog({
      flavor: game.i18n.localize('MGME.CrafterRngLocCrafterPPShift'),
      content: `<div><b>Locations:</b> ${currPP.locations}</div><div><b>Encounters:</b> ${currPP.encounters}</div><div><b>Objects:</b> ${currPP.objects}</div>`,
      whisper: whisper
    })
  }

  static mgmeRngLocCrafterPPReset() {
    const whisper = MGMECommon._mgmeGetWhisperMode();
    const newPP = {locations: 0, encounters: 0, objects: 0};
    MGMECrafterSeries._mgmeUpdateOpenDialogs(newPP);
    game.settings.set('mythic-gme-tools', 'progressPoints', newPP);
    MGMEChatJournal._mgmeCreateChatAndLog({
      flavor: game.i18n.localize('MGME.CrafterRngLocCrafterPPShift'),
      content: `<div><b>Locations:</b> ${newPP.locations}</div><div><b>Encounters:</b> ${newPP.encounters}</div><div><b>Objects:</b> ${newPP.objects}</div>`,
      whisper: whisper
    })
  }

  static mgmeRngLocCrafterPPStatus() {
    const currPP = game.settings.get('mythic-gme-tools', 'progressPoints');
    const whisper = MGMECommon._mgmeGetWhisperMode();
    MGMEChatJournal._mgmeCreateChatAndLog({
      flavor: game.i18n.localize('MGME.CrafterRngLocCrafterPPStatus'),
      content: `<div><b>Locations:</b> ${currPP.locations}</div><div><b>Encounters:</b> ${currPP.encounters}</div><div><b>Objects:</b> ${currPP.objects}</div>`,
      whisper: whisper
    })
  }

  static async mgmeRngLocCrafter() {
    const currPP = game.settings.get('mythic-gme-tools', 'progressPoints');
    const rngLocationCrafterDialog = await renderTemplate('./modules/mythic-gme-tools/template/crafter-rng-location-dialog.hbs', {PPLoc: currPP.locations, PPEnc: currPP.encounters, PPObj: currPP.objects});
    const numEntries = 4;

    let dialogue = new Dialog({
      title: game.i18n.localize('MGME.CrafterRngLocCrafterTitle'),
      content: rngLocationCrafterDialog,
      render: html => {
        const tables = game.tables.contents.map(t => t.name);
        const lastSet = game.user.getFlag('mythic-gme-tools', 'mgmeLastRngLocCrafterSet');
        tables.sort()
        let i = 0;
        while (i < numEntries) {
          i += 1;
          const targetElem = $("#mgme_rng_loc_crafter_table_" + i);
          tables.forEach(t => targetElem.append(`<option value="${t}">${t}</option>`));
          if (lastSet?.length && lastSet[i-1])
            targetElem.val(lastSet[i-1]);
        }
        html[0].getElementsByTagName("input").mgme_rng_loc_crafter_flavor.focus();
      },
      buttons: {
        submit: {
          icon: '<i class="fas fa-comments"></i>',
          label: game.i18n.localize('MGME.ToChat'),
          callback: async (html) => {
            const locCraftFlavor = $("#mgme_rng_loc_crafter_flavor").val()?.trim();
            let content = `${locCraftFlavor.length ? `<h2>${locCraftFlavor}</h2>` : ''}`;
            content += `<div><h3>Progress Points:</h3></div><div><b>Locations:</b> ${currPP.locations}</div><div><b>Encounters:</b> ${currPP.encounters}</div><div><b>Objects:</b> ${currPP.objects}</div></h3></div><br>`
            const debug = game.settings.get('mythic-gme-tools', 'mythicRollDebug');
            const whisper = MGMECommon._mgmeGetWhisperMode();
            let i = 0;
            let rngLocCrafterSet = [];
            while (i < numEntries) {
              i += 1;
              const selectedTable = $("#mgme_rng_loc_crafter_table_"+i).val()?.trim();
              const formula = $("#mgme_rng_loc_crafter_formula_"+i).val()?.trim();
              const table = game.tables.contents.find(t => t.name === selectedTable);
              rngLocCrafterSet.push(selectedTable);
              if (i === 4 && !html.find("#mgme_rng_loc_crafter_roll_reg").prop('checked')) // 4 = region, only roll if checkbox is marked (don't learn from this)
                continue;
              if (selectedTable?.length && table) {
                content += `<b>${selectedTable}</b>`;
                await table.draw({roll: Roll.create(formula?.length ? formula : table.data.formula), displayChat: false}).then(draw => {
                  content += `<div>${draw.results[0].getChatText()}${debug ? ` (${draw.roll.formula} = ${draw.roll.total})` : ''}</div>`;
                });
              }
            }
            MGMEChatJournal._mgmeCreateChatAndLog({
              whisper: whisper,
              flavor: game.i18n.localize('MGME.CrafterRngLocCrafterTitle'),
              content: content
            });
            game.user.setFlag('mythic-gme-tools', 'mgmeLastRngLocCrafterSet', rngLocCrafterSet);
          }
        }
      },
      default: "submit"
    })

    dialogue.render(true)
  }
}