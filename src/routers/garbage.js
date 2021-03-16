const { text } = require('express')
const express = require('express')
const geocode = require('../utils/geocode')
const {ElasticSearch} = require('../elasticDB')

const router = new express.Router()
const elasticClient = new ElasticSearch()


// router.use(function timeLog (req, res, next) {
//     console.log('Time: ', Date.now())
//     next()
//   })

router.post("/garbage", async(req, res) => {
    console.log(`id = ${req.body.id} color = ${req.body.color} type= = ${req.body.type}`)
    try{
        const coordinate = await geocode(req.body.location)
        console.log(coordinate)
        // const client = elasticClient.getClient()
        // console.log(client)
    const response = await elasticClient.getClient().index({
        index: 'garbage',
        type: req.body.type,
        body: {
            // "id": req.body.id,
            "color": req.body.color,
            // "type": req.body.type,
            "location": Object.values(coordinate),
            "dateClean": req.body.dateClean
        }
    })
     res.status(200).send(response)
   } catch(e){
       res.status(500).send(e)
   } 
   
})

router.patch('/garbage/updatelocation',async(req,res)=>{
    console.log("in update location")
    try{
        const client = elasticClient.getClient()
        console.log(client)
        const response = await client.update({
            index: 'garbage',
            type: '_doc',
            id: req.body.id,
            refresh: "wait_for",
            body: {
              // put the partial document under the `doc` key
              doc: {
                location: req.body.location
              }
            }
          })
         return res.status(200).send(response)
    } catch(e){
        return res.status(500).send(e)

    }

})

router.patch('/garbage/updatedate',async(req,res)=>{
    console.log("in update date")
    try{
        const client = elasticClient.getClient()
        console.log(client)
        const response = await client.update({
            index: 'garbage',
            type: '_doc',
            id: req.body.id,
            refresh: "wait_for",
            body: {
              // put the partial document under the `doc` key
              doc: {
                dateClean : req.body.date
              }
            }
          })
         return res.status(200).send(response)
    } catch(e){
        return res.status(500).send(e)

    }
})

router.get('/garbage/location',(req,res)=>{

})



router.get('/garbage/date',(req,res)=>{

})


router.delete('/garbage/:id',async(req,res)=>{
    console.log(req.params.id)
    try{
        const client = elasticClient.getClient()
        const response = await client.delete({
            index: 'garbage',
            type: '_doc',
            id: req.params.id
          })
          console.log("in try delete")
          console.log(response)
          res.status(200).send(response)
    } catch(e) {
        console.log("in catch delete")
        return res.status(400).send(e)
    }

})

module.exports = router
