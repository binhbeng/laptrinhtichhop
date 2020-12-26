const bcrypt= require('bcrypt')
module.exports = {


  friendlyName: 'Hash password',


  description: '',


  inputs: {
    text :{type:"string"}
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs,exits) {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(inputs.text, salt);
    return exits.success(hash);
  }


};

