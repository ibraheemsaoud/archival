import { checkIfArrayInAnotherArray } from "../helpers/arrays.helpers";
import { IEra } from "../interfaces/era.interface";

const list: IEra[] = [
  {
    id: "1",
    title: "Era 1",
    description: "Era 1 description",
    creationDate: new Date(),
    ownerId: "1",
    topicsIds: ["1", "2"],
    starDate: new Date(),
    endDate: new Date(),
    isPublic: true,
  },
  {
    id: "2",
    title: "Era 2",
    description: "Era 2 description",
    creationDate: new Date(),
    ownerId: "2",
    topicsIds: ["3"],
    starDate: new Date(),
    endDate: new Date(),
    isPublic: true,
  },
];
export const requestEra = (id: string) => {
  const era = list.find((item) => item.id === id);
  return {
    data: era,
    isLoading: false,
    error: undefined,
  };
};

export const requestEras = (query: { topicIds: string[] }) => {
  const eras = list.filter((item) =>
    checkIfArrayInAnotherArray(item.topicsIds, query.topicIds)
  );
  return {
    data: eras,
    isLoading: false,
    error: undefined,
  };
};
