import React, { useRef, useState, useEffect } from "react";

import { GetCountries, DeleteCountry } from "../../scripts/countries";

// Mui
import Button from "@mui/material/Button";

// Syncfusion
import {
  ColumnDirective,
  ColumnsDirective,
  SelectionSettingsModel,
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
import SettingsIcon from "@mui/icons-material/Settings";

// Ant Design Icons
import {
  FileExcelFilled,
  FilePdfFilled,
  DeleteFilled,
  PlusCircleFilled,
} from "@ant-design/icons";

// Snackbars
import { useSnackbarContext } from "./../../components/SnackbarContext";

// Dialog Country Template ===============================================================
import DialogCountryTemplate from "./DialogCountryTemplate";

// MyDrawer
import { useDispatch } from "react-redux";
import { openDrawer } from "../../store/drawerSlice";

// i18n
import { useTranslation } from "react-i18next";
import DeleteConfirmModal from "./ModalDelete";
import { GridExportSettingsTemplate } from "./GridExportSettingsTemplate";

const ManageCountriesComponent: React.FC = () => {
  const [countries, setCountries] = React.useState<any[]>([]);
  const [selectedRows, setSelectedRows] = React.useState([]);

  // i18n
  const { t } = useTranslation();

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
    const data = await GetCountries();
    if (!data) {
      showSnackbar(t("Error while fetching data, please try again"), "error");
    } else {
      setCountries(data);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  // Configurations
  const pageSizeOptions = [5, 10, 20, 50, 100];
  const [pageSettings, setPageSettings] = useState({ pageSize: 10 });
  const changePageSize = (e) => {
    setPageSettings({ pageSize: e.target.value });
  };
  const exportOptions = [
    {
      key: "AllPages",
      text: "All pages",
    },
    {
      key: "CurrentPage",
      text: "Current page",
    },
    {
      key: "SelectedRows",
      text: "Selected rows",
    },
  ];
  const [exportType, setExportType] = useState(exportOptions[0].key);
  const [exportDataSource, setExportDataSource] = useState([]);

  const changeExportType = (e) => {
    const newExportType = e.target.value;
    setExportType(newExportType);
  };

  const ExportData = (type: string) => {
    if (type === "AllPages") {
      return grid.current?.dataSource;
    } else if (type === "CurrentPage") {
      return grid.current?.getCurrentViewRecords();
    } else if (type === "SelectedRows") {
      return grid.current?.getSelectedRecords();
    }
  }

  const openSettingsDrawer = () => {
    dispatch(
      openDrawer({
        title: `${t("Settings")}`,
        component: (
          <GridExportSettingsTemplate
            selectedPageSize={pageSettings.pageSize}
            pageSizeOptions={pageSizeOptions}
            changePageSize={changePageSize}
            selectedExportType={exportType}
            changeExportTypeOptions={exportOptions}
            changeExportType={changeExportType}
          />
        ),
      })
    );
  };

  let grid = useRef<Grid | null>(null);

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

  // Syncfusion - Delete
  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
  const [dialogDeleteData, setDialogDeleteData] = useState({
    title: "",
    content: "",
    okText: "",
    cancelText: "",
    onOk: () => {},
    onCancel: () => {},
  });
  const showDeleteConfirm = (items: any) => {
    console.log(items);

    let title = "";
    let content = "";
    if (items && items.length === 1) {
      title = t("Are you sure delete this item?");
      content = `${items[0]?.name || ""} ${t("will be deleted")}.`;
    } else if (items && items.length > 1) {
      title = t("Are you sure delete these items?");
      content = `${items.length} ${t("items will be deleted")}.`;
    }

    setDialogDeleteData({
      title: title,
      content: content,
      okText: t("Yes"),
      cancelText: t("No"),
      onOk: () => handleDelete(),
      onCancel: () => {},
    });
    setDeleteDialogVisible(true);
  };

  const handleDelete = async () => {
    let allDeleted = true;
    const selectedRecords = grid.current?.getSelectedRecords();
    if (selectedRecords.length === 1) {
      const response = await DeleteCountry(selectedRecords[0].name);
      if (!response) {
        allDeleted = false;
      }
    } else {
      for (let i = 0; i < selectedRecords.length; i++) {
        const response = await DeleteCountry(selectedRecords[i].name);
        if (!response) {
          allDeleted = false;
          break;
        }
      }
    }

    if (allDeleted) {
      showSnackbar(t("Successfully deleted"), "success");
    } else {
      showSnackbar(t("Error while deleting, please try again"), "error");
    }
    fetchData();
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
            onClick={() => {
              dispatch(
                openDrawer({
                  title: t("Add Country"),
                  component: (
                    <DialogCountryTemplate
                      refreshComponent={refreshComponent}
                      setRefreshComponent={setRefreshComponent}
                    />
                  ),
                })
              );
            }}
          >
            {t("Add")}
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
                showDeleteConfirm(selectedRecords);
              }
            }}
          >
            {t("Delete")}

            {selectedRows.length >= 1 ? ` ${selectedRows.length} ` : ""}
            {selectedRows.length === 1 ? `${t("Item")}` : ""}
            {selectedRows.length > 1 ? `${t("Items")}` : ""}
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
            disabled={
              exportType === "SelectedRows" &&
              grid.current?.getSelectedRecords().length === 0
            }
            onClick={() => {
              if (
                exportType === "SelectedRows" &&
                grid.current?.getSelectedRecords().length === 0
              ) {
                showSnackbar(t("Please select at least one row"), "error");
              } else {
                grid.current?.excelExport({
                  dataSource: ExportData(exportType),
                  fileName: `${t("Countries")}.xlsx`,
                  header: {
                    headerRows: 1,
                    rows: [
                      {
                        cells: [
                          {
                            colSpan: 2,
                            value: `Food Delivery Fleet Management System - ${t(
                              "Countries"
                            )}`,
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
              }
            }}
          >
            {t("Export to Excel")}
          </Button>
          <Button
            variant="outlined"
            startIcon={<FilePdfFilled />}
            className="hover:scale-105"
            sx={{
              borderRadius: "12px",
            }}
            color="info"
            disabled={
              exportType === "SelectedRows" &&
              grid.current?.getSelectedRecords().length === 0
            }
            onClick={() => {
              if (
                exportType === "SelectedRows" &&
                grid.current?.getSelectedRecords().length === 0
              ) {
                showSnackbar(t("Please select at least one row"), "error");
              } else {
                grid.current?.pdfExport({
                  dataSource: ExportData(exportType),
                  fileName: `${t("Countries")}.pdf`,
                  header: {
                    fromTop: 0,
                    height: 130,
                    contents: [
                      {
                        type: "Text",
                        value: `Food Delivery Fleet Management System - ${t(
                          "Countries"
                        )}`,
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
            }}
          >
            {t("Export to PDF")}
          </Button>
        </div>
      </div>
    );
  };

  // Context Menu
  const contextMenuItems = [
    { text: t("Copy row"), target: ".e-content", id: "CopyRow" },
    { text: t("Copy selected"), target: ".e-content", id: "CopySelected" },
    { text: t("Delete"), target: ".e-content", id: "DeleteRow" },
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
    } else if (args.item.id === "CopySelected") {
      const selectedRecords = grid.current?.getSelectedRecords();
      if (selectedRecords && selectedRecords.length > 0) {
        const formattedRecords = selectedRecords
          .map((record) =>
            Object.entries(record)
              .map(([key, value]) => `${key}: ${value}`)
              .join(", ")
          )
          .join("\n");

        navigator.clipboard.writeText(formattedRecords);
      } else {
        showSnackbar(t("Please select at least one row"), "error");
      }
    } else if (grid && args.item.id === "DeleteRow") {
      const selectedRecord = grid.current?.getSelectedRecords();
      if (selectedRecord && selectedRecord.length == 1) {
        showDeleteConfirm(selectedRecord[0]);
      } else if (selectedRecord && selectedRecord.length > 1) {
        showSnackbar(t("Opration isn't allowed"), "error");
      }
    }
  };

  // Selection
  const selectionOptions: SelectionSettingsModel = { type: "Multiple" };

  return (
    <div className={darkMode ? "dark-theme pe-4" : "light-theme pe-4"}>
      <div className="flex justify-between">
        <div className="text-3xl mb-3">
          <LocationCityIcon style={{ fontSize: "40px" }} />
          {t("Manage Countries")}
        </div>
        <div className="">
          <Button
            startIcon={<SettingsIcon />}
            variant="outlined"
            onClick={openSettingsDrawer}
            className="hover:scale-105"
          >
            <div className="flex justify-between">{t("Settings")}</div>
          </Button>
        </div>
      </div>

      {toolbarTemplate()}
      <GridComponent
        ref={grid}
        allowSelection={true}
        selectionSettings={selectionOptions}
        dataSource={countries}
        allowPaging={true}
        pageSettings={pageSettings}
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
          <ColumnDirective type="checkbox" width="50" />
          <ColumnDirective
            field="Id"
            textAlign="Left"
            allowEditing={false}
            isPrimaryKey={true}
          />
          <ColumnDirective
            field="Name"
            headerText={t("Name")}
            textAlign="Left"
          />
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

      <DeleteConfirmModal
        dialogDeleteData={dialogDeleteData}
        open={deleteDialogVisible}
        setOpen={setDeleteDialogVisible}
      />
    </div>
  );
};

export default ManageCountriesComponent;
