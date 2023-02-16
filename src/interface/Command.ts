import type { N } from '../N';
import type { ApplicationCommandData, Interaction } from 'discord.js';
import type { Logger } from 'log4js';

import log4js from 'log4js';

const { getLogger } = log4js;

export abstract class Command {
    protected readonly logger: Logger;

    protected constructor(
        protected readonly client: N<true>,
        public readonly data: ApplicationCommandData,
    ) {
        this.logger = getLogger(data.name);
    }

    public abstract run(interaction: Interaction): unknown;
}
