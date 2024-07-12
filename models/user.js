const Sequelize = require('sequelize')
const sequelize = require('../utils/database')

const User = sequelize.define('user',{
    id:{
    type:Sequelize.INTEGER,
    allowedNull:false,
    primaryKey:true,
    autoIncrement:true
    },
    username:{
      type:Sequelize.STRING,
      allowedNull:false
    },

    email:{
        type:Sequelize.STRING,
        allowedNull:false
    },
    phoneNumber:{
        type:Sequelize.INTEGER,
        allowedNull:false
    }
})


module.exports = User