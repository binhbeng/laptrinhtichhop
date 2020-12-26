module.exports = {


  friendlyName: 'Find product',


  description: '',


  inputs: {
    name: { type: 'string' }
  },


  exits: {
    success: {},
    fail: {}
  },


  fn: async function (inputs,exits) {

    try {
      let {name} = inputs;
      let rs = await Product.find({name});
      return exits.success({
        code : 0,
        data : rs
      });
    } catch (error) {
      return exits.fail({
        code : 1,
        msg : 'Không tìm thấy'
      });
    }

  }


};
