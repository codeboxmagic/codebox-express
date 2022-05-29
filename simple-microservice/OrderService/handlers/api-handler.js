/*
* Building Micro Services in Nodejs
* @author Shashank Tiwari
*/

'use strict';
const axios = require('axios');
const CONSTANTS = require('./../config/constants');

class ApiHandler{

	getUserInformation(userId){
		return axios(`${process.env.USER_SERVICE_URL}/getUserDetails/${userId}`);
	}

	async getProductInformation(productId){
		return axios(`${process.env.PRODUCT_SERVICE_URL}/product/${productId}`);
	}
}

module.exports = new ApiHandler();
