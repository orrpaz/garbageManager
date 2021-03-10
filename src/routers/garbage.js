const express = require('express')
const elasticClient = require('../elasticDB')

const router = new express.Router()


// router.use(function timeLog (req, res, next) {
//     console.log('Time: ', Date.now())
//     next()
//   })

router.post("/garbage", (req, res) => {
    console.log(`id = ${req.body.id} color = ${req.body.color} type= = ${req.body.type}`)
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

router.patch('/garbage/updatelocation',(req,res)=>{

})

router.patch('/garbage/updatedate',(req,res)=>{

})

router.get('/garbage/location',(req,res)=>{

})



router.get('/garbage/date',(req,res)=>{

})


router.delete('/garbage/:id',(req,res)=>{

})

module.exports = router
