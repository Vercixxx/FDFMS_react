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
} from "@mui/material";

const ManageCountriesComponent = () => {
  const [countries, setCountries] = React.useState([]);

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

  const StyledTableCell = styled(TableCell)(({ theme }: { theme: any }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundCloor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
      color: theme.palette.common.white,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: '#424242',
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      backgroundColor: '#212121',
      border: 0,
    },
  }));

  // Table

  return (
    <div>
      Manage Countries
      <TableContainer>
        <Table aria-label="customized table">
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
                <StyledTableCell sx={{}}>
                  <Button variant="outlined">Edit</Button>
                  <Button variant="outlined">Delete</Button>
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
