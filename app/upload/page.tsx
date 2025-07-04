import { Navigation } from '@/components/navigation';
import { UploadForm } from '@/components/upload-form';
import { Footer } from '@/components/footer';

export default function UploadPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-purple-950 dark:via-black dark:to-blue-950">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Upload Prompt
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Share your AI prompts with the community and earn $PROMPT tokens
            </p>
          </div>
          <UploadForm />
        </div>
      </div>
      <Footer />
    </div>
  );
}