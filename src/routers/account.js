// Import
const router = require("express").Router()
const {Client} = require("pg")
const jwt = require("jsonwebtoken")
const checkLogin = require("../middlewares/checkLogin")

router.get("/", checkLogin, async (req, res) => {
    const {id} = req.body
    const result = {
        "success": false,
        "data": null
    }
    
    const authInfo = req.decoded
    console.log(authInfo)

    const client = new Client({
        "user": "ubuntu",
        "password": "1234",
        "host": "localhost",
        "database": "web",
        "port": 5432
    })
    try {
        if (id === null || id === "" || id === undefined) throw new Error("아이디 비어있음")
        console.log("api 진입함")

        await client.connect()   //데이터베이스 접속
        const sql = "SELECT * FROM account WHERE id=$1" //물음표 여러개면 $1, $2, $3
        const values = [id]
        const data = await client.query(sql, values)

        const row = data.rows      //데이터베이스에서 가져온 값들 중 테이블 값만 저장
        result.success = true
        result.data = row
    }
    catch (err) {
        result.message = err.message
    }
    finally {
        res.send(result)
        console.log("api 진입함3")
        if(client) {client.end()}
    }
})


router.post("/", (req, res) => {
    
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

    //웹서버가 중간에 멈추지 않게 하기 위해
    //내가 예상치 못한 에러를 받아주기 위해서
    try {
        //예외처리
        if(id === null || id === "" || id === undefined) throw new Error("아이디 값이 이상해요")
        if(pw === null || pw === "" || pw === undefined) throw new Error("비밀번호가 이상해요")
        if(name === null || pw === "" || pw === undefined) throw new Error("이름이 이상해요")

        //db에 값 삽입

        //db 결과 처리
        result.success = true
    }
    catch (e) {
        result.message = e.message
    }
    finally {
        res.send(result)
    }
})

router.post("/login", (req, res) => {
    const { id, pw } = req.body
    const result = {
        "success": false,
        "message": "",
        "data": {
            "token": ""
        }
    }
    try {
        if (id !== "stageus" || pw !== "1234") {
            throw new Error("로그인 정보가 없습니다.")
        }
        const token = jwt.sign({
            "id": id,
            "name": "스테이지어스",
            "contact": "010-0000-0000"  //session 때와 동일하게 넣고싶은 값 기입
        }, process.env.SECRET_KEY, {
            "issuer": "stageus",
            "expiresIn": "2m"   //초로하고 싶으면 s 분은 m 시간은 h
        })
        result.success = true
        result.data.token = token
    }
    catch (err) {
        result.message = err.message
    }
    finally {
        res.send(result)
    }
})

router.delete("/", (req, res) => {

})

module.exports = router
