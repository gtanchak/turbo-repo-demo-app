import React, { FC } from "react";
import { Button as MuiButton } from "@mui/material";
import { MuiButtonProps } from "./types";

const Button: FC<MuiButtonProps> = ({ children }) => {
  return <MuiButton>{children}</MuiButton>;
};

export default Button;
