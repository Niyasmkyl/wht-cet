
import React from "react";
import { EventCategory } from "@/types";
import { CheckCircle2 } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface EventCategoryFilterProps {
  selectedCategory: string;
  onChange: (category: string) => void;
}

const categoryOptions: { value: string; label: string }[] = [
  { value: "all", label: "All Events" },
  { value: "workshop", label: "Workshops" },
  { value: "technical", label: "Technical" },
  { value: "cultural", label: "Cultural" },
  { value: "sports", label: "Sports" },
  { value: "other", label: "Other" }
];

const EventCategoryFilter: React.FC<EventCategoryFilterProps> = ({
  selectedCategory,
  onChange
}) => {
  return (
    <div className="space-y-2">
      <div className="text-sm font-medium text-gray-700 mb-2">Event Category</div>
      <RadioGroup
        value={selectedCategory}
        onValueChange={onChange}
        className="flex flex-wrap gap-2 md:gap-4"
      >
        {categoryOptions.map((option) => (
          <div key={option.value} className="flex items-center space-x-2">
            <RadioGroupItem 
              value={option.value} 
              id={`category-${option.value}`} 
              className="peer sr-only" 
            />
            <Label
              htmlFor={`category-${option.value}`}
              className="flex items-center gap-2 px-3 py-2 rounded-full text-sm border border-gray-200 
              hover:bg-gray-50 cursor-pointer transition-all
              peer-data-[state=checked]:bg-primary/10 peer-data-[state=checked]:border-primary/30
              peer-data-[state=checked]:text-primary peer-focus:ring-2 peer-focus:ring-primary/20"
            >
              {selectedCategory === option.value && (
                <CheckCircle2 className="w-3.5 h-3.5" />
              )}
              {option.label}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default EventCategoryFilter;
