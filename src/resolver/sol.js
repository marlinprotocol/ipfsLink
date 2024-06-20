import { getRecordV2, Record } from '@bonfida/spl-name-service';
import { Connection, clusterApiUrl } from '@solana/web3.js';

let connection;

const init = async (config) => {
    connection = new Connection(clusterApiUrl("mainnet-beta"), "processed");
};

const resolveDomain = async (domain) => {
    try {
        const record = await getRecordV2(connection, domain, Record.IPFS);
        const ipfsPath = record.retrievedRecord.getContent().toString();
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