import { ReactNode, useState } from "react";
import { useLocation } from "react-router-dom";
import { Box, Menu, Divider, MenuItem, Link as MUILink } from "@mui/material";
import { Link } from "../common";

type Props = {
  options: {
    label?: string;
    path?: string;
    externalUrl?: boolean;
    separator?: boolean;
    onClick?: () => void;
  }[];
  children: ReactNode;
};

export default function CustomMenu({ options, children }: Props) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const location = useLocation();

  return (
    <>
      <Box
        id="basic-button"
        component="span"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        {children}
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="basic-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
      >
        {options.map((opt, i) =>
          opt.separator ? (
            <Divider key={i} flexItem />
          ) : opt.externalUrl ? (
            <MUILink key={i} href={opt.path} underline="none">
              <MenuItem onClick={opt.onClick}>{opt.label}</MenuItem>
            </MUILink>
          ) : opt.path ? (
            <Link
              key={i}
              to={opt.path}
              color={opt.path === location.pathname ? "secondary" : "primary"}
            >
              <MenuItem onClick={opt.onClick}>{opt.label}</MenuItem>
            </Link>
          ) : (
            <MenuItem key={i} onClick={opt.onClick}>
              {opt.label}
            </MenuItem>
          )
        )}
      </Menu>
    </>
  );
}
