import React from "react"
import "./table.css"
import Common from "../common.jsx"
// import "../users/users.css"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"



function createData(id, ProjectName, StartDate, DueDate, Status, Assign) {
  return { id, ProjectName, StartDate, DueDate, Status, Assign }
}


const rows = [createData(1, "3", "20/08/2023", "17:40", "Flipkart", "Rishi Raj"), createData(2, "5", "20/08/2023", "16:10", "Addidas", "Rishi Raj"), createData(3, "2", "01/01/2017", "16:50", "Nike", "Rishi Raj"), createData(4, "6", "19/08/2023", "16:10", "Flipkart", "Rishi Raj"), createData(5, "7", "19/08/2023", "16:05", "Samsung", "Rishi Raj")]

const TableData = () => {
    

  return (
    <>
      
      <section className='project'>

        <div className='table cardBox'>
          <Common title='Recent Transaction' />
          <div className='tableBox'>
            <TableContainer component={Paper} sx={{ boxShadow: "none", borderRadius: "none" }}>
              <Table
                className='tableContainer'
                sx={{
                  minWidth: 750,
                  background: "#313844",
                  border: "none",
                  "& td ,th": {
                    color: "rgb(166, 171, 176)",
                    borderBottom: "1px solid rgb(86, 86, 86)",
                    fontWeight: 700
                  },
                }}
              >
                <TableHead>
                  <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell>Tokens Count</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Time</TableCell>
                    <TableCell>Sender</TableCell>
                    <TableCell>Receiver</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell component='th' scope='row'>
                        {row.id}
                      </TableCell>
                      <TableCell>{row.ProjectName}</TableCell>
                      <TableCell>{row.StartDate}</TableCell>
                      <TableCell>{row.DueDate}</TableCell>
                      <TableCell className='status'>{row.Status}</TableCell>
                      <TableCell>{row.Assign}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </section>
    </>
  )
}

export default TableData