const adminCredentials = { wnjstudio: "clqe41799" }

const path = require("path")
const express = require("express")

const app = express()
const server = require("http").createServer(app)
const io = require("socket.io").listen(server)

const spawn = require("child_process").spawn

let roomID = 4340108

let py
let clientCount = 0

const parser = data => {
    let obj = {}
    let p = /(.+?)@=(.*?)\//g
    let r
    while ((r = p.exec(data))) {
        obj[r[1]] = r[2]
    }
    return obj
}

const reject = {
    keeplive: true,
    qausrespond: true,
    rnewbc: true,
    anbc: true,
    spbc: true,
    loginres: true,
    pingreq: true,
    gbroadcast: true,
}

app.use(express.static(path.resolve(__dirname, "client/build")))

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/client/build/index.html"))
})

io.on("connection", client => {
    clientCount++
    console.log(`User Count: ${clientCount}`)

    if (!py && clientCount > 0) {
        console.log("First User In - Starting Crawler")
        py = spawn("python3", ["crawler.py", roomID], { detached: true })
        py.stdout.on("data", data => {
            data = parser(data.toString("utf8"))
            if (!reject[data.type]) io.emit("data", data)
        })
    }

    client.on("disconnecting", res => {
        clientCount--
        console.log(`User Count: ${clientCount}`)
        if (clientCount <= 0) {
            console.log("Last User Out - Killing Crawler")
            process.kill(-py.pid)
            py = undefined
        }
    })

    client.emit("roomid", roomID)

    client.on("roomid", rid => (roomID = rid))

    client.on("requestadmin", () => client.emit("admin", true))

    client.on("login", credentials => {
        client.admin =
            adminCredentials[credentials.username] === credentials.password
        client.emit("login", client.admin)
    })

    client.on("logout", () => {
        client.admin = false
        client.emit("admin", false)
    })
})

server.listen(process.env.PORT, process.env.IP || "0.0.0.0", () =>
    console.log(
        `Server ${server.address().address} on port ${server.address().port}`
    )
)
