import { useEffect, useState } from "react";
import { ITimelineEntry } from "../../../../interfaces/timelineEntry.interface";
import { Box, Button } from "@mui/material";
import { H5TextField } from "../../../../components/H5TextField";
import { QuickLinks } from "../../../../components/Timeline/components";
import { LinkAutocomplete } from "../../../../components";

interface IEditQuickLinks {
  entry: ITimelineEntry;
  onChange: (entry: ITimelineEntry) => void;
  onDelete: (entry: ITimelineEntry) => void;
  onMoveDown: (entry: ITimelineEntry) => void;
  onMoveUp: (entry: ITimelineEntry) => void;
}

export const EditQuickLinks = ({
  entry,
  onChange,
  onDelete,
  onMoveDown,
  onMoveUp,
}: IEditQuickLinks) => {
  const [linkList, setLinkList] = useState(entry.links || []);
  const [order, setOrder] = useState(entry.order || 0);

  useEffect(() => {
    setLinkList(entry.links || []);
    setOrder(entry.order || 0);
  }, [entry]);

  const onChangeLinks = (links: string[]) => {
    setLinkList(links);
  };
  const onChangeOrder = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOrder(parseInt(e.target.value));
  };

  const onHandleChange = () => {
    onChange({
      ...entry,
      links: linkList,
      order,
    });
  };

  const onHandleDelete = () => {
    onDelete(entry);
  };

  const onHandleMoveUp = () => {
    onMoveUp(entry);
  };

  const onHandleMoveDown = () => {
    onMoveDown(entry);
  };

  return (
    <Box
      sx={{
        marginY: 2,
      }}
    >
      <QuickLinks entry={{ ...entry, links: linkList }} />
      <LinkAutocomplete
        id="linkIds"
        defaultValue={linkList}
        onChange={onChangeLinks}
        sx={{ marginY: 2 }}
      />
      <H5TextField
        id="order"
        placeholder="Order"
        variant="standard"
        type="number"
        fullWidth
        value={order}
        onChange={onChangeOrder}
        sx={{ marginBottom: 2 }}
      />
      <Button onClick={onHandleChange}>Update</Button>
      <Button onClick={onHandleDelete}>Delete</Button>
      <Button onClick={onHandleMoveUp}>Move Up</Button>
      <Button onClick={onHandleMoveDown}>Move Down</Button>
    </Box>
  );
};
