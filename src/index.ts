import * as Sentry from '@sentry/node';
import { ChannelType, Client, GatewayIntentBits } from 'discord.js';
import CardData from './asoiaf/data';
import { cardTypeCommands, CardTypes, TYPE_PREFIX } from './asoiaf/types';

Sentry.init({
  dsn: 'https://994d8a85b8ec4807bf6984afe7ca44b7@o128795.ingest.sentry.io/6686260',
  tracesSampleRate: 1.0,
});

try {
  const COMMAND_PREFIX = process.env.NODE_ENV === 'production' ? '!asoiaf' : '!devtest';
  const SHORT_COMMAND_PREFIX = process.env.NODE_ENV === 'production' ? '!a' : '!d';
  const FRONT_OF_CARD_FLAG = '-front';
  const SHORT_FRONT_OF_CARD_FLAG = '-f';
  const BACK_OF_CARD_FLAG = '-back';
  const SHORT_BACK_OF_CARD_FLAG = '-b';

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

    let command = message.content.startsWith(COMMAND_PREFIX)
      ? message.content.substring(COMMAND_PREFIX.length).trim()
      : message.content.substring(SHORT_COMMAND_PREFIX.length).trim();

    console.log(`Received command: ${command}`);

    command = command.replace(/’/g, "'");

    if (command === '') {
      message.channel.send(
        'In the Game of Thrones, you specify a search parameter or you die. There is no middle ground.\n\n_(Tip: Try `!a help` to see a list of commands.)_'
      );
      return;
    }

    if (command === 'help') {
      message.channel.send(`Available commands: \`!asoiaf [search parameter]\`
_(Available shorthand: \`!a [search parameter]\`)_

Example: \`!a The Mountain That Rides\`

You can also search by card type: \`!asoiaf [search parameter] t:[card type]\`

Example: \`!a Eddard t:c\`

Available card types:

- \`t:commander\` _(shorthand: \`t:cm\`, \`t:c\`)_
- \`t:combatunit\` _(shorthand: \`t:cu\`)_
- \`t:attachment\` _(shorthand: \`t:a\`)_
- \`t:noncombatunit\` _(shorthand: \`t:ncu\`, \`t:nc\`, \`t:n\`)_
- \`t:opponentattachment\` _(shorthand: \`t:oa\`, \`t:o\`)_
- \`t:tacticscard\` _(shorthand: \`t:tactics\`, \`t:tactic\`, \`t:tc\`, \`t:t\`)_
- \`t:tacticszone\` _(shorthand: \`t:tz\`)_
- \`t:informationcard\` _(shorthand: \`t:info\`, \`t:i\`)_

You can also just ask for the front or back of a card:

\`!a [search parameter] -front\` or \`!a [search parameter] -f\`
\`!a [search parameter] -back\` or \`!a [search parameter] -b\`

To report bugs, typos, missing cards, or missing artwork, please go here: <https://github.com/brianchuchua/asoiaf-tmg-discord-bot/issues>
    `);
      return;
    }

    if (command === '!stats') {
      const numberOfCards = Object.keys(CardData).length;
      message.channel.send(`ASOIAF TMG Bot is tracking ${numberOfCards} cards.`);
      return;
    }

    // #############################################################################################
    // # Nickname nonsense starts here -- I'll move it to a separate file once it gets out of hand #
    // #############################################################################################
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
    // ###########################################################################################
    // # Nickname nonsense ends here -- I'll move it to a separate file once it gets out of hand #
    // ###########################################################################################

    let type = command.split(' ').find((word) => word.startsWith(TYPE_PREFIX));
    let cardType = CardTypes.None;
    if (type) {
      command = command.replace(type, '').trim();
      type = type.replace(TYPE_PREFIX, '').trim();
      Object.keys(cardTypeCommands).forEach((key) => {
        cardTypeCommands[key as CardTypes]?.forEach((cardTypeCommand) => {
          if (cardTypeCommand === type) {
            cardType = key as CardTypes;
          }
        });
      });
      if (cardType === CardTypes.None) {
        message.channel.send(`Unknown card type received: "${type}"

Available card types:

- \`t:commander\` _(shorthand: \`t:cm\`, \`t:c\`)_
- \`t:combatunit\` _(shorthand: \`t:cu\`)_
- \`t:attachment\` _(shorthand: \`t:a\`)_
- \`t:noncombatunit\` _(shorthand: \`t:ncu\`, \`t:nc\`, \`t:n\`)_
- \`t:opponentattachment\` _(shorthand: \`t:oa\`, \`t:o\`)_
- \`t:tacticscard\` _(shorthand: \`t:tactics\`, \`t:tactic\`, \`t:tc\`, \`t:t\`)_
- \`t:tacticszone\` _(shorthand: \`t:tz\`)_
- \`t:informationcard\` _(shorthand: \`t:info\`, \`t:i\`)_

_(Tip: Try \`!a help\` to see a list of commands.)_
`);
        return;
      }
    }

    let frontOnly = false;
    let backOnly = false;
    if (command.includes(FRONT_OF_CARD_FLAG)) {
      frontOnly = true;
      command = command.replace(FRONT_OF_CARD_FLAG, '').trim();
    } else if (command.includes(SHORT_FRONT_OF_CARD_FLAG)) {
      frontOnly = true;
      command = command.replace(SHORT_FRONT_OF_CARD_FLAG, '').trim();
    } else if (command.includes(BACK_OF_CARD_FLAG)) {
      backOnly = true;
      command = command.replace(BACK_OF_CARD_FLAG, '').trim();
    } else if (command.includes(SHORT_BACK_OF_CARD_FLAG)) {
      backOnly = true;
      command = command.replace(SHORT_BACK_OF_CARD_FLAG, '').trim();
    }

    let exactMatchFound = false;
    let cards = Object.values(CardData).filter((card) => {
      if (
        (cardType === CardTypes.Commander && !card.isCommander) ||
        (cardType !== CardTypes.None && cardType !== CardTypes.Commander && card.type !== cardType)
      ) {
        return false;
      }
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

    let ofTypeMessage = null;
    if (cardType === CardTypes.None) {
      ofTypeMessage = '';
    } else if (cardType === CardTypes.Commander) {
      ofTypeMessage = `_(of sub-type Commander)_ `;
    } else {
      ofTypeMessage = `_(of type ${cardType})_ `;
    }

    if (exactMatchFound) {
      cards = cards.filter((card) => card.name.toLowerCase() === command.toLowerCase());
    }
    if (cards.length === 0) {
      const noCardsMessage = `No cards ${ofTypeMessage}found containing the search: "${command}". \n\n_(Tip: Try \`!a help\` to see a list of commands.)_`;
      message.channel.send(noCardsMessage);
      return;
    }
    if (cards.length > 1) {
      const MAX_CARDS = 10;
      const firstFewCards = cards.slice(0, MAX_CARDS);
      const cardNames = firstFewCards.map((card) => `${card.name} _(${card.type})_`).join('\n- ');
      const cardCount = cards.length;
      const cardCountString = cardCount === 1 ? 'card' : 'cards';
      const andMore = cardCount > MAX_CARDS ? `\n- _(...and ${cardCount - MAX_CARDS} more)_` : '';
      if (command === '') {
        message.channel.send(
          `Found ${cardCount} ${cardCountString} ${ofTypeMessage}-- please be more specific. Cards found: \n\n- ${cardNames}${andMore}\n\n_(Tip: Try \`!a help\` to see a list of commands.)_`
        );
      } else {
        message.channel.send(
          `Found ${cardCount} ${cardCountString} ${ofTypeMessage}containing the search: "${command}" -- please be more specific. Cards found: \n\n- ${cardNames}${andMore}\n\n_(Tip: Try \`!a help\` to see a list of commands.)_`
        );
      }
      return;
    }
    const card = cards[0];

    if (!backOnly) {
      message.channel.send(`${card.imageUrl}`);
    }
    if (card.imageUrlBack && !frontOnly) {
      message.channel.send(`${card.imageUrlBack}`);
    }
    if (backOnly && !card.imageUrlBack) {
      message.channel.send(`A man has no back image for this card.`);
    }
  });
} catch (error) {
  console.error(error);
}
