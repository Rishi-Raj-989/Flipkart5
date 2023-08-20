import React, { useState } from "react";

import { ButtonGroup, Button, styled } from "@mui/material";

const Component = styled(ButtonGroup)`
    margin-top: 30px;
    fontWeight: 800 ;
    color: #c2c2c2;
    border-color: #e0e0e0;
    cursor: auto;
    width: 28px;
  height: 28px;
  background: linear-gradient(#fff,#f9f9f9);
  cursor: pointer;
  font-size: 16px;
  border-radius: 50%;
  padding-top: 1px;
  line-height: 1;

`;

const StyledButton = styled(Button)`
    border-radius: 100%;
    border-color: grey ;
    text-color: Black ;
    
`;

const GroupedButton = () => {
    const [ counter, setCounter ] = useState(1);

    const handleIncrement = () => {
        setCounter(counter => counter + 1 );
    };

    const handleDecrement = () => {
        setCounter(counter => counter - 1 );
    };

    return (
        <Component>
            <StyledButton onClick={() => handleDecrement()} disabled={counter === 0}>-</StyledButton>
            <Button>{counter}</Button>
            <StyledButton onClick={() => handleIncrement()}>+</StyledButton>
        </Component>
    );
}

export default GroupedButton;