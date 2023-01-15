import { Command } from "./Command";
import { CrystalPrice } from "./commands/CrystalPrice";
import { Hello } from "./commands/Hello";
import { ShopReminder } from "./commands/ShopReminder";

export const Commands: Command[] = [Hello, CrystalPrice, ShopReminder];
