const AWS= require('aws-sdk');		/// initiatlly we create a databse table with name vasu_dynamo
AWS.config.update({region: 'us-east-1'});
const docclient = new AWS.DynamoDB.DocumentClient();

// docclient.get({
// 						TableName:"vasu-sdk",	
// 						Key:{
// 							id:2
// 						}
// 						}
// 						,(err,data)=>{
// 		if (err) console.log(err, err.stack); // an error occurred
// 		else     console.log(data);           // successful response
// 		}
// 		);


// 
// docclient.scan({ 		/// scan is used to scan the whole table
// 	TableName:"vasu-sdk",	
// 	FilterExpression:"adress = :adress",
// 	ExpressionAttributeValues:{
// 		":adress":"hyd"
// 	},
// 	}
// 	,(err,data)=>{
// if (err) console.log(err, err.stack); // an error occurred
// else     console.log(data);           // successful response
// }
// );

docclient.batchGet({ 	/// batchGet is used to get the data from multiple tables
	RequestItems:{
		"vasu-sdk":{
			Keys:[
				{id:1}
			]
		}
	},
	"vasu-sdk2":{
		Keys:[
			{id:1}
		]
	},
	},(err,data)=>{
		if (err) console.log(err, err.stack); // an error occurred
		else     console.log(JSON.stringify(data,null,2));           // successful response
	}
);