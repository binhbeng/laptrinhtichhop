module.exports = {


  friendlyName: 'Create',


  description: 'Create animal.',


  inputs: {
   username: {type :"string",require : true},
   password: {type :"string",require: true},
   adress:{type: "string"},
   gender:{type: "string"},
   phone:{type: "number"},
   
  },


  exits: {
    success:{

    },
    fails:{

    }

  },


  fn: async function (inputs,exits) {
    
    try {
      if(!inputs) {return exits.fail({code : 1, msg : 'Không có thông tin cần tạo'});}
      if(inputs.password) inputs.password = await sails.helpers.common.hashPassword(inputs.password);
      let animalObj = await User.create(inputs).fetch();
      return exits.success({
        code :0,
        data : animalObj
      });
    } catch (error) {
      return exits.fails({
        code : 1,
        msg :'Không thể tạo user nay',
        error
      });
    }
   
    

  }


};
