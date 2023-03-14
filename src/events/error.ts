import type { N } from '../N';
import { Event } from '../interfaces';

export default class extends Event {
    public constructor(client: N) {
        super(client, 'error');
    }

    public run(error: Error): void {
        this.logger.error('DJS Error -', error);
    }
}
