import type { N } from '../N';
import type { Client } from 'discord.js';
import { Event } from '../interface';

export default class extends Event {
    public constructor(client: N<true>) {
        super(client, 'ready');
    }

    public run(client: Client<true>): void {
        this.logger.info('Succesfully logged in and is Ready.');

        this.logger.trace(`Cached ${this.client.guilds.cache.size} guild${client.guilds.cache.size <= 1 ? '' : 's'}`);
    }
}
