const currentChaos = game.settings.get('mythic-gme-helper', 'currentChaos')
if (currentChaos > 1) {
  game.settings.set('mythic-gme-helper', 'currentChaos', currentChaos - 1);
  let chat = {
    content: `<h2>Chaos Decreased to ${currentChaos - 1}</h2>`
  };
  $("#mgme_chaos").val(currentChaos - 1);
  ChatMessage.create(chat);
} else {
  let chat = {
    content: `<h2>Chaos already at Minimum!</h2>`
  };
  ChatMessage.create(chat);
}