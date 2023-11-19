export const Error = ({ error }: { error?: string | unknown }) => {
  if (error && typeof error === "string") {
    return <div>{error}</div>;
  }
  return null;
};
