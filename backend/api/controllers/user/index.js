module.exports = {


  friendlyName: 'Index',


  description: 'Index animal.',


  inputs: {
  //   id : {type : "number", require : true},
  //   animalName: {type :"string",require : true},
  //  password: {type :"string",require: true},
  //  animalAdress:{type: "string"},
  //  animalGenus:{type: "string"},
  },


  exits: {
    success:{},
    fails :{}
  },


  fn: async function (inputs) {

    var userInfo = await User.find({});
    return userInfo;

  }


};
