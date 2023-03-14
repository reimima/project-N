import type { N } from '../N';
import { Event } from '../interfaces';

export default class extends Event {
    public constructor(client: N) {
        super(client, 'warn');
    }

    public run(info: string): void {
        this.logger.warn('DJS Warning -', info);
    }
}
