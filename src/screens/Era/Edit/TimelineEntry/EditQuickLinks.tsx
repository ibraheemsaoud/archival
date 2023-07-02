import { useState } from "react";
import { ITimelineEntry } from "../../../../interfaces/timelineEntry.interface";
import { Box, Button, TextField } from "@mui/material";

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
  const [links, setLinks] = useState(entry.links?.join(",") || "");

  const onChangeLinks = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLinks(e.target.value);
  };

  const onHandleChange = () => {
    onChange({
      ...entry,
      links: links
        .split(",")
        .map((id) => id.trim())
        .filter((id) => id !== ""),
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
      <TextField
        id="standard-basic"
        label="link IDs (comma separated)"
        variant="standard"
        fullWidth
        value={links}
        onChange={onChangeLinks}
        multiline
        maxRows={10}
      />
      <Button onClick={onHandleChange}>Update</Button>
      <Button onClick={onHandleDelete}>Delete</Button>
    </Box>
  );
};
