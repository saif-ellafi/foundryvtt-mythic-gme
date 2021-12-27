import MGMECommon from "../utils/mgme-common";
import MGMEChatJournal from "../utils/mgme-chat-journal";

export default class MGMEOracleBuilder {
  /** MACRO */
  static async mgmeOracleBuilder() {
    if (!game.tables.contents.length) {ui.notifications.warn(game.i18n.localize('MGME.WarnNoTables')); return}
    const builderDialog = await renderTemplate('./modules/mythic-gme-tools/template/extras-oraclebuilder-dialog.hbs', {})

    let dialogue = new Dialog({
      title: game.i18n.localize('MGME.OracleBuilder'),
      content: builderDialog,
      render: function (html) {
        const entriesOpen = 1; // Configurable???
        const lastOracle = game.user.getFlag('mythic-gme-tools', 'mgmeLastCustomOracle');
        if (lastOracle) {
          html.find(`#mgme_question_target`).val(lastOracle.name);
          html.find("#mgme_question_flavor").prop('checked', lastOracle.askFlavor);
        }
        let i = 1;
        while (i <= 5) {
          const lastOracleLabel = lastOracle?.props[i-1]?.label ?? '';
          const lastOracleTable = lastOracle?.props[i-1]?.table ?? '';
          const lastOracleDraws = lastOracle?.props[i-1]?.draws ?? 1;
          let cls = (i <= entriesOpen || lastOracleLabel.length) ? '' : 'stat-hidden';
          html.find("#mgme_builder_container").append(
            `
          <div id="entries_${i}" class="${cls}">
            <input id="mgme_builder_label_${i}" value="${lastOracleLabel}" style="margin-bottom:10px;width:122px;height:25px;" placeholder="Entry Label #${i}"/>
            <select id="mgme_builder_table_${i}" class="mgme_builder_entries" style="width:210px;margin-bottom:10px;"></select>
            <select id="mgme_builder_draws_${i}" style="width:35px;margin-bottom:10px;">
              <option value="1" ${lastOracleDraws === 1 ? 'selected' : ''}>1</option>
              <option value="2" ${lastOracleDraws === 2 ? 'selected' : ''}>2</option>
              <option value="3" ${lastOracleDraws === 3 ? 'selected' : ''}>3</option>
              <option value="4" ${lastOracleDraws === 4 ? 'selected' : ''}>4</option>
              <option value="5" ${lastOracleDraws === 5 ? 'selected' : ''}>5</option>
            </select>
          </div>
          `
          )
          const tableEntries = html.find(`#mgme_builder_table_${i}`);
          const mythicTables = game.tables.contents.map(t => t.name);
          mythicTables.sort()
          mythicTables.forEach(t => tableEntries.append(`<option value="${t}" ${lastOracleTable === t ? 'selected' : ''}>${t}</option>`));
          i += 1;
        }
        html[0].getElementsByTagName("input").mgme_question_target.focus();
      },
      buttons: {
        test: {
          icon: '<i class="fas fa-comments"></i>',
          label: game.i18n.localize('MGME.TestOracle'),
          callback: (html) => {
            const oracle = MGMEOracleBuilder._mgmeOracleBuilderParse(html);
            if (oracle) {
              oracle.test = true;
              MGMEOracleBuilder.mgmePrepareCustomOracleQuestion(oracle);
            }
          }
        },
        toMacro: {
          icon: '<i class="fas fa-save"></i>',
          label: game.i18n.localize('MGME.SaveOracle'),
          callback: (html) => {
            const oracle = MGMEOracleBuilder._mgmeOracleBuilderParse(html);
            if (oracle) {
              const command = `game.modules.get('mythic-gme-tools').api.mgmePrepareCustomOracleQuestion(${JSON.stringify(oracle)});`;
              Macro.create({name: oracle.name, type: 'script', command: command, img: 'icons/svg/cowled.svg'});
              ui.notifications.info(`${game.i18n.localize('MGME.OracleInfo')}: "${oracle.name}"`);
            }
          }
        }
      },
      default: "test"
    })
    dialogue.render(true)
  }

  /** MACRO */
  static async mgmePrepareCustomOracleQuestion(oracle) {
    if (oracle.askFlavor) {
      const questionDialog = await renderTemplate('./modules/mythic-gme-tools/template/extras-customoracle-dialog.hbs', {})
      let dialogue = new Dialog({
        title: oracle.name,
        content: questionDialog,
        render: (html) => html[0].getElementsByTagName("input").mgme_custom_oracle_question.focus(),
        buttons: {
          submit: {
            icon: '<i class="fas fa-comments"></i>',
            label: game.i18n.localize('MGME.ToChat'),
            callback: (html) => {
              let text = html[0].getElementsByTagName("input").mgme_custom_oracle_question.value;
              MGMEOracleBuilder._mgmeGetCustomOracleAnswers(oracle, text)
            }
          }
        },
        default: "submit"
      })
      dialogue.render(true)
    } else {
      MGMEOracleBuilder._mgmeGetCustomOracleAnswers(oracle)
    }
  }

  static _mgmeOracleBuilderParse(html) {
    const question = html.find(`#mgme_question_target`).val();
    const questionFlavor = html.find("#mgme_question_flavor").prop('checked');
    if (!question)
      return;
    const oracle = {name: question, askFlavor: questionFlavor, props: []};
    let i = 0;
    while (i < 5) {
      i += 1;
      if (html.find(`#entries_${i}`).hasClass('stat-hidden'))
        continue
      const question_label = html.find(`#mgme_builder_label_${i}`).val();
      if (!question_label.length)
        continue;
      oracle.props.push({
        label: html.find(`#mgme_builder_label_${i}`).val(),
        table: html.find(`#mgme_builder_table_${i}`).val(),
        draws: parseInt(html.find(`#mgme_builder_draws_${i}`).val())
      })
    }
    game.user.setFlag('mythic-gme-tools', 'mgmeLastCustomOracle', oracle);
    return oracle
  }

  static async _mgmeGetCustomOracleAnswers(oracle, questionFlavor) {
    let content = questionFlavor?.length ? `<h2>${questionFlavor}</h2>` : '';
    for (const prop of oracle.props) {
      const descriptorTable = await MGMECommon._mgmeFindTableByName(prop.table);
      const descriptorResults = await descriptorTable.drawMany(prop.draws, {displayChat: false});

      descriptorResults.results.forEach(result => {
        content += `<div><b>${prop.label}:</b> ${result.getChatText()}</div>`
      })
    }
    const whisper = ui.chat.getData().rollMode !== 'roll' ? [game.user] : undefined;
    let chatConfig = {
      flavor: oracle.name,
      content: content,
      speaker: ChatMessage.getSpeaker(),
      whisper: whisper
    };
    ChatMessage.create(chatConfig).then(chat => {if (!oracle.test) MGMEChatJournal._mgmeLogChatToJournal(chat)});
  }
}