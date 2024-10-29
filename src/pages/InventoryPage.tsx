import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Layout/Navbar';
import ProductCard from '../components/Inventory/ProductCard';
import { useInventory } from '../hooks/useInventory';
import type { Product } from '../types';

const mockDemandScores = {
  product1: {
    score: 85,
    trending: true,
    socialMentions: 1200,
    searchVolume: 5000
  }
};

export default function InventoryPage() {
  const { products, loading } = useInventory();
  const [filter, setFilter] = useState<Product['status'] | 'all'>('all');

  const filteredProducts = products.filter(
    (product) => filter === 'all' || product.status === filter
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Inventory Management</h1>
          <div className="flex space-x-2">
            {['all', 'in_stock', 'reserved', 'sold'].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status as typeof filter)}
                className={`px-4 py-2 rounded-lg ${
                  filter === status
                    ? 'bg-purple-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                {status.replace('_', ' ').toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              demandScore={mockDemandScores.product1}
              onStatusChange={(id, status) => {
                // TODO: Implement status change
                console.log('Status changed:', id, status);
              }}
            />
          ))}
        </div>
      </main>
    </div>
  );
}