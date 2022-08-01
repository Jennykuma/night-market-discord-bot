import { CommandInteraction, Client, EmbedBuilder } from "discord.js";
import { Command } from "../Command";
import axios from "axios";
import moment from "moment";

var content = '';

export const CrystalPrice: Command = {
  name: "crystalprice",
  description: "Returns the gold price of Blue Crystals",
  run: async (client: Client, interaction: CommandInteraction) => {
    getCrystalPrice()
      .then((data) => {
        var crystalPrice = data[0];
        content = `Current price is: ${crystalPrice} as of ${moment(crystalPrice['updatedAt']).fromNow()}`;

        const priceFor95 = Math.ceil(parseFloat(crystalPrice['recentPrice']) * 95)
        const priceFor950 = Math.ceil(parseFloat(crystalPrice['recentPrice']) * 95) * 10
        
        const exampleEmbed = new EmbedBuilder()
          .setColor('#8876E8')
          .setTitle(`Current Crystal Price: ${priceFor95} gold / 95 blue crystals`)
          .setDescription(`as of ${moment(crystalPrice['updatedAt']).fromNow()}`)
          .addFields(
            { name: `Extra Info: `, value: `${priceFor950} gold / 950 blue crystals` }
          )
          .setTimestamp()
          .setThumbnail(`${crystalPrice['image']}`)
          .setFooter({ text: 'by Jennykuma' });

        interaction.followUp({
          ephemeral: true,
          embeds: [exampleEmbed]
        });
      })
      .catch((error) => { return error })
  }
};

async function getCrystalPrice() {
  try {
    const { data, status } = await axios.get<any>(
      'https://www.lostarkmarket.online/api/export-market-live/North%20America%20West?category=Currency%20Exchange',
      {
        headers: {
          Accept: 'application/json',
        },
      },
    );
    return data;
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
