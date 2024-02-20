const solResolver = require("./sol");
const arbResolver = require("./arb");

const init = async (config) => {
    if(config.sol) {
        await solResolver.init(config.sol);
    }

    if(config.arb) {
        await arbResolver.init(config.arb);
    }
}

module.exports = {
    init,
    resolvers: {
        sol: solResolver.resolveDomain,
        arb: arbResolver.resolveDomain
    }
}