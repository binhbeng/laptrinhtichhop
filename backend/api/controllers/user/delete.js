module.exports = {


  friendlyName: 'Delete',


  description: 'Delete .',


  inputs: {
    id: {type:"number"}
  },


  exits: {
    success : {},
    fails : {}
  },


  fn: async function (inputs,exits) {

    try {
      const {id}=inputs;
      await User.destroyOne(id)
      return exits.success ({
        mes : "xoa thanh cong",
        
      })
    } catch (error) {
      return exits.fails({
        mes: "co loi khi xoa"
      })
    }

  }


};
