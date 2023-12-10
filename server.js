// Import
const express = require("express")

// Init
const app = express()
const port = 8000

// Apis
app.get("/index", (req, res) => {
    res.sendFile(`${__dirname}/public/index.html`)
})

app.get("/", (req, res) => {
    res.sendFile(`${__dirname}/public/index.html`)
})

app.post("/account", (req, res) => {
    
    //프론트엔드가 보내준 값을 저장
    const id = req.body.id
    const pw = req.body.pw
    const name = req.body.name
    //const {id, pw, name} = req.body

    //백엔드에서 프론트로 보내줄 값 미리 생성
    const result = {
        "success": false,
        "message": ""
    }

    //db통신

    //db통신 결과 처리
    result.success = true
    
    //값 반환
    res.send(result)
})


app.delete("/account", (req, res) => {

})


// Web Server
app.listen(port, () => {
    console.log(`${port}번에서 HTTP 웹서버 실행`)
})