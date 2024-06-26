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

export const SIDRegistryABI = [
    "function resolver(bytes32 node) view returns(address resolver)"
];

export const PublicResolverABI = [
    "function contenthash(bytes32 node) view returns(bytes contenthash)"
];