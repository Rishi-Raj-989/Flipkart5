import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import contractDetails from '../ContractDetails.json'

const CONTRACT_ADDRESS = contractDetails['contract-address'];
const CONTRACT_ABI = contractDetails['abi']; // Your contract ABI

export function useContractInteraction() {
  const [fcContract, setFcContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);

  useEffect(() => {
    async function connectAndCreateContract() {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer =await provider.getSigner();
        setSigner(signer);
        const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

        setFcContract(contract);
        setProvider(provider);
      } catch (error) {
        console.error('Error connecting to MetaMask:', error);
      }
    }

    connectAndCreateContract();
  }, []);

  return { fcContract, provider, signer };
}
