import { ComponentMeta, ComponentStory } from '@storybook/react';
import PrimaryTableModal from './PrimaryTableModal';

export default {
  title: 'Components/MUI X/Data Grid/Components/Primary Table Modal',
  component: PrimaryTableModal,
} as ComponentMeta<typeof PrimaryTableModal>;

export const Primary: ComponentStory<typeof PrimaryTableModal> = () => {
  return (
    <PrimaryTableModal
      openModal={true}
      headerText="Edit Columns"
      buttonText="Save"
    />
  );
};
