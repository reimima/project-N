import { ActivityType, Client } from 'discord.js';
import { config } from 'dotenv';

import log4js from 'log4js';

config();

const { configure, getLogger, shutdown } = log4js;

configure({
    appenders: {
        console: {
            type: 'stdout',
            layout: {
                type: 'pattern',
                pattern: '%[[%d]%] %[[%p]%] %[[%c]%]: %m',
            },
        },
    },
    categories: {
        default: { appenders: ['console'], level: 'info', enableCallStack: true },
    },
});

type ConfigTypes = Readonly<{
    token: string;
}>;

export class N<T extends boolean> extends Client<T> {
    public readonly configs: ConfigTypes = {
        token: process.env['DISCORD_TOKEN'] ?? '',
    };

    private readonly logger = getLogger('N');

    public constructor() {
        super({
            intents: ['Guilds', 'GuildIntegrations'],
            allowedMentions: { repliedUser: false },
            presence: {
                status: 'idle',
                activities: [{
                    name: 'Developing...',
                    type: ActivityType.Playing,
                }],
            },
        });

        getLogger().level = process.env['NODE_ENV'] ? 'trace' : 'info';
    }

    public override async login(): Promise<string> {
        this.logger.info('Starting...');

        await import('./events/error').then(module => this.on('error', arg => new module.default(this as N<true>).run(arg)));

        await import('./events/ready').then(module => this.on('ready', arg => new module.default(this as N<true>).run(arg)));

        await import('./events/warn').then(module => this.on('warn', arg => new module.default(this as N<true>).run(arg)));

        return super.login(this.configs.token);
    }

    public stop(): void {
        this.logger.info('Stopping...');

        this.removeAllListeners();
        this.destroy();

        shutdown();
        process.exit();
    }
}
