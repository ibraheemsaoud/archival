import { Autocomplete, TextField } from "@mui/material";
import { useState } from "react";
import { Error } from "../Error";
import { useDebounce } from "use-debounce";
import { IBrand } from "../../interfaces/brand.interface";
import { useRequestBrandList } from "../../requests/useRequestBrand";

export const BrandSearch = ({
  onSelect,
  isDisabled,
}: {
  onSelect: (brand: IBrand | null) => void;
  isDisabled?: boolean;
}) => {
  const [query, setQuery] = useState("");
  const [debouncedText] = useDebounce(query, 300);

  const { data, isLoading, error, isFetching } =
    useRequestBrandList(debouncedText);

  if (error) {
    return <Error error={error} />;
  }

  const brands = data || ([] as IBrand[]);

  return (
    <Autocomplete
      id="grouped-demo"
      isOptionEqualToValue={(option, value) => option.$id === value.$id}
      options={brands.sort((a, b) => -b.name.localeCompare(a.name))}
      onChange={(event, newValue) => {
        onSelect(newValue);
      }}
      clearOnBlur={false}
      loading={isLoading || isFetching}
      getOptionLabel={(brand) => brand.name}
      sx={{
        width: "-webkit-fill-available",
        marginBottom: 2,
      }}
      disabled={isDisabled}
      onInputChange={(event, newInputValue) => {
        setQuery(newInputValue);
      }}
      color="primary"
      renderInput={(params) => (
        <TextField {...params} label="Search for a brand" variant="filled" />
      )}
    />
  );
};
