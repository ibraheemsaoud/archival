import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { useNavigation } from "../../hooks";

export const TopToolbar = ({
  backAddress,
  logo,
  title,
  secondaryButton,
}: {
  backAddress: string;
  logo?: string;
  title: string;
  secondaryButton?: React.ReactNode;
}) => {
  const { onBack } = useNavigation();

  const onBackClicked = () => {
    onBack(backAddress);
  };

  return (
    <Box sx={{ position: "sticky", top: -70, zIndex: 2 }}>
      <AppBar position="static">
        <Toolbar sx={{ alignItems: "flex-end" }}>
          <Button
            size="small"
            variant="outlined"
            sx={{ marginBottom: 1 }}
            onClick={onBackClicked}
          >
            Back
          </Button>
          <Box sx={{ margin: 1, textAlign: "center", flexGrow: 1 }}>
            <Box
              sx={{
                backgroundImage: `url(${logo})`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                width: "100%",
                maxHeight: "60px",
                minHeight: "60px",
                marginBottom: "10px",
              }}
            />
            <Typography variant="h6" component="div">
              {title}
            </Typography>
          </Box>
          {secondaryButton ? (
            secondaryButton
          ) : (
            <Button
              size="small"
              variant="outlined"
              sx={{ marginBottom: 1, visibility: "hidden" }}
              onClick={() => {}}
            >
              Chat
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};
