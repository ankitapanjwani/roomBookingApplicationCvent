const env = require('dotenv/config');
const  express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = require('../Server/Routes/userRoutes');
const roomRoutes = require('../Server/Routes/roomRoutes');

const app = express();

app.use(express.json());
app.use(cors());
// app.get('/home', (req, res) => {
//     res.send('Hello World!');
//   });


  app.use('/user',userRoutes);
  app.use('/room',roomRoutes);


  mongoose.connect(process.env.DB, { useNewUrlParser: true , useUnifiedTopology: true } ,(error)=>{
    if(error) return console.log(error.message);

    console.log('Database connected');
     
  })


app.listen(process.env.PORT, ()=>{
    console.log("Server is up and running at port 5000!");
})
