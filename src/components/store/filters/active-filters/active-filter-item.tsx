import { Box } from "@/components/shared/box";
import { Chips } from "@/components/shared/chips";
import { Label } from "@/components/shared/label";
import { XIcon } from "@/components/shared/icons/x";

type ActiveFilterItemProps = {
  label: string;
  filterKey: string;
  options: {
    id: string;
    value: string;
  }[];
  handleRemoveFilter: (filterKey: string, handle: string) => void;
};

export default function ActiveFilterItem({
  label,
  filterKey,
  options,
  handleRemoveFilter,
}: ActiveFilterItemProps) {
  return (
    <Box className="flex items-start gap-4 medium:items-center">
      <Label className="text-secondary">{label}:</Label>
      <Box className="flex flex-wrap gap-2">
        {options
          ?.sort((a, b) =>
            label !== "Price" ? a.value.localeCompare(b.value) : 0
          )
          .map((option, id) => (
            <Chips
              key={id}
              rightIcon={<XIcon />}
              className="cursor-inherit"
              selected
              onClick={() => handleRemoveFilter(filterKey, option.id)}
            >
              <p className="text-center">{option.value}</p>
            </Chips>
          ))}
      </Box>
    </Box>
  );
}
