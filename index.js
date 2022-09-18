import { authorize, listLabels } from './google-wrapper.js';

try {
    await listLabels(await authorize());
} catch (e) {
    console.log(e);
}
