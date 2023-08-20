import contractDetails from './ContractDetails.json'
import { ethers } from 'ethers';

const contractAddress = contractDetails['contract-address'];
const abi = contractDetails['abi'];

const contractInstance = (provider) => {
    return new ethers.Contract(
        contractAddress,
        abi,
      provider
    );
  };
  
  export default contractInstance;