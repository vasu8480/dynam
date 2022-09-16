const AWS= require('aws-sdk');		/// initiatlly we create a databse table with name vasu_dynamo
AWS.config.update({region: 'us-east-1'});
const docclient = new AWS.DynamoDB.DocumentClient();

docclient.put({
	TableName:"vasu-sdk",
	Item:{
		id:1,
		name:"vasu",
		adress:"hyd"
	}
},(err,data)=>{
	if (err) console.log(err, err.stack); // an error occurred
	else   {
		console.log(data); 
		console.log("put operation is successfull",AWS.config.region);

		setTimeout(()=>{
			AWS.config.update({region: 'us-west-2'});
			docclient.get({
				TableName:"vasu-sdk",
				Key:{
					id:1
				}
			},(err,data)=>{
				if (err) console.log(err, err.stack); // an error occurred
				else    { console.log(data); 
					console.log("get operation is successfull",AWS.config.region);
				}          // successful response
			});
		},1000);       // successful response
}
});
