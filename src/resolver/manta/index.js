const ethers = require('ethers');
const { getNamehash } = require('./utils.js');
const { PublicResolverABI, SIDRegistryABI } = require('./abi.js');
const { CID } = import('multiformats');
const { base16 } = import("multiformats/bases/base16");

let provider,
    registry;

const init = async (config) => {
    const rpcUrl = "https://pacific-rpc.manta.network/http";
    const registryAddress = "0x5dc881dda4e4a8d312be3544ad13118d1a04cb17";
    provider = new ethers.providers.JsonRpcProvider(rpcUrl)
    registry = new ethers.Contract(registryAddress, SIDRegistryABI, provider);
};

const resolveDomain = async (domain) => {
    try {
        const nodeId = await getNamehash({ name: `${domain}.manta` });
        const resolverAddress = await registry.callStatic.resolver(nodeId);

        const resolver = new ethers.Contract(resolverAddress, PublicResolverABI, provider);
        const contenthash = await resolver.callStatic.contenthash(nodeId);
        // console.log("contenthash: ", contenthash);
        const base16ContentHash = contenthash.replace(/^0xe301/, 'f')
        const v1Hash = CID.parse(base16ContentHash, base16.decoder).toString();
        // console.log("v1Hash: ", v1Hash);
        const v0Hash = CID.parse(v1Hash).toV0().toString();
        // console.log("v0Hash: ", v0Hash);
        return `ipfs/${v0Hash}`;
    } catch (error) {
        console.log(error);
        console.log(`Error while resolving IPFS hash for domain ${domain}.manta`);
        return null;
    }
}

module.exports = {
    init,
    resolveDomain
}