/**
 * OrderItem.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    orderId: { type: 'number', required: true },
    customerId: { type: 'number', required: true },
    // thong tin san pham
    images: { type: 'json', required: true },
    name: { type: 'string', required: true },
    quantity: { type: 'number', required: true },
    // thong tin gia
    itemPrice: { type: 'number', required: true },
    totalPrice: { type: 'number', required: true },
    isPay: { type: 'boolean', defaultsTo: false },
    cash: { type: 'number' },

  },

};

