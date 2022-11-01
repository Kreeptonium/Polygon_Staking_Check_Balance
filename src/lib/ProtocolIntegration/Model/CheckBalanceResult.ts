export interface ICheckBalanceOptions{ 
    stakedAddress:string; 
    //They can send validator Id rather than address
}
export interface ICheckBalanceRetValues{
     myBalance:string; 
     //myBalance2:string; 
     validatorContract?:string; 
     validatorName:string; unbondBalance:number[];
      newUnbonds:any; oldUnbonds:any; 
      amountbalanceOf:number;
    }