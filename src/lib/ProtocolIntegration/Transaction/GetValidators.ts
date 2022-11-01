import {config} from "../../../settings";
import { ABIManager, use } from "@maticnetwork/maticjs";
import { Web3ClientPlugin } from "@maticnetwork/maticjs-ethers";
import { StakingClient} from "@maticnetwork/maticjs-staking";
import { providers,Wallet } from "ethers";
import { iFuncValidatorInfo } from "../Model/ValidatorResult";


use(Web3ClientPlugin);
const stakingClient= new StakingClient();

export const funcGetValidatorContractAddress = async (): Promise<Array<iFuncValidatorInfo>> => {

    try { 
        const provider = new providers.JsonRpcProvider(config.MumbaiTestnet.providerURL);

        await stakingClient.init({ 
            network: config.MumbaiTestnet.NETWORK, 
            version: config.MumbaiTestnet.VERSION,
            parent: { 
                
            provider: new Wallet(config.MumbaiTestnet.PrivateKey,provider),
            defaultConfig: {from:config.MumbaiTestnet.FROM}}, 
            child: {
                provider: new Wallet(config.MumbaiTestnet.PrivateKey,provider),
                defaultConfig: {from:config.MumbaiTestnet.FROM}
                    }
            });
                    
        const abiManager = new ABIManager(config.MumbaiTestnet.NETWORK,config.MumbaiTestnet.VERSION);
        await abiManager.init();
        let validatorsInfo:iFuncValidatorInfo[] = [
            {
            validatorId:1, validatorName:"Matic Foundation Node 1", 
            contractAddress:undefined
            },
            {
                validatorId:3, validatorName:"Matic Foundation Node 3", 
                contractAddress:undefined
            },
            {
                validatorId:4, validatorName:"Matic Foundation Node 4", 
                contractAddress:undefined
            },
            {
                validatorId:9, validatorName:"Infosys Validator", 
                contractAddress:undefined
            },
            {
                validatorId:19, validatorName:"Anonymous 19", 
                contractAddress:undefined
            },
            {
                validatorId:31, 
                validatorName:"AnkrValidator", 
                contractAddress:undefined
            },
            {
                validatorId:88, 
                validatorName:"Staked", 
                contractAddress:undefined
            },
            {
                validatorId:101, 
                validatorName:"MyCointainer", 
                contractAddress:undefined
            },
            {
                validatorId:106, 
                validatorName:"Marlin", 
                contractAddress:undefined
            },
            {
                validatorId:110,
                validatorName:"Allnodes",
                contractAddress:undefined
            }
        ]
for (const obj of validatorsInfo) { //@ts-ignore obj.contractAddress= (await stakingClient.stakeManager.getValidatorDetails(obj.validatorId)).contractAddress;
}
return validatorsInfo;
} catch (error) 

{ 
    throw(error)
}
};

funcGetValidatorContractAddress()
.then((result)=>(console.log("Validator Contract Address:", result)));




 