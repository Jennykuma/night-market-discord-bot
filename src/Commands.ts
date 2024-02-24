import { Command } from './Command';
import { CrystalPrice } from './commands/CrystalPrice';
import { Hello } from './commands/Hello';
import { KetchupMilk } from './commands/KetchupMilk';
import { ServerStatus } from './commands/ServerStatus';
import { ShopReminder } from './commands/ShopReminder';

export const Commands: Command[] = [Hello, CrystalPrice, KetchupMilk, ServerStatus, ShopReminder];
