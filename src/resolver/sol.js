import { getIpfsRecord } from '@bonfida/spl-name-service';
import { Connection, clusterApiUrl } from '@solana/web3.js';

let connection;

const init = async (config) => {
    connection = new Connection(clusterApiUrl("mainnet-beta"), "processed");
};

const resolveDomain = async (domain) => {
    try {
        const ipfsPath = await getIpfsRecord(connection, domain);
        return ipfsPath.replace('ipfs://', 'ipfs/');
    } catch (error) {
        console.log(error);
        console.log(`Error while resolving IPFS hash for ${domain}`);
        return null;
    }
}

export default {
    init,
    resolveDomain
}