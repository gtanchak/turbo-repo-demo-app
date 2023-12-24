import React, { FC } from "react";
import { Button as MuiButton } from "@mui/material";
import { MuiButtonProps } from "./types";

const Button: FC<MuiButtonProps> = ({ children, ...rest }) => {
  return <MuiButton {...rest}>{children}</MuiButton>;
};

export default Button;
