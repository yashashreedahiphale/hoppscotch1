const express = require("express");
const app = express()
const port = 8080;
const path = require("path");
const { v4: uuidv4 } = require('uuid');
app.use(express.urlencoded({extended: true}));
app.use(express.json());


app.set("view.engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

let posts = [
    {
        id: uuidv4(), // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed',
        username: "yashashreeDahiphale",
        content: "learning web development"
    },
    {
        id: uuidv4(), // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
        username: "software engineer",
        content: "learn coding"
    },
    {
        id: uuidv4(), // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
        username: "yash",
        content: "it is a great day"
    },
];

app.get("/posts", (req,res) => {
    // res.send("server working well");
    res.render("index.ejs", { posts });
});

app.get("/posts/new", (req,res) =>{
    res.render("new.ejs");//form opens
});

app.post("/posts",(req, res) =>{
    // console.log(req.body);
    let {username, content} = req.body;//form data, new post
    let id = uuidv4()
    posts.push({id, username, content});
    // res.send("Post request working");
    res.redirect("/posts")
});

app.get("/posts/:id",(req, res) =>{
    let {id} = req.params;
    console.log(id);
    let post = posts.find((p) => id === p.id);
    // console.log(post);
    // res.send("request is working");//to display on web page
    res.render("show.ejs",{post});
});

app.patch("/posts/:id", (req,res) => {
    let {id} = req.params;
    let newContent = req.body.content;
    console.log(newContent);
    console.log( id);
    console.log("inside patch route");
    console.log(req.body);
    res.send("patch request working");
});



app.listen(port, () =>{
    console.log(`Application is listening to port ${port}`);
});