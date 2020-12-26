module.exports = {


  friendlyName: 'Update comment',


  description: '',


  inputs: {
    id:{type:'number'},
    customerName:{type:'string'},
    content:{type:'string'},
  },


  exits: {
    success: {},
    fails: {}
  },


  fn: async function (inputs,exits) {

    try {
      let { id, customerName, content} = inputs;
      

      let data= await Comments.updateOne({id:id}).set({
          customerName: customerName,
          content: content,
      
        })
      return exits.success({
        code: 0,
        msg: "Cap nhat  thanh cong",
        data: data
      })
    } catch (error) {
      return exits.fails({
        code: 1,
        error,
        mes: "khong the cap nhat "
      })
    }

  }


};
