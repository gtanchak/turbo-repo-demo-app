import * as React from "react";
import { Meta, StoryObj } from "@storybook/react";
import Button from ".";

export default {
  title: "Button",
  component: Button,
} as Meta;

export const Primary: StoryObj<typeof Button> = (args) => <Button {...args} />;
