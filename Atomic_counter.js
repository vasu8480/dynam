const AWS= require('aws-sdk');		/// initiatlly we create a databse table with name vasu_dynamo
AWS.config.update({region: 'us-east-1'});
const docclient = new AWS.DynamoDB.DocumentClient();

docclient.update({
						TableName:"vasu-sdk",
						Key:{
							id:2
						},
						UpdateExpression : "set #v=#v + :incr",
						ExpressionAttributeNames:{
							'#v':'visits'  /// you need to create visits attribute in the table
						},
						ExpressionAttributeValues:{
							':incr':1
						}
			},(err,data)=>{
	if (err) console.log(err, err.stack); // an error occurred
	else     console.log(data);           // successful response
	}
	);