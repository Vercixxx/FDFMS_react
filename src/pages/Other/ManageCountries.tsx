import * as React from "react";

import { GetCountries } from "../../scripts/countries";
import { styled } from "@mui/material/styles";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  tableCellClasses,
  Button,
  Box,
} from "@mui/material";

// Icons
import DeleteIcon from "@mui/icons-material/Delete";
import FlagIcon from "@mui/icons-material/Flag";

const ManageCountriesComponent = () => {
  const [countries, setCountries] = React.useState<any[]>([]);

  React.useEffect(() => {
    const fetchData = async () => {
      const data = await GetCountries();
      console.log(data);
      setCountries(data);
    };

    fetchData();
  }, []);

  // Table
  const columns = [
    { field: "id", headerName: "ID", width: 5 },
    { field: "name", headerName: "Name", width: 5 },
  ];

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.action.hover,
      // color: theme.palette.common.white,
      fontSize: 18,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 18,
      // color: theme.palette.common.white,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      // backgroundColor: theme.palette.text.disabled,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      // backgroundColor: theme.palette.action.disabledBackground,
      border: 0,
    },
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
    },
  }));

  // Table

  return (
    <div className="pe-4">
      <div className="text-3xl mb-3">
        <FlagIcon style={{ fontSize: "40px" }} />
        Manage Countries
      </div>

      <TableContainer>
        <Table aria-label="customized table" size="small">
          <TableHead>
            <TableRow>
              <StyledTableCell align="left">Id</StyledTableCell>
              <StyledTableCell align="left">Name</StyledTableCell>
              <StyledTableCell align="center">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {countries.map((row) => (
              <StyledTableRow key={row.id}>
                {columns.map((column) => (
                  <StyledTableCell key={column.field}>
                    {row[column.field]}
                  </StyledTableCell>
                ))}

                {/* Actions */}
                <StyledTableCell align="center">
                  <div className="flex justify-center">
                    <Box mr={2}>
                      <Button
                        variant="outlined"
                        color="success"
                        size="large"
                        startIcon={<DeleteIcon />}
                        className="hover:scale-105"
                      >
                        Edit
                      </Button>
                    </Box>
                    <Button
                      variant="outlined"
                      color="error"
                      size="large"
                      startIcon={<DeleteIcon />}
                      className="hover:scale-105"
                    >
                      Delete
                    </Button>
                  </div>
                </StyledTableCell>
                {/* Actions */}
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ManageCountriesComponent;
