const express = require('express') 
const bodyParser = require('body-parser') 
const cors = require('cors') 
const morgan = require('morgan')
var Post = require("../models/post");
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/posts');
var db = mongoose.connection;
db.on("error",console.error.bind(console,"connection error"));
db.once("open",function(callback){
    console.log("Connection Succeeded");
});

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

app.set('port',process.env.PORT || 8081);
app.listen(app.get('port'),()=>{
    console.log(`server is running at ${app.get('port')}`)
});

// Add new post
app.post('/posts',(req,res) => {
    var db = req.db;
    var title = req.body.title;
    var description = req.body.description;
    var new_post = new Post({
        title:title,
        description:description
    })
    console.log("success!")
    new_post.save(function(error) {
        if(error) {
            console.log(error)
        }
        res.send({
            success:true,
            message:'Post saved successfully!'
        })
    })
})

// Fetch all posts
app.get('/posts',(req,res) => {
    Post.find({},'title description',function(error,posts) {
        if(error) { console.error(error); }
        res.send({
            posts: posts
        })
    }).sort({_id:-1})
})

// fetch single post
app.get('/post/:id', (req, res) => {
    Post.findById(req.params.id, 'title description', (err, post) =>{
        if(err) console.error(err)
        res.send(post)
    })
})

// Update a post
app.put('/posts/:id', (req,res) => {
  Post.findById(req.params.id, 'title description', (err,post) => {
      if(err) { console.error(error); }
      post.title = req.body.title
      post.description = req.body.description
      post.save((error) => {
          if (error) {
              console.log(error)
            }
          res.send({
              success: true
            })
        })
    })
})

// Delete a post
app.delete('/posts/:id', (req,res) => {
    Post.remove(
        {
            _id: req.params.id
        }, 
        (err,post) => {
            if(err)
                res.send(err)
            res.send({
                success: true
            })
        }
    )
})

