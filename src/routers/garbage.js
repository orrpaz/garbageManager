const express = require('express')
const elasticClient = require('../elasticDB')

const router = new express.Router()




router.post("/garbage", async(req, res) => {
    elasticClient.index({
        index: 'garbage',
        body: {
            "id": req.body.id,
            "color": req.body.color,
            "type": req.body.type,
            "location": req.body.location,
            "dateClean": req.body.dateClean
        }
    })
    .then(response => {
        return res.json({"message": "Indexing successful"})
    })
    .catch(err => {
         return res.status(500).json({"message": "Error"})
    })
})

