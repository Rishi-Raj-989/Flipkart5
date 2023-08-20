import {React} from 'react'
import { useState, useEffect } from 'react';
import {useContractInteraction}  from './contract-instance'
import {getCurrentDateTime} from './date'

function Cart() {
    const { fcContract, provider,signer } = useContractInteraction();
    const { formattedDate, formattedTime } = getCurrentDateTime();
    console.log("inside the register",fcContract,"   ",signer);
    const [currAccount,setCurrAccount] = useState();
    const [spendAmount,setSpendAmount] = useState('');
    const [partnerAddress,setPartnerAddress] = useState('');
    const [redeemedToken,setRedeemedToken] = useState('');


    
    useEffect(() => {
        async function fetchAccountAddress() {
        try {
            if (provider) {
            const accounts = await provider.send("eth_requestAccounts", []);
            setCurrAccount(accounts[0]);
            }
        } catch (error) {
            console.error('Error fetching account address:', error);
        }
        }
        fetchAccountAddress();
    }, [fcContract,signer]);

    const handleSpendAmountChange = (e)=>{
        setSpendAmount(e.target.value);
    }

    const handlePartnerAddressChange = (e)=>{
        setPartnerAddress(e.target.value);
    }
    const handleSubmitOfEarnTOken = async (e)=>{
        e.preventDefault();
        if(spendAmount !== ''){
        const contract = fcContract.connect(signer);
        const memberInfo = await contract.members(currAccount);
            if(memberInfo.isRegistered){
                try {
                let token = 0;
                if(spendAmount <1000 ){
                    token = 1
                }else if(spendAmount >= 1000 && spendAmount < 2000){
                    token = 2
        
                }else if(spendAmount >= 2000 && spendAmount < 3000){
                    token = 3
                
                }else {
                    token = 4;
                }
                
                console.log("skdskjdskjdksjd",token);
                const tx = await contract.earnedTokenByMember(token ,partnerAddress,spendAmount,formattedDate,formattedTime);
                await tx.wait();
                console.log("Token Earned");
                } catch (error) {
                console.log(error);
                }
            }
            else{
                console.log("Please Registor as a Member");
        
            }
        }
    }
/////////////////////////////////////////Redeemed Token//////////////////////////////////////////////
    const handleRedeemedTokenChange = (e)=>{
        setRedeemedToken(e.target.value);
        }
    
        const handleSubmitOfRedeemedToken = async (e)=>{
        e.preventDefault(); 
        if(redeemedToken !== ''){
            const contract = fcContract.connect(signer);
            const memberInfo = await contract.members(currAccount);
            if(memberInfo.isRegistered && memberInfo.tokenCount < redeemedToken){
                console.log("You have not enough token");
            }
            else if(memberInfo.isRegistered){
                try {
                    const tx = await contract.redeemedTokenMember(redeemedToken,formattedDate,formattedTime);
                    await tx.wait();
                    console.log("Token Redeemed");
                } catch (error) {
                    console.log(error);
                }
            }
            else{
                console.log("Please Registor as a Member");
            }
        }
    }






    return (
        <div>
            <h1>Cart</h1>

            <div>
                <h2>
                Member Earns Token here 
                </h2>
                <form onSubmit = {handleSubmitOfEarnTOken}>
                <input type="text" value = {spendAmount} onChange = {handleSpendAmountChange} placeholder="Enter the amount Spend on the Product"  required></input>
                <input type="text" value = {partnerAddress} onChange = {handlePartnerAddressChange} placeholder="Enter the Partner-Address"  required></input>
        
                <button type = "submit">BUY</button>
                </form>
                <p>
                Token Earn Here
                </p>

            </div>

            <div>
                <h1>
                Redeemed Token
                </h1>
                <form onSubmit={handleSubmitOfRedeemedToken}>
                <input type="text" value = {redeemedToken} onChange = {handleRedeemedTokenChange} placeholder="Enter the amount of token"  required></input>
                <button type = "submit">Add</button>
                </form>
                <p>
                Redeemed Token Here
                </p>

            </div>
        </div>    
    )
}

export default Cart