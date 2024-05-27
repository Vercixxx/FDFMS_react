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
import { QueryParams, getUsers } from "../../scripts/users";

// Icons
import SettingsIcon from "@mui/icons-material/Settings";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";

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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
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
    currentPage: number;
    next: string | null;
    previous: string | null;
    total_results: number | null;
    total_pages: number | null;
    results: any[] | null;
  }

  // Get users
  const [response, setResponse] = useState<Response>({
    currentPage: 1,
    next: "",
    previous: "",
    total_results: 0,
    total_pages: 0,
    results: [],
  });
  useEffect(() => {
    const fetchData = async () => {
      const data = await getUsers(RequestParams.current);
      if (data.type === "error") {
        console.log(data);
        showSnackbar(data.message, "error");
      } else {
        setResponse(data);
      }
    };
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

  // Configurations
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
  const pageSizeOptions = [5, 10, 20, 50, 100];
  const [pageSettings, setPageSettings] = useState({ pageSize: 10 });
  const changePageSize = (e) => {
    RequestParams.current.limit = e.target.value;
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
    columns: [{ field: "Name", direction: "Ascending" }],
  };

  //   Details
  const detailsTemplate = (props) => {
    const src = props.EmployeeID + ".png";
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
            {Object.entries(props).map(([key, value]) => (
              <TableRow key={key} className="hover:translate-x-1">
                <TableCell component="th" scope="row">
                  {key.toUpperCase()}
                </TableCell>
                <TableCell>
                  {JSON.stringify(value).toUpperCase().replace(/^"|"$/g, "")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
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
          />
        ),
      })
    );
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

      <GridComponent
        ref={grid as React.RefObject<GridComponent>}
        allowSelection={true}
        queryCellInfo={customCell}
        selectionSettings={selectionOptions}
        dataSource={response?.results || []}
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
        // filterSettings={filterOptions}
        // contextMenuItems={contextMenuItems}
        // contextMenuClick={contextMenuClick}
        rowSelected={(args) => {
          setSelectedRows(grid.current?.getSelectedRecords());
        }}
        rowDeselected={(args) => {
          setSelectedRows(grid.current?.getSelectedRecords());
        }}
        detailTemplate={detailsTemplate}
      >
        <ColumnsDirective>
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
    </div>
  );
};

export default ManageUsersComponent;
