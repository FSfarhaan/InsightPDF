import React from 'react';
import { AreaChart, Area, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ScatterChart, Scatter, CartesianGrid } from 'recharts';
const StatisticsDashboard = () => {
  const yearlyData = [
    { month: 'Jan', newUsers: 300, uniqueUsers: 400 },
    { month: 'Feb', newUsers: 450, uniqueUsers: 500 },
    { month: 'Mar', newUsers: 600, uniqueUsers: 650 },
    { month: 'Apr', newUsers: 250, uniqueUsers: 300 },
    { month: 'May', newUsers: 500, uniqueUsers: 550 },
    { month: 'Jun', newUsers: 400, uniqueUsers: 450 },
    { month: 'Jul', newUsers: 350, uniqueUsers: 400 },
    { month: 'Aug', newUsers: 300, uniqueUsers: 350 },
    { month: 'Sep', newUsers: 550, uniqueUsers: 600 },
    { month: 'Oct', newUsers: 650, uniqueUsers: 700 },
    { month: 'Nov', newUsers: 500, uniqueUsers: 550 },
    { month: 'Dec', newUsers: 800, uniqueUsers: 850 }
  ];

  const futurePredictionData = [
    { month: 'Jan', value: 50 },
    { month: 'Feb', value: 55 },
    { month: 'Mar', value: 65 },
    { month: 'Apr', value: 80 },
    { month: 'May', value: 90 },
    { month: 'Jun', value: 100 },
    { month: 'Jul', value: 120 },
    { month: 'Aug', value: 140 },
    { month: 'Sep', value: 150 },
    { month: 'Oct', value: 170 },
    { month: 'Nov', value: 180 },
    { month: 'Dec', value: 200 },
  ];

// Future Data for Predictions & Analysis
const futureData = [
    { month: 'Jan', prediction: 850, analysis: 820 },
    { month: 'Feb', prediction: 900, analysis: 880 },
    { month: 'Mar', prediction: 950, analysis: 930 },
    { month: 'Apr', prediction: 700, analysis: 680 },
    { month: 'May', prediction: 880, analysis: 850 },
    { month: 'Jun', prediction: 750, analysis: 720 },
    { month: 'Jul', prediction: 720, analysis: 690 },
    { month: 'Aug', prediction: 690, analysis: 660 },
    { month: 'Sep', prediction: 940, analysis: 910 },
    { month: 'Oct', prediction: 990, analysis: 960 },
    { month: 'Nov', prediction: 870, analysis: 840 },
    { month: 'Dec', prediction: 1100, analysis: 1080 }
  ];
  
  const futurePrediction = Array.from({ length: 12 }, (_, i) => ({
    month: `Month ${i + 1}`,
    newUsers: 800 + i * 50 + Math.floor(Math.random() * 100),
    uniqueUsers: 850 + i * 40 + Math.floor(Math.random() * 80),
  }));

  const activityData = [
    { country: 'United States', users: '4,504,710', percentage: '55%', color: 'bg-green-500' },
    { country: 'France', users: '2,100,950', percentage: '25%', color: 'bg-indigo-500' },
    { country: 'China', users: '1,980,240', percentage: '15%', color: 'bg-red-400' },
    { country: 'Brazil', users: '1,504,210', percentage: '15%', color: 'bg-orange-400' }
  ];

  const statsCards = [
    { title: 'Transactions', value: '343,054', bgColor: 'bg-indigo-500' },
    { title: 'Purchase', value: '343,054', bgColor: 'bg-blue-500' },
    { title: 'Dynamic', value: '343,054', bgColor: 'bg-pink-500' }
  ];

  return (
    <div className="p-8 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl font-bold text-gray-800 mb-6">General Statistics</h2>

        {/* Total Users */}
        <div className="mb-6">
          <h3 className="text-lg text-gray-600">All Users</h3>
          <div className="text-5xl font-extrabold text-indigo-600">7,541,390</div>
        </div>

        {/* Current Activity */}
        <div className="mb-10">
          <h3 className="text-lg text-gray-600 mb-3">Current Activity</h3>
          <div className="space-y-4">
            {activityData.map((item, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="w-40 text-gray-800 font-semibold">{item.country}</div>
                <div className="w-24 text-gray-700">{item.users}</div>
                <div className="flex-1 h-2 bg-gray-300 rounded-full overflow-hidden">
                  <div className={`h-full ${item.color}`} style={{ width: item.percentage }}></div>
                </div>
                <div className="w-12 text-gray-700 font-semibold">{item.percentage}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-6 mb-12">
          {statsCards.map((card, index) => (
            <div
              key={index}
              className={`${card.bgColor} p-6 rounded-lg text-white shadow-lg hover:scale-105 transition-transform duration-200`}
            >
              <div className="text-4xl font-bold mb-2">{card.value}</div>
              <div className="text-lg opacity-90">{card.title}</div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-6 mb-12">
            {/* Bar Chart for Monthly Growth */}
         {/* Future Analysis */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-4">
          <h3 className="font-medium text-gray-800 text-lg mb-4">previous year Analysis</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={yearlyData}>
              <XAxis dataKey="month" tick={{ fill: '#4B5563' }} />
              <YAxis tick={{ fill: '#4B5563' }} />
              <Tooltip />
              <Bar dataKey="newUsers" fill="#6366F1" barSize={40} />
              <Bar dataKey="uniqueUsers" fill="#F87171" barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>


        {/* Chart */}
        <div className="bg-white rounded-lg shadow-lg p-6  mb-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium text-gray-800 text-lg">Yearly Dynamics 2024 </h3>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
                <span className="text-sm text-gray-700">New users</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <span className="text-sm text-gray-700">Unique users</span>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={yearlyData}>
              <XAxis dataKey="month" tick={{ fill: '#4B5563' }} />
              <YAxis tick={{ fill: '#4B5563' }} />
              <Tooltip />
              <Line type="monotone" dataKey="newUsers" stroke="#6366F1" strokeWidth={3} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="uniqueUsers" stroke="#F87171" strokeWidth={3} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        </div>
 
        {/* Bottom Stats */}
        <div className="grid grid-cols-4 gap-8 mt-8">
          {[
            { title: 'All users', value: '1,430,205' },
            { title: 'Unique', value: '54,920' },
            { title: 'New users', value: '3,509' },
            { title: 'Trend', value: '94%' }
          ].map((stat, index) => (
            <div key={index} className="text-center p-4 border rounded-lg shadow-md bg-gray-50">
              <div className="text-sm text-gray-600 mb-1">{stat.title}</div>
              <div className="text-2xl font-semibold text-green-600">{stat.value}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-6 p-6 mb-12">

         

       
        {/* Future Analysis - Radar Chart */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-4">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Past Analysis</h3>
          <ResponsiveContainer width="100%" height={400}>
            <RadarChart outerRadius={150} data={yearlyData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="month" />
              <PolarRadiusAxis />
              <Radar name="New Users" dataKey="newUsers" stroke="#6366F1" fill="#6366F1" fillOpacity={0.6} />
              <Radar name="Unique Users" dataKey="uniqueUsers" stroke="#F87171" fill="#F87171" fillOpacity={0.6} />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </div>

 {/* Future Prediction - Stacked Area Chart */}
<div className="bg-white rounded-lg shadow-lg p-6 mb-4">
  <h3 className="text-lg font-medium text-gray-800 mb-4">Future Prediction</h3>
  <ResponsiveContainer width="100%" height={400}>
    <AreaChart data={futurePrediction}>
      <defs>
        <linearGradient id="colorNewUsers" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#6366F1" stopOpacity={0.8} />
          <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
        </linearGradient>
        <linearGradient id="colorUniqueUsers" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#F87171" stopOpacity={0.8} />
          <stop offset="95%" stopColor="#F87171" stopOpacity={0} />
        </linearGradient>
      </defs>
      <XAxis dataKey="month" />
      <YAxis />
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip />
      <Area type="monotone" dataKey="newUsers" stroke="#6366F1" fillOpacity={1} fill="url(#colorNewUsers)" />
      <Area type="monotone" dataKey="uniqueUsers" stroke="#F87171" fillOpacity={1} fill="url(#colorUniqueUsers)" />
    </AreaChart>
  </ResponsiveContainer>
</div>
</div>


         
    

      </div>
    </div>
  );
};

export default StatisticsDashboard;
