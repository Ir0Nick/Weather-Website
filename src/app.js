const express = require('express')
const path = require('path')
const hbs = require('hbs')
const { title } = require('process')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')


const app = express()

//setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title: "Weather",
        name: "Nitish Kumar" 
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: "About",
        name: "Nitish Kumar" 
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title: "Help",
        name: "Nitish Kumar"
    })
})


app.get('/weather',(req,res)=>{
    if(!req.query.address)
    {
        return res.send({
            error: 'Address must be provided!'
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location} = {})=>{
        if(error)
        return res.send({
            error
        })
        
        forecast(latitude, longitude, (error, {current}) => {
            if(error)
            return res.send({
                error
            })
            res.send({
                forecast: `It is ${current.temp_c} degrees out there in ${location}. The humidity is ${current.humidity}.`,
                location,
                address: req.query.address
            })
           
        })
    })

   
})

app.get('/products',(req,res)=>{
    if(!req.query.search)
    {
        res.send({
            error: 'You must provide a search term'
        })
    }
    else{
        res.send({
        product : []
    })
    }
    
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        message: 'help article not found',
        name: 'Nitish Kumar.',
        title : 'ERROR'
    })
})


app.get('*',(req,res)=>{
    res.render('404',{
        message:'Page not found',
        name: 'Nitish Kumar.',
        title: "404"
    })
})

app.listen(3000, ()=>{
    console.log('Server is Up on Port 3000')
})