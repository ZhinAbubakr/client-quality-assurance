// import React, { useState } from "react";

// export default function Table() {
//   const [state] = useState([
//     {
//       user: [
//         {
//           lastname: "Doe"
//         },
//         {
//           firstname: "Jane",
//         },
//       ],
//       user: [
//         {
//           lastname: "Doe"
//         },
//         {
//           firstname: "Jane",
//         },
//       ]
//     }
//   ]);
//   return (
//     <div>
//       {state.map((m, index) => (
//         <li key={index}>{m.user}</li>
//       ))}
//     </div>
//   );
// }

import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  // styles for TableCell
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
  },
}));

export default function Tables({ users, cols, SelectedRow }) {
  return (
    // <TableContainer component={Paper}>
    <Table
      sx={{
        minWidth: 700,
        width: 40,
        height: 50,
        marginTop: 10,
        marginLeft: 50,
        fontStyle: "italic",
        border: "1px solid",
      }}
      size="huge"
      aria-label="a dense table"
    >
      <TableHead>
        <TableRow>
          {cols.map((col, index) => (
            <StyledTableCell key={index}> {col?.label}</StyledTableCell>
          ))}
        </TableRow>
      </TableHead>

      {/* <TableBody>
      
      <TableRow> 
        {users.map((user, index) => (
          <TableCell key={index}
          
          >{user.data}</TableCell>
        ))};
        
        </TableRow>    
      
      
      </TableBody> */}

      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id} onClick={() => SelectedRow(user.id)}>
            {cols.map((col, index) => (
              <TableCell>{user[col.name]}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>

      {/* <TableBody>
          {users.map((user) => (
            <TableRow
              key={user.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              //   onClick={() => console.log(users.id)}
              onClick={() => SelectedRow(user.id)}
            >
              <StyledTableCell component="th" scope="row">
                {" "}
                {user.role}
              </StyledTableCell>
              <StyledTableCell align="right">
                {user.displayName}
              </StyledTableCell>
              <StyledTableCell align="right">{user.email}</StyledTableCell>
              <StyledTableCell align="right">{user.firstname}</StyledTableCell>
              <StyledTableCell align="right">{user.lastname}</StyledTableCell>
            </TableRow>
          ))}
        </TableBody> */}
    </Table>
    // </TableContainer>
  );
}
