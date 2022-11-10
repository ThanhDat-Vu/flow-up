import { Link as MUILink } from "@mui/material";
import { Link as BaseLink } from "react-router-dom";

export default function Link({ children, ...props }: any) {
  return (
    <MUILink {...props} component={BaseLink}>
      {children}
    </MUILink>
  );
}
