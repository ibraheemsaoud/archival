import { SyntheticEvent, useEffect, useState } from "react";
import { FashionWeekTags } from "../../interfaces/fashionWeek.interface";
import { nameToSlug } from "../../helpers";

export const useCreateASeason = () => {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [brandId, setBrandId] = useState("");
  const [primaryColor, setPrimaryColor] = useState("");
  const [secondaryColor, setSecondaryColor] = useState("");

  const [tags, setTags] = useState<FashionWeekTags[]>([]);
  const [isPublic, setIsPublic] = useState(false);

  const handleUpdateTags = (
    _: SyntheticEvent<Element, Event>,
    value: { label: string; value: FashionWeekTags }[]
  ) => {
    setTags(value.map((tag) => tag.value));
  };

  const handleIsPublic = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsPublic((event.target as HTMLInputElement).checked);
  };

  useEffect(() => {
    setSlug(nameToSlug(name));
  }, [name]);

  const tagList = [
    {
      label: "Spring-Summer",
      value: FashionWeekTags.SS,
    },
    {
      label: "Autumn-Winter",
      value: FashionWeekTags.AW,
    },
    {
      label: "Menswear",
      value: FashionWeekTags.Menswear,
    },
    {
      label: "Womenswear",
      value: FashionWeekTags.Womenswear,
    },
    {
      label: "Couture",
      value: FashionWeekTags.Couture,
    },
    {
      label: "Ready-to-wear",
      value: FashionWeekTags.ReadyToWear,
    },
  ];

  return {
    name,
    setName,
    slug,
    setSlug,
    brandId,
    setBrandId,
    primaryColor,
    setPrimaryColor,
    secondaryColor,
    setSecondaryColor,
    tags,
    handleUpdateTags,
    tagList,
    isPublic,
    handleIsPublic,
  };
};
