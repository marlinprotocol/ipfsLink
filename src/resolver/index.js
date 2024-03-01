import solResolver from "./sol.js";
import arbResolver from "./arb.js";
import mantaResolver from "./manta/index.js";
import beraResolver from "./beraname.js";

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

    if(config.bera) {
        await beraResolver.init(config.bera);
    }
}

export default {
    init,
    resolvers: {
        sol: solResolver.resolveDomain,
        arb: arbResolver.resolveDomain,
        manta: mantaResolver.resolveDomain,
        bera: beraResolver.resolveDomain
    }
}