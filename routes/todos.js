const {Router} = require('express')
const Todo = require('../models/Todo')
const router = Router()

router.get('/',async (req, res) => {
    const todos = await Todo.find({archived: false}) 
    res.render('index', {
        title: 'Todo List',
        isIndex: true,
        todos 
    })
})

router.get('/create', (req, res) => {
    res.render('create', {
        title: 'Create Todo',
        isCreate: true
    })
})

router.post('/create', async (req, res) => {
    const todo = new Todo({
        title: req.body.title 
    })
    await todo.save() 
    res.redirect('/') 
})

router.post('/complete', async(req, res) => {
    const todo = await Todo.findById(req.body.id)
    todo.completed = !!req.body.completed 
    await todo.save()
    res.redirect('/')
})

router.get('/archive', async(req, res) => {
    const archivedTodos = await Todo.find({archived: true})
    res.render('archive', {
        title: 'Archive Todo',
        isArchive: true,
        archivedTodos 
    })  
})

router.post('/archive', async(req, res) => {
    const todo = await Todo.findById(req.body.id)
    todo.archived = true
    await todo.save()
    res.redirect('/')
})

router.post('/unarchive', async(req, res) => {
    const todo = await Todo.findById(req.body.id)
    todo.archived = false
    await todo.save()
    res.redirect('/archive')
})

module.exports = router