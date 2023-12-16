// Import
const router = require("express").Router()

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

router.delete("/", (req, res) => {

})

module.exports = router
