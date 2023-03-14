import type { N } from '../N';
import type { Client } from 'discord.js';
import { Event } from '../interfaces';

export default class extends Event {
    public constructor(client: N) {
        super(client, 'ready');
    }

    public async run(client: Client<true>): Promise<void> {
        this.logger.info('Succesfully logged in and is Ready.');

        this.logger.trace(`Cached ${this.client.guilds.cache.size} guild${client.guilds.cache.size <= 1 ? '' : 's'}`);

        this.logger.info('Starting to subscribe commands to Discord Server');
        await this.client.commandManager.subscribe()
            .then(() => this.logger.info('Succesfully subscribed commands to Discord Server'))
            .catch(e => this.logger.error('There was an error subscribing', e));
    }
}
