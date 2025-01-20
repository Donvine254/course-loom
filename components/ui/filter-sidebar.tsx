"use client";
import { Slider } from "./slider";
import { useState } from "react";
type Props = {
  priceRange: [number, number];
  onPriceRangeChange: (value: [number, number]) => void;
};

export default function FilterSlider({
  priceRange,
  onPriceRangeChange,
}: Props) {
  const [range, setRange] = useState<[number, number]>(priceRange);
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Price Range</h3>
      <Slider
        value={range}
        max={100}
        step={1}
        onValueChange={(value) => setRange(value as [number, number])}
        onValueCommit={(value) => {
          onPriceRangeChange(value as [number, number]);
        }}
        className="py-4"
      />
      <div className="flex justify-between text-sm text-muted-foreground">
        <span>KSH {range[0] * 120}</span>
        <span>KSH {range[1] * 120}</span>
      </div>
    </div>
  );
}
