
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
var cors = require('cors')
const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool;
const AWS = require('aws-sdk');

const poolData = {    
UserPoolId : "us-east-2_0zFL6Y5De",    
ClientId : "7f3fhnuqttfogg3ouorh96dl1r" 
}; 
const pool_region = 'us-east-1';
const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);


const app = express();
app.use(cors())

app.use('/prod/*', createProxyMiddleware({ target: 'https://eikyz5cux7.execute-api.us-east-2.amazonaws.com', changeOrigin: true, }));

app.post('/login/', async function login(req, res) {
	    var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
	        Username : req.body.username,
	        Password : req.body.password,
	    });

	    var userData = {
	        Username : req.body.username,
	        Pool : userPool
	    };
	    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
	    try {
		    	await cognitoUser.authenticateUser(authenticationDetails, {
			        onSuccess: function (result) {
			            console.log('access token + ' + result.getAccessToken().getJwtToken());
			            console.log('id token + ' + result.getIdToken().getJwtToken());
			            console.log('refresh token + ' + result.getRefreshToken().getToken());
			            res.send(result);
			            return result;
			        },
			        onFailure: function(err) {
			            console.log(err);
			            res.send(err);
			            return err;
			        },

		    	});
    	}
    	catch(e){
    		res.send(e)
    		return e;
    	}
	});
app.use(express.json())


app.post('/register/', async function registerUser(req, res){
		var person = req.body;
	    var attributeList = [];
	    attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"email",Value:person.email}));
	  
	   await userPool.signUp(person.email, person.password, attributeList, null, function(err, result){
	        if (err) {
	            console.log(err);
	            res.send(err)
	            return ;
	        }
	        cognitoUser = result.user;
	        console.log('user name is ' + cognitoUser.getUsername());
	        res.send(cognitoUser)
	    });
	});


	
    
app.listen(3000);