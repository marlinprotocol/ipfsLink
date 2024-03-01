import solResolver from "./sol.js";
import arbResolver from "./arb.js";
import mantaResolver from "./manta/index.js";

const init = async (config) => {
    if(config.sol) {
        await solResolver.init(config.sol);
    }

    if(config.arb) {
        await arbResolver.init(config.arb);
    }

    if(config.manta) {
        await mantaResolver.init(config.manta);
    }
}

export default {
    init,
    resolvers: {
        sol: solResolver.resolveDomain,
        arb: arbResolver.resolveDomain,
        manta: mantaResolver.resolveDomain
    }
}