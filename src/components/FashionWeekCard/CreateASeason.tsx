import {
  Box,
  Typography,
  TextField,
  Button,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
  Checkbox,
} from "@mui/material";
import { UploadImage, useUploadImage } from "../UploadImage";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useUser } from "../../hooks";
import { requestUploadFile } from "../../requests/requestUploadFile";
import { useRequestCreateSeason } from "../../requests/useRequestSeason";
import { FashionWeekTags } from "../../interfaces/fashionWeek.interface";
import { useCreateASeason } from "./useCreateASeason";

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
    season,
    handleChangeSeason,
    wear,
    handleChangeWear,
    type,
    handleChangeType,
    isPublic,
    handleIsPublic,
  } = useCreateASeason();
  const [outsideLink, setOutsideLink] = useState("");

  const { file, onChangeFile, onReset, pictureUrl, onRemoveFile } =
    useUploadImage({});
  const { mutate, isSuccess, error } = useRequestCreateSeason();
  const { user } = useUser();

  const onCreate = async () => {
    if (!user || !pictureUrl) return;
    let pictureLink = undefined;
    if (outsideLink === "") {
      console.log("uploading file");
      pictureLink = await requestUploadFile(file, user.$id);
    }
    console.log(pictureLink, outsideLink);
    if (pictureLink || outsideLink !== "") {
      mutate({
        name,
        slug,
        coverImage: pictureLink || outsideLink,
        primaryColor,
        secondaryColor,
        fashionWeek: fashionWeekId,
        brand: brandId,
        tags: [season, wear, type],
        isPublic,
      });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      onRemoveFile();
      setName("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  useEffect(() => {
    if (error) {
      toast.error(error.toString());
    }
  }, [error]);

  if (!user) return null;
  if (user.$id !== "64fc4c02359c716b96b4") return null;

  return (
    <Box
      sx={{
        border: "1px solid",
        margin: 2,
        padding: 1,
        borderRadius: 2,
        backgroundColor: "#ffffff",
      }}
    >
      <Typography
        variant="h6"
        component="div"
        sx={{
          textDecoration: "underline",
          marginBottom: 1,
        }}
      >
        Create a new Season
      </Typography>
      <UploadImage
        onChangeFile={onChangeFile}
        file={file}
        onReset={onReset}
        pictureUrl={pictureUrl}
        height="350px"
      />
      {!file && (
        <>
          OR
          <TextField
            id="filled-multiline-static"
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
      <TextField
        id="filled-multiline-static"
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
        id="filled-multiline-static"
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
      <TextField
        id="filled-multiline-static"
        label="brand id"
        variant="filled"
        sx={{
          width: "-webkit-fill-available",
          marginBottom: 2,
        }}
        color="primary"
        value={brandId}
        onChange={(e) => setBrandId(e.target.value)}
      />
      <TextField
        id="filled-multiline-static"
        label="primary color"
        variant="filled"
        sx={{
          width: "-webkit-fill-available",
          marginBottom: 2,
        }}
        color="primary"
        value={primaryColor}
        onChange={(e) => setPrimaryColor(e.target.value)}
      />
      <TextField
        id="filled-multiline-static"
        label="secondary color"
        variant="filled"
        sx={{
          width: "-webkit-fill-available",
          marginBottom: 2,
        }}
        color="primary"
        value={secondaryColor}
        onChange={(e) => setSecondaryColor(e.target.value)}
      />
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <FormControl>
            <FormLabel>Season</FormLabel>
            <RadioGroup value={season} onChange={handleChangeSeason}>
              <FormControlLabel
                value={FashionWeekTags.SS}
                control={<Radio />}
                label={FashionWeekTags.SS}
              />
              <FormControlLabel
                value={FashionWeekTags.AW}
                control={<Radio />}
                label={FashionWeekTags.AW}
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <FormControl>
            <FormLabel>Wear</FormLabel>
            <RadioGroup value={wear} onChange={handleChangeWear}>
              <FormControlLabel
                value={FashionWeekTags.Menswear}
                control={<Radio />}
                label={FashionWeekTags.Menswear}
              />
              <FormControlLabel
                value={FashionWeekTags.Womenswear}
                control={<Radio />}
                label={FashionWeekTags.Womenswear}
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <FormControl>
            <FormLabel>Type</FormLabel>
            <RadioGroup value={type} onChange={handleChangeType}>
              <FormControlLabel
                value={FashionWeekTags.ReadyToWear}
                control={<Radio />}
                label={FashionWeekTags.ReadyToWear}
              />
              <FormControlLabel
                value={FashionWeekTags.Couture}
                control={<Radio />}
                label={FashionWeekTags.Couture}
              />
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>
      <FormControlLabel
        control={<Checkbox checked={isPublic} onChange={handleIsPublic} />}
        label="Is public"
      />
      <Button variant="contained" onClick={onCreate} fullWidth>
        Create
      </Button>
    </Box>
  );
};