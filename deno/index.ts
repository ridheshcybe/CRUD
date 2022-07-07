/**
 * thx to https://dev.to/billy_de_cartel/how-to-code-a-simple-crud-restful-api-in-deno-3cf
 */
import { Application } from "https://deno.land/x/oak/mod.ts";
import router from "./router.ts";

const port = 5000;
const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port });
console.log(`Server Running on Port ${port}`);

