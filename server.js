const express = require('express');
const config = require('config')

const app = express();

const userRouter = require('./routes/userRouter.js')

app.use(express.json());

app.use('/', userRouter)

const PORT = config.get('app.port') || 6001;

app.listen(PORT, () => {
    console.log(
        `the server is listening to port ${PORT}`
    );
})