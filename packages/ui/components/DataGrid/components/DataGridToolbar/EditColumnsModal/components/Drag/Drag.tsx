import { Icon } from '@bilflo.ui/ui-component-library';
import { faXmark } from '@fortawesome/pro-light-svg-icons';
import { faGripVertical } from '@fortawesome/pro-solid-svg-icons';
import { List, ListItem, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { capitalizeFirstLetter, stringSeparator } from '@bilflo.ui/utils';
import { DragType } from './types';
import { useStyle } from './useStyle';

const Drag: React.FC<DragType> = ({
  columns,
  setColumns,
  selected,
  setSelected,
  setAllSelected
}) => {
  const {
    mainList,
    dragHeader,
    dragHeaderText,
    dragList,
    dragItemText,
    scroll
  } = useStyle();

  const handleOnDragEnd = (result: any) => {
    if (!result.destination) return;

    const pinned: any = [];
    const notPinned = columns.filter((item: any) =>
      Object.keys(selected)
        .filter((itemm) => selected[itemm] === true)
        .includes(item.field.toString())
    );

    const remainingRows = columns.filter(
      (item: any) =>
        !Object.keys(selected).some(
          (itemm) => selected[itemm] === true && item.field.toString() === itemm
        )
    );

    const items: any = Array.from(notPinned);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    items.forEach((element: any) => {
      pinned.push(element);
    });

    remainingRows.forEach((element: any) => {
      pinned.push(element);
    });
    setColumns(pinned);
  };

  const toDisplay = columns.filter((item: any) =>
    Object.keys(selected)
      .filter((itemm) => selected[itemm] === true)
      .includes(item.field.toString())
  );

  return (
    <Box sx={scroll}>
      {columns.map(({ dragDisabled, field }: any, index: number) => {
        if (dragDisabled) {
          return (
            <ListItem sx={dragHeader} key={field}>
              <Typography sx={dragHeaderText}>{field}</Typography>
            </ListItem>
          );
        }
      })}

      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="columns">
          {(provided: any) => (
            <List
              ref={provided.innerRef}
              {...provided.droppableProps}
              sx={mainList}
            >
              {toDisplay.map(
                ({ id, field, dragDisabled }: any, index: number) => {
                  if (selected[field] && !dragDisabled) {
                    return (
                      <Draggable
                        key={id}
                        draggableId={`${field}`}
                        index={index}
                      >
                        {(provided: any) => (
                          <Stack
                            direction="row"
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <ListItem sx={dragList}>
                              <Stack direction="row">
                                <Box>
                                  <Icon
                                    icon={faGripVertical}
                                    style={{ color: '#A6AFB1' }}
                                  />
                                </Box>
                                <Box>
                                  <Typography sx={dragItemText}>
                                    {capitalizeFirstLetter(
                                      stringSeparator(field)
                                    )}
                                  </Typography>
                                </Box>
                              </Stack>
                              <Box>
                                <Icon
                                  onClick={() => {
                                    const newArr = [...columns];

                                    newArr.filter((col: any) => {
                                      if (col.field === field) {
                                        col.isChecked = false;
                                      }
                                    });

                                    setSelected((selected: any) => ({
                                      ...selected,
                                      [field]: false
                                    }));
                                    setAllSelected(false);
                                    setColumns(newArr);
                                  }}
                                  icon={faXmark}
                                  style={{
                                    color: '#A6AFB1',
                                    cursor: 'pointer'
                                  }}
                                />
                              </Box>
                            </ListItem>
                          </Stack>
                        )}
                      </Draggable>
                    );
                  }
                }
              )}
              {provided.placeholder}
            </List>
          )}
        </Droppable>
      </DragDropContext>
    </Box>
  );
};
export default Drag;
