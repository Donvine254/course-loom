import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { SortAsc, SortDesc, Calendar, BookOpen, FilterX } from "lucide-react";

type SortOption =
  | "default"
  | "title-asc"
  | "title-desc"
  | "latest"
  | "oldest"
  | "chapters-asc"
  | "chapters-desc";

interface FilterContentProps {
  priceRange: number[];
  setPriceRange: (value: number[]) => void;
  sortBy: SortOption;
  setSortBy: (value: SortOption) => void;
}

export function FilterContent({
  priceRange,
  setPriceRange,
  sortBy,
  setSortBy,
}: FilterContentProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Price Range</h3>
        <Slider
          defaultValue={[0, 100]}
          max={100}
          step={1}
          value={priceRange}
          onValueChange={setPriceRange}
          className="py-4"
        />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>KSH {priceRange[0] * 120}</span>
          <span>KSH {priceRange[1] * 120}</span>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Sort By</h3>
        <RadioGroup
          value={sortBy}
          onValueChange={(value) => setSortBy(value as SortOption)}>
          <div className="space-y-3">
            <Label className="flex items-center space-x-3 cursor-pointer">
              <RadioGroupItem value="default" />
              <FilterX className="h-4 w-4 mr-2" />
              <span>Default</span>
            </Label>
            <Label className="flex items-center space-x-3 cursor-pointer">
              <RadioGroupItem value="title-asc" />
              <SortAsc className="h-4 w-4 mr-2" />
              <span>Title (A-Z)</span>
            </Label>
            <Label className="flex items-center space-x-3 cursor-pointer">
              <RadioGroupItem value="title-desc" />
              <SortDesc className="h-4 w-4 mr-2" />
              <span>Title (Z-A)</span>
            </Label>
            <Label className="flex items-center space-x-3 cursor-pointer">
              <RadioGroupItem value="latest" />
              <Calendar className="h-4 w-4 mr-2" />
              <span>Latest</span>
            </Label>
            <Label className="flex items-center space-x-3 cursor-pointer">
              <RadioGroupItem value="oldest" />
              <Calendar className="h-4 w-4 mr-2" />
              <span>Oldest</span>
            </Label>
            <Label className="flex items-center space-x-3 cursor-pointer">
              <RadioGroupItem value="chapters-asc" />
              <BookOpen className="h-4 w-4 mr-2" />
              <span>Chapters (Low to High)</span>
            </Label>
            <Label className="flex items-center space-x-3 cursor-pointer">
              <RadioGroupItem value="chapters-desc" />
              <BookOpen className="h-4 w-4 mr-2" />
              <span>Chapters (High to Low)</span>
            </Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
}
