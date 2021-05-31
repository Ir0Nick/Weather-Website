const request = require('request')

const forecast = (lat,long,callback)=>{

        const url = `http://api.weatherapi.com/v1/current.json?key=06bf52e3c75149a5a8782644212805&q=${lat},${long}&aqi=no`
        const response = request({url , json: true},(error,{body})=>{
                if(error){
                    callback('Unable to find results',undefined)
                }
                else if(body.error){
                    callback('No location found',undefined)
                }
                else {
                    callback(undefined,body)
                }

        })

}
module.exports = forecast
