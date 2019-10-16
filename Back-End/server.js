const express = require('express')
const cors = require('cors')
const db = require('./database')

const app = express()
app.use(cors())
app.use((request, response, next) => {
    response.header(`Access-Control-Allow-Origin`, `*`)
    response.header(`Access-Control-Allow-Headers`, `Origin, X-Requested-with, Content-Type, Accept`)
    next()
})
app.use(express.json())

app.get('/', (request, response) => response.json('test working'))

app.get('/get_data', (request, response) => {
    db.getTasks( tasks => {
        response.json(tasks)
    })
})

app.post('/add', (request, response) => {
    db.addTask( tasks => {
        response.json(tasks)
    }, request.body.title)  
})

app.delete('/delete/:id', (request, response) => {
    db.removeTask( tasks => {
        response.json( tasks )
    }, request.params.id)
})

app.put('/toggle/:id', (request, response) => {
    db.toggleTask( tasks => {
        response.json( tasks )
    }, request.params.id)
})

app.put('/edit/:id/:title', (request, response) => {
    db.editTask( tasks => {
        response.json( tasks )
    }, request.params.id, request.params.title)
})

const PORT = 9000
app.listen(PORT, () => {
    console.log(`Server is listening to ${PORT}`)
})

