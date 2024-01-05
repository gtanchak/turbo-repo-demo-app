import * as React from "react";
import { Meta, StoryObj } from "@storybook/react";
import Button from ".";

const meta = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof Button>;

export const Buttons = (args: Story) => {
  return (
    <div>
      <Button variant="contained" {...args}>
        Primary
      </Button>
    </div>
  );
};
