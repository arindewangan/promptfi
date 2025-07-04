import { Navigation } from '@/components/navigation';
import { CreatorProfile } from '@/components/creator-profile';
import { Footer } from '@/components/footer';

// Generate static params for build time
export async function generateStaticParams() {
  // Return some sample wallet addresses for static generation
  return [
    { address: '0x1234567890123456789012345678901234567890' },
    { address: '0x2345678901234567890123456789012345678901' },
    { address: '0x3456789012345678901234567890123456789012' },
    { address: '0x4567890123456789012345678901234567890123' },
    { address: '0x5678901234567890123456789012345678901234' }
  ];
}

export default async function ProfilePage({ params }: { params: { address: string } }) {
  const { address } = await params;
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-purple-950 dark:via-black dark:to-blue-950">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <CreatorProfile address={address} />
      </div>
      <Footer />
    </div>
  );
}