import { Autocomplete, Box, TextField } from "@mui/material";
import { useLoaderData } from "react-router-dom";
import { IEntry } from "../../interfaces/entry.interface";
import { useState } from "react";
import { DisplayEntryCard } from "../Timeline/components";

export const EntryAutocomplete = (props: any) => {
  const { entries } = useLoaderData() as any as {
    entries: IEntry[];
  };
  const defaultValue = entries.filter((entry: IEntry) =>
    props?.defaultValue?.includes(entry.$id)
  );
  const [selectedEntries, setSelectedEntries] =
    useState<IEntry[]>(defaultValue);

  const onChange = (newEntries: IEntry[]) => {
    props?.onChange?.(selectedEntries.map((entry) => entry.$id));
    setSelectedEntries(newEntries);
  };

  return (
    <Autocomplete<IEntry>
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
          onChange([...selectedEntries, newValue]);
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
      options={[...entries].sort((a, b) => {
        // Display the selected entries first.
        let ai = selectedEntries.indexOf(a);
        ai = ai === -1 ? selectedEntries.length + entries.indexOf(a) : ai;
        let bi = selectedEntries.indexOf(b);
        bi = bi === -1 ? selectedEntries.length + entries.indexOf(b) : bi;
        return ai - bi;
      })}
      getOptionLabel={(option) => option.title}
      renderInput={(params) => (
        <TextField {...params} placeholder="entry title" />
      )}
    />
  );
};
