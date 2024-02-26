import { createPublicClient, getContract, http, namehash, toHex } from "viem";
import { mainnet } from "viem/chains";
import { VerifiedTldHubAbi } from "./abi.js";
import { ens_normalize } from "@adraffy/ens-normalize";

export async function getNamehash({ name }) {
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
        return namehash;
    } catch (error) {
        console.error(`Error getting namehash for ${name}`, error)
    }
}

async function getTldInfo(tldList) {
    const hubContract = getVerifiedTldHubContract()
    const tldInfoList = await hubContract.read.getTldInfo([tldList])
    return tldInfoList.filter((e) => !!e.tld)
}


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

const normalize = (name) => (name ? ens_normalize(name) : name)

function tldNamehash(inputName, identifier) {
    if (!identifier) return namehash(inputName)
    const fullNameNode = `${inputName}.[${toHex(identifier, { size: 32 }).slice(2)}]`
    return namehash(fullNameNode)
}