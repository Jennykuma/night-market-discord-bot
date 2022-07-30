import { Client } from "discord.js";
import ENV from "./Config";

const token = ENV.TOKEN;

console.log("Bot is starting...");

const client = new Client({
  intents: []
});

client.login(token);

console.log(client);
