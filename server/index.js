const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 8080
const userRouter = require('./routers/userRouter');
const categoryRouter = require('./routers/categoryRouter');
const eventRouter = require('./routers/eventRouter');
const placeRouter = require('./routers/placeRouter');
const recordRouter = require('./routers/recordRouter');
const cors = require("cors");


var corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})
require('./routers/auth.routes')(app);
require('./routers/user.routes')(app);
app.use('/users', userRouter);
app.use('/categories', categoryRouter);
app.use('/events', eventRouter);
app.use('/places', placeRouter);
app.use('/records', recordRouter);
