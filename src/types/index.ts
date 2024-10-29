export interface Product {
  id: string;
  name: string;
  purchasePrice: number;
  targetPrice: number;
  quantity: number;
  status: 'in_stock' | 'reserved' | 'sold';
  category: string;
  platform: string;
  purchaseDate: string;
  notes?: string;
}

export interface MarketTrend {
  date: string;
  price: number;
  volume: number;
  platform: string;
}

export interface DemandScore {
  score: number;
  trending: boolean;
  socialMentions: number;
  searchVolume: number;
}

export interface ProfitCalculation {
  purchasePrice: number;
  sellingPrice: number;
  platformFee: number;
  shippingCost: number;
  additionalCosts: number;
  netProfit: number;
  roi: number;
}