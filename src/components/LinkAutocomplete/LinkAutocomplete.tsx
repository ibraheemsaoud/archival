import { Autocomplete, Box, TextField, Typography } from "@mui/material";
import { useLoaderData } from "react-router-dom";
import { ILink } from "../../interfaces/timelineEntry.interface";
import { useState } from "react";

export const LinkAutocomplete = (props: any) => {
  const { links } = useLoaderData() as any as {
    links: ILink[];
  };
  const defaultValue = links.filter((link: ILink) =>
    props?.defaultValue?.includes(link.$id)
  );
  const [selectedLinks, setSelectedLinks] = useState<ILink[]>(defaultValue);

  const onChange = (newLinks: ILink[]) => {
    props?.onChange?.(selectedLinks.map((link) => link.$id));
    setSelectedLinks(newLinks);
  };

  return (
    <Autocomplete<ILink>
      {...props}
      defaultValue={defaultValue}
      disablePortal
      multiple
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      onChange={(event, newValue, reason) => {
        if (
          event.type === "keydown" &&
          (event as React.KeyboardEvent).key === "Backspace" &&
          reason === "removeOption"
        ) {
          return;
        }
        if (newValue) {
          onChange([...selectedLinks, newValue]);
        }
      }}
      noOptionsText="No Links"
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Box
            sx={{
              textAlign: "left",
            }}
          >
            <Typography variant="body1">{option.title}</Typography>
            <Typography variant="body2" sx={{ overflow: "hidden" }}>
              {option.link}
            </Typography>
          </Box>
        </li>
      )}
      options={[...links].sort((a, b) => {
        // Display the selected links first.
        let ai = selectedLinks.indexOf(a);
        ai = ai === -1 ? selectedLinks.length + links.indexOf(a) : ai;
        let bi = selectedLinks.indexOf(b);
        bi = bi === -1 ? selectedLinks.length + links.indexOf(b) : bi;
        return ai - bi;
      })}
      getOptionLabel={(option) => option.title}
      renderInput={(params) => (
        <TextField {...params} placeholder="Link title" />
      )}
    />
  );
};
