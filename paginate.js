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
			Limit: 1
		};
		if(!_.isEmpty(startKey)) {
			params.ExclusiveStartKey = startKey;
		}
		docclient.scan(params, (err, data) => {
			if (err) {
				console.log(err);
				callback(err,{});
			}
			else {
				if(typeof data.LastEvaluatedKey !== 'undefined') {
					startKey = data.LastEvaluatedKey;
				}
				else {
					startKey = [];
				}
				if(!_.isEmpty(data.Items)) {
					results=_.union(results,data.Items);
				}
			pages++;
			callback(null,results);
			}
		});
	},
	() => {
		if(_.isEmpty(startKey)) {
			return false;
		}
		else {
			return true;
			}
		},
		(err,data)=>{
			if(err) {console.log(err);}
			else {
				console.log(data);
				console.log("pages",pages);
				console.log("items",data.length);

			}
		}
);

