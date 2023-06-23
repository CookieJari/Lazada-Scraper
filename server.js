import { createRequire } from "module";
const require = createRequire(import.meta.url);

const app = require("express")();
const PORT = 8080;

app.listen(PORT, () =>
  console.log(`Server is ACTIVE on http://localhost:${PORT}`)
);
