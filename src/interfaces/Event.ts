import type { N } from '../N';
import type { ClientEvents } from 'discord.js';
import type { Logger } from 'log4js';

import log4js from 'log4js';

const { getLogger } = log4js;

export abstract class Event {
    protected readonly logger: Logger;

    protected constructor(
        protected readonly client: N,
        public readonly name: keyof ClientEvents,
    ) {
        this.logger = getLogger(name);
    }

    public abstract run(...args: unknown[]): unknown;
}
