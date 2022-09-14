const AWS= require('aws-sdk');		/// initiatlly we create a databse table with name vasu_dynamo
AWS.config.update({region: 'us-east-1'});
const docclient = new AWS.DynamoDB.DocumentClient();

docclient.put({
						TableName:"vasu-sdk",
						Item:{
							id:6,
							name:"rav",
							age:21,
							adress:"mum"
						},
						ConditionExpression:"attribute_not_exists(id)"
			 // this is used to check if the id is already present or not if present then it will not add the data to the table if not present then it will add the data to the table
						
				},(err,data)=>{
	if (err) console.log(err, err.stack); // an error occurred
	else     console.log(data);           // successful response
	}
	);