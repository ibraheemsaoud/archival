import { Box, Typography } from "@mui/material";
import { AppWrapper } from "../../components";

export const Terms = () => {
  return (
    <AppWrapper>
      <Box sx={{ padding: 2 }}>
        <Typography variant="h3">Terms and Conditions for Archivals</Typography>
        <Typography variant="body2">
          Last Updated: 17.12.2023 Berlin, Germany
        </Typography>
        <br />
        <Typography variant="h5">1. Acceptance of Terms</Typography>
        <Typography variant="body1">
          By accessing or using Archivals ("the Platform"), you agree to comply
          with and be bound by these terms and conditions ("Terms"). If you do
          not agree to these Terms, please do not use the Platform.
        </Typography>
        <br />
        <Typography variant="h5">2. User Accounts</Typography>
        <Typography variant="body1">
          a. Users are required to create an account to engage in certain
          activities on the Platform.
          <br />
          b. Some features may be accessible without an account, but certain
          functionalities may be restricted.
        </Typography>
        <br />
        <Typography variant="h5">3. User-Generated Content</Typography>
        <Typography variant="body1">
          a. Users can post images, comments, and other content ("User Content")
          on the Platform.
          <br />
          b. All User Content is considered public, and users are responsible
          for their contributions.
        </Typography>
        <br />
        <Typography variant="h5">4. Age Restriction</Typography>
        <Typography variant="body1">
          Users must be of the legal age to use social media platforms in their
          jurisdiction. Archivals is not intended for users under 13 years old,
          and any use by individuals under this age is prohibited.
        </Typography>
        <br />
        <Typography variant="h5">5. Personal Information</Typography>
        <Typography variant="body1">
          a. Users are encouraged not to provide personal information. The only
          required information is a valid email address, used for login purposes
          only.
          <br />
          b. Archivals will not display or share user emails publicly.
        </Typography>
        <br />
        <Typography variant="h5">
          6. Disclaimers and Limitations of Liability
        </Typography>
        <Typography variant="body1">
          Archivals is not responsible for the content posted by users. The
          platform is provided "as is," and we make no warranties regarding the
          accuracy, completeness, or reliability of user-generated content.
        </Typography>
        <br />
        <Typography variant="h5">7. Ownership of Content</Typography>
        <Typography variant="body1">
          a. Users own the comments they make and the posts related to
          "stylings."
          <br />
          b. All other content posted on the Platform is owned by their rightful
          owners and retain the rights to them.
        </Typography>
        <br />
        <Typography variant="h5">8. Termination of Accounts</Typography>
        <Typography variant="body1">
          Archivals reserves the right to terminate user accounts for reasons
          including but not limited to misbehavior, creating chaos, excessive
          promotion of products or services, and posting prohibited content.
        </Typography>
        <br />
        <Typography variant="h5">9. Governing Law</Typography>
        <Typography variant="body1">
          These Terms shall be governed by and construed in accordance with the
          laws of the Federal Republic of Germany.
        </Typography>
        <br />
        <Typography variant="h5">Contact Information</Typography>
        <Typography variant="body1">
          If you have any questions or concerns regarding these Terms, please
          contact us through the contact page.
        </Typography>
      </Box>
    </AppWrapper>
  );
};
