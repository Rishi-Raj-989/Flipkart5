import {React } from 'react'
import { useState, useEffect } from 'react';
import {useContractInteraction}  from './contract-instance'



function MemberDashBoard() {


    const { fcContract, provider,signer } = useContractInteraction();
    console.log("inside the register",fcContract,"   ",signer);
    const [currAccount,setCurrAccount] = useState();
    const [earnedTransactions, setEarnedTransactions] = useState([]);
    const [totalBalance, setTotalBalance] = useState(0);

    useEffect(() => {
        async function fetchAccountBalance() {
        try {
            if (signer) {
                const contract = fcContract.connect(signer);
                const balance = await contract.balanceOf(currAccount);
                setTotalBalance(balance);
            }
        } catch (error) {
            console.error('Error fetching account address:', error);
        }
    }
    fetchAccountBalance();
    }, [fcContract,signer,currAccount]);
        



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


    const handleEarnedTransaction = async ()=>{
        const contract = fcContract.connect(signer);
        const memberInfo = await contract.members(currAccount);
        if(memberInfo.isRegistered){
            try {
                console.log("rrrrrrrrrrrrrrrrrrrrr",memberInfo);
                const tx = await contract.getMemberTransactionsEarned(currAccount);
                setEarnedTransactions(tx);

            } catch (error) {
                console.log("error in transaction",error);
            }
        }else{
            alert("Please register first");
        }
    }

    

    return (
        <div>
        <h1>
            Member Token {totalBalance.toString().substring(0,2)}
        </h1>


        <button onClick={handleEarnedTransaction}>
            Transaction of Earned Token
        </button>

        <br />
        <table>
            <thead>
                <tr>
                <th>SNo.</th>
                <th>From Name</th>
                <th>To Name</th>
                <th>Date</th>
                <th>Time</th>
                </tr>
            </thead>
            <tbody>
                {earnedTransactions.map((transaction, index) => (
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

        <br />


        </div>
    )
}

export default MemberDashBoard