import { useState } from "react";
import {
  ILink,
  ITimelineEntry,
} from "../../../../interfaces/timelineEntry.interface";
import { Autocomplete, Box, Button, TextField } from "@mui/material";
import { useLoaderData } from "react-router-dom";

interface IEditQuickLinks {
  entry: ITimelineEntry;
  onChange: (entry: ITimelineEntry) => void;
  onDelete: (entry: ITimelineEntry) => void;
}

export const EditQuickLinks = ({
  entry,
  onChange,
  onDelete,
}: IEditQuickLinks) => {
  const { links } = useLoaderData() as any as {
    links: ILink[];
  };

  const [linkList, setLinkList] = useState(entry.links || []);

  const onChangeLinks = (_: any, value: string[]) => {
    setLinkList(value);
  };

  const onHandleChange = () => {
    onChange({
      ...entry,
      links: linkList,
    });
  };

  const onHandleDelete = () => {
    onDelete(entry);
  };

  return (
    <Box
      sx={(theme) => ({
        margin: 1,
        paddingX: 1,
        paddingY: 2,
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: 1,
      })}
    >
      QuickLinks: Shows a set of links and titles.
      <br />
      <Autocomplete
        disablePortal
        id="linkIds"
        options={links.map((entry: ILink) => entry.$id)}
        sx={{ marginY: 2 }}
        onChange={onChangeLinks}
        defaultValue={linkList}
        multiple
        renderInput={(params) => (
          <TextField {...params} label="link IDs (comma separated)" />
        )}
      />
      <Button onClick={onHandleChange}>Update</Button>
      <Button onClick={onHandleDelete}>Delete</Button>
    </Box>
  );
};
