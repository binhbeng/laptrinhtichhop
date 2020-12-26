/**
 * Oder.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    customerId: { type: 'number' },
    receiveName: { type: 'string' },
    receivePhone: { type: 'string' },
    receiveAddress: { type: 'string' },
    totalPrice: { type: 'string' },
    methodPayment: { type: 'string', defaultsTo: 'cash' }

  },

};

