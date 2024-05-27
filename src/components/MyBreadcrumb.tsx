import React from "react";
import { useDispatch } from "react-redux";
import { setCurrentMainComponent } from "../store/currentMainComponentSlice";

// Icon
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

// Redux
import { useSelector } from "react-redux";

// i18n
import { useTranslation } from "react-i18next";

// Paths
import { ElementType } from "react";

// Icons
import HomeIcon from "@mui/icons-material/Home";
import GroupIcon from "@mui/icons-material/Group";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import SensorOccupiedIcon from "@mui/icons-material/SensorOccupied";
import FlagIcon from "@mui/icons-material/Flag";

interface Path {
  title?: string;
  component?: string;
  icon?: ElementType;
  path?: Path[];
}

const MyBreadcrumb: React.FC = () => {
  // i18n
  const { t } = useTranslation();

  const paths: Path[] = [
    {
      title: t("Home"),
      component: "HomePage",
      icon: HomeIcon,
    },
    // HR
    {
      title: "HRAddUserComponent",
      component: "HRAddUserComponent",
      icon: GroupIcon,
      path: [
        {
          title: t("Users"),
          icon: GroupIcon,
        },
        {
          title: t("Add User"),
          icon: PersonAddAltIcon,
        },
        {
          title: t("HR"),
          icon: SensorOccupiedIcon,
        },
      ],
    },

    {
      title: "ManageUsersComponent",
      component: "ManageUsersComponent",
      icon: GroupIcon,
      path: [
        {
          title: t("Users"),
          icon: GroupIcon,
        },
        {
          title: t("Manage Users"),
          icon: GroupIcon,
        },
      ],
    },

    // All
    {
      title: "ManageCountriesComponent",
      component: "ManageCountriesComponent",
      icon: FlagIcon,
      path: [
        {
          title: t("Other"),
          icon: FlagIcon,
        },
        {
          title: t("Manage countries"),
          icon: FlagIcon,
        },
      ],
    },
    {
      title: "ManageStatesComponent",
      component: "ManageStatesComponent",
      icon: FlagIcon,
      path: [
        {
          title: t("Other"),
          icon: FlagIcon,
        },
        {
          title: t("Manage states"),
          icon: FlagIcon,
        },
      ],
    },
  ];

  const currentComponent = useSelector(
    (state: any) => state.currentMainComponent.value
  );

  const firstPath = paths[0];
  const currentPath =
    paths.find((item) => item.component === currentComponent)?.path || [];
  let path = [];

  if (firstPath) {
    path.push(firstPath);
  }

  path = path.concat(currentPath);

  const dispatch = useDispatch();
  const switchToComponent = (component: string) => {
    if (component && currentComponent !== component) {
      dispatch(
        setCurrentMainComponent({
          value: component,
        })
      );
    }
  };

  return (
    <div className="text-sm flex">
      {path.map((item, index) => (
        <div className="flex select-none" key={index}>
          <div
            className={`flex ${
              item.component && currentComponent != "HomePage"
                ? "cursor-pointer hover:scale-110 font-black"
                : "font-extralight"
            }`}
            onClick={() => switchToComponent(item.component)}
          >
            <div>{item.icon ? <item.icon fontSize="small" /> : null}</div>
            {item.title && <div className="text-base px-2">{item.title}</div>}
          </div>
          {index < path.length - 1 ? (
            <div>
              &nbsp;
              <ArrowForwardIosIcon fontSize="small" />
              &nbsp;
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
};

export default MyBreadcrumb;
