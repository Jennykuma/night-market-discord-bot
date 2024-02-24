import { CommandInteraction, Client } from 'discord.js';
import { Command } from '../Command';

export const KetchupMilk: Command = {
  name: 'ketchupmilk',
  description: 'Returns the best gif of all time',
  run: async (client: Client, interaction: CommandInteraction) => {
    const content = 'https://tenor.com/view/hot-dog-straw-gif-22095372'

    interaction.editReply({ content });
  }
};
