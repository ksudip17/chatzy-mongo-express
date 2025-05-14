# chatzy-mongo-express
A basic chat web application built with Node.js, Express, MongoDB, and EJS. Users can create, view, edit, and delete chat messages. Designed to practice RESTful routing, form handling, and backend CRUD operations.


------How Chatzy Works------ 

This is a basic chat app built with Node.js, Express, MongoDB, and EJS. It helps understand how backend apps handle creating, reading, updating, and deleting (CRUD) data.

#1. Starting the App
- Connects to a local MongoDB database called chatzy.
- Uses mongoose to define the data structure (chat schema).
- Runs on port 8080.

#2.File Structure
- models/
   chat.js         --> Mongoose schema for chat messages
- views/
   index.ejs       --> Shows all chats
   new.ejs         --> Form to create a new chat
   edit.ejs        --> Form to edit a chat message
- public/          --> Static assets (if any)
- app.js / index.js --> Main server file

#3.Features & Routes
GET /chats
➤ Displays all chat messages
GET /chats/new
➤ Shows a form to create a new chat
POST /chats
➤ Submits and saves a new chat to the database
GET /chats/:id/edit
➤ Shows a form to edit an existing chat message
PUT /chats/:id
➤ Updates the message in the database
DELETE /chats/:id
➤ Deletes a chat from the database

#4. How to Use
-> Visit /chats to see all chats.
-> Go to /chats/new to create a new chat.
-> Click Edit or Delete on any chat.
-> All forms are styled using Tailwind CSS.

#5.Learnings
Practiced backend routing with Express.
Used RESTful routes for full CRUD functionality.
Connected MongoDB with Mongoose.
Handled form data using express.urlencoded().
Used method-override to support PUT and DELETE requests in forms.

