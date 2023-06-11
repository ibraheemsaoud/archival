import { IEra } from "../interfaces/era.interface";

const list: IEra[] = [
  {
    id: "1",
    slug: "isseyMiyake-ss23",
    title: "Issey Miyake - Spring Summer 2023",
    description: "Issey Miyake Haute Couture Spring Summer 2023",
    creationDate: new Date(),
    ownerId: "1",
    topicId: "1",
    starDate: new Date(),
    endDate: new Date(),
    isPublic: true,
  },
  {
    id: "2",
    slug: "luisVuitton-ss23",
    title: "Luis Vuitton - Spring Summer 2023",
    description: "Luise Vuitton ready to wear Spring Summer 2023",
    creationDate: new Date(),
    ownerId: "2",
    topicId: "2",
    starDate: new Date(),
    endDate: new Date(),
    isPublic: true,
  },
  {
    id: "3",
    slug: "irisVanHerpen-ss23",
    title: "Iris Van Herpen - Spring Summer 2023",
    description: "Iris Van Herpen Haute Couture Spring Summer 2023",
    creationDate: new Date(),
    ownerId: "1",
    topicId: "1",
    starDate: new Date(),
    endDate: new Date(),
    isPublic: true,
  },
  {
    id: "4",
    slug: "versace-ss23",
    title: "Versace - Spring Summer 2023",
    description: "Versace ready to wear Spring Summer 2023",
    creationDate: new Date(),
    ownerId: "2",
    topicId: "2",
    starDate: new Date(),
    endDate: new Date(),
    isPublic: true,
  },
  {
    id: "5",
    slug: "mileyCyrus-endlessSummerVacation",
    title: "Miley Cyrus - Endless Summer Vacation",
    description: "Everything about the rollout of the 2023 Miley Cyrus Album",
    creationDate: new Date(),
    ownerId: "3",
    topicId: "3",
    starDate: new Date(),
    endDate: new Date(),
    isPublic: true,
  },
  {
    id: "6",
    slug: "kesha-gagOrder",
    title: "Kesha - Gag Order",
    description: "Everything about the rollout of the 2023 Kesha Album",
    creationDate: new Date(),
    ownerId: "3",
    topicId: "3",
    starDate: new Date(),
    endDate: new Date(),
    isPublic: true,
  },
  {
    id: "7",
    slug: "whiteLotus-S02",
    title: "The White Lotus - Season 2",
    description: "Wanna feel the Italain Sicily vibes? Watch this show.",
    creationDate: new Date(),
    ownerId: "4",
    topicId: "4",
    starDate: new Date(),
    endDate: new Date(),
    isPublic: true,
  },
  {
    id: "8",
    slug: "americanHorrorStory-S11",
    title: "American Horror Story - Season 11",
    description: "The new season of AHS is here and it's a good one.",
    creationDate: new Date(),
    ownerId: "4",
    topicId: "4",
    starDate: new Date(),
    endDate: new Date(),
    isPublic: true,
  },
  {
    id: "9",
    slug: "her-2014",
    title: "Her - 2014",
    description:
      "A modern classis that is getting more and more relevant with the rise of AI.",
    creationDate: new Date(),
    ownerId: "5",
    topicId: "5",
    starDate: new Date(),
    endDate: new Date(),
    isPublic: true,
  },
  {
    id: "10",
    slug: "cruella-2021",
    title: "Cruella - 2021",
    description:
      "A fashionista's dream, a movie about the rise of Cruella De Vil.",
    creationDate: new Date(),
    ownerId: "5",
    topicId: "5",
    starDate: new Date(),
    endDate: new Date(),
    isPublic: true,
  },
];
export const requestEra = (query: { id?: string; slug?: string }) => {
  const era = list.find(
    (item) => item.id === query.id || item.slug === query.slug
  );
  return {
    data: era,
    isLoading: false,
    error: undefined,
  };
};

export const requestEras = (query?: { topicId: string }) => {
  const eras = list.filter((item) => item.topicId === query?.topicId);
  return {
    data: eras,
    isLoading: false,
    error: undefined,
  };
};
