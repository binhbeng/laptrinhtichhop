const jwt = require('jsonwebtoken')
module.exports = {


  friendlyName: 'Login',


  description: 'Login animal.',


  inputs: {
    username: {type :"string"},
    password: {type :"string"},
  },


  exits: {
    success:{
      statuscode: 200
    },
    fails:{
      statuscode:500
    }
  },


  fn: async function (inputs,exits) {
    let { username, password}= inputs;
    if(!username || !password) {
      return exits.fails({
        mes:"nhap lai thong tin"
      })
    }
    let animalObj = await User.findOne({username});
    if(!animalObj) {
      return exits.fails({  
        msg: 'không tồn tại user nay'
      });
    }
    let check = await sails.helpers.common.checkHash.with({
      text: password,
      hash: animalObj.password
    });
    if(check==false){
      return exits.fails({
        success: 0,
        msg: 'Mật khẩu không đúng'
      });
    }
   
    let token = await sails.helpers.jwt.sign({
      animal: animalObj.id,
      
      // time: sails.config.TOKEN_TIME
    });
    return exits.success({
      success: 1,
      msg: 'Thành công',
      data: {
        animalObj,
        token,      
      }
    });
  }


};
