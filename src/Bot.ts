import { ActivityType, AttachmentBuilder, Client, TextChannel } from 'discord.js';
import interactionCreate from './listeners/interactionCreate';
import ready from './listeners/ready';
import { shopReminderEmbed } from './commands/ShopReminder';

require("dotenv").config();

const token = process.env.DISCORD_TOKEN;

var CronJob = require('cron').CronJob;

console.log('Bot is starting...');

const client = new Client({
  intents: []
});

function scheduleShopReminderMessage() {
  var shopReminderJob = new CronJob(
    // At minute 0 past every 3rd hour from 11 through 23 on Tuesday
    '0 11-23/3 * * 2',
    function() {
      const thumbnail = new AttachmentBuilder('./src/assets/bunEncourage.png');
      client.channels.fetch('940792601181827114')
        .then(channel=>(channel as TextChannel).send({ embeds: [shopReminderEmbed], files: [thumbnail] }));
    },
    null,
    true,
    'America/Los_Angeles'
  );
  console.log('ShopReminderJob has initialized');
}

ready(client);
interactionCreate(client);

client.on('ready', (client) => {
  client.user.setActivity('Night Market clowns', { type: ActivityType.Watching });
  scheduleShopReminderMessage();
});

client.login(token);
