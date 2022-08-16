import React from "react";
import {
  Button,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#2C365D",
    color: "white",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    border: 1,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    // backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 1,
  },
}));

export default function Tables({ items, cols, SelectedRow }) {
  return (
    <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
      <Table sx={{ minWidth: 650 }} size="huge">
        <TableHead>
          <StyledTableRow>
            {cols.map((col, index) => (
              <StyledTableCell align="center" key={index}>
                {col?.label}
              </StyledTableCell>
            ))}
          </StyledTableRow>
        </TableHead>

        <TableBody>
          {items.map((user) => (
            <StyledTableRow
              sx={{ cursor: "pointer" }}
              key={user?.attributes?.id}
              onClick={() => {
                SelectedRow(user?.attributes?.id);
              }}
            >
              {cols.map((col, index) => (
                <>
                  {index === cols.length - 1 ? (
                    <TableCell align="center" padding="checkbox" key={index}>
                      <IconButton>
                        <ModeEditOutlineIcon sx={{ color: "#272E4F" }} />
                      </IconButton>
                    </TableCell>
                  ) : (
                    <TableCell align="center" padding="checkbox" key={index}>
                      {user?.attributes[col.name]}
                    </TableCell>
                  )}
                </>
              ))}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
