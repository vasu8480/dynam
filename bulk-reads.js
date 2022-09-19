const async=require('async');
const _=require('underscore');
const AWS= require('aws-sdk');		/// initiatlly we create a databse table with name vasu_dynamo
AWS.config.update({region: 'us-east-1'});

const docclient = new AWS.DynamoDB.DocumentClient();

var startKey = [];
var results = [];
var pages = 0;
async.doWhilst(
	(callback) => {
		
		let params = {
			TableName: "vasu-sdk",
			ConsistentRead: true,
			Limit: 2
		};
		if(!_.isEmpty(startKey)) {
			params.ExclusiveStartKey = startKey;
		}
		docclient.scan(params, (err, data) => {
			if (err) {
				console.log(err);
				callback(null,{});
			}
			else {
				if(typeof data.LastEvaluatedKey !== 'undefined') {
					startKey = data.LastEvaluatedKey;
				}
				else {
					startKey = [];
				}
				pages++;
				console.log(data.Items,"====> Page",pages);
			callback(null,results);
			}
		});
	},
	() => {
			return true;
		},
		(err,data)=>{
			if(err) {console.log(err);}
			else {
				console.log("Pages",pages);

			}
		}
);

