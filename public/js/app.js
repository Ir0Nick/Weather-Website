
// fetch('http://localhost:3000/weather?address=Boston').then((response)=>{
//     console.log(response.json().then((data)=>{
//        if(data.error)
//        {
//            return console.log(data.error)
//        }
//         console.log(data.location)
//         console.log(data.forecast)
        
//     }))
// })

const form = document.querySelector('.search')
const field = document.querySelector('input')
const error = document.querySelector('.error')
const result = document.querySelector('.result')

form.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location = field.value
    result.textContent = 'Loading...'

    const url = "/weather?address=" + location
    fetch(url).then((response)=>{
    response.json().then((data)=>{
       if(data.error)
       {
           error.textContent = data.error
           result.textContent = ''
           return 
        //    console.log(data.error)
       }
            error.textContent = ''
            result.innerHTML= `${data.location} <br> <br> ${data.forecast}`
        // console.log(data.location)
        // console.log(data.forecast)
        
    })
})    

})