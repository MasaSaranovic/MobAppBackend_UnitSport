const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const { resetWatchers } = require('nodemon/lib/monitor/watch');
const cors = require('cors');
require('dotenv/config');
const authJwt = require('./helpers/jwt')
const errorHandler = require('./helpers/error-handler')

app.use(cors());
app.options('*', cors())

//Middleware
app.use(express.json());
app.use(morgan('tiny'));
app.use(authJwt());
app.use(errorHandler);

//Routers
const productsRoutes = require('./routers/products');
const categoriesRoutes = require('./routers/categories');
const usersRoutes = require('./routers/users');
const ordersRoutes = require('./routers/orders');


const api = process.env.API_URL;

app.use(`${api}/products`, productsRoutes);
app.use(`${api}/categories`, categoriesRoutes);
app.use(`${api}/users`, usersRoutes);
app.use(`${api}/orders`, ordersRoutes);

//Database
mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'unitsport'
})
    .then(() => {
        console.log('Database Connection is ready...')
    })
    .catch((err) => {
        console.log(err);
    })

//Server
app.listen(3000, () => {
    console.log('server is running http://localhost:3000');
})