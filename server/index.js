require('dotenv').config();
const express = require("express")
const app = express()
const mongoose = require("mongoose")
const cors = require("cors");
const note = require("./routes/Notes")

app.use(cors());

app.get('/', (req, res) => {
    res.send('Running');
});

//convert body to json
app.use(express.json())

mongoose.connect(process.env.mongo_URI, {
    useNewUrlParser: true,
})

app.use("/api", note)


app.listen(1447, () => {
    console.log('Server started on 1447')
})
