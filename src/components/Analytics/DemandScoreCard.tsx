import { motion } from 'framer-motion';
import { TrendingUp, MessageCircle, Search } from 'lucide-react';
import type { DemandScore } from '../../types';

interface DemandScoreCardProps {
  score: DemandScore;
  productName: string;
}

export default function DemandScoreCard({ score, productName }: DemandScoreCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-lg p-6"
    >
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Demand Analysis: {productName}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-purple-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <TrendingUp className="h-5 w-5 text-purple-600 mr-2" />
              <span className="text-sm font-medium text-purple-600">
                Overall Score
              </span>
            </div>
            <span className="text-2xl font-bold text-purple-600">
              {score.score}
            </span>
          </div>
        </div>

        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <MessageCircle className="h-5 w-5 text-blue-600 mr-2" />
              <span className="text-sm font-medium text-blue-600">
                Social Mentions
              </span>
            </div>
            <span className="text-2xl font-bold text-blue-600">
              {score.socialMentions}
            </span>
          </div>
        </div>

        <div className="bg-green-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Search className="h-5 w-5 text-green-600 mr-2" />
              <span className="text-sm font-medium text-green-600">
                Search Volume
              </span>
            </div>
            <span className="text-2xl font-bold text-green-600">
              {score.searchVolume}
            </span>
          </div>
        </div>
      </div>

      {score.trending && (
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg p-4">
          <p className="font-semibold">
            🔥 This product is trending! Consider increasing inventory.
          </p>
        </div>
      )}
    </motion.div>
  );
}