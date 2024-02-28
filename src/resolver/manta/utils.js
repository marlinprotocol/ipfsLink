import { ens_normalize } from "@adraffy/ens-normalize";
import { createPublicClient, getContract, http, namehash, toHex } from "viem";
import { mainnet } from "viem/chains";
import { VerifiedTldHubAbi } from "./abi.js";

export async function getNamehash({ name, config }) {
    const tld = name.split('.').pop()?.toLowerCase()
    if (!tld) {
        return null
    }
    try {
        const tldInfo = await getTldInfo([tld], config)
        if (!tldInfo || !tldInfo.at(0)?.sann) {
            return null
        }

        const normalizedDomain = normalize(name)
        const namehash = tldNamehash(normalizedDomain, tldInfo[0].identifier);
        return namehash;
    } catch (error) {
        console.error(`Error getting namehash for ${name}: `, error);
    }
}

async function getTldInfo(tldList, config) {
    const hubContract = getVerifiedTldHubContract(config)
    const tldInfoList = await hubContract.read.getTldInfo([tldList])
    return tldInfoList.filter((e) => !!e.tld)
}


function getVerifiedTldHubContract(config) {
    const ethClient = createPublicClient({
        chain: mainnet,
        transport: http('https://rpc.ankr.com/eth'),
    })

    const hubContract = getContract({
        address: config.contracts.hub,
        abi: VerifiedTldHubAbi,
        publicClient: ethClient,
    })

    return hubContract
}

const normalize = (name) => (name ? ens_normalize(name) : name)

function tldNamehash(inputName, identifier) {
    if (!identifier) return namehash(inputName)
    const fullNameNode = `${inputName}.[${toHex(identifier, { size: 32 }).slice(2)}]`
    return namehash(fullNameNode)
}