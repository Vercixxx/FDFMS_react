import * as React from "react";

import { GetCountries } from "../../scripts/countries";

import { Button, Box } from "@mui/material";

// Syncfusion
import {
  ColumnDirective,
  ColumnsDirective,
  EditSettingsModel,
  Grid,
  GridComponent,
  Inject,
  Page,
  Edit,
  Toolbar,
  ToolbarItems,
  ExcelExport,
  PdfExport,
  Sort,
  SortSettingsModel,
  Filter,
  FilterSettingsModel,
} from "@syncfusion/ej2-react-grids";

// Theme
import { ThemeContext } from "../../config/ThemeContext";

// Styles
import "./ManageCountriesStyle.css";

// Icons
import FlagIcon from "@mui/icons-material/Flag";

const ManageCountriesComponent = () => {
  const [countries, setCountries] = React.useState<any[]>([]);

  React.useEffect(() => {
    const fetchData = async () => {
      const data = await GetCountries();
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
  const editOptions: EditSettingsModel = {
    allowEditing: true,
    allowAdding: true,
    allowDeleting: true,
    mode: "Dialog",
  };

  // Syncfusion - Exporting
  let grid: Grid | null;
  const toolbarClick = (args: any) => {
    if (grid) {
      if (args.item.id.includes("excelexport")) {
        grid.excelExport({
          fileName: "Countries.xlsx",
          header: {
            headerRows: 1,
            rows: [
              {
                cells: [
                  {
                    colSpan: 2,
                    value: "Food Delivery Fleet Management System - Countries",
                    style: {
                      hAlign: "Center",
                      bold: true,
                      fontColor: "#C67878",
                    },
                  },
                ],
              },
            ],
          },
          footer: {
            footerRows: 1,
            rows: [
              {
                cells: [
                  {
                    colSpan: 2,
                    value: `Generated ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}`,
                    style: { hAlign: "Center", bold: true },
                  },
                ],
              },
            ],
          },
        });
      } else if (args.item.id.includes("pdfexport")) {
        grid.pdfExport({
          fileName: "Countries.pdf",
          header: {
            fromTop: 0,
            height: 130,
            contents: [
              {
                type: "Text",
                value: "Food Delivery Fleet Management System - Countries",
                position: { x: 0, y: 50 },
                style: { textBrushColor: "#000000", fontSize: 14 },
              },
            ],
          },
          footer: {
            fromBottom: 0,
            height: 130,
            contents: [
              {
                type: "Text",
                value: `Generated ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}`,
                position: { x: 0, y: 0 },
                style: { textBrushColor: "#000000", fontSize: 14 },
              },
            ],
          },
        });
      }
    }
  };

  // Syncfusion - Toolbar
  const toolbarOptions: ToolbarItems[] = [
    "Add",
    "Edit",
    "Delete",
    "ExcelExport",
    "PdfExport",
  ];


  // Syncfusion - Sorting
  const sortOptions: SortSettingsModel = { columns: [{ field: "Name", direction: "Ascending" }] };

  // Syncfusion - Filtering
  const filterOptions: FilterSettingsModel = { ignoreAccent: true , type: "Excel"};
  // Syncfusion

  return (
    <div className={darkMode ? "dark-theme pe-4" : "light-theme pe-4"}>
      <div className="text-3xl mb-3">
        <FlagIcon style={{ fontSize: "40px" }} />
        Manage Countries
      </div>

      <GridComponent
        ref={(g) => (grid = g)}
        dataSource={countries}
        allowPaging={true}
        pageSettings={pageSettings}
        editSettings={editOptions}
        toolbar={toolbarOptions}
        toolbarClick={toolbarClick}
        allowExcelExport={true}
        allowPdfExport={true}
        // enableAdaptiveUI={true}
        // rowRenderingMode="Vertical"
        allowSorting={true}
        sortSettings={sortOptions}
        allowMultiSorting={true}
        allowFiltering={true}
        filterSettings={filterOptions}
      >
        <ColumnsDirective>
          <ColumnDirective field="Id" textAlign="Left" allowEditing={false} />
          <ColumnDirective field="Name" textAlign="Left" />
        </ColumnsDirective>
        <Inject services={[Page, Edit, Toolbar, ExcelExport, PdfExport, Sort, Filter]} />
      </GridComponent>
    </div>
  );
};

export default ManageCountriesComponent;
