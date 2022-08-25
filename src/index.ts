import * as Sentry from '@sentry/node';
import { ChannelType, Client, GatewayIntentBits } from 'discord.js';
import CardData from './asoiaf/data';

Sentry.init({
  dsn: 'https://994d8a85b8ec4807bf6984afe7ca44b7@o128795.ingest.sentry.io/6686260',
  tracesSampleRate: 1.0,
});

try {
  const COMMAND_PREFIX = '!asoiaf';
  const SHORT_COMMAND_PREFIX = '!a';

  const discord = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
  });

  discord.once('ready', () => {
    console.log('ASOIAF TMG Bot is ready!');
  });

  discord.login(process.env.DISCORD_TOKEN);

  discord.on('messageCreate', (message) => {
    if (message.author.bot) {
      return;
    }
    if (!message.content.startsWith(COMMAND_PREFIX) && !message.content.startsWith(SHORT_COMMAND_PREFIX)) {
      return;
    }
    if (message.channel.type !== ChannelType.GuildText) {
      return;
    }

    const command = message.content.startsWith(COMMAND_PREFIX)
      ? message.content.substring(COMMAND_PREFIX.length).trim()
      : message.content.substring(SHORT_COMMAND_PREFIX.length).trim();

    console.log(`Received command: ${command}`);

    if (command === '') {
      message.channel.send('In the Game of Thrones, you specify a search parameter or you die. There is no middle ground.');
      return;
    }

    if (command === 'help') {
      message.channel.send(`Available commands: \`!asoiaf [search parameter]\`
_(Available shorthand: \`!a [search parameter]\`)_

To report typos, missing cards, or missing artwork, please go here:
https://github.com/brianchuchua/asoiaf-tmg-discord-bot/issues
    `);
      return;
    }

    if (command === '!stats') {
      const numberOfCards = Object.keys(CardData).length;
      message.channel.send(`ASOIAF TMG Bot is tracking ${numberOfCards} cards.`);
      return;
    }

    if (command.toLowerCase().includes('friendzone') || command.toLowerCase().includes('friend zone')) {
      const serFriendZone = Object.values(CardData).filter((card) => card.name.toLowerCase().includes('jorah mormont - the exiled knight'));

      if (serFriendZone) {
        message.channel.send(serFriendZone[0].imageUrl);
        if (serFriendZone[0].imageUrlBack) {
          message.channel.send(serFriendZone[0].imageUrlBack);
        }
        return;
      }
    }

    if (
      command.toLowerCase().includes('dont want it') ||
      command.toLowerCase().includes("don't want it") ||
      command.toLowerCase().includes('dun want it') ||
      command.toLowerCase().includes('dun want et') ||
      command.toLowerCase().includes('dun wan et')
    ) {
      const butcheredCharacter = Object.values(CardData).filter((card) => card.name.toLowerCase().includes('jon snow - "lord snow"'));

      if (butcheredCharacter) {
        message.channel.send(butcheredCharacter[0].imageUrl);
        if (butcheredCharacter[0].imageUrlBack) {
          message.channel.send(butcheredCharacter[0].imageUrlBack);
        }
        return;
      }
    }

    if (
      command.toLowerCase().includes('my queen') ||
      command.toLowerCase().includes('muh queen') ||
      command.toLowerCase().includes('mah queen')
    ) {
      const subvertedExpectation = Object.values(CardData).filter((card) =>
        card.name.toLowerCase().includes('daenerys targaryen - mother of dragons')
      );

      if (subvertedExpectation) {
        message.channel.send(subvertedExpectation[0].imageUrl);
        if (subvertedExpectation[0].imageUrlBack) {
          message.channel.send(subvertedExpectation[0].imageUrlBack);
        }
        return;
      }
    }

    let exactMatchFound = false;
    let cards = Object.values(CardData).filter((card) => {
      const isExactMatch = card.name.toLowerCase() === command.toLowerCase();
      if (isExactMatch) {
        exactMatchFound = true;
        return true;
      }
      const includesSequentialMatch = card.name.toLowerCase().includes(command.toLowerCase());
      if (includesSequentialMatch) {
        return true;
      }

      const includesAllWords = command.split(' ').every((word) => card.name.toLowerCase().includes(word.toLowerCase()));
      return includesAllWords;
    });

    if (exactMatchFound) {
      cards = cards.filter((card) => card.name.toLowerCase() === command.toLowerCase());
    }
    if (cards.length === 0) {
      message.channel.send(`No cards found containing the search: "${command}".`);
      return;
    }
    if (cards.length > 1) {
      const MAX_CARDS = 10;
      const firstFewCards = cards.slice(0, MAX_CARDS);
      const cardNames = firstFewCards.map((card) => `${card.name} _(${card.type})_`).join('\n- ');
      const cardCount = cards.length;
      const cardCountString = cardCount === 1 ? 'card' : 'cards';
      const andMore = cardCount > MAX_CARDS ? `\n- _(...and ${cardCount - MAX_CARDS} more)_` : '';
      message.channel.send(
        `Found ${cardCount} ${cardCountString} containing the search: "${command}" -- please be more specific. Cards found: \n\n- ${cardNames}${andMore}`
      );
      return;
    }
    const card = cards[0];

    message.channel.send(`${card.imageUrl}`);
    if (card.imageUrlBack) {
      message.channel.send(`${card.imageUrlBack}`);
    }
  });
} catch (error) {
  console.error(error);
}
