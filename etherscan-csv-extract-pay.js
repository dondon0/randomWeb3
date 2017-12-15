var csv = require("fast-csv"),
Web3 = require('web3'),
path = require('path'),
util = require('util'),
assert = require('assert'),
async = require('async'),
fs = require('fs'),
BigNumber = require('bignumber.js'),
Promise = require('any-promise');

//setup the provider. in this case Parity at port 8545
web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

//the etherscan csv file
csv.fromPath("addresses.csv", {headers : true}).on("data", function(data){
    //console.log(data);
    
//here the token is worth 100 tokens per dollar @ $300.91/Eth
	var tx_hash = data['Txhash'],
		value_in = data['CurrentValue @ $300.91/Eth'],
		token = value_in * 100;
		
    
	var array = [];
	var key1 = "recipient_address";
	var value1 = tx_hash;
	array[ key1 ] = value1;
	var key2 = "token_out";
	var value2 = token * 1000000000000000000;
	array[ key2 ] = value2;
     
		 
	
//your contract abi
	var abi = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"version","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"},{"name":"_extraData","type":"bytes"}],"name":"approveAndCall","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"type":"function"},{"inputs":[],"payable":false,"type":"constructor"},{"payable":false,"type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_owner","type":"address"},{"indexed":true,"name":"_spender","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Approval","type":"event"}];

//your contract address
	var contractAddress = "0xA2d50668B76EcAc059A28d01e37Dbe9cF277ae84";
	var contract = web3.eth.contract(abi).at(contractAddress);
	
//send the tokens (account is assumed to be unlocked)
	contract.transfer.sendTransaction(array[ key1 ], array[ key2 ],{from:"0x373c5aE6E3Bf5d8ccB7eb07e60442F7350714585"}, function(err, result){ 
		if(!err){
			
			console.log(result);
		} else{
			console.log(err);
		}
	
	
});

	
     
}).on("end", function(){
     console.log("done");
});
