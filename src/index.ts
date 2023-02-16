import { error } from 'console';
import { N } from './N';

const instance = new N();

instance.login().catch(e => error(e));

['SIGTERM', 'SIGINT'].forEach(signal => process.on(signal, () => instance.stop()));
