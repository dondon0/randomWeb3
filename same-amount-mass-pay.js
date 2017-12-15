var Web3 = require('web3'),
path = require('path'),
util = require('util'),
assert = require('assert'),
async = require('async'),
fs = require('fs'),
BigNumber = require('bignumber.js'),
Promise = require('any-promise');

//setup the web3 provider. in this case Parity at port 8545
web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

//optionally you can unlock your ethereum account
//web3.personal.unlockAccount("0xYourEthAddressHere", "YourPasswordHere");

//your contract abi
var abi = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"version","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"},{"name":"_extraData","type":"bytes"}],"name":"approveAndCall","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"type":"function"},{"inputs":[],"payable":false,"type":"constructor"},{"payable":false,"type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_owner","type":"address"},{"indexed":true,"name":"_spender","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Approval","type":"event"}];

//your contract address
var contractAddress = "0xYourContractAddress";


var contract = web3.eth.contract(abi).at(contractAddress);

//the addresses you want to send to
addresses = ['0xAddress1',
				'0xAddress2',
				'0xAddress3'];
			

//the amount of tokens (in wei) you're sending each address                
for (var i = 0, len = addresses.length; i < len; i++) {
  contract.transfer.sendTransaction(addresses[i], 1000000000000000000000,{from:"0xYourAddressHere" gas:"0x38D7EA4C68000"}, function(err, result){ 
	  if(!err){
                    console.log(result);
                } else{
                    console.log(err);
                }
	
	
	 });


}
