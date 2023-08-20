// useRegistrationStatus.js
import { useEffect, useState } from 'react';

import { useContractInteraction } from './contract-instance'; // Adjust the path

export function useRegistrationStatus() {
  const { fcContract,provider , signer } = useContractInteraction();
  console.log("inside the registerationStatus",fcContract,"  ",signer);
  const [isRegistered, setIsRegistered] = useState("Not");

  useEffect(() => {
    async function checkRegistration() {
      try {
        if (fcContract && signer) {
          const userAddress = await provider.send("eth_requestAccounts", []);
          const currAccount = userAddress[0];
          const contract = fcContract.connect(signer);
          const partnerInfo = await contract.partners(currAccount);
          const memberInfo = await contract.members(currAccount)
          if(memberInfo.isRegistered){
            setIsRegistered("Member");
          }
          else if(partnerInfo.isRegistered){
            setIsRegistered("Partner");
          }
        }
      } catch (error) {
        console.error('Error checking registration:', error);
      }
    }

    checkRegistration();
  }, [fcContract, signer]);
  console.log("isRegistered in userregistration",isRegistered);
  return isRegistered;
}
