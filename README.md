# night-market-discord-bot

A TypeScript Discord bot for the Night Market Discord server. The bot registers slash commands, responds with Lost Ark utilities and server jokes, and posts a scheduled weekly shop reminder.

## Features

- Registers Discord slash commands on startup.
- Responds to slash command interactions through `discord.js`.
- Fetches live Lost Ark crystal exchange data for North America West.
- Fetches Thaemine server status from a public Lost Ark API.
- Sends a scheduled Tuesday shop reminder to a configured Discord channel.
- Includes image attachments for some embed responses from `src/assets`.

## Tech Stack

- Node.js
- TypeScript
- `discord.js`
- `ts-node`
- `axios`
- `cron`
- `dotenv`

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a `.env` file in the project root:

   ```bash
   DISCORD_TOKEN=your_discord_bot_token
   ```

   `.env.template` contains the required environment variable name.

3. Make sure the bot is invited to your Discord server with permission to use application commands and send messages in the target channels.

## Running the Bot

Start the bot locally:

```bash
npm run start
```

This runs:

```bash
ts-node src/Bot.ts
```

The bot logs `Bot is starting...` during startup and logs the bot username when it is online.

## Deployment

The included `Procfile` defines a worker process:

```Procfile
worker: npm run start
```

This can be used by hosting platforms that support Procfile-based worker apps.

## Slash Commands

Commands are registered from `src/Commands.ts` when the Discord client becomes ready.

| Command | Description | Response |
| --- | --- | --- |
| `/hello` | Returns a greeting. | Sends a welcome message for Night Market. |
| `/crystalprice` | Returns the gold price of Blue Crystals. | Fetches current North America West currency exchange data and sends an embed with the gold cost for 95 and 950 blue crystals. |
| `/ketchupmilk` | Returns the best gif of all time. | Sends a Tenor GIF link. |
| `/serverstatus` | Returns Thaemine's server status. | Fetches Thaemine server status and sends an embed with a status color and image attachment. |
| `/shopreminder` | Returns a reminder for guildies to buy out weekly shops. | Sends the shop reminder embed with a bun image attachment. |

## Scheduled Shop Reminder

`src/Bot.ts` schedules an automatic shop reminder using `cron`.

Schedule:

```text
0 11-23/3 * * 2
```

Time zone:

```text
America/Los_Angeles
```

This means the bot posts every 3 hours from 11:00 through 23:00 on Tuesdays, using Los Angeles time.

The reminder is currently sent to this hard-coded channel ID:

```text
940792601181827114
```

The reminder embed is defined in `src/commands/ShopReminder.ts`.

## Project Structure

```text
src/
  Bot.ts                       Bot entry point, Discord client setup, cron setup
  Command.ts                   Shared command interface
  Commands.ts                  Registered slash command list
  Config.ts                    Environment config helper
  assets/                      Image attachments used in embeds
  commands/                    Slash command implementations
  listeners/
    interactionCreate.ts       Slash command interaction handler
    ready.ts                   Slash command registration on ready
```

## Adding a New Slash Command

1. Create a new file in `src/commands`.
2. Export a `Command` object with:
   - `name`
   - `description`
   - `run(client, interaction)`
3. Add the new command to the `Commands` array in `src/Commands.ts`.
4. Restart the bot so Discord application commands are registered again.

Example shape:

```ts
import { Client, CommandInteraction } from 'discord.js';
import { Command } from '../Command';

export const Example: Command = {
  name: 'example',
  description: 'Returns an example response',
  run: async (client: Client, interaction: CommandInteraction) => {
    await interaction.editReply({ content: 'Example response' });
  }
};
```

## Notes

- `DISCORD_TOKEN` is read directly in `src/Bot.ts`.
- Slash commands are registered globally through `client.application.commands.set(Commands)`.
- The scheduled shop reminder channel ID is currently hard-coded in `src/Bot.ts`.
- API-backed commands depend on the availability of their external services.
