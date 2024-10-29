import { useState } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, DollarSign, Package, Bell } from 'lucide-react';
import Navbar from '../components/Layout/Navbar';

const mockTrendData = [
  { date: '2024-01', price: 120, volume: 150 },
  { date: '2024-02', price: 180, volume: 200 },
  { date: '2024-03', price: 160, volume: 180 },
  { date: '2024-04', price: 220, volume: 250 },
  { date: '2024-05', price: 190, volume: 220 },
  { date: '2024-06', price: 280, volume: 300 },
];

const platforms = ['Amazon', 'Shopify', 'TikTok Shop'];

export default function Dashboard() {
  const [selectedPlatform, setSelectedPlatform] = useState('Amazon');
  const [timeRange, setTimeRange] = useState('1M');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg p-6 border border-purple-100"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <DollarSign className="h-6 w-6 text-purple-600" />
              </div>
              <span className="text-sm font-medium text-green-500">+15% ↑</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-1">Total Revenue</h3>
            <p className="text-3xl font-bold text-purple-600">$12,450</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-lg p-6 border border-purple-100"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Package className="h-6 w-6 text-blue-600" />
              </div>
              <span className="text-sm font-medium text-green-500">+4 new</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-1">Active Listings</h3>
            <p className="text-3xl font-bold text-blue-600">24</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg p-6 border border-purple-100"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <span className="text-sm font-medium text-green-500">+5% ↑</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-1">Profit Margin</h3>
            <p className="text-3xl font-bold text-green-600">32%</p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-lg p-6 border border-purple-100"
            >
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">Price Trends</h2>
                  <p className="text-sm text-gray-500">Track market movements across platforms</p>
                </div>
                <div className="flex space-x-2">
                  {['1W', '1M', '3M', '1Y'].map((range) => (
                    <button
                      key={range}
                      onClick={() => setTimeRange(range)}
                      className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                        timeRange === range
                          ? 'bg-purple-600 text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {range}
                    </button>
                  ))}
                </div>
              </div>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={mockTrendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis 
                      dataKey="date"
                      stroke="#6b7280"
                      tick={{ fontSize: 12 }}
                    />
                    <YAxis
                      stroke="#6b7280"
                      tick={{ fontSize: 12 }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#fff',
                        border: '1px solid #e5e7eb',
                        borderRadius: '0.5rem',
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="price"
                      stroke="#8b5cf6"
                      strokeWidth={2}
                      dot={{ fill: '#8b5cf6' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg p-6 border border-purple-100"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Price Alerts</h2>
              <button className="p-2 hover:bg-purple-50 rounded-lg transition-colors">
                <Bell className="h-5 w-5 text-purple-600" />
              </button>
            </div>
            <div className="space-y-4">
              {platforms.map((platform) => (
                <button
                  key={platform}
                  onClick={() => setSelectedPlatform(platform)}
                  className={`w-full p-4 rounded-lg text-left transition-all ${
                    selectedPlatform === platform
                      ? 'bg-purple-50 border-purple-200'
                      : 'bg-gray-50 hover:bg-gray-100 border-gray-200'
                  } border`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-800">{platform}</span>
                    <span className="text-sm text-purple-600">
                      {platform === 'Amazon' ? '+12.5%' : platform === 'Shopify' ? '+8.3%' : '+15.2%'}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl shadow-lg p-8 text-white"
        >
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Upgrade to Pro</h2>
              <p className="text-purple-100 mb-6">Get access to advanced analytics and AI-powered insights!</p>
              <button className="bg-white text-purple-600 px-6 py-2 rounded-lg font-semibold hover:bg-purple-50 transition-colors">
                Upgrade Now
              </button>
            </div>
            <div className="hidden md:block">
              <TrendingUp className="h-16 w-16 text-purple-200" />
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}