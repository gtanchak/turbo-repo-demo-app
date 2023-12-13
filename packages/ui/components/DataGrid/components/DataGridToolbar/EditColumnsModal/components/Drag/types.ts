export type ColumnsType = {
  id: number | string;
  field: string;
  dragDisabled: boolean;
  isChecked: boolean;
};

export type SelectedType = {
  [id: string | number]: boolean | undefined;
};

export interface DragType {
  columns: ColumnsType[];
  setColumns: React.Dispatch<React.SetStateAction<ColumnsType[]>>;
  selected: SelectedType;
  setSelected: React.Dispatch<React.SetStateAction<SelectedType>>;
  setAllSelected: React.Dispatch<React.SetStateAction<boolean>>;
}
