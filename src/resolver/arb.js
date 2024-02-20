const SIDfunctions = require('@siddomains/sidjs');
const ethers = require('ethers');

let sid;

const init = async (config) => {
    const provider = new ethers.providers.JsonRpcProvider(config.rpc_url)
    const chainId = (await provider.getNetwork()).chainId
    const SID = SIDfunctions.default;
    sid = new SID({ provider, sidAddress: SIDfunctions.getSidAddress(chainId) })
};

const resolveDomain = async (domain) => {
    try {
        const ipfsPath = await sid.name(`${domain}.arb`).getContent();
        return ipfsPath.value.toString().replace('ipfs://', 'ipfs/');
    } catch (error) {
        console.log(error);
        console.log(`Error while resolving IPFS hash for domain ${domain}.arb`);
        return null;
    }
}

module.exports = {
    init,
    resolveDomain
}