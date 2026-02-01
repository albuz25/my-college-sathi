'use client';

import { useState } from 'react';
import { Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

const categories = [
  { id: 'undergraduate', label: 'Undergraduate' },
  { id: 'postgraduate', label: 'Postgraduate' },
  { id: 'diploma', label: 'Diploma' },
];

const streams = [
  { id: 'management', label: 'Management' },
  { id: 'technology', label: 'Technology' },
  { id: 'commerce', label: 'Commerce' },
  { id: 'arts', label: 'Arts' },
];

const durations = [
  { id: '1-year', label: '1 Year' },
  { id: '2-years', label: '2 Years' },
  { id: '3-years', label: '3 Years' },
];

const budgets = [
  { id: 'under-1l', label: 'Under ₹1 Lakh' },
  { id: '1l-2l', label: '₹1 - 2 Lakhs' },
  { id: '2l-3l', label: '₹2 - 3 Lakhs' },
  { id: 'above-3l', label: 'Above ₹3 Lakhs' },
];

interface FilterContentProps {
  selectedCategories: string[];
  selectedStreams: string[];
  selectedDurations: string[];
  selectedBudgets: string[];
  onToggleCategory: (id: string) => void;
  onToggleStream: (id: string) => void;
  onToggleDuration: (id: string) => void;
  onToggleBudget: (id: string) => void;
  onClearAll: () => void;
  hasFilters: boolean;
}

function FilterContent({
  selectedCategories,
  selectedStreams,
  selectedDurations,
  selectedBudgets,
  onToggleCategory,
  onToggleStream,
  onToggleDuration,
  onToggleBudget,
  onClearAll,
  hasFilters,
}: FilterContentProps) {
  return (
    <div className="space-y-6">
      {/* Category Filter */}
      <FilterSection title="Category">
        {categories.map((category) => (
          <FilterCheckbox
            key={category.id}
            id={category.id}
            label={category.label}
            checked={selectedCategories.includes(category.id)}
            onChange={() => onToggleCategory(category.id)}
          />
        ))}
      </FilterSection>

      {/* Stream Filter */}
      <FilterSection title="Stream">
        {streams.map((stream) => (
          <FilterCheckbox
            key={stream.id}
            id={stream.id}
            label={stream.label}
            checked={selectedStreams.includes(stream.id)}
            onChange={() => onToggleStream(stream.id)}
          />
        ))}
      </FilterSection>

      {/* Duration Filter */}
      <FilterSection title="Duration">
        {durations.map((duration) => (
          <FilterCheckbox
            key={duration.id}
            id={duration.id}
            label={duration.label}
            checked={selectedDurations.includes(duration.id)}
            onChange={() => onToggleDuration(duration.id)}
          />
        ))}
      </FilterSection>

      {/* Budget Filter */}
      <FilterSection title="Fee Budget">
        {budgets.map((budget) => (
          <FilterCheckbox
            key={budget.id}
            id={budget.id}
            label={budget.label}
            checked={selectedBudgets.includes(budget.id)}
            onChange={() => onToggleBudget(budget.id)}
          />
        ))}
      </FilterSection>

      {hasFilters && (
        <Button 
          variant="outline" 
          className="w-full"
          onClick={onClearAll}
        >
          <X className="h-4 w-4 mr-2" />
          Clear All Filters
        </Button>
      )}
    </div>
  );
}

export function DegreeFilters() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedStreams, setSelectedStreams] = useState<string[]>([]);
  const [selectedDurations, setSelectedDurations] = useState<string[]>([]);
  const [selectedBudgets, setSelectedBudgets] = useState<string[]>([]);

  const toggleFilter = (
    value: string,
    selected: string[],
    setSelected: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    if (selected.includes(value)) {
      setSelected(selected.filter((item) => item !== value));
    } else {
      setSelected([...selected, value]);
    }
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedStreams([]);
    setSelectedDurations([]);
    setSelectedBudgets([]);
  };

  const hasFilters = 
    selectedCategories.length > 0 || 
    selectedStreams.length > 0 || 
    selectedDurations.length > 0 || 
    selectedBudgets.length > 0;

  const filterContentProps: FilterContentProps = {
    selectedCategories,
    selectedStreams,
    selectedDurations,
    selectedBudgets,
    onToggleCategory: (id: string) => toggleFilter(id, selectedCategories, setSelectedCategories),
    onToggleStream: (id: string) => toggleFilter(id, selectedStreams, setSelectedStreams),
    onToggleDuration: (id: string) => toggleFilter(id, selectedDurations, setSelectedDurations),
    onToggleBudget: (id: string) => toggleFilter(id, selectedBudgets, setSelectedBudgets),
    onClearAll: clearAllFilters,
    hasFilters,
  };

  return (
    <>
      {/* Desktop Filters */}
      <div className="hidden lg:block sticky top-20">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filters
          </h2>
        </div>
        <FilterContent {...filterContentProps} />
      </div>

      {/* Mobile Filter Button & Drawer */}
      <div className="lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="w-full">
              <Filter className="h-4 w-4 mr-2" />
              Filters
              {hasFilters && (
                <span className="ml-2 bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full">
                  {selectedCategories.length + selectedStreams.length + selectedDurations.length + selectedBudgets.length}
                </span>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[80vh]">
            <SheetHeader>
              <SheetTitle>Filter Degrees</SheetTitle>
            </SheetHeader>
            <div className="mt-6 overflow-y-auto">
              <FilterContent {...filterContentProps} />
            </div>
            <div className="sticky bottom-0 pt-4 bg-background border-t mt-4">
              <Button className="w-full">Apply Filters</Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}

function FilterSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="font-medium mb-3">{title}</h3>
      <div className="space-y-2">
        {children}
      </div>
    </div>
  );
}

function FilterCheckbox({ 
  id, 
  label, 
  checked, 
  onChange 
}: { 
  id: string; 
  label: string; 
  checked: boolean; 
  onChange: () => void;
}) {
  return (
    <div className="flex items-center gap-2">
      <Checkbox 
        id={id} 
        checked={checked} 
        onCheckedChange={onChange}
      />
      <label 
        htmlFor={id} 
        className="text-sm cursor-pointer"
      >
        {label}
      </label>
    </div>
  );
}
