import React, { useRef, useState, useEffect } from "react";

// Theme
import { ThemeContext } from "../../config/ThemeContext";

// Styles
import "../../pages/Other/GridStyles.css";

// Snackbars
import { useSnackbarContext } from "./../../components/SnackbarContext";

// MyDrawer
import { useDispatch } from "react-redux";
import { openDrawer } from "../../store/drawerSlice";
import { ManageUsersSettingsDialog } from "./ManageUsersSettingsDialog";

// i18n
import { useTranslation } from "react-i18next";

// Scripts
import { QueryParams, getUsers, getUserDetails } from "../../scripts/users";

// Icons
import SettingsIcon from "@mui/icons-material/Settings";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";

// Mui
import Button from "@mui/material/Button";
import Switch, { SwitchProps } from "@mui/material/Switch";
import { alpha, styled } from "@mui/material/styles";
import Pagination from "@mui/material/Pagination";
import { Grid as MuiGrid } from "@mui/material";

// Syncfusion
import {
  ColumnDirective,
  ColumnsDirective,
  SelectionSettingsModel,
  Grid,
  GridComponent,
  Inject,
  DetailRow,
  Page,
  Toolbar,
  ContextMenu,
  ExcelExport,
  PdfExport,
  Sort,
  SortSettingsModel,
  Filter,
  FilterSettingsModel,
  Edit,
} from "@syncfusion/ej2-react-grids";

// Ant Design Icons
import {
  FileExcelFilled,
  FilePdfFilled,
  DeleteFilled,
  EditFilled,
  PlusCircleFilled,
} from "@ant-design/icons";
import {
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

const ManageUsersComponent: React.FC = () => {
  // Pagination
  const RequestParams = useRef<Partial<QueryParams>>({
    limit: 10,
    query: "",
    role: "All",
    status: "All",
  });

  interface Response {
    current_page: number;
    next: string | null;
    previous: string | null;
    total_results: number | null;
    total_pages: number | null;
    results: any[];
  }

  // Get users
  const [response, setResponse] = useState<Response>({
    current_page: 1,
    next: "",
    previous: "",
    total_results: 0,
    total_pages: 0,
    results: [],
  });

  const fetchData = async () => {
    const data = await getUsers(RequestParams.current);
    if (data.type === "error") {
      console.log(data);
      showSnackbar(data.message, "error");
    } else {
      setResponse(data);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  // Theme
  const { theme } = React.useContext(ThemeContext);
  const darkMode = theme.palette.mode === "dark" ? true : false;
  // Theme

  // i18n
  const { t } = useTranslation();

  // Drawer
  const dispatch = useDispatch();
  const [refreshComponent, setRefreshComponent] = useState<boolean>(false);

  // Snackbars
  const { showSnackbar } = useSnackbarContext();

  // Configuration
  //Columns
  const AllColumns = [
    {
      field: "username",
      headerText: "Username",
      textAlign: "Left",
    },
    {
      field: "email",
      headerText: "Email",
      textAlign: "Left",
    },
    {
      field: "user_role",
      headerText: "Role",
      textAlign: "Left",
    },
    {
      field: "is_active",
      headerText: "Status",
      textAlign: "Left",
    },
    {
      field: "date_joined",
      headerText: "Date joined",
      textAlign: "Left",
    },
  ];
  const DriverColumns = [
    {
      field: "username",
      headerText: "Username",
      textAlign: "Left",
    },
    {
      field: "email",
      headerText: "Email",
      textAlign: "Left",
    },
    {
      field: "is_active",
      headerText: "Status",
      textAlign: "Left",
    },
    {
      field: "date_joined",
      headerText: "Date joined",
      textAlign: "Left",
    },
  ];
  let columns = AllColumns;

  // Pagination
  const pageSizeOptions = [1, 5, 10, 20, 50, 100];
  const [pageSettings, setPageSettings] = useState({ pageSize: 10 });
  const changePageSize = (e) => {
    RequestParams.current.limit = e.target.value;
    setPageSettings({ pageSize: e.target.value });
    fetchData();
  };
  // Role
  const roleOptions = [
    "All",
    "Driver",
    "HR",
    "Manager",
    "Asset",
    "Payroll",
    "Clients",
  ];
  const [role, setRole] = useState("All");
  const changeRole = (e) => {
    RequestParams.current.role = e.target.value;
    setRole(e.target.value);
    fetchData();
    switch (e.target.value) {
      case "Driver":
        columns = DriverColumns;
        break;
      default:
        columns = AllColumns;
        break;
    }
  };
  //Status
  const statusOptions = [
    { key: "All", text: "All" },
    { key: "True", text: "Active" },
    { key: "False", text: "Inactive" },
  ];
  const [status, setStatus] = useState("All");
  const changeStatus = (e) => {
    RequestParams.current.status = e.target.value;
    setStatus(e.target.value);
    fetchData();
  };
  //Export
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
  };

  // =================== Grid ===================
  let grid = useRef<Grid | null>(null);
  const selectionOptions: SelectionSettingsModel = { type: "Multiple" };
  const [selectedRows, setSelectedRows] = React.useState([]);

  //   Custom cells
  const customCell = (args) => {
    if (args.column.field === "is_active") {
      args.data[args.column.field] = args.data[args.column.field]
        ? "Active"
        : "Inactive";
    }
  };

  //   Sorting
  const sortOptions: SortSettingsModel = {
    columns: [{ field: "Username", direction: "Ascending" }],
  };

  //   Details
  const detailsTemplate = (props) => {
    console.log(props as any);

    const [userDetails, setUserDetails] = useState({});

    const getUserData = async () => {
      const response = await getUserDetails(props.username, props.user_role);
      setUserDetails(response);
      console.log(userDetails);
    };

    React.useEffect(() => {
      getUserData();
    }, []);

    return (
      <div className={`py-4 ${darkMode ? "text-white" : "text-black"}`}>
        <Table aria-label="details-table" size="small">
          <TableHead>
            <TableRow>
              <TableCell>Key</TableCell>
              <TableCell>Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.entries(userDetails).map(([key, value]) => (
              <TableRow key={key} className="hover:translate-x-1">
                <TableCell component="th" scope="row">
                  {key.toUpperCase()}
                </TableCell>
                <TableCell>{JSON.stringify(value).replace(/^"|"$/g, '')}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  };

  // Details mode
  const [manipulateMode, setDetailsMode] = useState(false);
  const switchDetailsMode = (event, checked) => {
    setDetailsMode(checked);
  };
  const PinkSwitch = styled(Switch)(({ theme }) => ({
    "& .MuiSwitch-switchBase.Mui-checked": {
      color: "#0f0",
    },
    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
      backgroundColor: "#0f0",
    },
    "&:hover": {
      backgroundColor: alpha("#cf2", theme.palette.action.hoverOpacity),
    },
  }));
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
                  title: t("Add State"),
                  component: (
                    // <DialogStateTemplate
                    //   refreshComponent={refreshComponent}
                    //   setRefreshComponent={setRefreshComponent}
                    // />
                    <></>
                  ),
                })
              );
            }}
          >
            {t("Add")}
          </Button>

          <Button
            variant="outlined"
            startIcon={<EditFilled />}
            disabled={selectedRows.length === 0 || selectedRows.length > 1}
            className="hover:scale-105"
            sx={{
              borderRadius: "12px",
            }}
            color="success"
            onClick={() => {
              const selectedRecord = grid.current?.getSelectedRecords();
              if (selectedRecord && selectedRecord.length == 1) {
                dispatch(
                  openDrawer({
                    title: t("Edit State"),
                    component: (
                      // <DialogStateTemplate
                      //   refreshComponent={refreshComponent}
                      //   setRefreshComponent={setRefreshComponent}
                      //   data={selectedRecord[0]}
                      // />
                      <></>
                    ),
                  })
                );
              }
            }}
          >
            {t("Edit")}
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
                  fileName: `${t("States")}.xlsx`,
                  header: {
                    headerRows: 1,
                    rows: [
                      {
                        cells: [
                          {
                            colSpan: 2,
                            value: `Food Delivery Fleet Management System - ${t(
                              "States"
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
                  fileName: `${t("States")}.pdf`,
                  header: {
                    fromTop: 0,
                    height: 130,
                    contents: [
                      {
                        type: "Text",
                        value: `Food Delivery Fleet Management System - ${t(
                          "States"
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
  // =================== Grid ===================

  const openSettingsDrawer = () => {
    dispatch(
      openDrawer({
        title: `${t("Settings")}`,
        component: (
          <ManageUsersSettingsDialog
            selectedPageSize={pageSettings.pageSize}
            pageSizeOptions={pageSizeOptions}
            changePageSize={changePageSize}
            selectedExportType={exportType}
            changeExportTypeOptions={exportOptions}
            changeExportType={changeExportType}
            selectedRole={role}
            roleOptions={roleOptions}
            changeRole={changeRole}
            selectedStatus={status}
            statusOptions={statusOptions}
            changeStatus={changeStatus}
          />
        ),
      })
    );
  };

  // Details mode
  const DetailsMode = () => {
    return <div></div>;
  };

  const ManipulateMode = () => {
    return <div>{toolbarTemplate()}</div>;
  };

  return (
    <div className={darkMode ? "dark-theme pe-4" : "light-theme pe-4"}>
      <div className="flex justify-between">
        <div className="text-3xl mb-3">
          {/* <LocationCityIcon style={{ fontSize: "40px" }} /> */}
          {t("Manage Users")}
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

      <div className="border-2 ps-2 pt-2 pb-2 pe-2 mb-3 inline-block">
        <div className="text-2xl font-black text-center">
          {t("Display mode")}
        </div>

        <Stack direction="row" spacing={1} alignItems="center">
          <Typography>
            <span className={manipulateMode ? "" : "font-black"}>
              {t("Detailed")}
            </span>
          </Typography>
          <PinkSwitch checked={manipulateMode} onChange={switchDetailsMode} />
          <Typography>
            <span className={manipulateMode ? "font-black" : ""}>
              {t("Manipulation")}
            </span>
          </Typography>
        </Stack>
      </div>

      {manipulateMode ? <ManipulateMode /> : <DetailsMode />}

      <GridComponent
        ref={grid as React.RefObject<GridComponent>}
        allowSelection={true}
        queryCellInfo={customCell}
        selectionSettings={selectionOptions}
        dataSource={response.results}
        // allowPaging={true}
        // pageSettings={pageSettings}
        allowExcelExport={true}
        allowPdfExport={true}
        // enableAdaptiveUI={true}
        // rowRenderingMode="Vertical"
        allowSorting={true}
        sortSettings={sortOptions}
        allowMultiSorting={true}
        allowFiltering={true}
        // filterSettings={filterOptions}
        // contextMenuItems={contextMenuItems}
        // contextMenuClick={contextMenuClick}
        rowSelected={(args) => {
          setSelectedRows(grid.current?.getSelectedRecords());
        }}
        rowDeselected={(args) => {
          setSelectedRows(grid.current?.getSelectedRecords());
        }}
        detailTemplate={manipulateMode ? undefined : detailsTemplate}
        // detailTemplate={detailsTemplate}
      >
        <ColumnsDirective>
          {manipulateMode ? (
            <ColumnDirective type="checkbox" width="50" />
          ) : null}
          {columns.map((column) => (
            <ColumnDirective
              field={column.field}
              headerText={t(column.headerText)}
              textAlign={column.textAlign as TextAlign}
            ></ColumnDirective>
          ))}
        </ColumnsDirective>

        <Inject
          services={[
            DetailRow,
            ExcelExport,
            PdfExport,
            Sort,
            Filter,
            ContextMenu,
            Edit,
          ]}
        ></Inject>
      </GridComponent>

      <MuiGrid container className="pt-2">
        <MuiGrid item xs={3}></MuiGrid>
        <MuiGrid item xs={6} align="center">
          <div className="flex align-middle justify-center">
            <Pagination
              count={response.total_pages}
              page={response.current_page}
              onChange={(event, value) => {
                RequestParams.current.page = value;
                fetchData();
              }}
            />
          </div>
        </MuiGrid>
        <MuiGrid item xs={3} align="end">
          {t("Page")} {response.current_page} {t("of")} {response.total_pages}
        </MuiGrid>
      </MuiGrid>
    </div>
  );
};

export default ManageUsersComponent;
