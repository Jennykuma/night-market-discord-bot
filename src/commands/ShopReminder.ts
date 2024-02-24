import { CommandInteraction, Client, EmbedBuilder } from 'discord.js';
import { Command } from '../Command';

export const shops = ['Guild Shop', 'Pirate Ship Shop', 'PvP Shop', 'Clown/Brel/Kayangel/Akkan Shop', 'Event Exchange Shop', 'Skin Shop b4 any skins leave']

export const shopReminderEmbed = new EmbedBuilder()
  .setColor('#e2725b')
  .setTitle('❗❗ Shop Reminder ⚠️')
  .setFields(
    { name: 'Remember to buy out your:', value: shops.join('\n') }
  )
  .setThumbnail('https://i.imgur.com/rlfvJPs.png')
  .setFooter({ text: 'by Jennykuma' });

export const ShopReminder: Command = {
  name: 'shopreminder',
  description: 'Returns a reminder for guildies to buyout all of the shops',
  run: async (client: Client, interaction: CommandInteraction) => {

    interaction.followUp({
      ephemeral: true,
      embeds: [shopReminderEmbed]
    });
  }
}
