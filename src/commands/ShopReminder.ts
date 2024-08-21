import { AttachmentBuilder, CommandInteraction, Client, EmbedBuilder } from 'discord.js';
import { Command } from '../Command';

export const shops = ['Guild shop', 'Pirate shop ship', 'PvP shop', 'Solo raid shop', 'Event shop', 'Get skins b4 any skins leave']

export const shopReminderEmbed = new EmbedBuilder()
  .setColor('#e2725b')
  .setTitle('⚠️ Reminder ⚠️')
  .setFields(
    { name: 'Remember to buy out your:', value: shops.join('\n') }
  )
  .setThumbnail('attachment://bunEncourage.png')
  .setFooter({ text: 'by Jennykuma' });

export const ShopReminder: Command = {
  name: 'shopreminder',
  description: 'Returns a reminder for guildies to buyout all of the shops',
  run: async (client: Client, interaction: CommandInteraction) => {
    const thumbnail = new AttachmentBuilder('./src/assets/bunEncourage.png');
    await interaction.editReply({ embeds: [shopReminderEmbed], files: [thumbnail] });
  }
}
