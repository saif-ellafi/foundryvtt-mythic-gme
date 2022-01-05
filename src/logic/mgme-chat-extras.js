import MGMEChatJournal from "../utils/mgme-chat-journal";
import MGMECommon from "../utils/mgme-common";

export default class MGMEChatExtras {

  static async mgmeExportChatToJournal() {
    const defaultJournalName = `${game.i18n.localize('MGME.MythicAdventureLog')} ${new Date().toDateInputString()}`;
    const exportDialog = await renderTemplate('./modules/mythic-gme-tools/template/extras-exportchat-dialog.hbs', {defaultJournalName: defaultJournalName});
    let dialogue = new Dialog({
      title: game.i18n.localize('MGME.ExportAllToJournal'),
      content: exportDialog,
        render: html => html[0].getElementsByTagName("input").mgme_export_journal_name.focus(),
      buttons: {
        submit: {
          icon: '<i class="fas fa-comments"></i>',
          label: game.i18n.localize('MGME.Export'),
          callback: (html) => {
            const journalName = html.find("#mgme_export_journal_name").val();
            const includeTimestamp = html.find("#mgme_export_include_meta").prop('checked');
            const includeActorImg = html.find("#mgme_export_actor_img").prop('checked');
            const highlightFlavor = html.find("#mgme_export_highlight_flavor").prop('checked');
            const clearChat = html.find("#mgme_export_clear_chat").prop('checked');
            let entries = [];
            ui.chat.collection.contents.forEach(chat => {
              entries.push(MGMEChatJournal._mgmeBuildLogChatHtml(chat, includeTimestamp, includeActorImg, highlightFlavor));
            });
            const targetJournal = game.journal.contents.find(j => j.name === journalName);
            let journalCreation;
            if (journalName.length && targetJournal) {
              journalCreation = targetJournal.update({content: targetJournal.data.content + '\n' + entries.join('\n')});
            } else {
              journalCreation = JournalEntry.create({
                name: `${journalName.length ? journalName : defaultJournalName}`,
                content: entries.join('\n')
              });
            }
            if (clearChat)
              journalCreation.then(() => game.messages.flush());
          }
        }
      },
      default: "submit"
    })
    dialogue.render(true)
  }

  static async mgmeFormattedChat() {
    const tokens = game.scenes.active.tokens.contents;

    const formattedChatDialog = await renderTemplate('./modules/mythic-gme-tools/template/extras-formattedchat-dialog.hbs', {})

    let dialogue = new Dialog({
      title: game.i18n.localize('MGME.FormattedText'),
      content: formattedChatDialog,
      render: html => {
        const curSpeaker = ChatMessage.getSpeaker();
        const speakerElement = $("#mgme_format_speaker");
        speakerElement.append(`<option value="Gamemaster">Gamemaster</option>`);
        tokens.forEach(token => {
          if (token.actor)
            speakerElement.append(`<option value=${token.actor.id} selected>${token.name}</option>`);
        });
        speakerElement.val(curSpeaker.actor ?? curSpeaker.alias);
        html[0].getElementsByTagName("input").mgme_format_text.focus()
      },
      buttons: {
        submit: {
          icon: '<i class="fas fa-comments"></i>',
          label: game.i18n.localize('MGME.ToChat'),
          callback: () => {
            let message;
            let color = $("#mgme_format_color").val();
            if (color && color !== '') {
              color = `style="color:${color};"`;
            } else {
              `style="color:inherit;"`;
            }
            let text = $("#mgme_format_text").val();
            if (!text || text === '') return;
            switch ($("#mgme_format_style").val()) {
              case '':
              case 'normal':
              case undefined: {
                message = `<span ${color}>${text}</span>`;
                break;
              }
              case 'title': {
                message = `<h1 ${color}>${text}</h1>`;
                break;
              }
              case 'subtitle': {
                message = `<h2 ${color}>${text}</h2>`;
                break;
              }
              case 'bold': {
                message = `<b ${color}>${text}</b>`;
                break;
              }
              case 'italic': {
                message = `<em ${color}>${text}</em>`;
                break;
              }
              case 'underline': {
                message = `<u ${color}>${text}</u>`;
                break;
              }
            }

            const speakerElementVal = $("#mgme_format_speaker").val();
            const selectedSpeaker = speakerElementVal === 'Gamemaster' ? {alias: "Gamemaster"} : {actor: tokens.find(t => t.actor.id === speakerElementVal).actor.id};
            let chatConfig = {
              content: message,
              speaker: selectedSpeaker
            };
            MGMEChatJournal._mgmeCreateChatAndLog(chatConfig);
          }
        }
      },
      default: "submit"
    })
    dialogue.render(true)
  }

  static async _mgmeExternallRollTableRoll(rolls, tableName) {
    if (!rolls?.length) return;
    const rollTotals = rolls.map(r => r.total);
    const outputRollDialog = await renderTemplate('./modules/mythic-gme-tools/template/extras-externalroll2-dialog.hbs', {rollTotals: rollTotals});

    const firstDialog = new Dialog({
      title: game.i18n.localize('MGME.ExternalRollTableOutcome'),
      content: outputRollDialog,
      render: html => {
        $("#mgme_ext_roll_table_name").val(tableName);
        html[0].getElementsByTagName("input").mgme_ext_roll_outcome.focus();
      },
      buttons: {
        submit: {
          icon: '<i class="fas fa-comments"></i>',
          label: game.i18n.localize('MGME.ToChat'),
          callback: () => {
            const debug = game.settings.get('mythic-gme-tools', 'mythicRollDebug');
            const textFlavor = $("#mgme_ext_roll_flavor").val();
            const textOutcome = $("#mgme_ext_roll_outcome").val();
            const whisper = MGMECommon._mgmeGetWhisperMode();
            if (textOutcome.length)
              ChatMessage.create({
                flavor: tableName.length ? tableName : game.i18n.localize('MGME.ExternalTableCheck'),
                content: `${textFlavor.length ? `<h2>${textFlavor}</h2>` : ''}${textOutcome}${debug ? ` (${rolls[0].formula}: ${rollTotals})` : ''}`,
                whisper: whisper
              });
          }
        }
      },
      default: "submit"
    })
    firstDialog.render(true)
  }

  static async mgmeExternalRollTable() {
    const externalRollDialog = await renderTemplate('./modules/mythic-gme-tools/template/extras-externalroll1-dialog.hbs', {});

    const firstDialog = new Dialog({
      title: game.i18n.localize('MGME.ExternalRollTable'),
      content: externalRollDialog,
      render: html => {
        html[0].getElementsByTagName("input").mgme_ext_table_name.focus();
      },
      buttons: {
        submit: {
          icon: '<i class="fas fa-dice"></i>',
          label: 'Roll',
          callback: async () => {
            const tableName = $("#mgme_ext_table_name").val();
            const formula = $("#mgme_ext_formula").val();
            const howMany = parseInt($("#mgme_ext_many").val());
            const rolls = [];
            let i = 0;
            while (i < howMany) {
              const roll = Roll.create(formula.length ? formula : '1d100');
              await roll.roll({async: true}).then(async r => {
                if (game.dice3d)
                  await game.dice3d.showForRoll(r);
                rolls.push(r);
              });
              i += 1;
            }
            MGMEChatExtras._mgmeExternallRollTableRoll(rolls, tableName);
          }
        }
      },
      default: "submit"
    })
    firstDialog.render(true)
  }

  static async mgmeFlavoredRollTable() {
    const rollDialog = await renderTemplate('./modules/mythic-gme-tools/template/extras-flavortable-dialog.hbs', {});

    const firstDialog = new Dialog({
      title: game.i18n.localize('MGME.RollTableFlavorTitle'),
      content: rollDialog,
      render: html => {
        const tables = game.tables.contents.map(t => t.name);
        tables.sort()
        tables.forEach(t => $("#mgme_table_select_1").append(`<option value="${t}">${t}</option>`));
        tables.forEach(t => $("#mgme_table_select_2").append(`<option value="${t}">${t}</option>`));
        tables.forEach(t => $("#mgme_table_select_3").append(`<option value="${t}">${t}</option>`));
        html[0].getElementsByTagName("input").mgme_table_question.focus();
      },
      buttons: {
        submit: {
          icon: '<i class="fas fa-comments"></i>',
          label: game.i18n.localize('MGME.ToChat'),
          callback: () => {
            const tableQuestion = $("#mgme_table_question").val();
            let i = 0;
            while (i < 3) {
              const selectedTable = $("#mgme_table_select_"+i).val();
              const many = parseInt($("#mgme_table_many_"+i).val());
              const table = game.tables.contents.find(t => t.name === selectedTable);
              if (selectedTable?.length && table) {
                const debug = game.settings.get('mythic-gme-tools', 'mythicRollDebug');
                const whisper = MGMECommon._mgmeGetWhisperMode();
                table.drawMany(many, {displayChat: false}).then(draw => {
                  let i = 0;
                  let content = `${tableQuestion.length ? `<h2>${tableQuestion}</h2>` : ''}`
                  draw.results.forEach(result => {
                    content += `<div>${result.getChatText()}${debug ? ` (${draw.roll.terms[0].results[i].result})` : ''}</div>`
                    i += 1;
                  });
                  ChatMessage.create({
                    whisper: whisper,
                    flavor: game.i18n.localize('MGME.RollTableFlavorTitle'),
                    content: content
                  });
                });
              }
              i += 1;
            }
          }
        }
      },
      default: "submit"
    })
    firstDialog.render(true)
  }

}