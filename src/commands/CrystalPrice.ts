import { CommandInteraction, Client } from "discord.js";
import { Command } from "../Command";
import axios from "axios";

export const CrystalPrice: Command = {
  name: "crystalprice",
  description: "Returns the gold price of Blue Crystals",
  run: async (client: Client, interaction: CommandInteraction) => {
    calculateCrystalPrice();
    const content = 'tehe';

    await interaction.followUp({
        ephemeral: true,
        content
    });
  }
};

function calculateCrystalPrice() {
  let crystalPrice = ''
  getCrystalPrice()
    .then((data) => {
      crystalPrice = data[0]['recentPrice'];
    })
    .catch((error) => { return error })
}

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
