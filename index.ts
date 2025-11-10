import { app } from "@/main";

const start = performance.now();
const port = Number(process.env.PORT ?? "3000");

app.listen(port);

const end = performance.now();
const startup = end - start;
console.log(`🚀 Server started in ${startup.toFixed(2)}ms`);
console.log(`📡 Listening on port ${port}`);
