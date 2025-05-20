import React from 'react';
import { CheckCircle2, XCircle, Clock } from 'lucide-react';

const DonutChart = () => {
  // Mock data for test status
  const data = {
    passed: 178,
    failed: 23,
    pending: 47
  };

  const total = data.passed + data.failed + data.pending;
  const passRate = Math.round((data.passed / total) * 100);
  const failRate = Math.round((data.failed / total) * 100);
  const pendingRate = Math.round((data.pending / total) * 100);

  // Calculate stroke dasharray values for SVG
  const circleSize = 280; // This is the circumference of our circle with r=45
  const passedOffset = circleSize * (passRate / 100);
  const failedOffset = circleSize * (failRate / 100);
  const pendingOffset = circleSize * (pendingRate / 100);

  // Starting points for each segment
  let passedStart = 0;
  let failedStart = passedOffset;
  let pendingStart = passedOffset + failedOffset;

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <svg width="200" height="200" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle 
            cx="50" 
            cy="50" 
            r="45" 
            fill="transparent" 
            stroke="#e5e7eb" 
            strokeWidth="10" 
          />
          
          {/* Passed segment */}
          <circle 
            cx="50" 
            cy="50" 
            r="45" 
            fill="transparent" 
            stroke="#22c55e" 
            strokeWidth="10" 
            strokeDasharray={`${passedOffset} ${circleSize - passedOffset}`}
            strokeDashoffset={-passedStart}
            transform="rotate(-90 50 50)"
          />
          
          {/* Failed segment */}
          <circle 
            cx="50" 
            cy="50" 
            r="45" 
            fill="transparent" 
            stroke="#ef4444" 
            strokeWidth="10" 
            strokeDasharray={`${failedOffset} ${circleSize - failedOffset}`}
            strokeDashoffset={-failedStart}
            transform="rotate(-90 50 50)"
          />
          
          {/* Pending segment */}
          <circle 
            cx="50" 
            cy="50" 
            r="45" 
            fill="transparent" 
            stroke="#f59e0b" 
            strokeWidth="10" 
            strokeDasharray={`${pendingOffset} ${circleSize - pendingOffset}`}
            strokeDashoffset={-pendingStart}
            transform="rotate(-90 50 50)"
          />
          
          {/* Center text */}
          <text 
            x="50" 
            y="45" 
            fontFamily="sans-serif" 
            fontSize="12" 
            textAnchor="middle" 
            fill="#4b5563"
          >
            Pass Rate
          </text>
          <text 
            x="50" 
            y="65" 
            fontFamily="sans-serif" 
            fontSize="18" 
            fontWeight="bold" 
            textAnchor="middle" 
            fill="#1f2937"
          >
            {passRate}%
          </text>
        </svg>
      </div>
      
      <div className="grid grid-cols-3 gap-4 mt-6 w-full">
        <div className="flex items-center">
          <CheckCircle2 size={16} className="text-green-500 mr-2" />
          <div>
            <p className="text-sm font-medium text-gray-900">{data.passed}</p>
            <p className="text-xs text-gray-500">Passed</p>
          </div>
        </div>
        <div className="flex items-center">
          <XCircle size={16} className="text-red-500 mr-2" />
          <div>
            <p className="text-sm font-medium text-gray-900">{data.failed}</p>
            <p className="text-xs text-gray-500">Failed</p>
          </div>
        </div>
        <div className="flex items-center">
          <Clock size={16} className="text-amber-500 mr-2" />
          <div>
            <p className="text-sm font-medium text-gray-900">{data.pending}</p>
            <p className="text-xs text-gray-500">Pending</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonutChart;