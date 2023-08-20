import React from 'react'
import {ethers} from 'ethers'
import { useState } from 'react'
import contractInst from './ContractInstacne'

// Now you can use contractDetails directly

// import { Web3 } from 'web3'


const Practice = () => {

  const [isConnected,setIsConnected] = useState(false);
  const [provider , setProvider] = useState();
  const [signer , setSigner] = useState();
  let [fcContract , setFcContract] = useState();
  const [currAccount , setCurrAccount] = useState();
  const [balanceOfSigner , setBalanceOfSigner] = useState();
  const [memberName , setMemberName] = useState();
  const [memberEmail , setMemberEmail] = useState();
  const [partnerName , setPartnerName] = useState();
  const [issueTokenCount , setIssueTokenCount] = useState();
  const [spendAmount , setSpendAmount] = useState();
  const [redeemedToken , setRedeemedToken] = useState();

  const connectWallet = async ()=>{
    if(typeof window!= undefined && typeof window.ethereum != undefined ){
      
        try {
          const acc = await window.ethereum.request({method: "eth_requestAccounts",})
          setIsConnected(true);
          const provider = new ethers.BrowserProvider(window.ethereum);
          setProvider(provider);
          const accounts = await provider.send("eth_requestAccounts", []);
          setCurrAccount(accounts[0]);
          const signer = await provider.getSigner();
          setSigner(signer);
          // return accounts;
        } catch (error) {
          console.log(error)
        }
    }
    else{
      isConnected(false);
      console.log("Please Install the metamask");
    }
  }

  const contractInstance = async ()=>{
    if(typeof window.ethereum !== "undefined"){
      const fcContract = await contractInst(provider); 
      setFcContract(fcContract);
      // return contract;
    }
    else{
      console.log("Please Install the metamask");
    }
  }

  const getbalanceOfOwner = async ()=>{
    const contract = fcContract.connect(signer);
    const balance = await contract.getBalanceofAccount(currAccount);
    setBalanceOfSigner(balance.toString());
  }

  // Registoration of The Member /////////////////////////////////////////////////

  const handleMemberNameChange = (e)=>{
    setMemberName(e.target.value);
    console.log(memberName)
  }
  const handleMemberEmailChange = (e)=>{
    setMemberEmail(e.target.value);
  }
  const registorationOfMember = async (e)=>{
    e.preventDefault();
    if(memberEmail !== '' && memberEmail !== ''){
      const contract = fcContract.connect(signer);  
      const memberInfo = await contract.members(currAccount);
      if(memberInfo.isRegistered){
        console.log("members info",memberInfo.name,memberInfo.email,memberInfo.isRegistered,memberInfo.tokenCount);
      }
      else{
        try {
          const tx = await contract.registerMember(memberName,memberEmail);
          await tx.wait();
          console.log("Member Registoration Done");
        } catch (error) {
          console.log(error);
        }
      }
    }
  }
  /////////Partner Registoration /////////////////////////////////////////////////

  const handlePartnerNameChange = (e)=>{
    setPartnerName(e.target.value);
  }
  const registorationOfPartner = async (e)=>{
    e.preventDefault();
    if(partnerName !== ''){
      const contract = fcContract.connect(signer);
      const partnerInfo = await contract.partners(currAccount);
      if(partnerInfo.isRegistered){
        console.log("partners info",partnerInfo.name,partnerInfo.isRegistered,partnerInfo.tokenCount);
      }
      else{
        try {
          const tx = await contract.registerPartner(partnerName);
          await tx.wait();
          console.log("Partner Registoration Done");
        } catch (error) {
          console.log(error);
        }
      }
    }
  }
  ////////////////////////Issue Token ////////////////////////////////////////////
  const handleIssueTokenChange = (e)=>{
    setIssueTokenCount(e.target.value);
  }
  const handleSubmitOfIssueToken = async (e)=>{
    e.preventDefault();
    if(issueTokenCount !== ''){
      const contract = fcContract.connect(signer);
      const partnerInfo = await contract.partners(currAccount);
      if(partnerInfo.isRegistered){
        try {
          const tx = await contract.issueTokenToPartner(issueTokenCount);
          await tx.wait();
          console.log("Token Issued");
        } catch (error) {
          console.log(error);
        }
      }
      else{
        console.log("Please Registor as a Partner");
      }
    }
  }

  ////////////////////////Earn Token ////////////////////////////////////////////
  const handleSpendAmountChange = (e)=>{
    setSpendAmount(e.target.value);
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
          const tx = await contract.earnedTokenByMember(token ,"0x844eF575686eAc3bcA53b51090Af8B7b9C029041",spendAmount);
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

  ////////////////////////Redeemed Token ////////////////////////////////////////////
  const handleRedeemedTokenChange = (e)=>{
    setRedeemedToken(e.target.value);
  }

  const handleSubmitOfRedeemedToken = async (e)=>{
    e.preventDefault(); 
    if(redeemedToken !== ''){
      const contract = fcContract.connect(signer);
      const memberInfo = await contract.members(currAccount);
      if(memberInfo.isRegistered){
        try {
          const tx = await contract.redeemedTokenMember(redeemedToken);
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
/////////////////////////Redeemed Token ////////////////////////////////////////////
 
  const transactionOfMember = async ()=>{
      const contract = fcContract.connect(signer);
      console.log("1");
      const memberInfo = await contract.members(currAccount);
      console.log("2");
      if(memberInfo.isRegistered){
        console.log("please wait");
        try {
          const tx = await contract.memberTransaction(currAccount);
          await tx.wait();
          console.log("length of the member's transaction",typeof tx);
        } catch (error) {
          console.log(error);
        }
      }
      else{
        console.log("Please Registor as a Member");
        
      }
    
  }






  return (
    <div>
      <div>
        <button onClick = {()=> connectWallet( )}>
          Connect Wallet
        </button><span>
          {currAccount}
        </span>
        <br/>
        <button onClick = {()=> contractInstance( )}>
          Contract Instance
        </button>
      
      </div>

      <div>
        <h2>Interaction with the Contract Start Here</h2>
        <button onClick = {()=> getbalanceOfOwner( )}>
          Balance of Owner
        </button>
        <span>{balanceOfSigner}</span>
      </div>

      <div>
        <h2>
          Registoration of the Member
        </h2>
        <form onSubmit = {registorationOfMember}>
          <input type="text" value = {memberName} onChange = {handleMemberNameChange} placeholder="Enter the Name"  required></input>
          <input type="text" value = {memberEmail} onChange = {handleMemberEmailChange} placeholder="Enter the Email"  required></input>
          <button type = "submit">Add</button>
        </form>
        <p>
          Members info comes here
        </p>

      </div>

      <div>
        <h2>
          Registoration of the Partner
        </h2>
        <form onSubmit = {registorationOfPartner}>
          <input type="text" value = {memberName} onChange = {handlePartnerNameChange} placeholder="Enter the Name"  required></input>
          <button type = "submit">Add</button>
        </form>
        <p>
          Partner info comes here
        </p>

      </div>


      <div>
        <h2>
          Partner's can Issue Token here
        </h2>
        <form onSubmit = {handleSubmitOfIssueToken}>
          <input type="text" value = {issueTokenCount} onChange = {handleIssueTokenChange} placeholder="Enter the amount of token"  required></input>
          <button type = "submit">Add</button>
        </form>
        <p>
          Token Issue Here
        </p>

      </div>
      <div>
        <h2>
          Member Earns Token here 
        </h2>
        <form onSubmit = {handleSubmitOfEarnTOken}>
          <input type="text" value = {spendAmount} onChange = {handleSpendAmountChange} placeholder="Enter the amount Spend on the Product"  required></input>
          <button type = "submit">Add</button>
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

      <div>
        <h1>
          "Token are Redeemed here"
        </h1>
        <button onClick={transactionOfMember}>
          Redeemed Token
        </button>

      </div>




    </div>

  )
}

export default Practice