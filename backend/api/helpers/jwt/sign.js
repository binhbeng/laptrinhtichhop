const jwt = require('jsonwebtoken')
module.exports = {


  friendlyName: 'Sign',


  description: 'Sign jwt.',


  inputs: {
    animal :{type:'ref'},
    // time :{type:'string',defaultsTo: '1h' }
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },

  sync: true,
  fn: function (inputs, exits) {
    let { token } = inputs;
    try {
      let decoded = jwt.verify(token, "secret");
      return exits.success(decoded);
    } catch (err) {
      throw new Error(Err.CODE.TOKEN_EXPIRED)
    }
  }


};

