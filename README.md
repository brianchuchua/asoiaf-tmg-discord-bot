# ASOIAF TMG Discord Bot 🐉

## Description

This is a Discord bot that will display images for most cards in the game A Song of Ice and Fire: The Tabletop Miniatures Game.

## Installation

Follow this link to add the bot to your server: 

https://discord.com/api/oauth2/authorize?client_id=1011134218786574416&permissions=3072&scope=bot

## Usage

First, add the bot to your server uses the step(s) above.

Then, just type the following command in any public chat:

`!asoiaf [card name]`

Example: `!asoiaf Lyanna Mormont`

You can also use `!a` as a shorthand.

Example: `!a Lyanna Mormont`

## Issues

To report issues (out of date or missing cards, typos, or any other bugs), please go to the Issues tab and click "New issue".

## Development

If I get hit by a bus or something, you can take over this project by:

- Forking it into your own repository
- Creating your own bot on Discord via https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot
- Go to the OAuth2 section, General, create a random redirect url (it's required but not used anywhere)
- Go to URL Generator, check "Bot", then check "Read Messages/View Channels" and "Send Messages"
- Click Copy to copy the URL and use it to add the bot to your server
- For running locally, clone .env.sample as .env and set the value if DISCORD_TOKEN to your Discord token (double-quotes around it)
- For running on the cloud, just ensure DISCORD_TOKEN is set to your bot's token in your cloud provider's environment variables
- Even non-coders can update the data pretty easily -- it's in the src/asoiaf folder and broken up logically by faction and card type.

## Credits

- Eric Lang, Michael Shinall, and the rest of the CMON team for a beautiful design
- Discord's API for allowing me to build a bot
- ASOIAFBuilder and On The Table Gaming for art and game data
- My local game group at The Realm, Games and Comics in Brea, California, for their feedback

## Legal

This bot is 100% unofficial and is not supported by or affiliated with CMON Games.

A Song of Ice and Fire: Tabletop Miniatures Game logo, CMON, and CMON logo are registered trademarks of CMON Global Limited.