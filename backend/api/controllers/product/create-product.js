
module.exports = {


  friendlyName: 'Create product',


  description: '',


  inputs: {
    name: { type: 'string' },
    price: { type: 'number' },
    image: { type: 'string' },
    //isActive: { type: 'boolean' },
    details: { type: 'string' }
  },


  exits: {
    success:{

    },
    fails:{

    }

  },


  fn: async function (inputs,exits) {

    try {
      if(!inputs) {return exits.fails({code : 1, msg : 'Không có thông tin cần tạo'});}
      
      let productInfo = await Product.create(inputs).fetch();
      return exits.success({
        code :0,
        data : productInfo
      });
    } catch (error) {
      return exits.fails({
        code : 1,
        msg :'Không thể tạo product nay',
        error
      });
    }

  }


};
