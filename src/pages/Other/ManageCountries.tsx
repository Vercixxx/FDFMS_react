import React, { useRef } from "react";

import { GetCountries, AddCountry, DeleteCountry } from "../../scripts/countries";

// Mui
import Button from "@mui/material/Button";

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

// Ant Design Icons
import {
  FileExcelFilled,
  FilePdfFilled,
  DeleteFilled,
  EditFilled,
  PlusCircleFilled,
} from "@ant-design/icons";

// Ant Design Modal
import { ExclamationCircleFilled } from "@ant-design/icons";
import { Modal, Space } from "antd";


// Snackbars
import { useSnackbarContext } from './../../components/SnackbarContext';


const ManageCountriesComponent = () => {
  const [countries, setCountries] = React.useState<any[]>([]);
  const [selectedRows, setSelectedRows] = React.useState([]);


  // Snackbars
  const { showSnackbar } = useSnackbarContext();


  // Theme
  const { theme } = React.useContext(ThemeContext);
  const darkMode = theme.palette.mode === "dark" ? true : false;
  // Theme

  // Fetch Data
  const fetchData = async () => {
    const data = await GetCountries();
    setCountries(data);
  };
  
  React.useEffect(() => {
    fetchData();
  }, []);

  const HandleCrud = async (state: any) =>{
    if (state.action === "add" && state.requestType === "save") {
      const data = state.data; 
      const response = await AddCountry(data.Name);
      if(response){
        fetchData();
        showSnackbar("Country Added", "success");
      } else {
        showSnackbar("Error Adding Country", "error")
      }
    } else if (state.action === "edit" && state.requestType === "save") {
      console.log("Saving Edit");
    }
  }

  // Syncfusion
  const pageSettings = { pageSize: 15 };

  // Syncfusion - Edit
  const editOptions: EditSettingsModel = {
    allowEditing: true,
    allowAdding: true,
    allowDeleting: true,
    mode: "Dialog",
  };

  // Syncfusion - Delete
  const handleDelete = async (name: string) => {
    const response = await DeleteCountry(name);
    if(response){
      fetchData();
      showSnackbar("Country Deleted", "success");
    } else {
      showSnackbar("Error Deleting Country", "error")
    }
  };

  // Syncfusion - Exporting
  let grid = useRef<Grid | null>(null);

  // Syncfusion - Delete
  const { confirm } = Modal;

  const showDeleteConfirm = (item: any) => {
    console.log(item);

    confirm({
      title: "Are you sure delete this item?",
      icon: <ExclamationCircleFilled />,
      content: `${item?.name || "The item"} will be deleted.`,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        handleDelete(item?.name)
      },
      onCancel() {},
    });
  };

  // Custom Toolbar
  const toolbarTemplate = () => {
    return (
      <div className="flex justify-between mb-4">
        <div className="flex justify-start space-x-4">
          <Button
            variant="outlined"
            startIcon={<PlusCircleFilled />}
            className="hover:scale-105"
            sx={{
              borderRadius: "12px",
            }}
            color="success"
            onClick={() => grid.current?.addRecord()}
          >
            Add
          </Button>
          <Button
            variant="outlined"
            startIcon={<EditFilled />}
            disabled={selectedRows.length === 0 }
            className="hover:scale-105"
            sx={{
              borderRadius: "12px",
            }}
            color="success"
            onClick={() => {
              const selectedRowIndexes = grid.current?.getSelectedRowIndexes();
              if (selectedRowIndexes && selectedRowIndexes.length > 0) {
                grid.current?.startEdit();
                grid.current?.editCell(selectedRowIndexes[0], "fieldName");
              }
            }}
          >
            Edit
          </Button>
          <Button
            variant="outlined"
            startIcon={<DeleteFilled />}
            disabled={selectedRows.length === 0 }
            className="hover:scale-105"
            sx={{
              borderRadius: "12px",
            }}
            color="warning"
            onClick={() => {
              const selectedRecords = grid.current?.getSelectedRecords();
              if (selectedRecords && selectedRecords.length > 0) {
                showDeleteConfirm(selectedRecords[0]);
              }
            }}
          >
            Delete
          </Button>
        </div>

        <div className="flex justify-end space-x-4">
          <Button
            variant="outlined"
            startIcon={<FileExcelFilled />}
            className="hover:scale-105"
            sx={{
              borderRadius: "12px",
            }}
            color="info"
            onClick={() =>
              grid.current?.excelExport({
                fileName: "Countries.xlsx",
                header: {
                  headerRows: 1,
                  rows: [
                    {
                      cells: [
                        {
                          colSpan: 2,
                          value:
                            "Food Delivery Fleet Management System - Countries",
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
              })
            }
          >
            Export to Excel
          </Button>
          <Button
            variant="outlined"
            startIcon={<FilePdfFilled />}
            className="hover:scale-105"
            sx={{
              borderRadius: "12px",
            }}
            color="info"
            onClick={() =>
              grid.current?.pdfExport({
                fileName: "Countries.pdf",
                header: {
                  fromTop: 0,
                  height: 130,
                  contents: [
                    {
                      type: "Text",
                      value:
                        "Food Delivery Fleet Management System - Countries",
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
              })
            }
          >
            Export to PDF
          </Button>
        </div>
      </div>
    );
  };

  // Syncfusion - Sorting
  const sortOptions: SortSettingsModel = {
    columns: [{ field: "Name", direction: "Ascending" }],
  };

  // Syncfusion - Filtering
  const filterOptions: FilterSettingsModel = {
    ignoreAccent: true,
    type: "Excel",
  };
  // Syncfusion

  return (
    <div className={darkMode ? "dark-theme pe-4" : "light-theme pe-4"}>
      <div className="text-3xl mb-3">
        <FlagIcon style={{ fontSize: "40px" }} />
        Manage Countries
      </div>

    {toolbarTemplate()}
      <GridComponent
        ref={grid}
        dataSource={countries}
        allowPaging={true}
        pageSettings={pageSettings}
        editSettings={editOptions}
        modules={[Edit]}
        // toolbarClick={toolbarClick}
        // toolbarTemplate={toolbarTemplate}
        allowExcelExport={true}
        allowPdfExport={true}
        // enableAdaptiveUI={true}
        // rowRenderingMode="Vertical"
        allowSorting={true}
        sortSettings={sortOptions}
        allowMultiSorting={true}
        allowFiltering={true}
        filterSettings={filterOptions}
        actionComplete={HandleCrud}
        rowSelected={(args) => {
          setSelectedRows(grid.current?.getSelectedRecords());
        }}
        rowDeselected={(args) => {
          setSelectedRows(grid.current?.getSelectedRecords());
        }}
      >
        <ColumnsDirective>
          <ColumnDirective field="Id" textAlign="Left" allowEditing={false} />
          <ColumnDirective field="Name" textAlign="Left" />
        </ColumnsDirective>
        <Inject
          services={[Page, Edit, Toolbar, ExcelExport, PdfExport, Sort, Filter]}
        />
      </GridComponent>
    </div>
  );
};

export default ManageCountriesComponent;
