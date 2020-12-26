const bcrypt = require('bcryptjs');
module.exports = {


  friendlyName: 'Check hash',


  description: '',


  inputs: {
    text: { type: 'string', description: 'Chuỗi thường để kiểm tra', required: true },
    hash: { type: 'string', description: 'Chuỗi hash để so sánh', required: true }
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {
    return bcrypt.compareSync(inputs.text, inputs.hash);
  }


};

