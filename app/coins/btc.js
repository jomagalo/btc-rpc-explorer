"use strict";

const Decimal = require("decimal.js");
const Decimal8 = Decimal.clone({ precision:8, rounding:8 });

const btcFun = require("./btcFun.js");

const blockRewardEras = [ new Decimal8(50) ];
for (let i = 1; i < 34; i++) {
	let previous = blockRewardEras[i - 1];
	blockRewardEras.push(new Decimal8(previous).dividedBy(2));
}

const currencyUnits = [
	{
		type:"native",
		name:"BTC",
		multiplier:1,
		default:true,
		values:["", "btc", "BTC"],
		decimalPlaces:8
	},
	{
		type:"native",
		name:"mBTC",
		multiplier:1000,
		values:["mbtc"],
		decimalPlaces:5
	},
	{
		type:"native",
		name:"bits",
		multiplier:1000000,
		values:["bits"],
		decimalPlaces:2
	},
	{
		type:"native",
		name:"sat",
		multiplier:100000000,
		values:["sat", "satoshi"],
		decimalPlaces:0
	},
	{
		type:"exchanged",
		name:"USD",
		multiplier:"usd",
		values:["usd"],
		decimalPlaces:2,
		symbol:"$"
	},
	{
		type:"exchanged",
		name:"EUR",
		multiplier:"eur",
		values:["eur"],
		decimalPlaces:2,
		symbol:"€"
	},
];

module.exports = {
	name:"Bitcoin",
	ticker:"BTC",
	logoUrlsByNetwork:{
		"main":"./img/network-mainnet/logo.svg",
		"test":"./img/network-testnet/logo.svg",
		"regtest":"./img/network-regtest/logo.svg",
		"signet":"./img/network-signet/logo.svg"
	},
	coinIconUrlsByNetwork:{
		"main":"./img/network-mainnet/coin-icon.svg",
		"test":"./img/network-testnet/coin-icon.svg",
		"signet":"./img/network-signet/coin-icon.svg",
		"regtest":"./img/network-regtest/coin-icon.svg"
	},
	coinColorsByNetwork: {
		"main": "#F7931A",
		"test": "#1daf00",
		"signet": "#af008c",
		"regtest": "#777"
	},
	siteTitlesByNetwork: {
		"main":"Bitcoin Explorer",
		"test":"Testnet Explorer",
		"regtest":"Regtest Explorer",
		"signet":"Signet Explorer",
	},
	demoSiteUrlsByNetwork: {
		"main": "https://bitcoinexplorer.org",
		"test": "https://testnet.bitcoinexplorer.org",
		"signet": "https://signet.bitcoinexplorer.org",
	},
	knownTransactionsByNetwork: {
		main: "9a7790a4a50a2b94291027fcdcdeb260438de7aa09fd9d6f9fe181740bdc0bc2",
		test: "22e7e860660f368b5c653c272b0445a0625d19fdec02fc158ef9800a5c3a07e8",
		signet: "39332e10af6fe491e8ae4ba1e2dd674698fedf8aa3c8c42bf71572debc1bb5b9"
	},
	miningPoolsConfigUrls:[
		"https://raw.githubusercontent.com/btc21/Bitcoin-Known-Miners/master/miners.json",
		"https://raw.githubusercontent.com/0xB10C/known-mining-pools/master/pools.json",
		"https://raw.githubusercontent.com/btccom/Blockchain-Known-Pools/master/pools.json",
		"https://raw.githubusercontent.com/blockchain/Blockchain-Known-Pools/master/pools.json"
	],
	maxBlockWeight: 4000000,
	maxBlockSize: 1000000,
	minTxBytes: 166, // ref: https://en.bitcoin.it/wiki/Maximum_transaction_rate
	minTxWeight: 166 * 4, // hack
	difficultyAdjustmentBlockCount: 2016,
	maxSupplyByNetwork: {
		"main": new Decimal(20999817.31308491), // ref: https://bitcoin.stackexchange.com/a/38998
		"test": new Decimal(21000000),
		"regtest": new Decimal(21000000),
		"signet": new Decimal(21000000)
	},
	targetBlockTimeSeconds: 600,
	targetBlockTimeMinutes: 10,
	currencyUnits:currencyUnits,
	currencyUnitsByName:{"BTC":currencyUnits[0], "mBTC":currencyUnits[1], "bits":currencyUnits[2], "sat":currencyUnits[3]},
	baseCurrencyUnit:currencyUnits[3],
	defaultCurrencyUnit:currencyUnits[0],
	feeSatoshiPerByteBucketMaxima: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20, 25, 50, 75, 100, 150],
	
	halvingBlockIntervalsByNetwork: {
		"main": 210000,
		"test": 210000,
		"regtest": 150,
		"signet": 210000
	},

	// used for supply estimates that don't need full gettxoutset accuracy
	coinSupplyCheckpointsByNetwork: {
		"main": [ 675046, new Decimal(18656332.38) ],
		"test": [ 1940614, new Decimal(20963051.112) ],
		"signet": [ 29472, new Decimal(1473600) ],
		"regtest": [ 0, new Decimal(0) ]
	},

	utxoSetCheckpointsByNetwork: {
		//"main": {"height":6394,"bestblock":"000000000469576d48e02f19fd6ba07d97f1086c3d7b8686124a0069e94b4f79","transactions":1,"txouts":1,"bogosize":5640223435,"hash_serialized_2":"727879e512dde3c87ec4b3b4185d8212506a5eee517694a34785c0a63a7d78b9","disk_size":4582442992,"total_amount":"18826856.29247566","lastUpdated":1632692076775}
	},
	
	genesisBlockHashesByNetwork:{
		"main":	"00000000c6489d706319a8072155f1ecfc1876e65e62a09c7df2cfccf5d36ef8",
		"test":	"000000000933ea01ad0ee984209779baaec3ced90fa3f408719526f8d77f4943",
		"regtest": "0f9188f13cb7b2c71f2a335e3a4fc328bf5beb436012afca590b1a11466e2206",
		"signet":  "00000008819873e925422c1ff0f99f7cc9bbb232af63a077a480a3633bee1ef6", 
	},
	genesisCoinbaseTransactionIdsByNetwork: {
		"main":	"892018004a6bde29ec3b6c7357ba347f27a1d332b34bef81de95125a567e259c",
		"test":	"4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b",
		"regtest": "4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b",
		"signet":  "4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b"
	},
	genesisCoinbaseTransactionsByNetwork:{
		"main": {
			"hex": "01000000010000000000000000000000000000000000000000000000000000000000000000ffffffff4f04ffff001d0104474c6f7320416e67656c65732054696d65732031362f5365702f32303232204c6962616e6f2c204465706f736974616e74657320697272756d70656e20656e20352062616e636f73ffffffff0100f2052a010000004341043564053707b797e900819968f1b8e8cc079737676e4c6a62e93984e97056ae45b7954dea30e3369a4feb4b35a819a4f0a46c8f741ba9cdd380f5744cdc68c7c5ac00000000",
			"txid": "892018004a6bde29ec3b6c7357ba347f27a1d332b34bef81de95125a567e259c",
			"hash": "892018004a6bde29ec3b6c7357ba347f27a1d332b34bef81de95125a567e259c",
			"size": 206,
			"vsize": 206,
			"version": 1,
			"confirmations":6395,
			"vin": [
				{
					"coinbase": "04ffff001d0104474c6f7320416e67656c65732054696d65732031362f5365702f32303232204c6962616e6f2c204465706f736974616e74657320697272756d70656e20656e20352062616e636f73",
					"sequence": 4294967295
				}
			],
			"vout": [
				{
					"value": 50,
					"n": 0,
					"scriptPubKey": {
						"asm": "043564053707b797e900819968f1b8e8cc079737676e4c6a62e93984e97056ae45b7954dea30e3369a4feb4b35a819a4f0a46c8f741ba9cdd380f5744cdc68c7c5 OP_CHECKSIG",
						"hex": "41043564053707b797e900819968f1b8e8cc079737676e4c6a62e93984e97056ae45b7954dea30e3369a4feb4b35a819a4f0a46c8f741ba9cdd380f5744cdc68c7c5ac",
						
						"type": "pubkey",
						
						
					}
				}
			],
			"blockhash": "00000000c6489d706319a8072155f1ecfc1876e65e62a09c7df2cfccf5d36ef8",
			"time": 1664038289,
			"blocktime": 1664038289
		},
		"test": {
			"hex": "01000000010000000000000000000000000000000000000000000000000000000000000000ffffffff4d04ffff001d0104455468652054696d65732030332f4a616e2f32303039204368616e63656c6c6f72206f6e206272696e6b206f66207365636f6e64206261696c6f757420666f722062616e6b73ffffffff0100f2052a01000000434104678afdb0fe5548271967f1a67130b7105cd6a828e03909a67962e0ea1f61deb649f6bc3f4cef38c4f35504e51ec112de5c384df7ba0b8d578a4c702b6bf11d5fac00000000",
			"txid": "892018004a6bde29ec3b6c7357ba347f27a1d332b34bef81de95125a567e259c",
			"hash": "892018004a6bde29ec3b6c7357ba347f27a1d332b34bef81de95125a567e259c",
			"version": 1,
			"size": 204,
			"vsize": 204,
			"weight": 816,
			"locktime": 0,
			"vin": [
				{
					"coinbase": "04ffff001d0104455468652054696d65732030332f4a616e2f32303039204368616e63656c6c6f72206f6e206272696e6b206f66207365636f6e64206261696c6f757420666f722062616e6b73",
					"sequence": 4294967295
				}
			],
			"vout": [
				{
					"value": 50.00000000,
					"n": 0,
					"scriptPubKey": {
						"asm": "04678afdb0fe5548271967f1a67130b7105cd6a828e03909a67962e0ea1f61deb649f6bc3f4cef38c4f35504e51ec112de5c384df7ba0b8d578a4c702b6bf11d5f OP_CHECKSIG",
						"hex": "4104678afdb0fe5548271967f1a67130b7105cd6a828e03909a67962e0ea1f61deb649f6bc3f4cef38c4f35504e51ec112de5c384df7ba0b8d578a4c702b6bf11d5fac",
						"reqSigs": 1,
						"type": "pubkey",
						"addresses": [
							"mpXwg4jMtRhuSpVq4xS3HFHmCmWp9NyGKt"
						]
					}
				}
			],
			"blockhash": "000000000933ea01ad0ee984209779baaec3ced90fa3f408719526f8d77f4943",
			"time": 1296688602,
			"blocktime": 1296688602
		},
		"regtest": {
			"hex": "01000000010000000000000000000000000000000000000000000000000000000000000000ffffffff4d04ffff001d0104455468652054696d65732030332f4a616e2f32303039204368616e63656c6c6f72206f6e206272696e6b206f66207365636f6e64206261696c6f757420666f722062616e6b73ffffffff0100f2052a01000000434104678afdb0fe5548271967f1a67130b7105cd6a828e03909a67962e0ea1f61deb649f6bc3f4cef38c4f35504e51ec112de5c384df7ba0b8d578a4c702b6bf11d5fac00000000",
			"txid": "4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b",
			"hash": "4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b",
			"version": 1,
			"size": 204,
			"vsize": 204,
			"weight": 816,
			"locktime": 0,
			"vin": [
				{
					"coinbase": "04ffff001d0104455468652054696d65732030332f4a616e2f32303039204368616e63656c6c6f72206f6e206272696e6b206f66207365636f6e64206261696c6f757420666f722062616e6b73",
					"sequence": 4294967295
				}
			],
			"vout": [
				{
					"value": 50.00000000,
					"n": 0,
					"scriptPubKey": {
						"asm": "04678afdb0fe5548271967f1a67130b7105cd6a828e03909a67962e0ea1f61deb649f6bc3f4cef38c4f35504e51ec112de5c384df7ba0b8d578a4c702b6bf11d5f OP_CHECKSIG",
						"hex": "4104678afdb0fe5548271967f1a67130b7105cd6a828e03909a67962e0ea1f61deb649f6bc3f4cef38c4f35504e51ec112de5c384df7ba0b8d578a4c702b6bf11d5fac",
						"type": "pubkey"
					}
				}
			],
			"blockhash": "0f9188f13cb7b2c71f2a335e3a4fc328bf5beb436012afca590b1a11466e2206",
			"time": 1296688602,
			"blocktime": 1296688602
		},
		"signet": {
			"hex": "01000000010000000000000000000000000000000000000000000000000000000000000000ffffffff4d04ffff001d0104455468652054696d65732030332f4a616e2f32303039204368616e63656c6c6f72206f6e206272696e6b206f66207365636f6e64206261696c6f757420666f722062616e6b73ffffffff0100f2052a01000000434104678afdb0fe5548271967f1a67130b7105cd6a828e03909a67962e0ea1f61deb649f6bc3f4cef38c4f35504e51ec112de5c384df7ba0b8d578a4c702b6bf11d5fac00000000",
			"txid": "4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b",
			"hash": "4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b",
			"version": 1,
			"size": 204,
			"vsize": 204,
			"weight": 816,
			"locktime": 0,
			"vin": [
				{
					"coinbase": "04ffff001d0104455468652054696d65732030332f4a616e2f32303039204368616e63656c6c6f72206f6e206272696e6b206f66207365636f6e64206261696c6f757420666f722062616e6b73",
					"sequence": 4294967295
				}
			],
			"vout": [
				{
					"value": 50.00000000,
					"n": 0,
					"scriptPubKey": {
						"asm": "04678afdb0fe5548271967f1a67130b7105cd6a828e03909a67962e0ea1f61deb649f6bc3f4cef38c4f35504e51ec112de5c384df7ba0b8d578a4c702b6bf11d5f OP_CHECKSIG",
						"hex": "4104678afdb0fe5548271967f1a67130b7105cd6a828e03909a67962e0ea1f61deb649f6bc3f4cef38c4f35504e51ec112de5c384df7ba0b8d578a4c702b6bf11d5fac",
						"type": "pubkey"
					}
				}
			],
			"blockhash": "00000008819873e925422c1ff0f99f7cc9bbb232af63a077a480a3633bee1ef6",
			"time": 1598918400,
			"blocktime": 1598918400
		}
	},
	genesisBlockStatsByNetwork:{
		"main": {
			"avgfee": 0,
			"avgfeerate": 0,
			"avgtxsize": 0,
			"blockhash": "00000000c6489d706319a8072155f1ecfc1876e65e62a09c7df2cfccf5d36ef8",
			"feerate_percentiles": [
				0,
				0,
				0,
				0,
				0
			],
			"height": 0,
			"ins": 0,
			"maxfee": 0,
			"maxfeerate": 0,
			"maxtxsize": 0,
			"medianfee": 0,
			"mediantime": 1664038289,
			"mediantxsize": 0,
			"minfee": 0,
			"minfeerate": 0,
			"mintxsize": 0,
			"outs": 1,
			"subsidy": 5000000000,
			"swtotal_size": 0,
			"swtotal_weight": 0,
			"swtxs": 0,
			"time": 1664038289,
			"total_out": 0,
			"total_size": 0,
			"total_weight": 0,
			"totalfee": 0,
			"txs": 1,
			"utxo_increase": 1,
			"utxo_size_inc": 117
		},
		"test": {
			"avgfee": 0,
			"avgfeerate": 0,
			"avgtxsize": 0,
			"blockhash": "000000000933ea01ad0ee984209779baaec3ced90fa3f408719526f8d77f4943",
			"feerate_percentiles": [
				0,
				0,
				0,
				0,
				0
			],
			"height": 0,
			"ins": 0,
			"maxfee": 0,
			"maxfeerate": 0,
			"maxtxsize": 0,
			"medianfee": 0,
			"mediantime": 1296688602,
			"mediantxsize": 0,
			"minfee": 0,
			"minfeerate": 0,
			"mintxsize": 0,
			"outs": 1,
			"subsidy": 5000000000,
			"swtotal_size": 0,
			"swtotal_weight": 0,
			"swtxs": 0,
			"time": 1296688602,
			"total_out": 0,
			"total_size": 0,
			"total_weight": 0,
			"totalfee": 0,
			"txs": 1,
			"utxo_increase": 1,
			"utxo_size_inc": 117
		},
		"regtest": {
			"avgfee": 0,
			"avgfeerate": 0,
			"avgtxsize": 0,
			"blockhash": "0f9188f13cb7b2c71f2a335e3a4fc328bf5beb436012afca590b1a11466e2206",
			"feerate_percentiles": [
				0,
				0,
				0,
				0,
				0
			],
			"height": 0,
			"ins": 0,
			"maxfee": 0,
			"maxfeerate": 0,
			"maxtxsize": 0,
			"medianfee": 0,
			"mediantime": 1296688602,
			"mediantxsize": 0,
			"minfee": 0,
			"minfeerate": 0,
			"mintxsize": 0,
			"outs": 1,
			"subsidy": 5000000000,
			"swtotal_size": 0,
			"swtotal_weight": 0,
			"swtxs": 0,
			"time": 1296688602,
			"total_out": 0,
			"total_size": 0,
			"total_weight": 0,
			"totalfee": 0,
			"txs": 1,
			"utxo_increase": 1,
			"utxo_size_inc": 117
		},
		"signet": {
			"avgfee": 0,
			"avgfeerate": 0,
			"avgtxsize": 0,
			"blockhash": "00000008819873e925422c1ff0f99f7cc9bbb232af63a077a480a3633bee1ef6",
			"feerate_percentiles": [
				0,
				0,
				0,
				0,
				0
			],
			"height": 0,
			"ins": 0,
			"maxfee": 0,
			"maxfeerate": 0,
			"maxtxsize": 0,
			"medianfee": 0,
			"mediantime": 1598918400,
			"mediantxsize": 0,
			"minfee": 0,
			"minfeerate": 0,
			"mintxsize": 0,
			"outs": 1,
			"subsidy": 5000000000,
			"swtotal_size": 0,
			"swtotal_weight": 0,
			"swtxs": 0,
			"time": 1598918400,
			"total_out": 0,
			"total_size": 0,
			"total_weight": 0,
			"totalfee": 0,
			"txs": 1,
			"utxo_increase": 1,
			"utxo_size_inc": 117
		}
	},
	testData: {
		txDisplayTestList: {
			"62ff9fe2e8b50e69bf8347ec4fac8a9465367bdb426e5abd7a12b8c372ef289d" : {
				blockHeight: 6000, blockHash: "0000000004c488063f6c07228b1137a041c96a6429865baa4e335e87cac6d96c"
			},
			"f7f65de55eb65f181f6251c052f843527bcbf7e5b5f468e7f3ea8353bff6dc5e" : {
				blockHeight: 170, blockHash: "0000000005a4ff38ff972518961b1e589072a73bc6ac236e7d3f6f97c821a128"
			}
			
		}
	},
	genesisCoinbaseOutputAddressScripthash:"8b01df4e368ea28f8dc0423bcf7a4923e3a12d307c875e47a0cfbf90b5c39161",
	historicalData: btcFun.items,
	exchangeRateData:{
		jsonUrl:"https://api.coindesk.com/v1/bpi/currentprice.json",
		responseBodySelectorFunction:function(responseBody) {
			//console.log("Exchange Rate Response: " + JSON.stringify(responseBody));

			var exchangedCurrencies = ["USD", "GBP", "EUR"];

			if (responseBody.bpi) {
				var exchangeRates = {};

				for (var i = 0; i < exchangedCurrencies.length; i++) {
					if (responseBody.bpi[exchangedCurrencies[i]]) {
						exchangeRates[exchangedCurrencies[i].toLowerCase()] = responseBody.bpi[exchangedCurrencies[i]].rate_float;
					}
				}

				return exchangeRates;
			}
			
			return null;
		}
	},
	goldExchangeRateData:{
		jsonUrl:"https://forex-data-feed.swissquote.com/public-quotes/bboquotes/instrument/XAU/USD",
		responseBodySelectorFunction:function(responseBody) {
			//console.log("Exchange Rate Response: " + JSON.stringify(responseBody));

			if (responseBody[0].topo && responseBody[0].topo.platform == "MT5") {
				var prices = responseBody[0].spreadProfilePrices[0];
				
				return {
					usd: prices.ask
				};
			}
			
			return null;
		}
	},
	blockRewardFunction:function(blockHeight, chain) {
		let halvingBlockInterval = (chain == "regtest" ? 150 : 210000);
		let index = Math.floor(blockHeight / halvingBlockInterval);

		return blockRewardEras[index];
	}
};

