module.exports = {


  friendlyName: 'Update',


  description: 'Update animal.',


  inputs: {
    id: { type: "number", require: true },
    username: { type: "string", require: true },
    password: { type: "string", require: true },
    address: { type: "string" },
    gender: { type: "string" },
  },


  exits: {
    success: {},
    fails: {}
  },


  fn: async function (inputs, exits) {

    try {
      let { id, username, address, gender, password } = inputs;
      password = await sails.helpers.common.hashPassword(password);
      let data = await User.updateOne({ id: id }).set({
        password: password,
        username: username,
        gender: gender,
        address: address,
      })
      return exits.success({
        code: 0,
        msg: "Cap nhat user thanh cong",
        data: data
      })
    } catch (error) {
      return exits.fail({
        code: 1,
        error,
        mes: "khong the cap nhat user"
      })
    }

  }


};
