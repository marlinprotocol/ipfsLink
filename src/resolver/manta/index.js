import ethers from 'ethers';
import { CID } from 'multiformats';
import { base16 } from "multiformats/bases/base16";
import { PublicResolverABI, SIDRegistryABI } from './abi.js';
import { getNamehash } from './utils.js';

let provider,
    registry,
    config;

const init = async (conf) => {
    config = conf;
    const rpcUrl = "https://pacific-rpc.manta.network/http";
    const registryAddress = config.contracts.registry;
    provider = new ethers.providers.JsonRpcProvider(rpcUrl)
    registry = new ethers.Contract(registryAddress, SIDRegistryABI, provider);
};

const resolveDomain = async (domain) => {
    try {
        const nodeId = await getNamehash({ name: `${domain}.manta`, config });
        const resolverAddress = await registry.callStatic.resolver(nodeId);

        const resolver = new ethers.Contract(resolverAddress, PublicResolverABI, provider);
        const contenthash = await resolver.callStatic.contenthash(nodeId);
        const base16ContentHash = contenthash.replace(/^0xe301/, 'f')
        const v1Hash = CID.parse(base16ContentHash, base16.decoder).toString();
        const v0Hash = CID.parse(v1Hash).toV0().toString();
        return `ipfs/${v0Hash}`;
    } catch (error) {
        console.log("Error while resolving IPFS hash for domain ${domain}.manta: ", error);
        return null;
    }
}

export default {
    init,
    resolveDomain
}