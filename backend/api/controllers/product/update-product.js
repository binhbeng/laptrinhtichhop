module.exports = {


  friendlyName: 'Update product',


  description: '',


  inputs: {
    id:{type:'number'},
    name: { type: 'string' },
    price: { type: 'number' },
    image: { type: 'string' },
    //isActive: { type: 'boolean' },
    details: { type: 'string' }
  },


  exits: {
    success: {},
    fails: {}
  },


  fn: async function (inputs, exits) {

    try {
      let { id, name, price, image, details } = inputs;
      
      let data = await Product.updateOne({ id: id }).set({
        details: details,
        name: name,
        image: image,
        price: price,
      //  isActive:isActive
      })
      return exits.success({
        code: 0,
        msg: "Cap nhat product thanh cong",
        data: data
      })
    } catch (error) {
      return exits.fails({
        code: 1,
        error,
        mes: "khong the cap nhat product"
      })
    }

  }


};
