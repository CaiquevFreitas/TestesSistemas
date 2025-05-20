import React from 'react';

const BarChart = () => {
  const data = [
    { name: 'UI Tests', passed: 78, failed: 12 },
    { name: 'API Tests', passed: 56, failed: 8 },
    { name: 'Integration', passed: 45, failed: 15 },
    { name: 'Performance', passed: 34, failed: 6 }
  ];

  const maxValue = Math.max(...data.map(item => item.passed + item.failed));
  
  return (
    <div className="w-full">
      <div className="flex flex-col space-y-4">
        {data.map((item, index) => (
          <div key={index} className="space-y-1">
            <div className="flex justify-between">
              <span className="text-sm font-medium text-gray-700">{item.name}</span>
              <span className="text-sm text-gray-500">
                {item.passed + item.failed} tests
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div className="flex h-3 rounded-full overflow-hidden">
                <div 
                  style={{ 
                    width: `${(item.passed / maxValue) * 100}%`
                  }}
                  className="bg-green-500"
                />
                <div 
                  style={{ 
                    width: `${(item.failed / maxValue) * 100}%`
                  }}
                  className="bg-red-500"
                />
              </div>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-green-600">{item.passed} passed</span>
              <span className="text-red-600">{item.failed} failed</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BarChart;