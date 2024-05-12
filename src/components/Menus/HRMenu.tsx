import * as React from "react";
import {
  List,
  ListItem,
  Divider,
  Menu,
  MenuItem,
  Grid,
  MenuProps,
} from "@mui/material";




// Redux
// import { useDispatch } from "react-redux";
// import { setCurrentMainComponent } from "../../store/currentMainComponentSlice";

// Icons
import Icon from "@mdi/react";
import { mdiAccountGroup, mdiDotsHorizontal, mdiMailbox } from "@mdi/js";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

interface MyMenuItem {
  title: string;
  icon: string;
  onClick: () => void,
  options: MyMenuItem[];
}

// Items
const UsersButton: MyMenuItem = {
  title: "Users",
  icon: mdiAccountGroup,
  onClick: () => {
    console.log("Add User clicked");
  },
  options: [
    {
      title: "Add User",
      icon: mdiAccountGroup,
      onClick: () => console.log("Add Users clicked"),
      options: [],
    },
    {
      title: "View Users",
      icon: mdiAccountGroup,
      onClick: () => console.log("View Users clicked"),
      options: [],
    },
  ],
};

const OtherButton: MyMenuItem = {
  title: "Other",
  icon: mdiDotsHorizontal,
  onClick: () => console.log("Other clicked"),
  options: [
    {
      title: "Other 1",
      icon: mdiAccountGroup,
      onClick: () => console.log("Other 1 clicked"),
      options: [],
    },
    {
      title: "Other 2",
      icon: mdiAccountGroup,
      onClick: () => console.log("Other 2 clicked"),
      options: [],
    },
  ],
};

const MailboxButton: MyMenuItem = {
  title: "Mailbox",
  icon: mdiMailbox,
  onClick: () => console.log("Mailbox clicked"),
  options: [
    {
      title: "Mail 1",
      icon: mdiAccountGroup,
      onClick: () => console.log("Mail 1 clicked"),
      options: [],
    },
    {
      title: "Mail 2",
      icon: mdiAccountGroup,
      onClick: () => console.log("Mail 2 clicked"),
      options: [],
    },
  ],
};
// Items

const StyledMenu = (props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
    sx={{
      '& .MuiPaper-root': {
        borderRadius: 0,
        mt: 1,
        minWidth: 180,
        color: (theme) => theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
        boxShadow: 'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
          padding: '4px 0',
        },
        '& .MuiMenuItem-root': {
          '& .MuiSvgIcon-root': {
            fontSize: 18,
            color: (theme) => theme.palette.text.secondary,
            mr: 1.5,
          },
          '&:active': {
            backgroundColor: 'rgba(52, 52, 52, 0.2)'
          },
        },
      },
    }}
  />
);

// Menu
const MyStyledMenuItem: React.FC<{ ItemObject: MyMenuItem }> = ({
  ItemObject,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Redux

  return (
    <div className="min-w-full cursor-pointer hover:scale-105">
      <div
        className=""
        id="demo-customized-button"
        aria-controls={open ? "demo-customized-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <Grid container spacing={0}>
          <Grid item xs={2}>
            <Icon path={ItemObject.icon} size={1} />
          </Grid>

          <Grid item xs={8}>
            {ItemObject.title}
          </Grid>

          <Grid item xs={2}>
            <KeyboardArrowUpIcon
              style={
                open
                  ? {
                      transition: "transform 0.2s ease-in-out",
                      transform: "rotate(180deg)",
                    }
                  : {
                      transition: "transform 0.2s ease-in-out",
                      transform: "rotate(0deg)",
                    }
              }
            />
          </Grid>
        </Grid>
      </div>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {ItemObject.options.map((item, index) => (
          <MenuItem key={index} onClick={item.onClick}>
            <Icon path={item.icon} size={1} />
            {item.title}
          </MenuItem>
        ))}
      </StyledMenu>
    </div>
  );
};

export default function HRDrawer() {

  return (
    <div>
    <List>
        {[UsersButton, OtherButton, MailboxButton].map((button, index) => (
          <ListItem key={index}>
            <MyStyledMenuItem ItemObject={button} />
          </ListItem>
        ))}
      </List>
    </div>
  );
}
