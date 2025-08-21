import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { TrendingUp, TrendingDown, Eye, MousePointer, DollarSign, Users, ArrowUpRight, ArrowDownRight, Calendar, Bell, Settings, RefreshCw, Download, Filter, Search, ChevronRight } from 'lucide-react';

// Sample data for dashboard
const campaignData = [
  { name: 'Jan', impressions: 45000, clicks: 1200, conversions: 180, spend: 2400 },
  { name: 'Feb', impressions: 52000, clicks: 1450, conversions: 220, spend: 2800 },
  { name: 'Mar', impressions: 48000, clicks: 1380, conversions: 195, spend: 2600 },
  { name: 'Apr', impressions: 61000, clicks: 1680, conversions: 285, spend: 3200 },
  { name: 'May', impressions: 58000, clicks: 1520, conversions: 240, spend: 3000 },
  { name: 'Jun', impressions: 65000, clicks: 1750, conversions: 310, spend: 3400 }
];

const clientPerformance = [
  { name: 'TechStart Co', revenue: 45000, roi: 285, status: 'excellent' },
  { name: 'Fashion Hub', revenue: 32000, roi: 220, status: 'good' },
  { name: 'Local Bistro', revenue: 18000, roi: 180, status: 'average' },
  { name: 'Fitness Plus', revenue: 28000, roi: 195, status: 'good' },
  { name: 'Home Decor', revenue: 15000, roi: 145, status: 'needs-attention' }
];

const platformData = [
  { name: 'Google Ads', value: 35, color: '#4285f4' },
  { name: 'Facebook', value: 28, color: '#1877f2' },
  { name: 'Instagram', value: 20, color: '#e4405f' },
  { name: 'LinkedIn', value: 12, color: '#0077b5' },
  { name: 'Others', value: 5, color: '#6b7280' }
];

const recentActivities = [
  { id: 1, client: 'TechStart Co', action: 'Campaign optimized', time: '2 hours ago', type: 'optimization' },
  { id: 2, client: 'Fashion Hub', action: 'New ad creative uploaded', time: '4 hours ago', type: 'creative' },
  { id: 3, client: 'Local Bistro', action: 'Budget increased by 15%', time: '6 hours ago', type: 'budget' },
  { id: 4, client: 'Fitness Plus', action: 'Conversion tracking updated', time: '1 day ago', type: 'tracking' },
  { id: 5, client: 'Home Decor', action: 'Weekly report generated', time: '1 day ago', type: 'report' }
];

// Mini chart component for inline KPI visualization
const MiniLineChart = ({ data, color = '#3b82f6', height = 40 }) => (
  <div className="w-20 h-8">
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <Line 
          type="monotone" 
          dataKey="value" 
          stroke={color} 
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

// KPI Card Component
const KPICard = ({ title, value, change, trend, icon: Icon, miniData, color }) => {
  const isPositive = trend === 'up';
  const trendColor = isPositive ? 'text-green-600' : 'text-red-600';
  const bgColor = isPositive ? 'bg-green-50' : 'bg-red-50';
  
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <div className={`p-2 rounded-lg ${bgColor}`}>
              <Icon className={`h-5 w-5 ${isPositive ? 'text-green-600' : 'text-red-600'}`} />
            </div>
            <h3 className="text-sm font-medium text-gray-600">{title}</h3>
          </div>
          <div className="flex items-end gap-4">
            <div>
              <p className="text-2xl font-bold text-gray-900">{value}</p>
              <div className="flex items-center gap-1 mt-1">
                {isPositive ? (
                  <ArrowUpRight className="h-4 w-4 text-green-600" />
                ) : (
                  <ArrowDownRight className="h-4 w-4 text-red-600" />
                )}
                <span className={`text-sm font-medium ${trendColor}`}>
                  {change}
                </span>
              </div>
            </div>
            <MiniLineChart data={miniData} color={color} />
          </div>
        </div>
      </div>
    </div>
  );
};

// Client Performance Card
const ClientCard = ({ client }) => {
  const statusColors = {
    excellent: 'bg-green-100 text-green-800',
    good: 'bg-blue-100 text-blue-800',
    average: 'bg-yellow-100 text-yellow-800',
    'needs-attention': 'bg-red-100 text-red-800'
  };
  
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-gray-900">{client.name}</h3>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[client.status]}`}>
          {client.status.replace('-', ' ')}
        </span>
      </div>
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Revenue</span>
          <span className="font-semibold">${client.revenue.toLocaleString()}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">ROI</span>
          <span className="font-semibold text-green-600">{client.roi}%</span>
        </div>
      </div>
      <button className="w-full mt-3 px-3 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-md transition-colors flex items-center justify-center gap-1">
        View Details <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
};

// Activity Item Component
const ActivityItem = ({ activity }) => {
  const typeIcons = {
    optimization: '🎯',
    creative: '🎨',
    budget: '💰',
    tracking: '📊',
    report: '📈'
  };
  
  return (
    <div className="flex items-start gap-3 py-3 border-b border-gray-100 last:border-b-0">
      <span className="text-lg">{typeIcons[activity.type]}</span>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900">{activity.client}</p>
        <p className="text-sm text-gray-600">{activity.action}</p>
        <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
      </div>
    </div>
  );
};

export default function MarketingDashboard() {
  const [selectedTimeframe, setSelectedTimeframe] = useState('6months');
  const [refreshing, setRefreshing] = useState(false);
  
  // Mock mini chart data for KPIs
  const impressionsMiniData = [
    { value: 45000 }, { value: 52000 }, { value: 48000 }, 
    { value: 61000 }, { value: 58000 }, { value: 65000 }
  ];
  
  const clicksMiniData = [
    { value: 1200 }, { value: 1450 }, { value: 1380 }, 
    { value: 1680 }, { value: 1520 }, { value: 1750 }
  ];
  
  const conversionsMiniData = [
    { value: 180 }, { value: 220 }, { value: 195 }, 
    { value: 285 }, { value: 240 }, { value: 310 }
  ];
  
  const spendMiniData = [
    { value: 2400 }, { value: 2800 }, { value: 2600 }, 
    { value: 3200 }, { value: 3000 }, { value: 3400 }
  ];

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Marketing Dashboard</h1>
            <p className="text-gray-600 mt-1">Welcome back, Alex Martinez</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-gray-500" />
              <select 
                value={selectedTimeframe}
                onChange={(e) => setSelectedTimeframe(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="7days">Last 7 days</option>
                <option value="30days">Last 30 days</option>
                <option value="3months">Last 3 months</option>
                <option value="6months">Last 6 months</option>
              </select>
            </div>
            <button 
              onClick={handleRefresh}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
              Refresh
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Download className="h-4 w-4" />
              Export
            </button>
            <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
              <Bell className="h-5 w-5" />
            </button>
            <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
              <Settings className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      <div className="p-6 space-y-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <KPICard
            title="Total Impressions"
            value="289K"
            change="+12.5%"
            trend="up"
            icon={Eye}
            miniData={impressionsMiniData}
            color="#3b82f6"
          />
          <KPICard
            title="Total Clicks"
            value="8.98K"
            change="+8.2%"
            trend="up"
            icon={MousePointer}
            miniData={clicksMiniData}
            color="#10b981"
          />
          <KPICard
            title="Conversions"
            value="1,430"
            change="+15.3%"
            trend="up"
            icon={TrendingUp}
            miniData={conversionsMiniData}
            color="#f59e0b"
          />
          <KPICard
            title="Ad Spend"
            value="$17.4K"
            change="+6.8%"
            trend="up"
            icon={DollarSign}
            miniData={spendMiniData}
            color="#ef4444"
          />
        </div>

        {/* Main Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Performance Trends */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Performance Trends</h2>
              <div className="flex items-center gap-2">
                <button className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-md">Impressions</button>
                <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-md">Clicks</button>
                <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-md">Conversions</button>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={campaignData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" stroke="#6b7280" fontSize={12} />
                <YAxis stroke="#6b7280" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="impressions" 
                  stroke="#3b82f6" 
                  fill="url(#colorImpressions)"
                  strokeWidth={2}
                />
                <defs>
                  <linearGradient id="colorImpressions" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.05}/>
                  </linearGradient>
                </defs>
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Platform Distribution */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Platform Distribution</h2>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={platformData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {platformData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, 'Share']} />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {platformData.map((platform, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: platform.color }}
                    ></div>
                    <span className="text-gray-700">{platform.name}</span>
                  </div>
                  <span className="font-medium">{platform.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Client Performance and Activity Feed */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Client Performance */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Client Performance</h2>
              <button className="flex items-center gap-2 px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Filter className="h-4 w-4" />
                Filter
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {clientPerformance.map((client, index) => (
                <ClientCard key={index} client={client} />
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
              <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                View All
              </button>
            </div>
            <div className="space-y-1">
              {recentActivities.map((activity) => (
                <ActivityItem key={activity.id} activity={activity} />
              ))}
            </div>
          </div>
        </div>

        {/* Performance Comparison Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Monthly Performance Comparison</h2>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded-md">Revenue</button>
              <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-md">Spend</button>
              <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-md">ROI</button>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={campaignData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" stroke="#6b7280" fontSize={12} />
              <YAxis stroke="#6b7280" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Bar dataKey="conversions" fill="#10b981" radius={[4, 4, 0, 0]} />
              <Bar dataKey="spend" fill="#f59e0b" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}