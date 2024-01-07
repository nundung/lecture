// Import
// 다른 자바스크립트를 임포트할수 있도록해주는 명령어 require
const express = require("express")
const path = require("path")
const fs = require("fs")
const https = require("https")
require("dotenv").config()    //웹서버 전체에 적용

// Init
const app = express()
const port = 8000
const httpsPort = 8443
const options = {
    "key": fs.readFileSync(path.join(__dirname, "./keys/key.pem")),
    "cert": fs.readFileSync(path.join(__dirname, "./keys/cert.pem")),
    "passphrase": "1234"
    // "ca": fs.readFileSync(path.join(__dirname, "./key/cert.pem"))
}

app.use(express.json()) //보낼 json을 자동으로 string으로 변환 / 받은 string을

// Apis

app.get("*", (req, res, next) => {
    const protocol = req.protocol
    if(protocol === "http"){
        const dest = `https://${req.hostname}:8443${req.url}`  //url을 재구성 하겠다.
        res.redirect(dest)
    }
    next()
})

const accountApi = require("./src/routers/account")
app.use("/account", accountApi)

const pageApi = require("./src/routers/page")
app.use("/page", pageApi)

const chatApi = require("./src/routers/chat")
app.use("/chat", chatApi)

// Web Server
app.listen(port, () => {
    console.log(`${port}번에서 HTTP 웹서버 실행`)
})

https.createServer(options, app).listen(httpsPort, () => {
    console.log(`${httpsPort}번에서 HTTP 웹서버 실행`)
})