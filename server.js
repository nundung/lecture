// Import
const express = require("express")

// Init
const app = express()
const port = 8000

app.use(express.json()) //보낼 json을 자동으로 string으로 변환 / 받은 string을
// Apis
const pageApi = require("./src/routers/page")
app.use("/", pageApi)

const accountApi = require("./src/routers/account")
app.use("/account", accountApi)

// Web Server
app.listen(port, () => {
    console.log(`${port}번에서 HTTP 웹서버 실행`)
})