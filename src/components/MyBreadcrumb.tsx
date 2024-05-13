import React from "react";
import { useDispatch } from "react-redux";
import { setCurrentMainComponent } from "../store/currentMainComponentSlice";

// Icon
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

// Redux
import { useSelector } from "react-redux";

const MyBreadcrumb: React.FC = () => {
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
      console.log("component", currentComponent);
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
              item.component && currentComponent != 'HomePage'
                ? "cursor-pointer hover:scale-110 font-black"
                : "font-extralight"
            }`} onClick={() => switchToComponent(item.component)}
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

// Paths
import { ElementType } from "react";

// Icons
import HomeIcon from "@mui/icons-material/Home";
import GroupIcon from "@mui/icons-material/Group";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import SensorOccupiedIcon from "@mui/icons-material/SensorOccupied";

interface Path {
  title?: string;
  component?: string;
  icon?: ElementType;
  path?: Path[];
}

const paths: Path[] = [
  {
    title: "Home",
    component: "HomePage",
    icon: HomeIcon,
  },

  {
    title: "HRAddUserComponent",
    component: "HRAddUserComponent",
    icon: GroupIcon,
    path: [
      {
        title: "Users",
        icon: GroupIcon,
      },
      {
        title: "Add User",
        icon: PersonAddAltIcon,
      },
      {
        title: "HR",
        icon: SensorOccupiedIcon,
      },
    ],
  },
];
