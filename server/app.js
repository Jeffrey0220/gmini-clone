const express = require('express');
const chatRoutes = require('./routes/chatRoutes');

const cors = require('cors');
const app=express();
const port=5000;


app.use(cors());
app.use(express.json())


app.use('/', chatRoutes);

// app.get('/', (req, res) => {
//     res.send('Helloddd, World!');
// });


app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});