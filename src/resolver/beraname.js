import ethers from 'ethers';

export const registryABI = [
    "function tokenURI(uint256 id) public view override returns (string memory)"
];

let provider,
    registry;

const init = async (config) => {
    // const rpcUrl = "https://artio.rpc.berachain.com";
    const rpcUrl = "https://rpc.ankr.com/berachain_testnet";
    const registryAddress = "0x8D20B92B4163140F413AA52A4106fF9490bf2122";
    provider = new ethers.providers.JsonRpcProvider(rpcUrl)
    registry = new ethers.Contract(registryAddress, registryABI, provider);
};

// rajatlko13.🐻⛓️
const resolveDomain = async (domain) => {
    try {
        let charArray = domain.split('');
        const encodedChars = ethers.utils.defaultAbiCoder.encode(['string[]'], [charArray]);
        const name = ethers.utils.keccak256(encodedChars);
        const id = BigInt(name);
        // console.log("id: ", id)

        const metadataUrl = await registry.tokenURI(id);
        // console.log("metadata: ", metadataUrl);
        if(!metadataUrl.includes("ipfs://"))
            return "";

        return metadataUrl.replace('ipfs://', 'ipfs/');
    } catch (error) {
        console.log(error);
        console.log(`Error while resolving IPFS hash for domain ${domain}.🐻⛓️`);
        return null;
    }
}

// async function main() {
//     await init();
//     await resolveDomain("rajatlko13");
// }

// main();

export default {
    init,
    resolveDomain
}