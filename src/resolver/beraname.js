import ethers from 'ethers';

export const registryABI = [
    "function tokenURI(uint256 id) public view override returns (string memory)"
];

let provider,
    registry;

const init = async (config) => {
    const rpcUrl = config.rpc_url;
    const registryAddress = config.contracts.registry;
    provider = new ethers.providers.JsonRpcProvider(rpcUrl)
    registry = new ethers.Contract(registryAddress, registryABI, provider);
};

const resolveDomain = async (domain) => {
    try {
        let charArray = domain.split('');
        const encodedChars = ethers.utils.defaultAbiCoder.encode(['string[]'], [charArray]);
        const name = ethers.utils.keccak256(encodedChars);
        const id = BigInt(name);

        const metadataUrl = await registry.tokenURI(id);
        // check to ensure that the metadataUrl is as per the standard defined in eip1577 for contenthash param
        if(!metadataUrl.includes("ipfs://"))
            throw Error("content hash doesn't exist");

        return metadataUrl.replace('ipfs://', 'ipfs/');
    } catch (error) {
        console.log(`Error while resolving IPFS hash for domain ${domain}.🐻⛓️: `, error);
        return null;
    }
}

export default {
    init,
    resolveDomain
}