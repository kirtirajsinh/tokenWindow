const hre = require("hardhat");

async function main() {
    const TokenCreator = await hre.ethers.getContractFactory("TokenCreator");
    const tokenCreatorContract = await TokenCreator.deploy();

    await tokenCreatorContract.deployed();

    console.log("Contract deployed to:", tokenCreatorContract.address);
}
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });