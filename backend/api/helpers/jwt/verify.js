module.exports = {


  friendlyName: 'Verify',


  description: 'Verify jwt.',


  inputs: {
    token: { type: 'string', description: 'Token cần kiểm tra', required: true }
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },

  sync: true,
  fn:  function (inputs) {
    let { token } = inputs;
      let animal = jwt.verify(token, "secret");
      return exits.success(animal);
   
  }


};

