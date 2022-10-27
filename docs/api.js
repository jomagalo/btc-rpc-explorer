module.exports = {
	"version": "1.2.0",

	"routes":[
		// blocks
		{
			"category":"blocks",
			"url":"/api/block/:hash",
			"desc":"Returns the details of the block with the given hash.",
			"returnType":"json",
			"testUrl":"/api/block/0000000013bcb6ff1879e5bf6b9bdef9de7f5663e3b9a1369093ffdc497451c0"
		},

		{
			"category":"blocks",
			"url":"/api/block/:height",
			"desc":"Returns the details of the block at the given height.",
			"returnType":"json",
			"testUrl":"/api/block/100"
		},
		
		{
			"category":"blocks",
			"url":"/api/block/header/:hash",
			"desc":"Returns the details of the block header with the given hash.",
			"returnType":"json",
			"testUrl":"/api/block/header/0000000013bcb6ff1879e5bf6b9bdef9de7f5663e3b9a1369093ffdc497451c0"
		},

		{
			"category":"blocks",
			"url":"/api/block/header/:height",
			"desc":"Returns the details of the block header at the given height.",
			"returnType":"json",
			"testUrl":"/api/block/header/100"
		},

		{
			"category":"blocks",
			"url":"/api/blocks/tip/height",
			"desc":"Returns the height of the chain tip.",
			"returnType":"integer"
		},

		{
			"category":"blocks",
			"url":"/api/blocks/tip/hash",
			"desc":"Returns the block hash of the chain tip.",
			"returnType":"string"
		},




		// transactions
		{
			"category":"transactions",
			"url":"/api/tx/:txid",
			"desc":"Returns the details of the transaction with the given txid.",
			"returnType":"json",
			"testUrl": "/api/tx/9a7790a4a50a2b94291027fcdcdeb260438de7aa09fd9d6f9fe181740bdc0bc2"
		},
		{
			"category":"transactions",
			"url":"/api/tx/volume/24h",
			"desc":"Returns total output of all transactions over the last 24hrs.",
			"returnType":"json",
			"testUrl": "/api/tx/volume/24h",
			"hideInSlowMode": true
		},		
		



		// blockchain
		{
			"category":"blockchain",
			"url":"/api/blockchain/coins",
			"desc":"Returns the current supply of Bitcoin. An estimate using a checkpoint can be returned in 2 cases: on 'slow' devices, and before the UTXO Set snapshot is loaded.",
			"returnType":"number"
		},
		{
			"category":"blockchain",
			"url":"/api/blockchain/utxo-set",
			"desc":"Returns the latest UTXO Set snapshot. Warning: This call can be very slow, depending on node hardware and index configurations.",
			"returnType":"json"
		},





		// addresses
		{
			"category":"addresses",
			"url":"/api/address/:address",
			"desc":"Returns a summary of data pertaining to the given address. The output of this call will depend heavily on the configured 'Address API' (see .env-sample file).",
			"optionalParams": {
				"limit":"Number of transactions to return",
				"offset":"Offset into transactions",
				"sort":"Sorting direction for transactions ('desc'=new first, 'asc'=old first)"
			},
			"returnType":"json",
			"testUrl":"/api/address/4G8DCmkVYFvrU4NHGnQ3hi1Db5KeW4eFJZ"
		},





		// xyz-pubs
		{
			"category":"xpubs",
			"url":"/api/xyzpub/:extendedPubkey",
			"desc":"Returns details for the specified extended public key, including related keys and addresses.",
			"returnType":"json",
			"optionalParams": {
				"limit":"The number of addresses to return",
				"offset":"Offset into the list of addresses"
			},
			"testUrl": "/api/util/xyzpub/xpub6EuV33a2DXxAhoJTRTnr8qnysu81AA4YHpLY6o8NiGkEJ8KADJ35T64eJsStWsmRf1xXkEANVjXFXnaUKbRtFwuSPCLfDdZwYNZToh4LBCd"
		},
		{
			"category":"xpubs",
			"url":"/api/xyzpub/addresses/:xyzpub",
			"desc":"Returns a list of addresses derived from the given [xyz]pub.",
			"optionalParams": {
				"receiveOrChange":"0 for 'receive' addresses (default); 1 for 'change' addresses",
				"limit":"Number of addresses to return",
				"offset":"Offset into addresses"
			},
			"returnType":"json",
			"testUrl":"/api/xyzpub/addresses/xpub6EuV33a2DXxAhoJTRTnr8qnysu81AA4YHpLY6o8NiGkEJ8KADJ35T64eJsStWsmRf1xXkEANVjXFXnaUKbRtFwuSPCLfDdZwYNZToh4LBCd"
		},
		{
			"category":"xpubs",
			"url":"/api/xyzpub/txids/:xyzpub",
			"desc":"Returns a list of transaction IDs associated with the given [xyz]pub.",
			"optionalParams": {
				"gapLimit":"Limit of empty addresses to end searching for transactions (default: 20)",
				"addressLimit":"Forced limit on the number of addresses to search through (both 'receive' and 'change' addresses up to this number will be searched)"
			},
			"returnType":"json",
			"testUrl":"/api/xyzpub/txids/xpub6EuV33a2DXxAhoJTRTnr8qnysu81AA4YHpLY6o8NiGkEJ8KADJ35T64eJsStWsmRf1xXkEANVjXFXnaUKbRtFwuSPCLfDdZwYNZToh4LBCd"
		},




		// mining
		{
			"category":"mining",
			"url":"/api/mining/hashrate",
			"desc":"Returns the network hash rate, estimated over the last 1, 7, 30, 90, and 365 days.",
			"returnType":"json"
		},
		{
			"category":"mining",
			"url":"/api/mining/diff-adj-estimate",
			"desc":"Returns the current estimate for the next difficulty adjustment as a percentage.",
			"returnType":"number"
		},
		{
			"category":"mining",
			"url":"/api/mining/next-block",
			"desc":"Returns a summary for the estimated next block to be mined (produced via getblocktemplate).",
			"returnType":"json"
		},
		{
			"category":"mining",
			"url":"/api/mining/next-block/txids",
			"desc":"Returns a list of the transaction IDs included in the estimated next block to be mined (produced via getblocktemplate).",
			"returnType":"json"
		},
		{
			"category":"mining",
			"url":"/api/mining/next-block/includes/:txid",
			"desc":"Returns whether the specified transaction ID is included in the estimated next block to be mined (produced via getblocktemplate).",
			"returnType":"boolean",
			"testUrl":"/api/mining/next-block/includes/yourTxId"
		},
		{
			"category":"mining",
			"url":"/api/mining/miner-summary",
			"desc":"Returns whether the specified transaction ID is included in the estimated next block to be mined (produced via getblocktemplate).",
			"returnType":"json",
			"optionalParams": {
				"since":"Use the form 'Nd' to specify the number of day to look back (e.g. 'since=7d' will analyze the last 7 days)",
				"startHeight+endHeight":"Use these 2 parameters to specify a custom start/end height (e.g. 'startHeight=0&endHeight=24' to analyze the first 25 blocks)"
			},
			"testUrl":"/api/mining/miner-summary?since=1d"
		},





		// mempool
		{
			"category":"mempool",
			"url":"/api/mempool/count",
			"desc":"Returns the number of transactions in Bitcoin Core's mempool.",
			"returnType":"integer"
		},
		{
			"category":"mempool",
			"url":"/api/mempool/fees",
			"desc":"Returns recommended fee rates in sats/vB for next block, ~30 min, 1 hr, and 1 day.",
			"returnType":"json",
			"example": {"nextBlock":17,"30min":9,"60min":9,"1day":9}
		},



		// price
		{
			"category":"price",
			"url":"/api/price",
			"desc":"Returns the price of 1 BTC, in USD, EUR, GBP, and XAU",
			"returnType":"json"
		},
		{
			"category":"price",
			"url":"/api/price/:currency",
			"desc":"Returns the price of 1 BTC, in one of USD, EUR, GBP, XAU",
			"params":[{name: "currency", "options": ["usd", "eur", "gbp", "xau"]}],
			"returnType":"number",
			"testUrl": "/api/price/usd"
		},
		{
			"category":"price",
			"url":"/api/price/:currency/marketcap",
			"desc":"Returns the market cap of Bitcoin, in one of USD, EUR, GBP, XAU",
			"params":[{name: "currency", "options": ["usd", "eur", "gbp", "xau"]}],
			"returnType":"number",
			"testUrl": "/api/price/usd/marketcap"
		},
		{
			"category":"price",
			"url":"/api/price/:currency/sats",
			"desc":"Returns the price of 1 unit of the specified currency (e.g. 1 \"usd\") in satoshis",
			"params":[{name: "currency", "options": ["usd", "eur", "gbp", "xau"]}],
			"returnType":"number",
			"testUrl": "/api/price/usd/sats"
		},




		// fun
		{
			"category":"fun",
			"url":"/api/quotes/all",
			"desc":"Returns the full curated list of Bitcoin quotes.",
			"returnType":"json"
		},
		{
			"category":"fun",
			"url":"/api/quotes/:index",
			"desc":"Returns the Bitcoin quote with the given index from the curated list.",
			"returnType":"json",
			"testUrl": "/api/quotes/0"
		},
		{
			"category":"fun",
			"url":"/api/quotes/random",
			"desc":"Returns a random Bitcoin quote from the curated list.",
			"returnType":"json"
		},
		{
			"category":"fun",
			"url":"/api/holidays/all",
			"desc":"Returns the full curated list of Bitcoin Holidays.",
			"returnType":"json"
		},
		{
			"category":"fun",
			"url":"/api/holidays/today",
			"desc":"Returns the Bitcoin Holidays celebrated 'today' (i.e. at the time the API call is made).",
			"optionalParams": {
				"tzOffset":"The number of hours to offset from UTC for the caller's local timezone, e.g. \"-5\" for EST"
			},
			"returnType":"json",
			"testUrl": "/api/holidays/today?tzOffset=-5"
		},
		{
			"category":"fun",
			"url":"/api/holidays/:day",
			"desc":"Returns the Bitcoin Holidays celebrated on the specified day, using one of the following formats: yyyy-MM-DD, MM-DD.",
			"returnType":"json",
			"testUrl": "/api/holidays/01-03"
		},




		// admin
		{
			"category":"admin",
			"url":"/api/version",
			"desc":"Returns the semantic version of the public API, which is maintained separate from the app version.",
			"returnType":"string",
		},

	]
}
