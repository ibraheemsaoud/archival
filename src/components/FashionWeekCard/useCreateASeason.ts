import { useEffect, useState } from "react";
import { FashionWeekTags } from "../../interfaces/fashionWeek.interface";
import { nameToSlug } from "../../helpers";
import { useRequestBrandList } from "../../requests/useRequestBrand";

export const useCreateASeason = () => {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [brandId, setBrandId] = useState("");
  const [primaryColor, setPrimaryColor] = useState("");
  const [secondaryColor, setSecondaryColor] = useState("");

  const [season, setSeason] = useState<FashionWeekTags>(FashionWeekTags.SS);
  const [wear, setWear] = useState<FashionWeekTags>(FashionWeekTags.Menswear);
  const [type, setType] = useState<FashionWeekTags>(
    FashionWeekTags.ReadyToWear
  );
  const [isPublic, setIsPublic] = useState(false);

  const handleChangeSeason = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSeason((event.target as HTMLInputElement).value as FashionWeekTags);
  };

  const handleChangeWear = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWear((event.target as HTMLInputElement).value as FashionWeekTags);
  };

  const handleChangeType = (event: React.ChangeEvent<HTMLInputElement>) => {
    setType((event.target as HTMLInputElement).value as FashionWeekTags);
  };

  const handleIsPublic = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsPublic((event.target as HTMLInputElement).checked);
  };

  useEffect(() => {
    setSlug(nameToSlug(name));
  }, [name]);

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
    season,
    handleChangeSeason,
    wear,
    handleChangeWear,
    type,
    handleChangeType,
    isPublic,
    handleIsPublic,
  };
};
