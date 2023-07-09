import { Close } from "@mui/icons-material";
import { Box, Button, IconButton } from "@mui/material";

interface UploadImageProps {
  onChangeFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveFile: () => void;
  pictureUrl: string;
  file: File | null;
}

export const UploadImage = ({
  onChangeFile,
  onRemoveFile,
  pictureUrl,
  file,
}: UploadImageProps) => {
  return (
    <Box
      sx={(theme) => ({
        position: "relative",
        marginBottom: 2,
        borderRadius: "5px",
        border: `1px solid ${theme.palette.primary.main}`,
      })}
    >
      {file?.name && (
        <>
          <Box
            component="img"
            src={pictureUrl}
            alt={file?.name}
            height="100px"
            width="100%"
            sx={{
              objectFit: "cover",
              borderRadius: "5px 5px 0 0",
              marginBottom: "-6px",
            }}
          />
          <IconButton
            sx={{
              position: "absolute",
              right: 0,
              top: 0,
            }}
            onClick={onRemoveFile}
          >
            <Close />
          </IconButton>
        </>
      )}
      <Button
        variant="contained"
        component="label"
        fullWidth
        sx={{
          borderRadius: file ? "0 0 5px 5px" : "5px",
        }}
      >
        {file ? "Change Picture" : "Upload Picture"}
        <input type="file" hidden onChange={onChangeFile} accept="image/*" />
      </Button>
    </Box>
  );
};
