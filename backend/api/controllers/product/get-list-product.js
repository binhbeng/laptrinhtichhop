
module.exports = {


  friendlyName: 'Get list product',


  description: '',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs) {

    let data= await Product.find({})
    return data;

  }


};
