import React, { useState, useEffect } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, ResponsiveContainer, Legend,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

type SalesData = { date: string; sales: number };
type InventoryData = { category: string; quantity: number };
type RevenueProductData = { type: string; revenue: number };
type RevenueStrainData = { strain: string; revenue: number };

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#00C49F'];

const AnalyticsComponent = () => {
  const [salesData, setSalesData] = useState<SalesData[]>([]);
  const [inventoryData, setInventoryData] = useState<InventoryData[]>([]);
  const [revenueProductTypeData, setRevenueProductTypeData] = useState<RevenueProductData[]>([]);
  const [revenueStrainData, setRevenueStrainData] = useState<RevenueStrainData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [sales, inventory, revenueByProductType, revenueByStrain] = await Promise.all([
          fetchSalesAnalytics(),
          fetchInventoryAnalytics(),
          fetchRevenueByProductType(),
          fetchRevenueByStrain(),
        ]);

        setSalesData(sales);
        setInventoryData(inventory);
        setRevenueProductTypeData(revenueByProductType);
        setRevenueStrainData(revenueByStrain);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load analytics data.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatCurrency = (value: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
        <span className="ml-2 text-lg text-gray-600">Loading analytics...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg bg-red-50 p-4 text-red-800">
        <p className="text-lg font-medium">Error loading data</p>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Sales Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            {salesData.length === 0 ? (
              <p>No sales data available.</p>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={salesData}>
                  <XAxis dataKey="date" />
                  <YAxis tickFormatter={formatCurrency} />
                  <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                  <Legend />
                  <Bar dataKey="sales" fill="#8884d8" name="Sales" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
        {/* Additional cards go here */}
      </div>
    </div>
  );
};

export default AnalyticsComponent;
