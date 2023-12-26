// Import
// 다른 자바스크립트를 임포트할수 있도록해주는 명령어 require
const express = require("express")

// Init
const app = express()
const port = 8000

app.use(express.json()) //보낼 json을 자동으로 string으로 변환 / 받은 string을
// Apis

const accountApi = require("./src/routers/account")
app.use("/account", accountApi)

const pageApi = require("./src/routers/page")
app.use("/", pageApi)


// Web Server
app.listen(port, () => {
    console.log(`${port}번에서 HTTP 웹서버 실행`)
})