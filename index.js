const express = require("express");
const app = express()
const mongoose = require("mongoose")
const path = require("path")
const Chat = require("./models/chat.js")
const methodOverride = require("method-override")
const ExpressError = require("./ExpressError.js") //after learning middleware
const wrapAsync = require("./utils/wrapAsync.js")

app.set("views" , path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")))
app.use(express.urlencoded({extended : true}))
app.use(methodOverride("_method"))


main()
.then((res) => {
    console.log("connection sucessful")
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/chatzy');

}

//Index Route
app.get("/chats" , wrapAsync(async(req, res) => {
    let chats =  await Chat.find()
    // console.log(chats);
    res.render("index.ejs", {chats})
}))

//New chat Route
app.get("/chats/new" , (req, res) => {
    res.render("new.ejs")
})

//Create Route
app.post("/chats" , (req, res) => {
    let {from , to , message} = req.body;
    let newChat = new Chat({
        from : from,
        to : to,
        message : message,
        created_at : new Date()
    })
    newChat.save().then((result) => {
        console.log("chat was saved in /chats route")
    }).catch((err) => {
        console.log(err)
    })
    res.redirect("/chats")
})

//New- Show Route (After Learning Middleware error)
app.get("/chats/:id" , wrapAsync(async(req, res, next) => {
    let {id} = req.params;
    let chat = await Chat.findById(id);
    if (!chat) {
        return next(new ExpressError(404, "chat not found"))
    }
    res.render("edit.ejs" , {chat})
}))

//Edit Route
app.get("/chats/:id/edit" , wrapAsync(async(req, res) => {
    let {id} = req.params;
    let chat =  await Chat.findById(id)
res.render("edit.ejs", {chat})
}))

//Update Route
app.put("/chats/:id" , wrapAsync(async(req, res) => {
    let {id} = req.params;
    let {message : newMessage} = req.body;
    let updatedChat = await Chat.findByIdAndUpdate(id, 
        {message : newMessage}, 
        {runValidators: true, new: true}
    )
    res.redirect("/chats")
}))

//DELETE Route
app.delete("/chats/:id" , wrapAsync(async(req, res) => {
    let {id} = req.params;
    let deletedChat = await Chat.findByIdAndDelete(id)
    console.log(deletedChat)
    res.redirect("/chats")
}))

app.get("/", (req, res) => {
    res.send("working")
})

//Error handiling route or Middleware
app.use((err, req, res, next) => {
    let {status=500, message="SOME ERROR OCCURED"} = err;
    res.status(status).send(message);
})

app.listen(8080, () => {
    console.log("app is listening on port 8080")
})