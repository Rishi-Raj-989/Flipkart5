import {React} from 'react'
import flipkartLogin  from  '../../images/flipkart-login.png'
import './register.css'
import { useContractInteraction } from '../contract-instance'; // Adjust the path
import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

function Register() {
    const { fcContract, provider,signer } = useContractInteraction();
    // const navigate = useNavigate();

  console.log("inside the register",fcContract,"   ",signer);
  const [currAccount,setCurrAccount] = useState();
  
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [typeOfUser,setTypeOfUser] = useState();
  const [alreadyRegistered,setAlreadyRegistered] = useState("");
  const [tokenCount , setTokenCount] = useState(0);
  
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
  }, [signer]);


  const handleNameChange = (e)=>{
    setName(e.target.value);
  }
  const handleEmailChange = (e)=>{
    setEmail(e.target.value);
  }
  const handleTypeOfUserChange = (e)=>{
    setTypeOfUser(e.target.value);
  }

  const registorationOfUser = async (e)=>{
    e.preventDefault();

    if(name !== '' && email !== '', typeOfUser !== ''){
      const contract = fcContract.connect(signer);  
      if(typeOfUser === 'Partner'){
        const partnerInfo = await contract.partners(currAccount);
        const memberInfo = await contract.members(currAccount);
        if(memberInfo.isRegistered){
          setAlreadyRegistered("You are already registered as a Member");
          setTokenCount(memberInfo.tokenCount);
          setTypeOfUser("Member");
        }
        else if(partnerInfo.isRegistered){
          setAlreadyRegistered("You are already registered as a Partner");
          setTokenCount(partnerInfo.tokenCount);
          setTypeOfUser("Partner");
          // console.log("partner-info  ",partnerInfo.name,partnerInfo.isRegistered,partnerInfo.tokenCount);
        }
        else{
          try {
            const tx = await contract.registerPartner(name);
            await tx.wait();
            navigate('/partner-dashboard');
            console.log("Partner Registoration Done");
          } catch (error) {
            console.log(error);
          }
        }
      }
      else{
        const partnerInfo = await contract.partners(currAccount);
        const memberInfo = await contract.members(currAccount);
        if(partnerInfo.isRegistered){
          setAlreadyRegistered("You are already registered as a Partner");
          setTokenCount(partnerInfo.tokenCount);
          setTypeOfUser("Partner");
          navigate('/partner-dashboard');
        }
        else if(memberInfo.isRegistered){
          setAlreadyRegistered("You are already registered as a Member");
          setTokenCount(memberInfo.tokenCount);
          setTypeOfUser("Member");
            navigate('/member-dashboard');
          // console.log("members info",memberInfo.name,memberInfo.email,memberInfo.isRegistered,memberInfo.tokenCount);
        }
        else{
          try {
            const tx = await contract.registerMember(name,email);
            await tx.wait();
            navigate('/member-dashboard');
            console.log("Member Registoration Done");
          } catch (error) {
            console.log(error);
          }
        }
      }
    }
  }






    return (
        <div className='register-body'>
            <div className='register-container'>
                <div className='login-left'>
                    <img src={flipkartLogin} alt=""  />
                </div>
                <div className='register-form'>
                    
                    <div className='register-form-body'>
                        <form onSubmit = {registorationOfUser}>
                            <div className='register-form-body-input'>
                                <label>
                                    <p>Enter Name</p>
                                <input type="text" value = {name} onChange = {handleNameChange} required/>
                                </label>
                                <label>
                                    <p>Enter Email</p>
                                <input type="text" value = {email} onChange = {handleEmailChange} required/>
                                </label>
                                <div className = "radio">
                                <label>
                                    <input type="radio" name="typeOfUser" value="Partner" checked={typeOfUser === 'Partner'} onChange={handleTypeOfUserChange} />
                                    <p>Register as Seller</p>
                                    </label>
                                    <label>
                                    <input type="radio" name="typeOfUser" value="Member" checked={typeOfUser === 'Member'} onChange={handleTypeOfUserChange} />
                                    <p>Register as a User</p>
                                    </label>
                                </div>

                                <p>
                                    By continuing, you agree to Flipkart's<span>Terms of Use</span> and <span>Privacy Policy.</span> 
                                </p>
                                <button type='submit'>Register</button>

                            </div>
                        </form>
                    </div>
                </div>
            </div>
                            

                                
            
        </div>
    )
}

export default Register