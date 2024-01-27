import {
  Typography,
  TextField,
  Button,
  FormControlLabel,
  Grid,
  Checkbox,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Autocomplete,
} from "@mui/material";
import { UploadImage, useUploadImage } from "../UploadImage";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useUser } from "../../hooks";
import { requestUploadFile } from "../../requests/requestUploadFile";
import { useRequestCreateSeason } from "../../requests/useRequestSeason";
import { useCreateASeason } from "./useCreateASeason";
import { Server } from "../../config/server";
import { ISeasonCreateErrors } from "../../interfaces/season.interface";
import { Error } from "../Error";
import { ExpandMore } from "@mui/icons-material";
import { BrandSearch } from "../BrandSearch";

export const CreateASeason = ({ fashionWeekId }: { fashionWeekId: string }) => {
  const {
    name,
    setName,
    slug,
    setSlug,
    brandId,
    setBrandId,
    primaryColor,
    setPrimaryColor,
    secondaryColor,
    setSecondaryColor,
    tags,
    handleUpdateTags,
    tagList,
    isPublic,
    handleIsPublic,
  } = useCreateASeason();
  const [outsideLink, setOutsideLink] = useState("");
  const [submissionError, setSubmissionError] = useState<ISeasonCreateErrors>(
    {}
  );
  const [generalErrors, setGeneralErrors] = useState<string>("");

  const { file, onChangeFile, onReset, pictureUrl, onRemoveFile } =
    useUploadImage({});
  const { mutate, isSuccess, error } = useRequestCreateSeason();
  const { user } = useUser();

  const onCreate = async () => {
    if (!user) {
      setGeneralErrors("missing user data");
      return;
    }
    if (!pictureUrl && !outsideLink) {
      setSubmissionError({ coverImage: "missing cover image" });
      return;
    }
    let pictureLink = undefined;
    if (outsideLink === "") {
      pictureLink = await requestUploadFile(file, user.$id);
    }
    if (pictureLink || outsideLink !== "") {
      mutate({
        name,
        slug,
        coverImage: pictureLink || outsideLink,
        primaryColor,
        secondaryColor,
        fashionWeek: fashionWeekId,
        brand: brandId,
        tags,
        isPublic,
      });
    } else {
      setSubmissionError({ coverImage: "failed to upload image" });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      onRemoveFile();
      setName("");
      setOutsideLink("");
      setPrimaryColor("");
      setSecondaryColor("");
      setBrandId("");
      handleUpdateTags(undefined as any, []);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  useEffect(() => {
    if (error) {
      toast.error(error.toString());
    }
  }, [error]);

  if (!user) return null;
  if (user.$id !== Server.adminId) return null;

  return (
    <form>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography variant="h6" component="div">
            Create a new Season
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container>
            <Grid item xs={12}>
              <Error error={generalErrors} />
            </Grid>
            <Grid item xs={12}>
              <UploadImage
                onChangeFile={onChangeFile}
                file={file}
                onReset={onReset}
                pictureUrl={pictureUrl}
                error={submissionError.coverImage}
                height="350px"
              />
              {!file && (
                <>
                  OR
                  <TextField
                    id="outsideLink"
                    label="cover image link"
                    variant="filled"
                    sx={{
                      width: "-webkit-fill-available",
                      marginBottom: 2,
                    }}
                    color="primary"
                    value={outsideLink}
                    onChange={(e) => setOutsideLink(e.target.value)}
                  />
                </>
              )}
            </Grid>
            <BrandSearch onSelect={(brand) => setBrandId(brand?.$id || "")} />
            <Grid item xs={6}>
              <TextField
                id="name"
                label="name"
                variant="filled"
                sx={{
                  width: "-webkit-fill-available",
                  marginBottom: 2,
                }}
                color="primary"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                id="slug"
                label="slug"
                variant="filled"
                sx={{
                  width: "-webkit-fill-available",
                  marginBottom: 2,
                }}
                color="primary"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
              />
            </Grid>
            <Grid item xs={1} />
            <Grid item xs={5}>
              <TextField
                id="primary-color"
                label="primary color"
                variant="filled"
                sx={{
                  width: "-webkit-fill-available",
                  marginBottom: 2,
                }}
                color="primary"
                type="color"
                value={primaryColor || "#000000"}
                onChange={(e) => setPrimaryColor(e.target.value)}
              />
              <TextField
                id="secondary-color"
                label="secondary color"
                variant="filled"
                sx={{
                  width: "-webkit-fill-available",
                  marginBottom: 2,
                }}
                color="primary"
                type="color"
                value={secondaryColor || "#FFFFFF"}
                onChange={(e) => setSecondaryColor(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Autocomplete
                disablePortal
                multiple
                id="tags"
                options={tagList}
                color="primary"
                sx={{
                  width: "-webkit-fill-available",
                  marginBottom: 2,
                }}
                isOptionEqualToValue={(option, value) =>
                  option.value === value.value
                }
                onChange={handleUpdateTags}
                renderInput={(params) => (
                  <TextField {...params} label="select tags" variant="filled" />
                )}
              />
            </Grid>
            <FormControlLabel
              control={
                <Checkbox checked={isPublic} onChange={handleIsPublic} />
              }
              label="Is public"
            />
            <Button variant="contained" onClick={onCreate} fullWidth>
              Create
            </Button>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </form>
  );
};
