"use client";

import { usePathname, useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shared/select";

type Region = {
  languageCode: string;
  currency: string;
};

const regions: Region[] = [
  { languageCode: "pl", currency: "PLN" },
  { languageCode: "gb", currency: "EUR" },
  { languageCode: "fr", currency: "EUR" },
];

const RegionSwitcher = () => {
  const router = useRouter();
  const pathname = usePathname();

  const currentLanguage = pathname.split("/")[1] || "pl";

  const currentRegionData =
    regions.find((r) => r.languageCode === currentLanguage) || regions[0];

  const handleRegionChange = (languageCode: string) => {
    const selectedRegion = regions.find((r) => r.languageCode === languageCode);
    if (!selectedRegion) return;

    // Split the pathname and filter out empty strings and current language
    const pathParts = pathname
      .split("/")
      .filter((part) => part && !regions.some((r) => r.languageCode === part));

    // Construct new path with selected language
    const newPath = `/${selectedRegion.languageCode}${pathParts.length ? "/" + pathParts.join("/") : ""}`;

    router.push(newPath);
  };

  return (
    <Select
      value={currentRegionData.languageCode}
      onValueChange={handleRegionChange}
      className="w-[100px] z-50"
    >
      <SelectTrigger className="border-none bg-transparent !px-1 py-1.5 text-sm">
        <SelectValue>{`${currentRegionData.languageCode.toUpperCase()} | ${currentRegionData.currency}`}</SelectValue>
      </SelectTrigger>
      <SelectContent>
        {regions.map((region) => (
          <SelectItem
            key={region.languageCode}
            value={region.languageCode}
            className="px-2 text-sm"
          >
            {`${region.languageCode.toUpperCase()} | ${region.currency}`}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default RegionSwitcher;
