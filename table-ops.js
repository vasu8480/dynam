const AWS= require('aws-sdk');		/// initiatlly we create a databse table with name vasu_dynamo
AWS.config.update({region: 'us-east-1'});

const dynamodb = new AWS.DynamoDB();
dynamodb.listTables({}, function(err, data) {
		if (err) console.log(err, err.stack); // an error occurred
		else     console.log(data);           // successful response
}
);

dynamodb.describeTable({TableName: 'vasu_dynamo'}, function(err, data) {
		if (err) console.log(err, err.stack); // an error occurred
		else     console.log(JSON.stringify(data,null,2));           // successful response
}
);

dynamodb.createTable({TableName:"vasu-sdk",
		AttributeDefinitions:[{
							AttributeName:"id",
							AttributeType:"N"
						}],
		KeySchema:[{
								AttributeName:"id",
								KeyType:"HASH"
							}],
		ProvisionedThroughput:{	
								ReadCapacityUnits:1,
								WriteCapacityUnits:1
							}},
	function(err,data){
		if (err) console.log(err, err.stack); // an error occurred
		else     console.log(data);           // successful response
}
);

dynamodb.updateTable({	// we can update the table name, provisioned throughput, global secondary index, local secondary index
			TableName:"vasu-sdk"
			,ProvisionedThroughput:{
				ReadCapacityUnits:2,
				WriteCapacityUnits:1
			}
			},(err,data)=>{
		if (err) console.log(err, err.stack); // an error occurred
		else     console.log(data);           // successful response
		}
		);

dynamodb.deleteTable({TableName:"vasu_dynamo"},(err,data)=>{
		if (err) console.log(err, err.stack); // an error occurred
		else     console.log(data);           // successful response
		}
		);
