module.exports = {


  friendlyName: 'Get list comment',


  description: '',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs) {

    let data= await Comments.find({})
    return data;

  }


};
