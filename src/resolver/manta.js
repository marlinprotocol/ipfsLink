// const SIDfunctions = require('@siddomains/sidjs');
// const ethers = require('ethers');

// let sid;

// const init = async (config) => {
//     const provider = new ethers.providers.JsonRpcProvider(config.rpc_url)
//     const chainId = (await provider.getNetwork()).chainId
//     const SID = SIDfunctions.default;
//     sid = new SID({ provider, sidAddress: "0x5dc881dda4e4a8d312be3544ad13118d1a04cb17" })
// };

// const resolveDomain = async (domain) => {
//     try {
//         const ipfsPath = await sid.name(`${domain}.manta`).getContent();
//         console.log(ipfsPath)
//         return ipfsPath.value.toString().replace('ipfs://', 'ipfs/');
//     } catch (error) {
//         console.log(error);
//         console.log(`Error while resolving IPFS hash for domain ${domain}.manta`);
//         return null;
//     }
// }

// module.exports = {
//     init,
//     resolveDomain
// }

import { CID } from 'multiformats/cid'
import { base16 } from "multiformats/bases/base16"
import { ethers } from 'ethers'
import { createWeb3Name } from '@web3-name-sdk/core'

const rpcUrl = "https://pacific-rpc.manta.network/http";
const registryAddress = "0x5dc881dda4e4a8d312be3544ad13118d1a04cb17";

const SIDRegistryABI = [
    "function resolver(bytes32 node) view returns(address resolver)"
];
const PublicResolverABI = [
    "function contenthash(bytes32 node) view returns(bytes contenthash)"
];

async function getContentHash(name) {
    const web3name = createWeb3Name();
    const data = await web3name.getDomainAvatar({name: "builtonoyster.manta", rpcUrl})
    console.log(data)
    // const provider = new ethers.providers.JsonRpcProvider(rpcUrl)
    // const registry = new ethers.Contract(registryAddress, SIDRegistryABI, provider);
    // const nodeId = SIDfunctions.namehash(name)
    // console.log(SIDfunctions.namehash("hostdomain.bnb"))
    // console.log(SIDfunctions.namehash("hostdomain.arb"))
    // console.log(SIDfunctions.namehash("builtonoyster.manta"))
    // console.log(SIDfunctions.namehash("hostdomain.manta"))
    // const nodeId = "0xad999415e37494b1d5e5ed92c1e151b623debb574c45cc890cf6aabcce388dc0"
    // const resolverAddress = await registry.callStatic.resolver(nodeId);

    // const resolver = new ethers.Contract(resolverAddress, PublicResolverABI, provider);
    // const contenthash = await resolver.callStatic.contenthash(nodeId);
    // const base16ContentHash = contenthash.replace(/^0xe301/, 'f')
    // const contentHash = CID.parse(base16ContentHash, base16.decoder);
    // console.log(contentHash.toString())
    // return contentHash.toString();
}

import { ens_normalize } from '@adraffy/ens-normalize'
import { namehash, toHex } from 'viem'

const normalize = (name) => (name ? ens_normalize(name) : name)

// const ZERO_HASH = '0x0000000000000000000000000000000000000000000000000000000000000000'

function tldNamehash(inputName, identifier) {
  if (!identifier) return namehash(inputName)
  const fullNameNode = `${inputName}.[${toHex(identifier, { size: 32 }).slice(2)}]`
  return namehash(fullNameNode)
}

// console.log(tldNamehash("builtonoyster.manta"))


getContentHash("builtonoyster.manta")