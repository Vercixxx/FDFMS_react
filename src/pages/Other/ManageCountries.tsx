import * as React from "react";

import { GetCountries } from "../../scripts/countries";

import { Button, Box } from "@mui/material";

// Syncfusion
import {
  ColumnDirective,
  ColumnsDirective,
  EditSettingsModel,
  GridComponent,
} from "@syncfusion/ej2-react-grids";
import { Inject, Page, Edit, Toolbar, ToolbarItems } from "@syncfusion/ej2-react-grids";

// Theme
import { ThemeContext } from "../../config/ThemeContext";

// Styles
import "./ManageCountriesStyle.css";

// Icons
import EditIcon from "@mui/icons-material/Edit";
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

  // Theme
  const { theme } = React.useContext(ThemeContext);
  const darkMode = theme.palette.mode === "dark" ? true : false;
  // Theme

  // Syncfusion
  const pageSettings = { pageSize: 15 };

  // Syncfusion - Edit
  const editOptions: EditSettingsModel = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: "Dialog"};

  // Syncfusion - Toolbar
  const toolbarOptions: ToolbarItems[] = ["Add", "Edit", "Delete"];

  // Syncfusion

  return (
    <div className={darkMode ? "dark-theme pe-4" : "light-theme pe-4"}>
      <div className="text-3xl mb-3">
        <FlagIcon style={{ fontSize: "40px" }} />
        Manage Countries
      </div>

      <GridComponent
        dataSource={countries}
        allowPaging={true}
        pageSettings={pageSettings}
        editSettings={editOptions}
        toolbar={toolbarOptions}
      >
        <ColumnsDirective>
          <ColumnDirective field="Id" textAlign="Left" />
          <ColumnDirective field="Name" textAlign="Left" />
        </ColumnsDirective>
        <Inject services={[Page, Edit, Toolbar]} />
      </GridComponent>
    </div>
  );
};

export default ManageCountriesComponent;
