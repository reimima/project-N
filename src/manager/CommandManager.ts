import type { N } from '../N';
import type { Command } from '../interfaces';
import type { Guild } from 'discord.js';
import { Collection } from 'discord.js';
import log4js from 'log4js';

export class CommandManager extends Collection<string, Command> {
    private readonly logger = log4js.getLogger('CommandManager');

    public constructor(private readonly client: N) {
        super();
    }

    public async registerAll(): Promise<void> {
        this.logger.info('Starting to register all commands');

        await import('../commands/ping').then(i => this.set('ping', new i.default(this.client)));

        this.logger.info(`Successfully registered ${this.size} commands`);
    }

    public async subscribe(): Promise<void> {
        const devGuild = this.client.guilds.cache.get(this.client.configs.devGuild) as Guild;

        const subscribed = await devGuild.commands.fetch() ?? new Collection();

        const diffAdded = this.filter(c => !subscribed.find(s => s.name === c.data.name));
        const diffRemoved = subscribed.filter(s => !this.find(c => s.name === c.data.name));
        const diff = this.filter(c => !(subscribed.find(s => s.name === c.data.name)?.equals(c.data) ?? false));

        await Promise.allSettled([
            ...diffAdded.mapValues(add => devGuild.commands.create(add.data)),
            ...diffRemoved.mapValues(remove => devGuild.commands.delete(remove.id)),
            ...diff.mapValues(change => {
                const id = subscribed.find(s => s.name === change.data.name)?.id;
                if (id) return devGuild.commands.edit(id, change.data);
            }),
        ]);
    }
}
