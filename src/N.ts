import { ActivityType, Client } from 'discord.js';
import { config } from 'dotenv';

config();

type ConfigTypes = Readonly<{
    token: string;
}>;

export class N<T extends boolean> extends Client<T> {
    public readonly configs: ConfigTypes = {
        token: process.env['DISCORD_TOKEN'] ?? '',
    };

    public constructor() {
        super({
            intents: ['Guilds', 'GuildIntegrations'],
            allowedMentions: { parse: ['users'] },
            presence: {
                status: 'idle',
                activities: [{
                    name: 'Developing...',
                    type: ActivityType.Playing,
                }],
            },
        });
    }

    public override login(): Promise<string> {
        return super.login(this.configs.token);
    }
}
