// const request = require('request')
const fetch = require('node-fetch')
// const MapboxClient = require('mapbox');
console.log(process.env.MAPBOX_TOKEN)

// const client = new MapboxClient(process.env.MAPBOX_TOKEN);


const geocode = async function exchange(address) {
    try {
        const url =`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${process.env.MAPBOX_TOKEN}&limit=1`
        console.log(url)
        const response = await fetch(url)
        // console.log(response)
        const jsonRes = await response.json()
        const latitude = body.features[0].center[1],
        const longitude = body.features[0].center[0],
        const coordinate = {latitude,longitude}
        return coordinate
    } catch(e) {
        console.log(e.response);
    }
    
}



module.exports = geocode
