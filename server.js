const express = require('express');
const connectDB = require('./config/db');
const users = require('./routes/api/users');
const auth = require('./routes/api/auth');
const posts = require('./routes/api/posts');
const profile = require('./routes/api/profile');
const path = require('path');

const app = express();

//connect database 
connectDB();

//init midlleware
app.use(express.json({ extended: false }));

//Define routes
app.use('/api/users',users);
app.use('/api/auth',auth);
app.use('/api/posts',posts);
app.use('/api/profile',profile);

//serve stattic assests in production
if(process.env.NODE_ENV === 'production'){
    //set static folder
    app.use(express.static('client/build'));

    app.get('*',(req, res) => {
        res.sendFile(path.resolve(__direname,'client','build','index.html'));
    })
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>console.log(`Server started on port ${PORT} `));