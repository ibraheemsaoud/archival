import { Autocomplete, Box, TextField } from "@mui/material";
import { useLoaderData } from "react-router-dom";
import { IEntry } from "../../interfaces/entry.interface";
import { DisplayEntryCard } from "../Timeline/components";

export const SingleEntryAutocomplete = (props: any) => {
  const { entries } = useLoaderData() as any as {
    entries: IEntry[];
  };
  const defaultValue = entries.find(
    (entry: IEntry) => props?.defaultValue === entry.$id
  );

  const onChange = (entry: IEntry) => {
    props?.onChange?.(entry.$id);
  };

  return (
    <Autocomplete<IEntry>
      {...props}
      defaultValue={defaultValue}
      disablePortal
      multiple={false}
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
          onChange(newValue);
        }
      }}
      noOptionsText="No Links"
      renderOption={(props, option, { selected }) => (
        <li
          {...props}
          style={{
            ...props.style,
          }}
        >
          <Box
            sx={{
              textAlign: "left",
            }}
          >
            <DisplayEntryCard entry={option} />
          </Box>
        </li>
      )}
      options={entries}
      getOptionLabel={(option) => option.title}
      renderInput={(params) => (
        <TextField {...params} placeholder="entry title" />
      )}
    />
  );
};
