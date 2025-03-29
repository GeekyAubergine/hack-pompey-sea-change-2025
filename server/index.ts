import { Database } from "bun:sqlite";

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

const server = Bun.serve({
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
    }
})

console.log(`Server is running on port ${server.port}`)