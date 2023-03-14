import type { N } from '../N';
import type { ChatInputCommandInteraction } from 'discord.js';
import { EmbedBuilder } from 'discord.js';
import { Command } from '../interfaces';

export default class extends Command {
    public constructor(client: N) {
        super(client, {
            name: 'ping',
            description: '🏓Pong!',
        });
    }

    public async run(interaction: ChatInputCommandInteraction): Promise<void> {
        await interaction.deferReply().then(async value => {
            const embed = new EmbedBuilder()
                .setColor('NotQuiteBlack')
                .addFields(
                    { name: 'API Delay', value: `${this.client.ws.ping}ms` },
                    { name: 'Delay', value: `${Date.now() - value.createdTimestamp}ms` },
                );

            await interaction.followUp({ embeds: [embed] });
        });
    }
}
