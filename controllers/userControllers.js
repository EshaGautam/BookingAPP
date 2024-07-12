const path = require('path');
const User = require('../models/user')

exports.getForm = (req, res, next) => {
  const formPath = path.join(__dirname,'../views/index.html');
  console.log(formPath)
  res.sendFile(formPath)
   
};


exports.getUser=(req,res,next)=>{
    User.findAll()
    .then((product)=>{
        console.log(product)
        res.json(product)
    })
    .catch(err=>console.log(err))
}




exports.addUser = (req, res, next) => {
    const { name, email, phone } = req.body;
  
    User.create({
      username: name,
      email: email,
      phoneNumber: phone
    })
      .then((result) => {
        console.log(result);
        res.status(200).json({ message: 'User created successfully', user: result });
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ message: 'Failed to create user' });
      });
  };


  exports.deleteUser = (req, res, next) => {
    const { id } = req.body;
  
    User.findByPk(id)
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
        return user.destroy();
      })
      .then(() => {
        console.log('User deleted successfully');
        res.status(200).json({ message: 'User deleted successfully' });
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ message: 'Failed to delete user' });
      });
  };
  
  exports.editUser = (req, res, next) => {
    const { id, username, email, phoneNumber } = req.body;
  
    User.findByPk(id)
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
  
        user.username = username;
        user.email = email;
        user.phoneNumber = phoneNumber;
  
        return user.save();
      })
      .then(() => {
        console.log('Edited successfully');
        res.status(200).json({ message: 'User updated successfully' });
      })
      .catch((error) => {
        console.error('Error editing user:', error);
        res.status(500).json({ message: 'Failed to update user' });
      });
  };