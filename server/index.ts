import { Database } from "bun:sqlite";
import { GameInstance } from "./src/game";
import {randomUUID} from "crypto";
import { Server } from "bun";
import { GameWebsocket, WebsocketData } from "./src/game/ws";

interface Leaderboard {
    name: string
    time: number
    penalty: number
}

const db = new Database("leaderboard.db")
db.exec(`
    CREATE TABLE IF NOT EXISTS leaderboard (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        time INTEGER NOT NULL,
        penalty INTEGER NOT NULL
    )
`)

const gameInstance = new GameInstance();


setInterval(()=>{
    gameInstance.tick();
}, 1000 / 5)
const serve = Bun.serve({
    port: 6969,
    routes: {
        '/leaderboard': {
            GET: async () => {
                const leaderboard = db.query("SELECT * FROM leaderboard").all()
                return Response.json(leaderboard)
            },
            POST: async (req) => {
                const { name, time, penalty } = await req.json() as Leaderboard
                
                const id = db.query("INSERT INTO leaderboard (name, time, penalty) VALUES (?, ?, ?)").run(name, time, penalty).lastInsertRowid;
                return Response.json({ id, name, time, penalty }, { status: 201 })
            }
        },
        '/reset': {
            GET: async () => {
                db.exec("DELETE FROM leaderboard")
                return Response.json({}, { status: 200 })
            }
        }
    },
    websocket: {
        message(ws: GameWebsocket, message: string) {
            gameInstance.networkReceive(ws, JSON.parse(message))
        },
        close(ws: GameWebsocket, code, reason) {
            
        },
        open(ws: GameWebsocket) {
            gameInstance.addPlayer(ws)
        },
        ping(ws: GameWebsocket, data) {},
    },
    
    fetch(request, server: Server ) {
        
        server.upgrade<WebsocketData>(request, {
            data: {
                uuid: request.url.replace('wss://hp25.zoeaubert.me/api?username=', '')
            }
        });
    },
})

console.log(`Server is running on port ${serve.port}`)
