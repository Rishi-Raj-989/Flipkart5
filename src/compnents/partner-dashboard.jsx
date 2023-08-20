import {React } from 'react'
import { useState, useEffect } from 'react';
import {useContractInteraction}  from './contract-instance'
import {getCurrentDateTime} from './date'




function PartnerDashBoard() {
    const { fcContract, provider,signer } = useContractInteraction();
    const { formattedDate, formattedTime } = getCurrentDateTime();

    const [issueToken,setIssueToken] = useState('');
    const [currAccount,setCurrAccount] = useState();
    const [loyalMember,setLoyalMember] = useState([]);
    const [partnerTransaction,setPartnerTransaction] = useState([]);

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

    const handleIssueTokenChange = (e)=>{
        setIssueToken(e.target.value);
    }

    const handleIssueTransaction = async (e)=>{
        e.preventDefault();
        if(issueToken !== ''){
            const contract = fcContract.connect(signer);
            const partnerinfo = await contract.partners(currAccount);

            if(partnerinfo.isRegistered){
                try {
                const tx = await contract.issueTokenToPartner(issueToken,formattedDate,formattedTime);
                await tx.wait();
                } catch (error) {
                    console.log("error in transaction",error);
                }
            }else{
                alert("Please register first");
            }

        }else{
            alert("Please enter the amount");
        }

    }

        

        const handleLoyalCustomer = async ()=>{
            
            const contract = fcContract.connect(signer);
            const partnerinfo = await contract.partners(currAccount);

            if(partnerinfo.isRegistered){
                try {
                const tx = await contract.getPartnerLoyalMembers(currAccount);
                console.log("tx",tx);
                setLoyalMember(tx);
                } catch (error) {
                    console.log("error in transaction",error);
                }
            }else{
                alert("Please register first");
            }
    
            

        }

        const partnerTransactionHandler = async ()=>{
            const contract = fcContract.connect(signer);
            const partnerinfo = await contract.partners(currAccount);
            console.log("partnerinfo",partnerinfo);
            if(partnerinfo.isRegistered){
                try {
                const tx = await contract.getPartnerTransactions("0x8810260fbf5c7085668649cce888f2b0bd29fc38");
                console.log("tx",tx);
                
                setPartnerTransaction(tx);
                } catch (error) {
                    console.log("error in transaction",error);
                }
            }else{
                alert("Please register first");
            }

        }
        

    
    return (
        <div>
            <h1>Partner Dashboard</h1>

            <div>
                <h2>
                Partner Earns Token here
                </h2>
                <form onSubmit={handleIssueTransaction}>
                <input type="text" placeholder="Enter the amount Token need to issue" value = {issueToken} onChange={handleIssueTokenChange} required></input>
                <button type = "submit">Issue Token</button>
                </form>

            </div>


            <br />
            <br />

            <button onClick={handleLoyalCustomer}>
            Loyal Customer
            </button>

            <br />
            <table>
                <thead>
                    <tr>
                    <th>S.No</th>
                    <th>Member-Adress</th>
                    <th>Spend-Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {loyalMember.map((transaction, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{transaction.memberAddress}</td>
                        <td>{transaction.memberName}</td>
                        <td>{transaction.totalAmountSpend}</td>
                    </tr>
                    ))}
                </tbody>
            </table>

            <br />


        <button onClick={partnerTransactionHandler}>
            Transaction of Partner
        </button>
        <br />
        <table>
            <thead>
                <tr>
                <th>S.No</th>
                <th>From</th>
                <th>To</th>
                <th>Date</th>
                <th>Time</th>
                </tr>
            </thead>
            <tbody>
                {partnerTransaction.map((transaction, index) => (
                <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{transaction.fromName}</td>
                    <td>{transaction.toName}</td>
                    <td>{transaction.date}</td>
                    <td>{transaction.time}</td>
                </tr>
                ))}
            </tbody>
            </table>
        </div> 
           
    )
}

export default PartnerDashBoard