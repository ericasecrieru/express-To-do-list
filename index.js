const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const Handlebars = require('handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const exphbs = require('express-handlebars')
const todoRoutes = require('./routes/todos')

const PORT = process.env.PORT || 3000
const app = express()
const hbs = exphbs.create({ 
    defaultLayout: 'main', 
    extname: 'hbs',
    handlebars: allowInsecurePrototypeAccess(Handlebars)
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.urlencoded({extended: true})) 
app.use(express.static(path.join(__dirname, 'public'))) 
app.use(todoRoutes) 

async function start() {
    try {
        await mongoose.connect('mongodb+srv://Erica:Qwerty@cluster0.539kj.mongodb.net/todos', {
        //await mongoose.connect('mongodb+srv://Ivan:QAwsedrf@cluster0.cv4sq.mongodb.net/todos', {
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        })
        app.listen(PORT, () => {
            console.log('server has been started')
        })
    } catch (e) {
        console.log(e)
    }
}

start()