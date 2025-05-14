const mongoose = require("mongoose")
const Chat = require("./models/chat.js")


main()
.then((res) => {
    console.log("connection sucessful")
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/chatzy');

}

let allChats = [
    {
        from: "CR7", 
        to: "Kohli",
        message: "Sunday the King plays.",
        created_at: new Date()
    },
    {
        from: "Messi", 
        to: "Neymar",
        message: "Let's catch up after Copa!",
        created_at: new Date()
    },
    {
        from: "Tony Stark", 
        to: "Steve Rogers",
        message: "Cap, we need to talk... again.",
        created_at: new Date()
    },
    {
        from: "Batman", 
        to: "Joker",
        message: "Stop playing games in Gotham.",
        created_at: new Date()
    }
    
]

Chat.insertMany(allChats);

