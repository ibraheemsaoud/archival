import { useState } from "react";
import { IQuickLinks } from "../../../interfaces/timelineEntry.interface";
import { Box, Button, TextField } from "@mui/material";

interface IEditQuickLinks {
  entry: IQuickLinks;
  onChange: (entry: IQuickLinks) => void;
  onDelete: () => void;
}

export const EditQuickLinks = ({
  entry,
  onChange,
  onDelete,
}: IEditQuickLinks) => {
  const linksAsString = entry.links.reduce((acc, link) => {
    return `${acc}[${link.title}|${link.link}],`;
  }, "");
  const [links, setLinks] = useState(linksAsString || "");

  const onChangeLinks = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLinks(e.target.value);
  };

  const onClick = () => {
    onChange({
      ...entry,
      links: links
        .split(",")
        .map((link) => {
          const [title, linkUrl] = link
            .replace("[", "")
            .replace("]", "")
            .split("|");
          return {
            title,
            link: linkUrl,
          };
        })
        .filter((link) => link.title !== ""),
    });
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
      extra sorry about this spesific mess.
      <br />
      write the array in this format: [name|link],[name|link]
      <TextField
        id="standard-basic"
        label="links"
        variant="standard"
        fullWidth
        value={links}
        onChange={onChangeLinks}
      />
      <Button onClick={onClick}>Update</Button>
      <Button onClick={onDelete}>Delete</Button>
    </Box>
  );
};
