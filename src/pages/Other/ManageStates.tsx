import React, { useRef, useState, useEffect } from "react";

import { GetStates, AddState, DeleteState, IState } from "../../scripts/states";

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
  Toolbar,
  ContextMenu,
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
import "./GridStyles.css";

// Icons
import LocationCityIcon from "@mui/icons-material/LocationCity";

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
import { Modal, Drawer } from "antd";

// Snackbars
import { useSnackbarContext } from "./../../components/SnackbarContext";

// Dialog State Template
import DialogStateTemplate from "./DialogStateTemplate";

// ================== MyDrawer ==================
import { useDispatch } from "react-redux";
import { openDrawer } from "../../store/drawerSlice";

// ================== MyDrawer ==================

const ManageStatesComponent: React.FC = () => {
  const [states, setStates] = React.useState<any[]>([]);
  const [selectedRows, setSelectedRows] = React.useState([]);

  // Drawer
  const dispatch = useDispatch();
  const [refreshComponent, setRefreshComponent] = useState<boolean>(false);
  // Update data after changes
  useEffect(() => {
    if (refreshComponent) {
      fetchData();
      setRefreshComponent(false);
    }
  }, [refreshComponent]);

  // Snackbars
  const { showSnackbar } = useSnackbarContext();

  // Theme
  const { theme } = React.useContext(ThemeContext);
  const darkMode = theme.palette.mode === "dark" ? true : false;
  // Theme

  // Fetch data
  const fetchData = async () => {
    const data = await GetStates();
    if (!data) {
      showSnackbar("Error Fetching States", "error");
    } else {
      setStates(data);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  let grid = useRef<Grid | null>(null);
  const pageSettings = { pageSize: 15 };

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

  // Syncfusion - Add
  const dialogTemplate = (props: IState) => {
    return <DialogStateTemplate {...props} />;
  };

  // Syncfusion - Edit
  const editOptions: EditSettingsModel = {
    allowDeleting: true,
  };

  // Syncfusion - Delete
  const { confirm } = Modal;

  const showDeleteConfirm = (item: any) => {
    confirm({
      title: "Are you sure delete this item?",
      icon: <ExclamationCircleFilled />,
      content: `${item?.name || "The item"} will be deleted.`,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        handleDelete(item?.id);
      },
      onCancel() {},
    });
  };

  const handleDelete = async (id: number) => {
    const response = await DeleteState(id);
    if (response) {
      fetchData();
      showSnackbar("Country Deleted", "success");
    } else {
      showSnackbar("Error Deleting Country", "error");
    }
  };
  // Syncfusion - Delete

  // Syncfusion - Custom toolbar
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
            // onClick={() => grid.current?.addRecord()}
            onClick={() => {
              dispatch(
                openDrawer({
                  title: "My Title",
                  component: (
                    <DialogStateTemplate
                      refreshComponent={refreshComponent}
                      setRefreshComponent={setRefreshComponent}
                    />
                  ),
                })
              );
            }}
          >
            Add
          </Button>

          <Button
            variant="outlined"
            startIcon={<EditFilled />}
            disabled={selectedRows.length === 0}
            className="hover:scale-105"
            sx={{
              borderRadius: "12px",
            }}
            color="success"
            onClick={() => {
              const selectedRowIndexes = grid.current?.getSelectedRowIndexes();
              if (selectedRowIndexes && selectedRowIndexes.length > 0) {
                // grid.current?.startEdit();
                // grid.current?.editCell(selectedRowIndexes[0], "fieldName");
                console.log(selectedRowIndexes[0]);
              }
            }}
          >
            Edit
          </Button>

          <Button
            variant="outlined"
            startIcon={<DeleteFilled />}
            disabled={selectedRows.length === 0}
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
                fileName: "States.xlsx",
                header: {
                  headerRows: 1,
                  rows: [
                    {
                      cells: [
                        {
                          colSpan: 2,
                          value:
                            "Food Delivery Fleet Management System - States",
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
                fileName: "States.pdf",
                header: {
                  fromTop: 0,
                  height: 130,
                  contents: [
                    {
                      type: "Text",
                      value: "Food Delivery Fleet Management System - States",
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

  // Context Menu
  const contextMenuItems = [
    { text: "Copy row", target: ".e-content", id: "CopyRow" },
    { text: "Edit row", target: ".e-content", id: "EditRow" },
    { text: "Delete row", target: ".e-content", id: "DeleteRow" },
  ];
  const contextMenuClick = (args) => {
    if (args.item.id === "CopyRow") {
      const selectedRecords = grid.current?.getSelectedRecords();
      if (selectedRecords && selectedRecords.length > 0) {
        const record = selectedRecords[0];
        const formattedRecord = Object.entries(record)
          .map(([key, value]) => `${key}: ${value}`)
          .join(", ");

        navigator.clipboard.writeText(formattedRecord);
      }
    } else if (grid && args.item.id === "EditRow") {
      console.log("Edit Row");
    } else if (grid && args.item.id === "DeleteRow") {
      const selectedRecords = grid.current?.getSelectedRecords();
      if (selectedRecords && selectedRecords.length > 0) {
        showDeleteConfirm(selectedRecords[0]);
      }
    }
  };

  return (
    <div className={darkMode ? "dark-theme pe-4" : "light-theme pe-4"}>
      <div className="text-3xl mb-3">
        <LocationCityIcon style={{ fontSize: "40px" }} />
        Manage States
      </div>

      {toolbarTemplate()}
      <GridComponent
        ref={grid}
        dataSource={states}
        allowPaging={true}
        pageSettings={pageSettings}
        editSettings={editOptions}
        allowExcelExport={true}
        allowPdfExport={true}
        // enableAdaptiveUI={true}
        // rowRenderingMode="Vertical"
        allowSorting={true}
        sortSettings={sortOptions}
        allowMultiSorting={true}
        allowFiltering={true}
        filterSettings={filterOptions}
        contextMenuItems={contextMenuItems}
        contextMenuClick={contextMenuClick}
        rowSelected={(args) => {
          setSelectedRows(grid.current?.getSelectedRecords());
        }}
        rowDeselected={(args) => {
          setSelectedRows(grid.current?.getSelectedRecords());
        }}
      >
        <ColumnsDirective>
          <ColumnDirective
            field="Id"
            textAlign="Left"
            allowEditing={false}
            isPrimaryKey={true}
          />
          <ColumnDirective field="Name" textAlign="Left" />
          <ColumnDirective field="Country" textAlign="Left" />
        </ColumnsDirective>
        <Inject
          services={[
            Page,
            Toolbar,
            ExcelExport,
            PdfExport,
            Sort,
            Filter,
            ContextMenu,
          ]}
        />
      </GridComponent>
    </div>
  );
};

export default ManageStatesComponent;
