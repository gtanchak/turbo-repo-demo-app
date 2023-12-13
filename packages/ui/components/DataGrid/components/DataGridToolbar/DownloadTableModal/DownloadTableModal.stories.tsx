import { ComponentMeta, ComponentStory } from '@storybook/react';
import DownloadTableModal from './index';

export default {
  title: 'Components/MUI X/Data Grid/Components/Download Table Modal',
  component: DownloadTableModal,
} as ComponentMeta<typeof DownloadTableModal>;

export const DownloadTableModalPrimary: ComponentStory<
  typeof DownloadTableModal
> = () => {
  return (
    <DownloadTableModal
      openModal={true}
      setOpenModal={false}
      formatTypes={['CSV', 'PDF', 'XLSX']}
      properties={['All properties on records', 'Current filtered properties']}
    />
  );
};
