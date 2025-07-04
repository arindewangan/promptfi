import { Navigation } from '@/components/navigation';
import { PromptDetails } from '@/components/prompt-details';
import { Footer } from '@/components/footer';

// Generate static params for build time
export async function generateStaticParams() {
  // Return some sample prompt IDs for static generation
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
    { id: '5' },
    { id: '6' }
  ];
}

export default async function PromptPage({ params }) {
  const awaitedParams = await params;
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-purple-950 dark:via-black dark:to-blue-950">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <PromptDetails promptId={awaitedParams.id} />
      </div>
      <Footer />
    </div>
  );
}