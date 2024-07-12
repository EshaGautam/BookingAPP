const sequelize = require('./utils/database')
const express = require('express');
const cors = require('cors')

const bodyParser = require('body-parser');
const path = require('path')

const userRoutes = require('./routes/user')
const userControllers = require('./controllers/userControllers')

const app = express();

app.use(cors())


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));


app.use(userRoutes)


sequelize.sync()
.then(()=>{
    app.listen(4000);
})
.catch(err=>console.log(err))
