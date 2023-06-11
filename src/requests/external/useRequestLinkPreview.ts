import { useQuery } from "react-query";

const LinkPreviewLink =
  "http://api.linkpreview.net/?key=27436ffe0a52863896e96bc0cd0b14da&q=";

interface ILinkPreview {
  description: string;
  image: string;
  title: string;
  url: string;
}

export const useRequestLinkPreview = (link?: string) => {
  return useQuery<ILinkPreview>(
    ["linkPreview", link],
    () => fetch(`${LinkPreviewLink}${link}`).then((res) => res.json()),
    {
      enabled: !!link,
      refetchOnReconnect: false,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchInterval: 7 * 24 * 60 * 60 * 1000, // 7 days
    }
  );
};
