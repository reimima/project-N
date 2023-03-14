import type { N } from '../N';
import type { Interaction } from 'discord.js';
import { Event } from '../interfaces';

export default class extends Event {
    public constructor(client: N) {
        super(client, 'interactionCreate');
    }

    public async run(interaction: Interaction): Promise<void> {
        this.logger.trace('Recieved interaction event');

        try {
            if (interaction.isChatInputCommand()) {
                await this.client.commandManager.get(interaction.commandName)?.run(interaction);
            }
        } catch (e) {
            this.logger.error(e);
        }
    }
}
