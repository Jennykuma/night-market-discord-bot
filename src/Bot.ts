import { ActivityType, Client } from "discord.js";
import ENV from "./Config";
import interactionCreate from "./listeners/interactionCreate";
import ready from "./listeners/ready";

const token = ENV.TOKEN;

console.log("Bot is starting...");

const client = new Client({
  intents: []
});

client.on('ready', () => {
  client.user?.setActivity('Night Market clowns', { type: ActivityType.Watching })
});

ready(client);
interactionCreate(client);

client.login(token);
