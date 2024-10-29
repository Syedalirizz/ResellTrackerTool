import { motion } from 'framer-motion';
import { Package, TrendingUp, DollarSign } from 'lucide-react';
import type { Product, DemandScore } from '../../types';

interface ProductCardProps {
  product: Product;
  demandScore: DemandScore;
  onStatusChange: (id: string, status: Product['status']) => void;
}

export default function ProductCard({ product, demandScore, onStatusChange }: ProductCardProps) {
  const statusColors = {
    in_stock: 'bg-green-100 text-green-800',
    reserved: 'bg-yellow-100 text-yellow-800',
    sold: 'bg-purple-100 text-purple-800',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-lg p-6"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
          <p className="text-sm text-gray-500">{product.category}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm ${statusColors[product.status]}`}>
          {product.status.replace('_', ' ').toUpperCase()}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center">
          <Package className="h-5 w-5 text-gray-400 mr-2" />
          <span className="text-sm">Qty: {product.quantity}</span>
        </div>
        <div className="flex items-center">
          <DollarSign className="h-5 w-5 text-gray-400 mr-2" />
          <span className="text-sm">${product.purchasePrice}</span>
        </div>
      </div>

      <div className="bg-purple-50 rounded-lg p-4 mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <TrendingUp className="h-5 w-5 text-purple-600 mr-2" />
            <span className="text-sm font-medium text-purple-600">
              Demand Score
            </span>
          </div>
          <span className="text-lg font-bold text-purple-600">
            {demandScore.score}
          </span>
        </div>
        {demandScore.trending && (
          <p className="text-sm text-purple-600 mt-2">
            🔥 Trending on social media
          </p>
        )}
      </div>

      <div className="flex space-x-2">
        {(['in_stock', 'reserved', 'sold'] as const).map((status) => (
          <button
            key={status}
            onClick={() => onStatusChange(product.id, status)}
            className={`px-3 py-1 rounded-full text-sm ${
              product.status === status
                ? statusColors[status]
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {status.replace('_', ' ').toUpperCase()}
          </button>
        ))}
      </div>
    </motion.div>
  );
}