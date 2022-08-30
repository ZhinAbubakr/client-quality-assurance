import React from "react";
import {
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
import { useTranslation } from "react-i18next";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#273469",
    color: "white",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 10,
    border: 1,
  },
}));

// const StyledTableRow = styled(TableRow)(({ theme }) => ({
//   "&:nth-of-type(odd)": {
//     // backgroundColor: theme.palette.action.hover,
//   },
//   // hide last border
//   "&:last-child td, &:last-child th": {
//     // border: 1,
//   },
// }));

export default function Tables({
  items,
  cols,
  SelectedRow,
  hasEditing = true,
}) {
  const { t } = useTranslation();

  return (
    <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
      <Table size="huge" >
        <TableHead>
          <TableRow>
            {cols.map((col, index) => (
              <StyledTableCell align="center" key={index}>
                {col?.label}
              </StyledTableCell>
            ))}
            {hasEditing && (
              <StyledTableCell align="center">
                {t("listOfUser.Action")}
              </StyledTableCell>
            )}
          </TableRow>
        </TableHead>

        <TableBody>
          {items.map((user) => (
            <TableRow key={user?.attributes?.id}>
              {cols.map((col, index) => (
                <TableCell width="5%" align="center" key={index}>
                  {user?.attributes[col.name]}
                </TableCell>
              ))}
              {hasEditing && (
                <TableCell width="5%" align="center">
                  <IconButton
                    onClick={() => {
                      SelectedRow(user?.attributes?.id);
                    }}
                  >
                    <ModeEditOutlineIcon sx={{ color: "#272E4F" }} />
                  </IconButton>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
