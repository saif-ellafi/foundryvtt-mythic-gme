MYTHIC_GME_CHECK_VERSION(this.name, 0);

const currentChaos = game.settings.get('mythic-gme-tools', 'currentChaos')
if (currentChaos < 9) {
  game.settings.set('mythic-gme-tools', 'currentChaos', currentChaos + 1);
  let chat = {
    content: `<h2>Chaos Increased to ${currentChaos + 1}</h2>`
  };
  $("#mgme_chaos").val(currentChaos + 1);
  ChatMessage.create(chat);
} else {
  let chat = {
    content: `<h2>Chaos already at Maximum!</h2>`
  };
  ChatMessage.create(chat);
}