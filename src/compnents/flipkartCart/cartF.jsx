
import { Box, Typography, Button, Grid, styled } from '@mui/material';
import {useContractInteraction}  from '../contract-instance'
import {getCurrentDateTime} from '../date'
import { useState, useEffect } from 'react';


import TotalView from './totalView';
import CartItem from './cardItem';

const cartItems = [
    {
        id: 1,
        url: 'https://rukminim2.flixcart.com/image/832/832/xif0q/shoe/q/j/r/7-hp7554-7-adidas-cblack-blblme-carbon-original-imagr6s3nhtq9z9f.jpeg?q=70',
        title: 'ADIDAS RUNFALCON 3.0 Running Shoes For Men' ,
        size: '8, Black',
        seller: 'Seller: HSAtlastradeFashion',
        price: { cost: 3114.3, mrp: 4449, discount: 30 },
        offer: ' 4 offers applied'
    },
    {
        id: 2,
        url: 'https://drop.ndtv.com/TECH/product_database/images/2152017124957PM_635_nokia_3310.jpeg',
        title: 'Nokia 3310 Vintage',
        size: 'Warm Red',
        seller: 'Seller: Nokia Online Store',
        price: { cost: 3449.25, mrp: 4599, discount: 25 },
        offer: ' 6 offers applied'
    },
    {
        id: 3,
        url: 'https://rukminim2.flixcart.com/image/416/416/xif0q/television/m/n/p/-original-imagkzctc2gkvfgf.jpeg?q=70',
        title: 'SAMSUNG 80 cm (32 Inch) HD Ready LED Smart Tizen TV with Bezel-free Design',
        size: 'UA32T4380AKXXL',
        seller: 'Seller: Retail.net',
        price: { cost: 11495, mrp: 22990, discount: 50 },
        offer: '  8+ offers applied'
    }
];
const Component = styled(Grid)(({ theme }) => ({
    padding: '30px 135px',
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
        padding: '15px 0'
    }
}));

const LeftComponent = styled(Grid)(({ theme }) => ({
    paddingRight: 15,
    [theme.breakpoints.down('sm')]: {
        marginBottom: 15
    }
}));

const Header = styled(Box)`
    padding: 15px 24px;
    background: #fff;
`;

const BottomWrapper = styled(Box)`
    padding: 16px 22px;
    background: #fff;
    box-shadow: 0 -2px 10px 0 rgb(0 0 0 / 10%);
    border-top: 1px solid #f0f0f0;
`;

const StyledButton = styled(Button)`
    display: flex;
    margin-left: auto;
    background: #fb641b;
    color: #fff;
    border-radius: 2px;
    width: 250px;
    height: 51px;
`;

function allocateTokens(trustScore) {
    if (trustScore >= 0.0 && trustScore <= 0.2) {
      return 0;
    } else if (trustScore <= 0.4) {
      return 5;
    } else if (trustScore <= 0.6) {
      return 10;
    } else if (trustScore <= 0.8) {
      return 20;
    } else {
      return 30;
    }
}

const Cart = () => {
    const { fcContract, provider,signer } = useContractInteraction();
    const { formattedDate, formattedTime } = getCurrentDateTime();
    const [currAccount,setCurrAccount] = useState();


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

    
    const handleSubmitOfEarnTOken = async ()=>{
       
        const contract = fcContract.connect(signer);
        const memberInfo = await contract.members(currAccount);
            if(memberInfo.isRegistered){
                try {
                    const userTrustScore = 0.24; // Example trust score
                    const token = allocateTokens(userTrustScore);
                    
                
                console.log("skdskjdskjdksjd",4);
                const tx = await contract.earnedTokenByMember(4,formattedDate,formattedTime);
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
    // }

   


return (
        <>
        
            <Component container style={{border: 20}}>
                <LeftComponent item lg={9} md={9} sm={12} xs={12}>
                    <Header>
                        <Typography style={{fontWeight: 600, fontSize: 18}}>My Cart ({cartItems?.length})</Typography>
                    </Header>
                        {   cartItems.map(item => (
                                <CartItem item={item} />
                            ))
                        }
                    <BottomWrapper>
                        <StyledButton onClick={() => handleSubmitOfEarnTOken()} variant="contained">Place Order</StyledButton>
                    </BottomWrapper>
                </LeftComponent>
                <Grid item lg={3} md={3} sm={12} xs={12}>
                    <TotalView cartItems={cartItems} />
                </Grid>
            </Component> 
        </>

    )
}

export default Cart;
