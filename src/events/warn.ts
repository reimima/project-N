import type { N } from '../N';
import { Event } from '../interface';

export default class extends Event {
    public constructor(client: N<true>) {
        super(client, 'warn');
    }

    public run(info: string): void {
        this.logger.warn('DJS Warning -', info);
    }
}
