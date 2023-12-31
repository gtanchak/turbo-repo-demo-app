import * as React from "react";
import { Meta, StoryObj } from "@storybook/react";
import Button from ".";

export default {
  title: "Button",
  component: Button,
} as ComponentMeta<typeof Button>;

export const Primary: ComponentStory<typeof Button> = (args) => (
  <Button {...args} />
);
