const AWS= require('aws-sdk');		/// initiatlly we create a databse table with name vasu_dynamo
AWS.config.update({region: 'us-east-1'});
const docclient = new AWS.DynamoDB.DocumentClient();

docclient.put({
						TableName:"vasu-sdk",
						Item:{
							id:5,
							name:"dfas",
							age:22
						}}
						,(err,data)=>{
		if (err) console.log(err, err.stack); // an error occurred
		else     console.log(data);           // successful response
		}
		);

docclient.update({
						TableName:"vasu-sdk",	
						Key:{
							id:1
						},
						UpdateExpression:"set #n=:n",
						ExpressionAttributeNames:{
							"#n":"name"
						},
						ExpressionAttributeValues:{
							":n":"vasu"
						},
						}
						,(err,data)=>{
		if (err) console.log(err, err.stack); // an error occurred
		else     console.log(data);           // successful response
		}
		);

// docclient.delete({
// 							TableName:"vasu-sdk",
// 							Key:{
// 								id:1
// 							}
// 						}
// 						,(err,data)=>{
// 		if (err) console.log(err, err.stack); // an error occurred
// 		else     console.log(data);           // successful response
// 		}
// 		);

docclient.batchWrite({
		RequestItems:{
			"vasu-sdk":[
				{
					DeleteRequest:{
						Key:{
							id:5
						}
					}
				},
				{
					PutRequest:{
						Item:{
							id:2,
							name:"vasu",
							age:22
						}
					}
				}]
		}
	},(err,data)=>{
			if (err) console.log(err, err.stack); // an error occurred
			else     console.log(data);           // successful response
	});
