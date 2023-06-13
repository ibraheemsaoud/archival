import { EntryType } from "./entry.interface";

interface IQuickLink {
  title: string;
  link: string;
  order?: number;
}

export interface IQuickLinksEntry {
  id: string;
  userId: string;
  eraId: string;
  variant: EntryType.QuickLinks;
  links: IQuickLink[];
}
