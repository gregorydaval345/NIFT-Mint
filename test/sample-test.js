const { assert } = require('chai')

describe('MinterNFT Contract', async () => {
	let nft
	let nftContractAddress
	let tokenId

	// Deploys the MinterNFT contract and the MinterMarket contract before each test
	beforeEach('Setup Contract', async () => {
		const MinterNFT = await ethers.getContractFactory('MinterNFT')
		nft = await MinterNFT.deploy()
		await nft.deployed()
		nftContractAddress = await nft.address
	})

	// Tests address for the MinterNFT contract
	it('Should have an address', async () => {
		assert.notEqual(nftContractAddress, 0x0)
		assert.notEqual(nftContractAddress, '')
		assert.notEqual(nftContractAddress, null)
		assert.notEqual(nftContractAddress, undefined)
	})

	// Tests name for the token of MinterNFT contract
	it('Should have a name', async () => {
		// Returns the name of the token
		const name = await nft.collectionName()

		assert.equal(name, 'MinterNFT')
	})

	// Tests symbol for the token of MinterNFT contract
	it('Should have a symbol', async () => {
		// Returns the symbol of the token
		const symbol = await nft.collectionSymbol()

		assert.equal(symbol, 'MNFT')
	})

	// Tests for NFT minting function of MinterNFT contract using tokenID of the minted NFT
	it('Should be able to mint NFT', async () => {
		// Mints a NFT
		let txn = await nft.createMinterNFT()
		let tx = await txn.wait()

		// tokenID of the minted NFT
		let event = tx.events[0]
		let value = event.args[2]
		tokenId = value.toNumber()

		assert.equal(tokenId, 0)

		// Mints another NFT
		txn = await nft.createMinterNFT()
		tx = await txn.wait()

		// tokenID of the minted NFT
		event = tx.events[0]
		value = event.args[2]
		tokenId = value.toNumber()

		assert.equal(tokenId, 1)
	})
})