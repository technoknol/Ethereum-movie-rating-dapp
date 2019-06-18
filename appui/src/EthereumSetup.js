import Web3 from 'web3';
import {Movies} from './Movies'

const web3=new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
let ratingABI=[
    {
      "constant": true,
      "inputs": [
        {
          "name": "movie",
          "type": "bytes32"
        }
      ],
      "name": "totalVotesFor",
      "outputs": [
        {
          "name": "",
          "type": "uint8"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "bytes32"
        }
      ],
      "name": "ratingsReceived",
      "outputs": [
        {
          "name": "",
          "type": "uint8"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "movie",
          "type": "bytes32"
        }
      ],
      "name": "voteForMovie",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "movieList",
      "outputs": [
        {
          "name": "",
          "type": "bytes32"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "name": "movieNames",
          "type": "bytes32[]"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "constructor"
    }
  ]
let ratingAddress='0x8eFE51714f5fb6E82F0ACB1D0A10F3a7Af9423D6';
web3.eth.defaultAccount = web3.eth.accounts[1]


function strTohex(movie)  {
    for (var e = movie, a = "", t = 0; t < e.length; t++)
        a += "" + e.charCodeAt(t).toString(16);
    return '0x'+a;
}

var movieNames = Movies.map(function (movie) { return strTohex(movie) }) ;
var ratingContractOld =  web3.eth.contract([{"constant":true,"inputs":[{"name":"movie","type":"bytes32"}],"name":"totalVotesFor","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"ratingsReceived","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"movie","type":"bytes32"}],"name":"voteForMovie","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"movieList","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"movieNames","type":"bytes32[]"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"}], ratingAddress); //.at(ratingAddress);

// var att = ratingContractOld.at(ratingAddress)
var ratingContract = ratingContractOld.new(
   movieNames,
   {
     from: web3.eth.accounts[0], 
     data: '0x6060604052341561000f57600080fd5b6040516102ff3803806102ff833981016040528080518201919050508060019080519060200190610041929190610048565b50506100c0565b82805482825590600052602060002090810192821561008a579160200282015b82811115610089578251829060001916905591602001919060010190610068565b5b509050610097919061009b565b5090565b6100bd91905b808211156100b95760008160009055506001016100a1565b5090565b90565b610230806100cf6000396000f30060606040526000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680632f265cf71461005e5780635f4187b01461009f5780636c9d63ab146100e0578063bf58ae3d1461010757600080fd5b341561006957600080fd5b610083600480803560001916906020019091905050610146565b604051808260ff1660ff16815260200191505060405180910390f35b34156100aa57600080fd5b6100c4600480803560001916906020019091905050610177565b604051808260ff1660ff16815260200191505060405180910390f35b34156100eb57600080fd5b610105600480803560001916906020019091905050610197565b005b341561011257600080fd5b61012860048080359060200190919050506101e0565b60405180826000191660001916815260200191505060405180910390f35b6000806000836000191660001916815260200190815260200160002060009054906101000a900460ff169050919050565b60006020528060005260406000206000915054906101000a900460ff1681565b6001600080836000191660001916815260200190815260200160002060008282829054906101000a900460ff160192506101000a81548160ff021916908360ff16021790555050565b6001818154811015156101ef57fe5b906000526020600020900160009150905054815600a165627a7a7230582010da0c4acd76106eb559841fb77ce6c5355a528fb3acd89c150d0af4ea3939d30029', 
     gas: '4700000'
   }, function (e, contract){
    console.log("e,contract", e, contract);
    if (typeof contract.address !== 'undefined') {
         console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
    }
 });// .at(ratingAddress);
 ratingContract.address = ratingAddress;
//  ratingContract.address = '0xB1e68992bFA6fB6F1EAA74D287989E5Ba02f9d67';
window.web3 = web3;
// const ratingContract=web3.eth.contract(ratingABI).at(ratingAddress);
console.log('rating contract', ratingContract);
// console.log('rating', );
window.ratingContract = ratingContract;
export {ratingContract};