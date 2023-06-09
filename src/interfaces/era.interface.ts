export interface IEra {
  id: string;
  title: string;
  description: string;
  creationDate: Date;
  ownerId: string;
  topicsIds: string[];
  starDate: Date;
  endDate: Date;
  isPublic: boolean;
}
