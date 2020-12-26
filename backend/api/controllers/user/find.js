module.exports = {


  friendlyName: 'Find',


  description: 'Find animal.',


  inputs: {
    id: { type: 'string', require: true }
  },


  exits: {
    success: {},
    fail: {}
  },


  fn: async function (inputs,exits) {

    try {
      let {id} = inputs;
      let rs = await User.find({id});
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
