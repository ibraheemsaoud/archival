import { Close } from "@mui/icons-material";
import { Box, Button, IconButton } from "@mui/material";

interface UploadImageProps {
  onChangeFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onReset: () => void;
  pictureUrl?: string;
  file: File | null;
  height?: string;
}

export const UploadImage = ({
  onChangeFile,
  onReset,
  pictureUrl,
  file,
  height = "100px",
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
      {pictureUrl && (
        <>
          <Box
            component="img"
            src={pictureUrl}
            alt={file?.name}
            height={height}
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
            onClick={onReset}
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
          borderRadius: pictureUrl ? "0 0 5px 5px" : "5px",
        }}
      >
        {pictureUrl ? "Change Picture" : "Upload Picture"}
        <input type="file" hidden onChange={onChangeFile} accept="image/*" />
      </Button>
    </Box>
  );
};
