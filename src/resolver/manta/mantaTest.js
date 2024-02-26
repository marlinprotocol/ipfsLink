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

export const VerifiedTldHubAbi = [
    { inputs: [], stateMutability: 'nonpayable', type: 'constructor' },
    {
        anonymous: false,
        inputs: [
            { indexed: true, internalType: 'address', name: 'previousOwner', type: 'address' },
            { indexed: true, internalType: 'address', name: 'newOwner', type: 'address' },
        ],
        name: 'OwnershipTransferred',
        type: 'event',
    },
    {
        inputs: [{ internalType: 'uint256', name: 'chainId', type: 'uint256' }],
        name: 'getChainInfo',
        outputs: [
            {
                components: [
                    { internalType: 'uint256', name: 'chainId', type: 'uint256' },
                    { internalType: 'string', name: 'defaultRpc', type: 'string' },
                    { internalType: 'address', name: 'registry', type: 'address' },
                    { internalType: 'address', name: 'sann', type: 'address' },
                ],
                internalType: 'struct VerifiedTldHub.chainInfo',
                name: '',
                type: 'tuple',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [{ internalType: 'uint256', name: 'chainId', type: 'uint256' }],
        name: 'getChainTlds',
        outputs: [{ internalType: 'string[]', name: '', type: 'string[]' }],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [{ internalType: 'string[]', name: 'tlds', type: 'string[]' }],
        name: 'getTldInfo',
        outputs: [
            {
                components: [
                    { internalType: 'string', name: 'tld', type: 'string' },
                    { internalType: 'uint256', name: 'identifier', type: 'uint256' },
                    { internalType: 'uint256', name: 'chainId', type: 'uint256' },
                    { internalType: 'string', name: 'defaultRpc', type: 'string' },
                    { internalType: 'address', name: 'registry', type: 'address' },
                    { internalType: 'address', name: 'sann', type: 'address' },
                ],
                internalType: 'struct VerifiedTldHub.completeTldInfo[]',
                name: '',
                type: 'tuple[]',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'getTlds',
        outputs: [{ internalType: 'string[]', name: '', type: 'string[]' }],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'owner',
        outputs: [{ internalType: 'address', name: '', type: 'address' }],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            { internalType: 'uint256', name: 'chainId', type: 'uint256' },
            { internalType: 'string', name: 'tldName', type: 'string' },
        ],
        name: 'removeTldInfo',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    { inputs: [], name: 'renounceOwnership', outputs: [], stateMutability: 'nonpayable', type: 'function' },
    {
        inputs: [{ internalType: 'address', name: 'newOwner', type: 'address' }],
        name: 'transferOwnership',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            { internalType: 'uint256', name: 'chainId', type: 'uint256' },
            { internalType: 'string', name: 'defaultRpc', type: 'string' },
            { internalType: 'address', name: 'registry', type: 'address' },
            { internalType: 'address', name: 'sann', type: 'address' },
        ],
        name: 'updateChainInfo',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            { internalType: 'uint256', name: 'chainId', type: 'uint256' },
            { internalType: 'string', name: 'defaultRpc', type: 'string' },
        ],
        name: 'updateDefaultRpc',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            { internalType: 'string', name: 'tldName', type: 'string' },
            { internalType: 'uint256', name: 'identifier', type: 'uint256' },
            { internalType: 'uint256', name: 'chainId', type: 'uint256' },
        ],
        name: 'updateTldInfo',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
];

export const SANNContractAbi = [
    {
        inputs: [{ internalType: 'uint256', name: 'identifier', type: 'uint256' }],
        name: 'tldBase',
        outputs: [{ internalType: 'address', name: '', type: 'address' }],
        stateMutability: 'view',
        type: 'function',
    },
];

export const TldBaseContractAbi = [
    {
        inputs: [{ internalType: 'uint256', name: 'tokenId', type: 'uint256' }],
        name: 'tokenURI',
        outputs: [{ internalType: 'string', name: '', type: 'string' }],
        stateMutability: 'view',
        type: 'function',
    },
];


import { CID } from 'multiformats/cid'
import { base16 } from "multiformats/bases/base16"
import { ethers } from 'ethers'
import { createWeb3Name } from '@web3-name-sdk/core'
import { mainnet } from 'viem/chains'

const rpcUrl = "https://pacific-rpc.manta.network/http";
const registryAddress = "0x5dc881dda4e4a8d312be3544ad13118d1a04cb17";

const SIDRegistryABI = [
    "function resolver(bytes32 node) view returns(address resolver)"
];
const PublicResolverABI = [
    "function contenthash(bytes32 node) view returns(bytes contenthash)"
];

function getVerifiedTldHubContract() {
    const ethClient = createPublicClient({
        chain: mainnet,
        transport: http('https://rpc.ankr.com/eth'),
    })

    const hubContract = getContract({
        address: "0x754D6827A57334143eD5fB58C5b1A4aAe4396ba5",
        abi: VerifiedTldHubAbi,
        publicClient: ethClient,
    })

    return hubContract
}

async function getTldInfo(tldList) {
    const hubContract = getVerifiedTldHubContract()
    const tldInfoList = await hubContract.read.getTldInfo([tldList])
    return tldInfoList.filter((e) => !!e.tld)
}

function createCustomClient(tldInfo, rpcUrl) {
    const client = createPublicClient({
        chain: {
            id: Number(tldInfo.chainId),
            rpcUrls: {
                default: { http: [rpcUrl || tldInfo.defaultRpc] },
                public: { http: [rpcUrl || tldInfo.defaultRpc] },
            },
            name: '',
            network: '',
            nativeCurrency: {
                decimals: 18,
                name: '',
                symbol: '',
            },
        },
        transport: http(),
    })

    return client
}

async function getTldMetadata(domain, tldInfo, rpcUrl) {
    const tokenId = hexToBigInt(keccak256(Buffer.from(domain.split('.')[0])));
    console.log("tokenId: ", tokenId);

    const client = createCustomClient(tldInfo, rpcUrl)
    const sannContract = getContract({
        address: tldInfo.sann,
        abi: SANNContractAbi,
        publicClient: client,
    })

    const tldBaseContractAddr = await sannContract.read.tldBase([BigInt(`${tldInfo.identifier}`)]);
    console.log("tldBaseContractAddr: ", tldBaseContractAddr);

    if (tldInfo.chainId === BigInt(mainnet.id)) {
        return `https://metadata.ens.domains/mainnet/${tldBaseContractAddr}/${tokenId}`
    }

    const tldBaseContract = getContract({ address: tldBaseContractAddr, abi: TldBaseContractAbi, publicClient: client })
    const metadata = await tldBaseContract.read.tokenURI([tokenId])
    return metadata
}

async function getMetadata({ name, rpcUrl }) {
    const tld = name.split('.').pop()?.toLowerCase()
    if (!tld) {
        return null
    }
    try {
        const tldInfo = await getTldInfo([tld])
        if (!tldInfo || !tldInfo.at(0)?.sann) {
            return null
        }
        console.log("tldInfo: ", tldInfo);


        const normalizedDomain = normalize(name)
        const namehash = tldNamehash(normalizedDomain, tldInfo[0].identifier);
        console.log("NAMEHASH: ", namehash);

        const metadata = await getTldMetadata(name, tldInfo[0], rpcUrl)
        console.log("metadata: ", metadata);
        // const res = await fetch(metadata).then((res) => res.json())
        // const res = await axios.get(metadata);
        // return res
    } catch (error) {
        console.error(`Error getting metadata for ${name}`, error)
    }
}

async function getContentHash(name) {
    // console.log("getTld: ", await getTldInfo(['manta']));
    console.log("getTld: ", await getMetadata({ name: "builtonoyster.manta" }));
    const web3name = createWeb3Name();
    // const data = await web3name.getAddress("vitalik.manta")
    // const data = await web3name.getDomainAvatar({ name: "builtonoyster.manta", rpcUrl })
    // const data = await web3name.getMetadata({ name: "builtonoyster.manta", rpcUrl })
    // console.log(data)
    const provider = new ethers.providers.JsonRpcProvider(rpcUrl)
    const registry = new ethers.Contract(registryAddress, SIDRegistryABI, provider);
    // const nodeId = SIDfunctions.namehash(name)
    // console.log(SIDfunctions.namehash("hostdomain.bnb"))
    // console.log(SIDfunctions.namehash("hostdomain.arb"))
    // console.log(SIDfunctions.namehash("builtonoyster.manta"))
    // console.log(SIDfunctions.namehash("hostdomain.manta"))
    // console.log("namehash: ", ethers.utils.namehash("builtonoyster.manta"), namehash("builtonoyster.manta"));
    // const tokenId = hexToBigInt(keccak256(Buffer.from("builtonoyster")))
    // console.log("tokenId: ", tokenId);
    const nodeId = "0xad999415e37494b1d5e5ed92c1e151b623debb574c45cc890cf6aabcce388dc0"
    // const nodeId = namehash("builtonoyster.manta");
    const resolverAddress = await registry.callStatic.resolver(nodeId);

    const resolver = new ethers.Contract(resolverAddress, PublicResolverABI, provider);
    const contenthash = await resolver.callStatic.contenthash(nodeId);
    console.log("CH: ", contenthash);
    const base16ContentHash = contenthash.replace(/^0xe301/, 'f')
    const contentHash = CID.parse(base16ContentHash, base16.decoder);
    console.log(contentHash.toString())
    const res = await axios.get(`https://gateway.ipfs.io/ipfs/${contentHash.toString()}`);
    console.log("res: ", res);
    return contentHash.toString();
}

import { ens_normalize } from '@adraffy/ens-normalize'
import { createPublicClient, getContract, hexToBigInt, http, keccak256, namehash, toHex } from 'viem'
import axios from 'axios';

const normalize = (name) => (name ? ens_normalize(name) : name)

// const ZERO_HASH = '0x0000000000000000000000000000000000000000000000000000000000000000'

function tldNamehash(inputName, identifier) {
    if (!identifier) return namehash(inputName)
    const fullNameNode = `${inputName}.[${toHex(identifier, { size: 32 }).slice(2)}]`
    return namehash(fullNameNode)
}

// console.log(tldNamehash("builtonoyster.manta"))


getContentHash("builtonoyster.manta")