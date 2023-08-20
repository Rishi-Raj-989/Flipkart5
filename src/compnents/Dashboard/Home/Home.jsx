import React from "react"
import Cards from "../cards/cards"
import TableData from "../table/tableData"
import {Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import "./home.css"


const Home = () => {
  return (
    <div className={"light"}>
      <section className='home'>
        <div className='container'>
          <div className='heading flexSB'>
            <h2>DashBoard</h2>
            <span>
            <div className=''>
          <h4 style={{color: 'black', wordSpacing: "2px"}}>Refer & Earn</h4>
          <span style={{ wordSpacing: "2px", color: 'black' }}>Send your code with invite Link</span>
          <span> <Button variant="outlined" style={{"marginRight":"5px"}}>QZ4258</Button>
          <Button variant="contained" endIcon={<SendIcon />}>
              Invite
            </Button></span>
          
          </div>
          </span>
          </div>
          <Cards />
          <TableData />
        </div>
      </section>
    </div>
  )
}

export default Home

