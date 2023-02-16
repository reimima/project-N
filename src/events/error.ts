import type { N } from '../N';
import { Event } from '../interface';

export default class extends Event {
    public constructor(client: N<true>) {
        super(client, 'error');
    }

    public run(error: Error): void {
        this.logger.error('DJS Error -', error);
    }
}
