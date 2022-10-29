import { listLabels } from "./google-apis.js";
import { authorize } from "./auth.js";

try {
  await listLabels(await authorize());
} catch (e) {
  console.log(e);
}
