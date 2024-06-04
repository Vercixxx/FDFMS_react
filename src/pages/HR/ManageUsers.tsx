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

import AddEditUserComponent from "./AddEditUser";

// Icons
import SettingsIcon from "@mui/icons-material/Settings";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";

// Mui
import Button from "@mui/material/Button";
import Switch, { SwitchProps } from "@mui/material/Switch";
import { alpha, styled } from "@mui/material/styles";
import Pagination from "@mui/material/Pagination";
import { Menu, MenuItem, Grid as MuiGrid } from "@mui/material";

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
  ColumnChooser,
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
  DatabaseFilled,
  DownloadOutlined,
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
import { data } from "autoprefixer";

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
    await getUsers(RequestParams.current)
      .then((response) => {
        setResponse(response);
      })
      .catch((error) => {
        showSnackbar(error.message, "error");
      });
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
      field: "first_name",
      headerText: "First name",
      textAlign: "Left",
    },
    {
      field: "last_name",
      headerText: "Last name",
      textAlign: "Left",
    },
    {
      field: "email",
      headerText: "Email",
      textAlign: "Left",
    },
    {
      field: "phone",
      headerText: "Phone",
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
      field: "first_name",
      headerText: "First name",
      textAlign: "Left",
    },
    {
      field: "last_name",
      headerText: "Last name",
      textAlign: "Left",
    },
    {
      field: "phone",
      headerText: "Phone",
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
    {
      field: "rate",
      headerText: "Rate",
      textAlign: "Left",
    },
    {
      field: "user_role",
      headerText: "User Role",
      textAlign: "Left",
    },
    {
      field: "wage_tariff",
      headerText: "Wage Tariff",
      textAlign: "Left",
    },
  ];
  const [columns, setColumns] = useState(AllColumns);

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
        setColumns(DriverColumns);
        break;
      default:
        setColumns(AllColumns);
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

  // =================== Grid ===================
  let grid = useRef<Grid | null>(null);
  const selectionOptions: SelectionSettingsModel = { type: "Multiple" };
  const [selectedRows, setSelectedRows] = React.useState([]);

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

  const [exportDetails, setExportDetails] = useState(false);
  const switchExportDetails = (e) => {
    setExportDetails(e.target.value);
  };

  // Export menu
  const [isExportMenuOpen, setIsExportMenuOpen] = useState(false);
  const [exportMenuAnchorEl, setExportMenuAnchorEl] =
    React.useState<null | HTMLElement>(null);

  const openExportMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setExportMenuAnchorEl(event.currentTarget);
    setIsExportMenuOpen(true);
  };

  const closeExportMenu = () => {
    setExportMenuAnchorEl(null);
    setIsExportMenuOpen(false);
  };

  // Export to excel
  const exportExcelPdf: any = (type: string) => {
    const exportData = ExportData(exportType);

    if (exportDetails) {
      if (exportData) {
        const promises = exportData.map((data, index) =>
          getUserDetails(data.username, data.user_role).then((response) => {
            exportData[index] = response;
          })
        );

        Promise.all(promises).catch((error) => {
          showSnackbar(error.message, "error");
        });
      }
    }
    console.log(exportData);

    if (type === "excel") {
      grid.current?.excelExport({
        dataSource: exportData,
        fileName: `${t("Users")}.xlsx`,
        header: {
          headerRows: 1,
          rows: [
            {
              cells: [
                {
                  colSpan: 2,
                  value: `Food Delivery Fleet Management System - ${t(
                    "Users"
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
    } else if (type === "pdf") {
      grid.current?.pdfExport({
        dataSource: grid.current?.dataSource,
        fileName: `${t("Users")}.pdf`,
        header: {
          fromTop: 0,
          height: 130,
          contents: [
            {
              type: "Text",
              value: `Food Delivery Fleet Management System - ${t("Users")}`,
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
    showSnackbar(t("Exported successfully"), "info");
  };

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
    const [userDetails, setUserDetails] = useState({});

    const getUserData = async () => {
      await getUserDetails(props.username, props.user_role)
        .then((response) => {
          setUserDetails(response);
        })
        .catch((error) => {
          showSnackbar(error.message, "error");
        });
    };

    React.useEffect(() => {
      getUserData();
    }, []);

    return (
      <div className={`py-4 ${darkMode ? "text-white" : "text-black"}`}>
        <Table aria-label="details-table" size="small">
          <TableHead>
            <TableRow>
              <TableCell>{t("Key")}</TableCell>
              <TableCell>{t("Value")}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.entries(userDetails).map(([key, value]) => (
              <TableRow key={key} className="hover:translate-x-1">
                <TableCell component="th" scope="row">
                  {key.toUpperCase()}
                </TableCell>
                <TableCell>
                  {JSON.stringify(value).replace(/^"|"$/g, "")}
                </TableCell>
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
      <div className="flex justify-between">
        <div className="flex justify-start space-x-4">
          <Button
            variant="text"
            startIcon={<PlusCircleFilled />}
            className="hover:scale-105"
            sx={{
              borderRadius: "12px",
            }}
            color="success"
            onClick={() => {
              dispatch(
                openDrawer({
                  title: t("Add User"),
                  width: "1000",
                  component: (
                    <AddEditUserComponent
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
            variant="text"
            startIcon={<EditFilled />}
            disabled={selectedRows.length === 0 || selectedRows.length > 1}
            className="hover:scale-105"
            sx={{
              borderRadius: "12px",
            }}
            color="success"
            onClick={() => {
              const selectedRecord = grid.current?.getSelectedRecords();
              let userData = {};
              getUserDetails(
                selectedRecord[0].username,
                selectedRecord[0].user_role
              )
                .then((response) => {
                  userData = response;
                  console.log(userData);

                  if (selectedRecord && selectedRecord.length == 1) {
                    dispatch(
                      openDrawer({
                        title: t("Edit User"),
                        width: "1000",
                        component: (
                          <AddEditUserComponent
                            refreshComponent={refreshComponent}
                            setRefreshComponent={setRefreshComponent}
                            data={userData}
                          />
                        ),
                      })
                    );
                  }
                })
                .catch((error) => {
                  showSnackbar(error.message, "error");
                });
            }}
          >
            {t("Edit")}
          </Button>

          <Button
            variant="text"
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
      </div>
    );
  };
  // =================== Grid ===================

  // Context Menu
  const contextMenuItems = [
    ...(grid.current?.getSelectedRecords().length === 1
      ? [
          {
            text: t("Copy row"),
            target: ".e-content",
            id: "CopyRow",
          },
        ]
      : []),
    { text: t("Copy selected"), target: ".e-content", id: "CopySelected" },

    ...(grid.current?.getSelectedRecords().length === 1
      ? [
          {
            text: t("Export row to Excel"),
            target: ".e-content",
            id: "ExportRowToExcel",
          },
        ]
      : []),
    ...(grid.current?.getSelectedRecords().length === 1
      ? [
          {
            text: t("Export row to PDF"),
            target: ".e-content",
            id: "ExportRowToPDF",
          },
        ]
      : []),
    ...(grid.current?.getSelectedRecords().length === 1
      ? [
          {
            text: t("Edit row"),
            target: ".e-content",
            id: "EditRow",
          },
        ]
      : []),

    ...(grid.current?.getSelectedRecords().length === 1
      ? [
          {
            text: t("Delete row"),
            target: ".e-content",
            id: "DeleteRow",
          },
        ]
      : []),
    ...(grid.current?.getSelectedRecords().length > 1
      ? [
          {
            text: t("Delete selected"),
            target: ".e-content",
            id: "DeletedSelected",
          },
        ]
      : []),
  ];

  const contextMenuClick = (args) => {
    if (args.item.id === "CopyRow") {
      const selectedRecords = grid.current?.getSelectedRecords();

      if (selectedRecords && selectedRecords.length > 0) {
        const userDetails = async () => {
          return await getUserDetails(
            selectedRecords[0].username,
            selectedRecords[0].user_role
          );
        };

        userDetails()
          .then((record) => {
            const formattedRecord = Object.entries(record)
              .map(([key, value]) => `${key}: ${value}`)
              .join(", ");

            navigator.clipboard.writeText(formattedRecord);
            showSnackbar(t("Copied successfully"), "success");
          })
          .catch((error) => {
            showSnackbar(error.message, "error");
          });
      }
    } else if (args.item.id === "CopySelected") {
      const selectedRecords = grid.current?.getSelectedRecords();
      if (selectedRecords && selectedRecords.length > 0) {
        Promise.all(
          selectedRecords.map((record) =>
            getUserDetails(record.username, record.user_role)
          )
        )
          .then((detailedRecords) => {
            const formattedRecords = detailedRecords
              .map((record) =>
                Object.entries(record)
                  .map(([key, value]) => `${key}: ${value}`)
                  .join(", ")
              )
              .join("\n");

            navigator.clipboard.writeText(formattedRecords);
            showSnackbar(t("Copied successfully"), "success");
          })
          .catch((error) => {
            showSnackbar(error.message, "error");
          });
      } else {
        showSnackbar(t("Please select at least one row"), "error");
      }
    } else if (grid && args.item.id === "EditRow") {
      const selectedRecord = grid.current?.getSelectedRecords();
      if (selectedRecord && selectedRecord.length == 1) {
        dispatch(
          openDrawer({
            title: "Edit State",
            component: (
              <DialogStateTemplate
                refreshComponent={refreshComponent}
                setRefreshComponent={setRefreshComponent}
                data={selectedRecord[0]}
              />
            ),
          })
        );
      } else if (selectedRecord && selectedRecord.length > 1) {
        showSnackbar(t("Opration isn't allowed"), "error");
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
            exportDetails={exportDetails}
            switchExportDetails={switchExportDetails}
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

  // Column selector
  const columnChooserSettings = { ignoreAccent: true };

  return (
    <div className={darkMode ? "dark-theme pe-4" : "light-theme pe-4"}>
      <div className="flex justify-between">
        <div className="text-3xl mb-3">
          <ManageAccountsIcon style={{ fontSize: "40px" }} />
          {t("Manage Users")}
        </div>
        <div className=""></div>
      </div>

      {/* Second row with display mode and column selector */}
      <div className=" border-2 p-2 rounded-xl mb-4">
        <div className="flex justify-between">
          <div>
            <div className="text-2xl font-black text-center">
              {t("Display mode")}
            </div>

            <Stack direction="row" spacing={1} alignItems="center">
              <Typography>
                <span className={manipulateMode ? "" : "font-black"}>
                  {t("Detailed")}
                </span>
              </Typography>
              <PinkSwitch
                checked={manipulateMode}
                onChange={switchDetailsMode}
              />
              <Typography>
                <span className={manipulateMode ? "font-black" : ""}>
                  {t("Manipulation")}
                </span>
              </Typography>
            </Stack>
          </div>

          {/* Column selector */}
          <div className="flex space-x-4 items-center">
            <Button
              startIcon={<SettingsIcon />}
              variant="text"
              onClick={openSettingsDrawer}
              className="hover:scale-105"
              sx={{
                borderRadius: "12px",
              }}
            >
              {t("Settings")}
            </Button>
            <Button
              variant="text"
              startIcon={<DatabaseFilled />}
              className="hover:scale-105"
              sx={{
                borderRadius: "12px",
              }}
              color="info"
              onClick={() => {
                grid.current.columnChooserModule.openColumnChooser();
              }}
            >
              {t("Select columns")}
            </Button>
            {manipulateMode ? (
              <>
                <Button
                  id="export-button"
                  aria-controls={isExportMenuOpen ? "export-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={isExportMenuOpen ? "true" : undefined}
                  onClick={openExportMenu}
                  startIcon={<DownloadOutlined />}
                  className="hover:scale-105"
                  sx={{
                    borderRadius: "12px",
                  }}
                  disabled={selectedRows.length === 0}
                >
                  {t("Export")}
                </Button>
                <Menu
                  id="export-menu"
                  anchorEl={exportMenuAnchorEl}
                  open={isExportMenuOpen}
                  onClose={closeExportMenu}
                  MenuListProps={{
                    "aria-labelledby": "export-button",
                  }}
                >
                  <MenuItem onClick={() => exportExcelPdf("excel")}>
                    <div className="flex justify-between hover:scale-105">
                      <FileExcelFilled className="me-2" />
                      {t("Export to Excel")}
                    </div>
                  </MenuItem>
                  <MenuItem onClick={() => exportExcelPdf("pdf")}>
                    <div className="flex justify-between hover:scale-105">
                      <FilePdfFilled className="me-2" />
                      {t("Export to PDF")}
                    </div>
                  </MenuItem>
                </Menu>
              </>
            ) : null}
          </div>
        </div>

        <div className="mt-4">
          {manipulateMode ? <ManipulateMode /> : <DetailsMode />}
        </div>
      </div>

      <GridComponent
        ref={grid as React.RefObject<GridComponent>}
        emptyRecordTemplate={t("No records found")}
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
        contextMenuItems={manipulateMode ? contextMenuItems : undefined}
        contextMenuClick={manipulateMode ? contextMenuClick : undefined}
        rowSelected={(args) => {
          setSelectedRows(grid.current?.getSelectedRecords());
        }}
        rowDeselected={(args) => {
          setSelectedRows(grid.current?.getSelectedRecords());
        }}
        detailTemplate={manipulateMode ? undefined : detailsTemplate}
        showColumnChooser={true}
        columnChooserSettings={columnChooserSettings}
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
              type={column.field === "date_joined" ? "datetime" : undefined}
              format={column.field === "date_joined" ? "dd/MM/yyyy" : undefined}
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
            ColumnChooser,
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
