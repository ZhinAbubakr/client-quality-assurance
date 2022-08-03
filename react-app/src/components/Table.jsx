import React from "react";
import {
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#5c6bc0",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
  },
}));

export default function Tables({ users, cols, SelectedRow }) {
  return (
    <>
      <Grid item xs={8}>
        <Button variant="contained" sx={{ float: "right", marginTop: 2 }}>
          Edit
        </Button>
      </Grid>
      <Table
        sx={{
          marginTop: 8,
        }}
        size="huge"
        aria-label="a dense table"
      >
        <TableHead>
          <TableRow>
            {cols.map((col, index) => (
              <StyledTableCell align="center" key={index}>
                {col?.label}
              </StyledTableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {users.map((user) => (
            <TableRow
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
                      <Button>
                        <ModeEditOutlineIcon />
                      </Button>
                    </TableCell>
                  ) : (
                    <TableCell align="center" padding="checkbox" key={index}>
                      {user?.attributes[col.name]}
                    </TableCell>
                  )}
                </>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
