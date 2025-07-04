import { Navigation } from '@/components/navigation';
import { DAODashboard } from '@/components/dao-dashboard';
import { Footer } from '@/components/footer';

export default function DAOPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-purple-950 dark:via-black dark:to-blue-950">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            PromptFi DAO
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Participate in governance and shape the future of the platform
          </p>
        </div>
        <DAODashboard />
      </div>
      <Footer />
    </div>
  );
}