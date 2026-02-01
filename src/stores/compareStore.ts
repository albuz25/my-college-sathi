import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface DegreeCompareState {
  selectedDegreeIds: string[];
  maxItems: number;
  addToCompare: (degreeId: string) => void;
  removeFromCompare: (degreeId: string) => void;
  clearCompare: () => void;
  isInCompare: (degreeId: string) => boolean;
  canAddMore: () => boolean;
}

export const useDegreeCompareStore = create<DegreeCompareState>()(
  persist(
    (set, get) => ({
      selectedDegreeIds: [],
      maxItems: 3,
      
      addToCompare: (degreeId: string) => {
        const { selectedDegreeIds, maxItems } = get();
        if (selectedDegreeIds.length < maxItems && !selectedDegreeIds.includes(degreeId)) {
          set({ selectedDegreeIds: [...selectedDegreeIds, degreeId] });
        }
      },
      
      removeFromCompare: (degreeId: string) => {
        set({ 
          selectedDegreeIds: get().selectedDegreeIds.filter((id) => id !== degreeId) 
        });
      },
      
      clearCompare: () => set({ selectedDegreeIds: [] }),
      
      isInCompare: (degreeId: string) => get().selectedDegreeIds.includes(degreeId),
      
      canAddMore: () => get().selectedDegreeIds.length < get().maxItems,
    }),
    { 
      name: 'degree-compare-basket',
      // Only persist selectedDegreeIds
      partialize: (state) => ({ selectedDegreeIds: state.selectedDegreeIds }),
    }
  )
);
