const RamenToken = artifacts.require("RamenToken");
const RamenCrowdsale = artifacts.require("RamenCrowdsale");

//Helper function, found it on OpenZeppelin Github file. See Quip for link.
const duration = {
  seconds: function(val) {
    return val;
  },
  minutes: function(val) {
    return val * this.seconds(60);
  },
  hours: function(val) {
    return val * this.minutes(60);
  },
  days: function(val) {
    return val * this.hours(24);
  },
  weeks: function(val) {
    return val * this.days(7);
  },
  years: function(val) {
    return val * this.days(365);
  }
};

module.exports = async function(deployer, network, accounts) {
  await deployer.deploy(RamenToken, "Ramen Capital", "RMN", 0);
  const deployedToken = await RamenToken.deployed();
  console.log(deployedToken.address); //Check if we can get the contract's address

  // uint256 rate, address payable wallet, IERC20 token, uint256 openingTime, uint256 closingTime, uint256 cap) Crowdsale(rate, wallet, token

  const rate = 1000; //This means that for every 1 ETH = 1000 RMN tokens
  const wallet = accounts[0]; //This is where the funds should be collected
  const timeNow = Math.floor(Date.now() / 1000);
  const openingTime = timeNow + duration.seconds(30); //ICO starts 30 seconds from now
  const closingTime = timeNow + duration.years(1);
  const cap = web3.utils.toWei("100", "ether"); // Cap is 100 ETH

  await deployer.deploy(
    RamenCrowdsale,
    rate,
    wallet,
    deployedToken.address,
    openingTime,
    closingTime,
    cap
  );

  const deployedCrowdsale = await RamenCrowdsale.deployed();
  await deployedToken.transferOwnership(deployedCrowdsale.address);
  console.log(
    "Contracts deployed \n",
    deployedCrowdsale.address,
    deployedToken.address
  );
};
