import React, { useState } from 'react';
import { Plus, Search, Edit, Trash, Eye, Calendar } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import TestPlanModal from '../components/modals/TestPlanModal';

interface TestPlan {
  id: string;
  title: string;
  description: string;
  project: string;
  startDate: string;
  endDate: string;
  testCount: number;
  progress: number;
  createdBy: string;
}

const TestPlans: React.FC = () => {
  const { user, isAdmin, isTester } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingTestPlan, setEditingTestPlan] = useState<TestPlan | null>(null);

  // Mock data
  const [testPlans, setTestPlans] = useState<TestPlan[]>([
    {
      id: '1',
      title: 'Sprint 1 Regression Tests',
      description: 'Full regression testing for Sprint 1 features',
      project: 'Gerenciamento de Teste',
      startDate: '2025-04-01',
      endDate: '2025-04-10',
      testCount: 32,
      progress: 75,
      createdBy: 'Admin User',
    },
    {
      id: '2',
      title: 'Payment API Integration Tests',
      description: 'End-to-end tests for payment processing API',
      project: 'Sistema de Pagamentos',
      startDate: '2025-03-15',
      endDate: '2025-03-25',
      testCount: 18,
      progress: 90,
      createdBy: 'Luana Martins',
    },
    {
      id: '3',
      title: 'User Portal Acceptance Tests',
      description: 'User acceptance testing for the customer portal',
      project: 'Portal de Atendimento',
      startDate: '2025-04-12',
      endDate: '2025-04-18',
      testCount: 24,
      progress: 30,
      createdBy: 'Beto Silva',
    }
  ]);

  const filteredTestPlans = testPlans.filter(testPlan => 
    testPlan.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    testPlan.project.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenModal = (testPlan: TestPlan | null = null) => {
    setEditingTestPlan(testPlan);
    setIsModalOpen(true);
  };

  const handleSaveTestPlan = (testPlan: TestPlan) => {
    if (testPlan.id) {
      // Update existing test plan
      setTestPlans(testPlans.map(tp => tp.id === testPlan.id ? testPlan : tp));
    } else {
      // Add new test plan
      const newTestPlan = {
        ...testPlan,
        id: Math.random().toString(36).substr(2, 9),
        createdBy: user?.name || 'Unknown User',
        testCount: 0,
        progress: 0
      };
      setTestPlans([...testPlans, newTestPlan]);
    }
    setIsModalOpen(false);
  };

  const handleDeleteTestPlan = (id: string) => {
    setTestPlans(testPlans.filter(testPlan => testPlan.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Header with actions */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
        <h2 className="text-xl font-bold text-gray-900">Test Plans</h2>
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search test plans..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          {(isAdmin || isTester) && (
            <button
              onClick={() => handleOpenModal()}
              className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
            >
              <Plus size={18} className="mr-1" />
              New Test Plan
            </button>
          )}
        </div>
      </div>

      {/* Test plans list */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTestPlans.length > 0 ? (
          filteredTestPlans.map((testPlan) => (
            <div key={testPlan.id} className="bg-white rounded-lg shadow overflow-hidden hover:shadow-md transition-shadow duration-300">
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-medium text-gray-900 truncate">{testPlan.title}</h3>
                  <div className="flex space-x-1">
                    <button className="text-blue-600 hover:text-blue-900">
                      <Eye size={18} />
                    </button>
                    {(isAdmin || isTester) && (
                      <>
                        <button
                          onClick={() => handleOpenModal(testPlan)}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => handleDeleteTestPlan(testPlan.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash size={18} />
                        </button>
                      </>
                    )}
                  </div>
                </div>
                <p className="mt-1 text-sm text-gray-600 line-clamp-2">{testPlan.description}</p>
                <p className="mt-2 text-sm font-medium text-gray-700">{testPlan.project}</p>
                
                <div className="mt-4 flex items-center text-sm text-gray-600">
                  <Calendar size={16} className="mr-1" />
                  <span>{testPlan.startDate} to {testPlan.endDate}</span>
                </div>
                
                <div className="mt-4">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{testPlan.progress}%</span>
                  </div>
                  <div className="mt-1 w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className={`h-2.5 rounded-full ${
                        testPlan.progress >= 90 ? 'bg-green-500' :
                        testPlan.progress >= 60 ? 'bg-teal-500' :
                        testPlan.progress >= 30 ? 'bg-amber-500' :
                        'bg-red-500'
                      }`}
                      style={{ width: `${testPlan.progress}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="mt-4 flex justify-between items-center">
                  <div className="text-sm text-gray-600">{testPlan.testCount} test cases</div>
                  <div className="text-xs text-gray-500">Created by {testPlan.createdBy}</div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-3 py-16 text-center">
            <p className="text-gray-500">No test plans found matching your search.</p>
          </div>
        )}
      </div>

      <TestPlanModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveTestPlan}
        testPlan={editingTestPlan}
      />
    </div>
  );
};

export default TestPlans;