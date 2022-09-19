//this is not working

//need to intall npm install faker --save
//need to install npm install moment --save


const AWS= require('aws-sdk');		/// initiatlly we create a databse table with name vasu_dynamo
AWS.config.update({region: 'us-east-1'});
const docclient = new AWS.DynamoDB.DocumentClient();


const faker = require('faker');
const moment = require('moment');

setInterval(()=>{
	let params = {
		TableName: "vasu-sdk"
	};
	generateNotesItem((Item)=>{
		params.Item=Item;
		docclient.put(params, (err, data) => {
			if (err) {
				console.log(err);
			}
			else {
				console.log(data);
			}
		});
	});
},300);

function generateNotesItem(callback){
	callback({
			id:faker.datatype.uuid(),
			name:faker.internet.userName()
		});
	}
	