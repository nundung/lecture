// Import
const router = require("express").Router()
const client = require("mongodb").MongoClient

router.post("/", async (req, res) => {

    const {id, message} = req.body
    const result = {
        "success": false,
        "message": ""
    }
    let conn = null
    try {
        conn = await client.connect("mongodb://localhost:27017")

        const document = {
            "id": id,
            "message": message
        }
        await conn.db("lecture").collection("chat").insertOne(document)
        result.success = true
    }
    catch (e) {
        result.message = e.message
    }
    finally {
        if (conn) conn.close()
        res.send(result)
    }
})


router.get("/", async (req, res) => {

    const {id, message} = req.body
    const result = {
        "success": false,
        "message": "",
        "data": null
    }
    let conn = null
    try {
        conn = await client.connect("mongodb://localhost:27017")

        const data = await conn.db("lecture").collection("chat").find().toArray()
        result.success = true
        result.data = data
    }
    catch (e) {
        result.message = e.message
    }
    finally {
        if (conn) conn.close()
        res.send(result)
    }
})

module.exports = router
