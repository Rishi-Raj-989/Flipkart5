import { useState, useEffect } from 'react';
import {useContractInteraction}  from '../contract-instance'
import {getCurrentDateTime} from '../date'

import { Box, Button, Typography, colors, styled } from '@mui/material';

const Header = styled(Box)`
    padding: 15px 24px;
    background: #fff;
    borderBottom: 1px solid #f0f0f0;
`;

const Heading = styled(Typography)`
    color: #878787;
`;

const Container = styled(Box)`
    padding: 15px 24px;
    background: #fff;
    & > p {
        margin-bottom: 20px;
        font-size: 14px;
    }
`;

const Price = styled(Typography)`
    float: right;
`;

const TotalAmount = styled(Typography)`
    font-size: 18px;
    font-weight: 600;
    border-top: 1px dashed #e0e0e0;
    padding: 20px 0;
    border-bottom: 1px dashed #e0e0e0;
`;

const Discount = styled(Typography)`
    font-size: 16px; 
    color: green;
`

// component: {
//     // width: '30%'
// },

const PDF_FILE = "http://localhost:3000/mainFile.pdf" ;

const downloadFileAtURL = (url)=> {
    const fileName = url.split("/").pop() ;
    const aTag = document.createElement("a") ;
    aTag.href = url;
    aTag.setAttribute("download", fileName) ;
    document.body.appendChild(aTag) ;
    aTag.click() ;
    aTag.remove() ;
}



const TotalView = ({ cartItems }) => {
    const { fcContract, provider,signer } = useContractInteraction();
    const { formattedDate, formattedTime } = getCurrentDateTime();
    const [currAccount,setCurrAccount] = useState();

    const [price, setPrice] = useState(0);
    const [discount, setDiscount] = useState(0)
    const [showDiscount, setShowDiscount] = useState(true);
    const [availableTokens,setAvsilableTokens] = useState(12);

    

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


    
    
    const handleSubmitOfRedeemedToken = async ()=>{
        
        


        const contract = fcContract.connect(signer);
        const memberInfo = await contract.members(currAccount);
        console.log(memberInfo.tokenCount);

        // setAvsilableTokens(memberInfo.tokenCount);
        if(memberInfo.isRegistered && memberInfo.tokenCount < availableTokens){
            console.log("You have not enough token");
        }
        else if(memberInfo.isRegistered){
            try {
                const tx = await contract.redeemedTokenMember(availableTokens,formattedDate,formattedTime);
                await tx.wait();
                setAvsilableTokens(availableTokens-memberInfo.tokenCount);
                console.log("Token Redeemed");
            } catch (error) {
                console.log(error);
            }
        
        }
    }



    useEffect(() => {
        totalAmount();
    }, [cartItems]);
    
    const totalAmount = () => {
        let price = 0, discount = 0;
        cartItems.map(item => {
            price += item.price.mrp
            discount += (item.price.mrp - item.price.cost) 
        })
        setPrice(price);
        setDiscount(discount);
    }


    const Aprice = 18058.55; // Example price
    const trustScore = 0.24; // Example trust score

    // const handleApplyDiscount = async () => {
    //     console.log(availableTokens) ;
    //     setShowDiscount(true);
    //     await handleSubmitOfRedeemedToken()
    // };

    const calculateDiscount = () => {
        return showDiscount ? (Aprice * trustScore*availableTokens/100) : 0;
    };

    const calculateTotalAmount = () => {
        return Aprice - calculateDiscount()+40 ;

    };

    const calculateSavings = () => {
        return 13979.45+calculateDiscount() - 40 ;
    };

    return (
        <Box mt={2} >  {/* className={classes.component}> */}
            <Header>
                <Heading>PRICE DETAILS</Heading>
            </Header>
            <Container>
                <Typography>Price ({cartItems?.length} item)
                    <Price component="span">₹{price}</Price>
                </Typography>
                <Typography>Discount
                    <Price component="span">-₹{discount}</Price>
                </Typography>
                <Typography>Delivery Charges
                    <Price component="span">₹40</Price>
                </Typography>

                {/* <TotalAmount>Total Amount
                    <Price>₹{price - discount + 40}</Price>
                </TotalAmount> */}

                <Typography><h3>Token Discount</h3>
                    <div><span>*Max Discount upto 80%</span><ul style={{color: 'green'}}><li>User Trust-score: 0.24 </li>
                    <li>Available tokens: {availableTokens}</li></ul>
                    <Button onClick={handleSubmitOfRedeemedToken}>Apply discount</Button>
                                {showDiscount && (
                                <Price component="span"> -2.4%</Price>
                                )}                    </div>
                </Typography>
                
                
                
                
                <TotalAmount>
                    Total Amount
                    <Price><strike>₹32038</strike></Price>
                    <Price>₹{Math.round(calculateTotalAmount())}&nbsp;</Price>
                </TotalAmount>

                <Discount>
                    You will save ₹{Math.round(calculateSavings())} on this order
                </Discount>
            </Container>
        </Box>
    )
}

export default TotalView;