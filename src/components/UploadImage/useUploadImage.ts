import { useEffect, useState } from "react";

export const useUploadImage = ({
  pictureUrl: defaultPictureUrl,
}: {
  pictureUrl?: string;
}) => {
  const [pictureUrl, setPictureUrl] = useState<string | undefined>(
    defaultPictureUrl || ""
  );
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    setPictureUrl(defaultPictureUrl || "");
  }, [defaultPictureUrl]);

  const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setFile(e.target.files[0]);
    setPictureUrl(URL.createObjectURL(e.target.files[0]));
  };

  const onReset = () => {
    setFile(null);
    setPictureUrl(undefined);
  };

  const onRemoveFile = () => {
    setFile(null);
    setPictureUrl(defaultPictureUrl || "");
  };

  return {
    pictureUrl,
    file,
    onChangeFile,
    onRemoveFile,
    onReset,
  };
};
