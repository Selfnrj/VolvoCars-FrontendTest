import { SelectInput } from "vcc-ui";

type Props = {
  value: string;
  handleChange: (e: any) => void;
  handleClick: () => void;
  selectedType: string | null;
};

export default function Filter({
  value,
  handleChange,
  handleClick,
  selectedType,
}: Props) {
  const filterOptions = [
    { value: "suv", label: "Suv" },
    { value: "estate", label: "Estate" },
    { value: "sedan", label: "Sedan" },
  ];

  return (
    <div className="flex items-center mb-8">
      <div className="w-[200px] mr-4">
        <SelectInput
          className="w-full"
          label={"Body type"}
          value={value}
          onChange={handleChange}
        >
          {filterOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </SelectInput>
      </div>
      {selectedType && (
        <button onClick={handleClick} className="text-blue-500 font-bold">
          Clear
        </button>
      )}
    </div>
  );
}
