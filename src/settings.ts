//export const providerURL ='https://goerli.infura.io/v3/8ff9246da3ee488487ee9bdf43e22d64'
//export const privateKey = '0x508516767f6707b32f43439a1e5401145a15851574c565df7d28fa0cf9fee1c3'
//export const from = '0xa70db639f26d907b7744e72c44e9f0562f6fb6ce'



export const config = {
    "MumbaiTestnet": {
        "providerURL" : 'https://goerli.infura.io/v3/8ff9246da3ee488487ee9bdf43e22d64',
        "PrivateKey" : '0x508516767f6707b32f43439a1e5401145a15851574c565df7d28fa0cf9fee1c3',
        "NETWORK" :'testnet',
        "VERSION" : 'mumbai',
        "FROM"  : "0xa70db639f26d907b7744e72c44e9f0562f6fb6ce", 
        "MaticTokenAddress" : '0x499d11E0b6eAC7c0593d8Fb292DCBbF815Fb29Ae',
        "SpenderAddress" : '0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45',
        "ValidatorShareProxyContractAddress" : '0x29f5406e20219f7e46806837e820cf7c2fa6d3ee', //Matic Foundation Node 4
        "ValidatorShareProxyContractAddress2" : '0xF5e574045298eE3A9870Ff712df9F9d325BcBB7A', // Matic Foundation Node 3
        "ValidatorShareProxyContractAddress3":'0x1a9155ead92cd339e3ae789fd3a5dc60ae268634', //Matic Foundation Node 1
        "ValidatorShareProxyContractAddress4":'0x15ed57ca28cbebb58d9c6c62f570046bc089bc66', //Infosys
        "ValidatorShareProxyContractAddress5":'0x144070a59fe5e7ebe963ca59b500e60485c235b9' //Anonymous 19
    },
    "Mainnet": {

        "providerURL" : 'https://mainnet.infura.io/v3/8ff9246da3ee488487ee9bdf43e22d64',
        "NETWORK" :'mainnet',
        "VERSION" : 'v1',
        "FROM"  : "0xa70db639f26d907b7744e72c44e9f0562f6fb6ce",
        "PrivateKey" : '0x508516767f6707b32f43439a1e5401145a15851574c565df7d28fa0cf9fee1c3',
    }
}