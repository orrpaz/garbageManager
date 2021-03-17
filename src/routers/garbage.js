const { text, response } = require('express')
const express = require('express')
const geocode = require('../utils/geocode')
const {ElasticService} = require('../services/elasticService')
// const GeoPoint = require('geopoint')

const router = new express.Router()
const elasticClient = new ElasticService()


// router.use(function timeLog (req, res, next) {
//     console.log('Time: ', Date.now())
//     next()
//   })

router.post("/garbage", async(req, res) => {
    console.log(`id = ${req.body.id} color = ${req.body.color} type= = ${req.body.type}`)
    try{
        const coordinate = await geocode(req.body.location)
        console.log(coordinate)
        const response = await elasticClient.getClient().index({
        index: process.env.INDEX_ELASTIC,        
        body: {
            "color": req.body.color,
            "type": req.body.type,
            "location": coordinate,
            "dateClean": req.body.dateClean
        }
        
    })
     res.status(200).send(response)
   } catch(e){
       res.status(500).send(e)
   } 
   
})

router.patch('/garbage/updateLocation',async(req,res)=>{
    console.log("in update location")
    try{
        const client = elasticClient.getClient()
        console.log(client)
        const response = await client.update({
            index: process.env.INDEX_ELASTIC,
            type: process.env.DOC_TYPE,
            id: req.body.id,
            refresh: "wait_for",
            body: {
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

router.patch('/garbage/updateDate',async(req,res)=>{
    console.log("in update date")
    try{
        const client = elasticClient.getClient()
        console.log(client)
        const response = await client.update({
            index: process.env.INDEX_ELASTIC,
            type: process.env.DOC_TYPE,
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

router.get('/garbage/location',async (req,res)=>{
    try{

        console.log("in Search location")
        const client = elasticClient.getClient()
        const coordinate = await geocode(req.body.location)
        console.log(coordinate)
        const response = await client.search({
            index: process.env.INDEX_ELASTIC,
            body:{
                query: {
                    geo_distance : {
                        distance : process.env.DISTANCE,
                        location: coordinate
                    }
                }
            }
        })
        res.status(200).send(response)
    }catch(e){
        res.status(400).send(e)
    }

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
