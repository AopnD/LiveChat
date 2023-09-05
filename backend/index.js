const express = require("express");
const cors = require("cors");
const {default: axios} = require("axios");
require('dotenv').config();


const app = express();
app.use(express.json());
app.use(cors({ origin: true }));

const privateKey= process.env.PRIVATE_KEY

app.post("/authenticate", async (req, res) => {
  const {username} = req.body;
  try {
    const response = await axios.put('https://api.chatengine.io/users/',
    { username: username, secret: username, first_name: username },
    {headers: {"private-key": privateKey}}
    )
    return res.status(response.status).json(response.data);
  } catch (error) {
    return res.status(error.response.status).json(error.response.data);
  } 
});


app.listen(3001, console.log("server up and running 😄"));

