import { createServer, IncomingMessage, ServerResponse } from "http";
import { promises } from "fs";

// npm i
// File -> Settings -> Languages... -> TypeScript -> Recompile on changes -> Apply

// Запуск сервера:
// node ./src/index.js

// Остановка сервера:
// Ctrl+C

// http://localhost:3000/

// не надо:
// npm i --save-dev @types/node

const host = "localhost";
const port = 3000;

const server = createServer();

const getRawBody = (req: IncomingMessage): Promise<string> => {
    return new Promise((resolve) => {
        const chunks: Buffer[] = [];
        req.on("data", (chunk: Buffer) => {
            chunks.push(chunk);
        });
        req.on("end", () => {
            const allChunks: Buffer = Buffer.concat(chunks);
            const body: string = allChunks.toString("utf-8");
            resolve(body);
        });
    });
};

server.on("request", async (req: IncomingMessage, res: ServerResponse) => {
    console.log(req.method, req.url);
    if (req.method === "GET") {
        if (req.url === "/index.html" || req.url === "/") {
            const index = await promises.readFile("./front/index.html", {encoding: "utf-8"});
            return res.end(index);
        }
        if (req.url === "/index.js") {
            const index = await promises.readFile("./front/index.js", {encoding: "utf-8"})
            res.setHeader("Content-Type", "application/javascript");
            return res.end(index);
        }
    }
    if (req.method === "POST") {
        const body: string = await getRawBody(req);
        const result = JSON.parse(body);
        console.log(result);
        return res.end(body);
    }
    res.writeHead(404);
    res.end("not found");
});

server.listen(port, () => {
    console.log(`http://${host}:${port}/`);
    console.log(`http://${host}:${port}/`);
});
