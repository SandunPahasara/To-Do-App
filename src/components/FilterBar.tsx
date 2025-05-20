import React from 'react';
import { Filter } from '../types/Task';
import { ListFilter } from 'lucide-react';

interface FilterBarProps {
  currentFilter: Filter;
  setFilter: (filter: Filter) => void;
  taskCounts: {
    all: number;
    active: number;
    completed: number;
  };
}

const FilterBar: React.FC<FilterBarProps> = ({ currentFilter, setFilter, taskCounts }) => {
  const filters: { label: string; value: Filter }[] = [
    { label: `All (${taskCounts.all})`, value: 'all' },
    { label: `Active (${taskCounts.active})`, value: 'active' },
    { label: `Completed (${taskCounts.completed})`, value: 'completed' },
  ];

  return (
    <div className="mb-6 bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm flex items-center">
      <div className="mr-3 text-gray-600 dark:text-gray-400">
        <ListFilter className="h-5 w-5" />
      </div>
      <div className="flex gap-2 items-center flex-wrap">
        {filters.map((filter) => (
          <button
            key={filter.value}
            onClick={() => setFilter(filter.value)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
              currentFilter === filter.value
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterBar;