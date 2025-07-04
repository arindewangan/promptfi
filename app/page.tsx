import { Navigation } from '@/components/navigation';
import { Hero } from '@/components/hero';
import { TrendingPrompts } from '@/components/trending-prompts';
import { TopCreators } from '@/components/top-creators';
import { Footer } from '@/components/footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-purple-950 dark:via-black dark:to-blue-950">
      <Navigation />
      <Hero />
      <TrendingPrompts />
      <TopCreators />
      <Footer />
    </div>
  );
}