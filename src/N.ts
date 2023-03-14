import { ActivityType, Client } from 'discord.js';
import { config } from 'dotenv';

import log4js from 'log4js';
import { CommandManager } from './manager';

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
    devGuild: string;
}>;

export class N extends Client {
    public readonly configs: ConfigTypes = {
        token: process.env['DISCORD_TOKEN'] ?? '',
        devGuild: '1075366696220626965',
    };

    public readonly commandManager: CommandManager;

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

        this.commandManager = new CommandManager(this);
    }

    public override async login(): Promise<string> {
        this.logger.info('Starting...');

        await import('./events/error').then(module => this.on('error', arg => new module.default(this).run(arg)));

        await import('./events/interactionCreate').then(module => this.on('interactionCreate', arg => new module.default(this).run(arg)));

        await import('./events/ready').then(module => this.on('ready', arg => new module.default(this).run(arg)));

        await import('./events/warn').then(module => this.on('warn', arg => new module.default(this).run(arg)));

        await this.commandManager.registerAll().catch(e => this.logger.error(e));

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
