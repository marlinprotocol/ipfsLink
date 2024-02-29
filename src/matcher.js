let suffixRegex;

const init = (config) => {
    let baseDomainRegex = '';
    let TLDRegex = '';
    for(let baseDomain in config) {
        // TODO: deduplicate
        baseDomainRegex += baseDomain+'|';
        // TODO: deduplicate
        TLDRegex += config[baseDomain].TLD+'|';
    }
    baseDomainRegex = baseDomainRegex.slice(0, -1);
    TLDRegex = TLDRegex.slice(0, -1);
    // TODO: improve matching when TLDs or baseDomains are substring of each other
    suffixRegex = new RegExp(`^([a-zA-Z0-9_-]*).(${baseDomainRegex}).(${TLDRegex})$`);
}

const matchResolver = (hostname) => {
    let matches = hostname.match(suffixRegex);
    return {
        domain: matches[1],
        baseDomain: matches[2]
    };
}

module.exports = {
    init,
    matchResolver
}