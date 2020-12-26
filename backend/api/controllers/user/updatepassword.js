module.exports = {


  friendlyName: 'Upatepassword',


  description: 'Upatepassword animal.',


  inputs: {
    id : {type : "number", require : true},
    password : {type: "string", require : true}
  },


  exits: {
    success : {},
    fails : {}
  },


  fn: async function (inputs,exits) {

    try {
      let {id,password} = inputs;
      password = await sails.helpers.common.hashPassword(password);
      let data = await User.updateOne({id:id}).set({password:password})
      return exits.success({
        code : 0,
        msg : "Thay password Thành công",
        data :data
      })
  } catch (error) {
    return exits.fail({
      code : 1,
      error,
      mes:"khong the thay password"
    })
  }

  }


};
