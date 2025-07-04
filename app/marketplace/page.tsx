"use client";

import { useState, useCallback } from 'react';
import { Navigation } from '@/components/navigation';
import { MarketplaceGrid } from '@/components/marketplace-grid';
import { MarketplaceFilters } from '@/components/marketplace-filters';
import { Footer } from '@/components/footer';

export default function MarketplacePage() {
  const [filters, setFilters] = useState({
    searchQuery: '',
    selectedCategory: 'All Categories',
    selectedSort: 'trending',
    priceRange: undefined as { min: number; max: number } | undefined
  });

  const handleFiltersChange = useCallback((newFilters: typeof filters) => {
    setFilters(newFilters);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-purple-950 dark:via-black dark:to-blue-950">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Prompt Marketplace
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Discover, purchase, and remix high-quality AI prompts from the community
          </p>
        </div>
        <MarketplaceFilters onFiltersChange={handleFiltersChange} />
        <MarketplaceGrid 
          searchQuery={filters.searchQuery}
          selectedCategory={filters.selectedCategory}
          selectedSort={filters.selectedSort}
          priceRange={filters.priceRange}
        />
      </div>
      <Footer />
    </div>
  );
}