import { Autocomplete, TextField } from "@mui/material";
import { useState } from "react";
import { useRequestSearchPosts } from "../../requests/useRequestPost";
import { Error } from "../Error";
import { IPost } from "../../interfaces/post.interface";
import { useDebounce } from "use-debounce";

export const PostSearch = ({
  onSelect,
}: {
  onSelect: (post: IPost | null) => void;
}) => {
  const [query, setQuery] = useState("");
  const [debouncedText] = useDebounce(query, 300);

  const { data, isLoading, error, isFetching } = useRequestSearchPosts(debouncedText);

  if (error) {
    return <Error error={error} />;
  }

  const posts = data || ([] as IPost[]);

  return (
    <Autocomplete
      id="grouped-demo"
      isOptionEqualToValue={(option, value) => option.$id === value.$id}
      options={posts.sort(
        (a, b) => -b.season.brand.name.localeCompare(a.season.brand.name)
      )}
      onChange={(event, newValue) => {
        onSelect(newValue);
      }}
      clearOnBlur={false}
      loading={isLoading || isFetching}
      groupBy={(post) => post.season.brand.name}
      getOptionLabel={(post) => `${post.postTitle} - ${post.season.name}`}
      sx={{ width: 300 }}
      onInputChange={(event, newInputValue) => {
        setQuery(newInputValue);
      }}
      renderInput={(params) => (
        <TextField {...params} label="Search for a post" />
      )}
    />
  );
};
