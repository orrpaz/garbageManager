// const request = require('request')
const fetch = require('node-fetch')
// const MapboxClient = require('mapbox');
console.log(process.env.MAPBOX_TOKEN)

// const client = new MapboxClient(process.env.MAPBOX_TOKEN);


const geocode = async function(address) {
    try {
        const urlStreet =`https://eu1.locationiq.com/v1/search.php?key=${process.env.MAPBOX_TOKEN_STREET}&q=${encodeURIComponent(address)}&format=json&limit=1`
        // const url =`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${process.env.MAPBOX_TOKEN}&limit=1`
        console.log(urlStreet)
        const response = await fetch(urlStreet)
        // console.log(response)
        const jsonRes = await response.json()
        console.log((jsonRes))
        const latitude = parseFloat(jsonRes[0].lat)
        const longitude = parseFloat(jsonRes[0].lon)
        const coordinate = {lat:latitude,lon:longitude}
        return coordinate
    } catch(e) {
        console.log(e.response);
    }
    
}



module.exports = geocode
