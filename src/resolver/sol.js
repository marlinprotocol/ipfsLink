const { getIpfsRecord } = require('@bonfida/spl-name-service');
const { Connection, clusterApiUrl } = require('@solana/web3.js');

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

module.exports = {
    init,
    resolveDomain
}