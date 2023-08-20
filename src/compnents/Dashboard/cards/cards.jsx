import React from "react"
import ReactApexChart from "react-apexcharts"
import "./cards.css"
import TrendingUpIcon from "@mui/icons-material/TrendingUp"
import Common from "../common.jsx"

const Cards = () => {
  const data = {
    series: [25],
    options: {
      chart: {
        height: 150,
        type: "radialBar",
        foreColor: "grey",
      },
      plotOptions: {
        radialBar: {
          hollow: {
            size: "58%",
          },
          dataLabels: {
            value: {
              show: false,
            },
          },
        },
      },
      labels: ["25% left"],
      colors: ["#ff5b5b"],
    },
  }
  const data1 = {
    series: [20],
    options: {
      chart: {
        height: 150,
        type: "radialBar",
      },
      plotOptions: {
        radialBar: {
          hollow: {
            size: "58%",
          },
          //add it
          dataLabels: {
            value: {
              show: false,
            },
          },
        },
      },
      labels: ["70 days-left"],
      colors: ["#E9B251"],
    },
  }
  const Progress = ({ done }) => {
    return (
      <div className='progress'>
        <div
          className='progress-done'
          style={{
            opacity: 1,
            width: `${done}%`,
          }}
        ></div>
      </div>
    )
  }

  return (
    <>
      <section className='cards grid'>
        <div className='cardBox'>
          <Common title='Current Token' popupTitle={<h3>Earning Rule*</h3>} popupContent={
          <ul>
          <li>Daily Check-IN Website</li>
          <li>Purchasing</li>
          <li>Birthday Token</li>
          <li>Special Day's Token</li>
          </ul>
          }/>
          <div className='circle'>
            <div className='row'>
              <ReactApexChart options={data.options} series={data.series} type='radialBar' height={150} />
            </div>
            <div className='title row'>
              <h1>12</h1>
              <p>Overall Token: 48</p>
            </div>
          </div>
        </div>
        <div className='cardBox'>
          <Common title='Daily Earning' popupTitle={<h3>Earning Rule*</h3>} popupContent={
          <ul>
          <li>0.2 Token For Daily Check-IN</li>
          <li>If User is Plus member then Token decay in 8-month</li>
          <li>If User is Plus Premium member then Token decay in 1.5 Year</li>
          <li>Otherwise Token decay in 3-month</li>
          </ul>
          }/>
          <div className='circle'>
            <div className='batch row'>
              <span>24%</span>
              <TrendingUpIcon className='batchIcon' />
            </div>
            <div className='title row'>
              <h1>0.5</h1>
              <p>Today Target: 2</p>
            </div>
          </div>
          <Progress done='25' />
        </div>
        <div className='cardBox'>
          <Common title='Decay Token' popupTitle={<h3>CheckIn Rule*</h3>} popupContent={
          <ul>
          <li>If User is inactive from 30 days then 2 token decay</li>
          <li>If User is Plus member then Token decay in 8-month</li>
          <li>If User is Plus Premium member then Token decay in 1.5 Year</li>
          <li>Otherwise Token decay in 3-month</li>
          </ul>
          }/>
          <div className='circle'>
            <div className='row'>
              <ReactApexChart options={data1.options} series={data1.series} type='radialBar' height={150} />
            </div>
            <div className='title row'>
              <h1>3</h1>
              <p>Till today</p>
            </div>
          </div>
        </div>
        <div className='cardBox'>
          <Common title='Monthly Target' popupTitle={<h3>Monthly Bonus Rule*</h3>} popupContent={
          <ul>
          <li>If User is inactive from 30 days then 2 token decay</li>
          <li>If User is Plus member then Token decay in 8-month</li>
          <li>If User is Plus Premium member then Token decay in 1.5 Year</li>
          <li>Otherwise Token decay in 3-month</li>
          </ul>
          } />
          <div className='circle'>
            <div className='batch batch1 row'>
              <span>32%</span>
              <TrendingUpIcon className='batchIcon' />
            </div>
            <div className='title row'>
              <h1>30</h1>
              <p>target token: 70</p>
            </div>
          </div>
          <Progress done='45' />
        </div>
      </section>
    </>
  )
}

export default Cards