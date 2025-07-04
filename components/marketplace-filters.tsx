"use client";

import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Search, 
  Filter, 
  TrendingUp, 
  Clock, 
  Star, 
  Coins,
  X
} from 'lucide-react';
import { PLATFORM_CONFIG } from '@/lib/constants';
import { Database } from '@/lib/database';

interface MarketplaceFiltersProps {
  onFiltersChange: (filters: {
    searchQuery: string;
    selectedCategory: string;
    selectedSort: string;
    priceRange?: { min: number; max: number };
  }) => void;
}

const sortOptions = [
  { value: 'trending', label: 'Trending', icon: TrendingUp },
  { value: 'recent', label: 'Most Recent', icon: Clock },
  { value: 'rating', label: 'Top Rated', icon: Star },
  { value: 'popular', label: 'Most Popular', icon: Star },
  { value: 'price-low', label: 'Price: Low to High', icon: Coins },
  { value: 'price-high', label: 'Price: High to Low', icon: Coins }
];

const priceRanges = [
  { value: 'all', label: 'All Prices', min: 0, max: Infinity },
  { value: '0-10', label: '0-10 PROMPT', min: 0, max: 10 },
  { value: '10-25', label: '10-25 PROMPT', min: 10, max: 25 },
  { value: '25-50', label: '25-50 PROMPT', min: 25, max: 50 },
  { value: '50+', label: '50+ PROMPT', min: 50, max: Infinity }
];

export function MarketplaceFilters({ onFiltersChange }: MarketplaceFiltersProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedSort, setSelectedSort] = useState('trending');
  const [selectedPriceRange, setSelectedPriceRange] = useState('all');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [totalPrompts, setTotalPrompts] = useState(0);

  // Get categories with counts
  const categories = ['All Categories', ...PLATFORM_CONFIG.PROMPT_CATEGORIES];

  useEffect(() => {
    // Update total prompts count
    const stats = Database.getStats();
    setTotalPrompts(stats.totalPrompts);
  }, []);

  // Memoize the filter change callback to prevent infinite loops
  const handleFiltersChange = useCallback(() => {
    // Update active filters
    const filters = [];
    if (selectedCategory !== 'All Categories') {
      filters.push(selectedCategory);
    }
    if (selectedPriceRange !== 'all') {
      const rangeLabel = priceRanges.find(r => r.value === selectedPriceRange)?.label || selectedPriceRange;
      filters.push(rangeLabel);
    }
    setActiveFilters(filters);

    // Notify parent component
    const priceRange = priceRanges.find(r => r.value === selectedPriceRange);
    onFiltersChange({
      searchQuery: searchTerm,
      selectedCategory,
      selectedSort,
      priceRange: priceRange?.value === 'all' ? undefined : { min: priceRange!.min, max: priceRange!.max }
    });
  }, [searchTerm, selectedCategory, selectedSort, selectedPriceRange, onFiltersChange]);

  useEffect(() => {
    handleFiltersChange();
  }, [handleFiltersChange]);

  const handleCategoryChange = useCallback((category: string) => {
    setSelectedCategory(category);
  }, []);

  const handleSortChange = useCallback((sort: string) => {
    setSelectedSort(sort);
  }, []);

  const handlePriceRangeChange = useCallback((range: string) => {
    setSelectedPriceRange(range);
  }, []);

  const removeFilter = useCallback((filter: string) => {
    if (categories.includes(filter)) {
      setSelectedCategory('All Categories');
    }
    if (filter.includes('PROMPT')) {
      setSelectedPriceRange('all');
    }
  }, [categories]);

  const clearAllFilters = useCallback(() => {
    setSearchTerm('');
    setSelectedCategory('All Categories');
    setSelectedSort('trending');
    setSelectedPriceRange('all');
  }, []);

  const getSortIcon = (value: string) => {
    const option = sortOptions.find(o => o.value === value);
    if (option) {
      const Icon = option.icon;
      return <Icon className="w-4 h-4" />;
    }
    return null;
  };

  return (
    <div className="space-y-6 mb-8">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <Input
          placeholder="Search prompts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 h-12 text-lg"
        />
      </div>

      {/* Filters Row */}
      <div className="flex flex-wrap gap-4 items-center">
        {/* Category Filter */}
        <Select value={selectedCategory} onValueChange={handleCategoryChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Sort Filter */}
        <Select value={selectedSort} onValueChange={handleSortChange}>
          <SelectTrigger className="w-[180px]">
            <div className="flex items-center gap-2">
              {getSortIcon(selectedSort)}
              <SelectValue placeholder="Sort by" />
            </div>
          </SelectTrigger>
          <SelectContent>
            {sortOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                <div className="flex items-center gap-2">
                  <option.icon className="w-4 h-4" />
                  {option.label}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Price Range Filter */}
        <Select value={selectedPriceRange} onValueChange={handlePriceRangeChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Price Range" />
          </SelectTrigger>
          <SelectContent>
            {priceRanges.map((range) => (
              <SelectItem key={range.value} value={range.value}>
                {range.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Clear Filters */}
        {activeFilters.length > 0 && (
          <Button variant="outline" onClick={clearAllFilters}>
            <X className="w-4 h-4 mr-2" />
            Clear All
          </Button>
        )}
      </div>

      {/* Active Filters */}
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-2">
          <span className="text-sm text-gray-600 dark:text-gray-400 mr-2">Active filters:</span>
          {activeFilters.map((filter) => (
            <Badge key={filter} variant="secondary" className="cursor-pointer" onClick={() => removeFilter(filter)}>
              {filter}
              <X className="w-3 h-3 ml-1" />
            </Badge>
          ))}
        </div>
      )}

      {/* Results Count */}
      <div className="text-sm text-gray-600 dark:text-gray-400">
        Total prompts available: {totalPrompts.toLocaleString()}
      </div>
    </div>
  );
}