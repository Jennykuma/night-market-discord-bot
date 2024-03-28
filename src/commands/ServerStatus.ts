import { AttachmentBuilder, CommandInteraction, Client, EmbedBuilder } from 'discord.js';
import { Command } from '../Command';
import axios from 'axios';

export const ServerStatus: Command = {
  name: 'serverstatus',
  description: "Returns Thaemine's server status",
  run: async (client: Client, interaction: CommandInteraction) => {
    getServerStatus()
      .then((data) => {
        let serverStatus = data['Thaemine'];

        const thumbnail = new AttachmentBuilder('./src/assets/bunNote.png');
        const serverStatusEmbed = new EmbedBuilder()
          .setColor(serverColour(serverStatus))
          .setTitle(`Thaemine - ${serverStatus}`)
          .setThumbnail('attachment://bunNote.png')
          .setFooter({ text: 'by Jennykuma' });

        interaction.editReply({ embeds: [serverStatusEmbed], files: [thumbnail] });
      })
      .catch((error) => { return error })
  }
};

async function getServerStatus() {
  try {
    const { data } = await axios.get<any>(
      'https://lost-ark-api.vercel.app/server/Thaemine',
      {
        headers: {
          Accept: 'application/json',
        },
      },
    );
    return data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error message: ', error.message);
      return error.message;
    } else {
      console.log('unexpected error: ', error);
      return 'An unexpected error occurred';
    }
  }
};

function serverColour(serverStatus: string) {
  switch(serverStatus) {
    case '✅ Ok':
      return '#549C30';
    case '❌ Busy':
      return '#F7B500';
    case '🛠️ Maintenance':
      return '#808080';
    case '⚠️ Full':
      return '#ff0000';
    default:
      return '#AEC6CF';
  }
};
