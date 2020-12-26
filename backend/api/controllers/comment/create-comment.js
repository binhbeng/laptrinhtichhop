module.exports = {


  friendlyName: 'Create comment',


  description: '',


  inputs: {
    customerName:{type:'string'},
    content:{type:'string'},
  },


  exits: {
    success:{

    },
    fails:{

    }

  },


  fn: async function (inputs,exits) {

    try {
      if(!inputs) {return exits.fail({code : 1, msg : 'Không có thông tin cần tạo'});}
      
     let cm= await Comments.create(inputs).fetch()
      return exits.success({
        code :0,
        data : cm
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
