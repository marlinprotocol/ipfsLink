const solResolver = require("./sol");
const arbResolver = require("./arb");
const mantaResolver = require("./manta/index.js");
const beraResolver = require("./beraname.js");

const init = async (config) => {
    if(config.sol) {
        await solResolver.init(config.sol);
    }

    if(config.arb) {
        await arbResolver.init(config.arb);
    }

    if(config.manta) {
        await mantaResolver.init(config.arb);
    }

    if(config.bera) {
        await beraResolver.init(config.bera);
    }
}

module.exports = {
    init,
    resolvers: {
        sol: solResolver.resolveDomain,
        arb: arbResolver.resolveDomain,
        manta: mantaResolver.resolveDomain,
        bera: beraResolver.resolveDomain
    }
}