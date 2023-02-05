import { ActivityType, Client, TextChannel } from "discord.js";
import ENV from "./Config";
import interactionCreate from "./listeners/interactionCreate";
import ready from "./listeners/ready";
import { shops, shopReminderEmbed } from "./commands/ShopReminder";

const token = ENV.TOKEN;

var CronJob = require('cron').CronJob;

console.log("Bot is starting...");

const client = new Client({
  intents: []
});

function scheduleShopReminderMessage() {
  var shopReminderJob = new CronJob(
    '*/30 * * * *',
    function() {
      client.channels.fetch('1071655921161351219')
        .then(channel=>(channel as TextChannel).send({embeds: [shopReminderEmbed]}));
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
  client.user?.setActivity('Night Market clowns', { type: ActivityType.Watching });
  scheduleShopReminderMessage();
});

client.login(token);
