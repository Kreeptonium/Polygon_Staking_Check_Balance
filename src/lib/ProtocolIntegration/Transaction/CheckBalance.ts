import Web3 from 'web3';import dotenv from 'dotenv';
import {config} from "../../../settings";
import { funcGetValidatorContractAddress } from './GetValidators';
import { use } from "@maticnetwork/maticjs";
import { providers, Wallet } from "ethers";
import BN from 'bignumber.js';
import { Web3ClientPlugin } from "@maticnetwork/maticjs-ethers";
import { StakingClient} from "@maticnetwork/maticjs-staking";
import { ICheckBalanceOptions, ICheckBalanceRetValues } from '../Model/CheckBalanceResult';

dotenv.config();

    
export const checkBalance = async (params:ICheckBalanceOptions): Promise<Array<ICheckBalanceRetValues>> => { 
    const web3 = new Web3(new Web3.providers.HttpProvider(config.MumbaiTestnet.providerURL)); 
    const buyDelegateABI = require('../abi/validatorShareContract.json'); 
    use(Web3ClientPlugin); 
    const stakingClient= new StakingClient(); 
    const provider = new providers.JsonRpcProvider(config.MumbaiTestnet.providerURL); 
    
    try {
 
        await stakingClient.init({ 
            network: config.MumbaiTestnet.NETWORK, 
            version: config.MumbaiTestnet.VERSION, 
            parent: { 
            provider: new Wallet(config.MumbaiTestnet.PrivateKey,provider), 
            defaultConfig: { from:config.MumbaiTestnet.FROM } 
                    }, 
            child: { 
            provider: new Wallet(config.MumbaiTestnet.PrivateKey,provider), 
            defaultConfig: { from:config.MumbaiTestnet.FROM } 
                    } 
            }); 
            //Call Validators Array 
            const validatorArrayObj = await funcGetValidatorContractAddress(); 
            let balanceInfo:Array<ICheckBalanceRetValues>=new Array<ICheckBalanceRetValues>(); 
            for (const valObj of validatorArrayObj) { 
                // Get contract instance 
            const validatorShareContract = new web3.eth.Contract(buyDelegateABI, valObj.contractAddress); 
            //Capturing the receipt for "Encoded ABI" 
            try { 
                
                let validatorShare = await stakingClient.validatorShare(valObj.contractAddress!); 
                let nonce :number= await validatorShareContract.methods.unbondNonces(params.stakedAddress).call(); 
                let balance :number[]= await validatorShareContract.methods.getTotalStake(params.stakedAddress).call(); 
                let balanceOf :number= await validatorShareContract.methods.balanceOf(params.stakedAddress).call(); 
                let newUnbonds:any= await validatorShare.getNewUnbonds(params.stakedAddress,nonce); 
                let oldUnbonds:any= await validatorShare.getOldUnbonds(params.stakedAddress); 
                let unbondValue :Array<number>=new Array<number>(); 
                //let newbondValue :Array<number>=new Array<number>(); 
                //let oldUnbondValue:Array<number>=new Array<number>(); 
                //let amountStakedValue :Array<number>=new Array<number>(); 
                for (let i = 0; i < nonce; i++) {
                     let unbondVal= await validatorShareContract.methods.unbonds_new(params.stakedAddress,i+1).call(); 
                     unbondValue.push(unbondVal[0]); 
                     //newbondValue.push(newUnbonds[0]); 
                     //oldUnbondValue.push(oldUnbonds[0]); 
                     //amountStakedValue.push(amountStaked[0]); 
                     //let unbonds= await validatorShareContract.methods.unbonds(params.stakedAddress).call(); 
                     //unbondsAmount.push(unbonds[0]); 
                    } 
                    balanceInfo.push({ 
                        myBalance:new BN(balance[0]).toFixed(), 
                        validatorContract:valObj.contractAddress, 
                        validatorName:valObj.validatorName, 
                        unbondBalance:unbondValue, 
                        newUnbonds:newUnbonds, 
                        oldUnbonds:oldUnbonds, 
                        amountbalanceOf:balanceOf 
                    }) 
                } 
                catch (error) { 


                } 
            }
 return balanceInfo; 
} 
catch (error) { 
    throw (error); 
}};

checkBalance({
    stakedAddress:'0xA70db639f26d907B7744e72c44e9f0562f6fb6Ce'})
    .then((result)=>(
        console.log("Result: ",JSON.stringify(result))
        )
        )