import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Card } from '@/components/ui/card';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-purple-950 dark:via-black dark:to-blue-950">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Terms of Service
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Last updated: January 2025
            </p>
          </div>

          <Card className="p-8">
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <h2>1. Acceptance of Terms</h2>
              <p>
                By accessing and using PromptFi, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>

              <h2>2. Description of Service</h2>
              <p>
                PromptFi is a decentralized marketplace for AI prompts where users can:
              </p>
              <ul>
                <li>Upload and sell AI prompts</li>
                <li>Purchase and use prompts from other creators</li>
                <li>Participate in DAO governance</li>
                <li>Earn and spend PROMPT tokens</li>
                <li>Tip creators for quality content</li>
              </ul>

              <h2>3. User Accounts and Wallets</h2>
              <p>
                To use PromptFi, you must:
              </p>
              <ul>
                <li>Connect a compatible Web3 wallet</li>
                <li>Be at least 13 years of age</li>
                <li>Provide accurate information</li>
                <li>Maintain the security of your wallet and private keys</li>
                <li>Comply with all applicable laws and regulations</li>
              </ul>

              <h2>4. Content Guidelines</h2>
              <p>
                When uploading prompts, you agree that your content:
              </p>
              <ul>
                <li>Is original or you have the right to use it</li>
                <li>Does not violate any laws or third-party rights</li>
                <li>Is not harmful, offensive, or inappropriate</li>
                <li>Does not contain malicious code or instructions</li>
                <li>Provides genuine value to users</li>
              </ul>

              <h2>5. Intellectual Property</h2>
              <p>
                You retain ownership of your uploaded prompts. By uploading content, you grant PromptFi and purchasers the necessary licenses to use, display, and distribute your content according to the platform's functionality.
              </p>

              <h2>6. Token Economics</h2>
              <p>
                PROMPT tokens are used for:
              </p>
              <ul>
                <li>Purchasing prompts from creators</li>
                <li>Tipping creators for quality content</li>
                <li>Participating in DAO governance</li>
                <li>Staking for additional rewards</li>
              </ul>
              <p>
                Token values may fluctuate, and you acknowledge the risks associated with cryptocurrency transactions.
              </p>

              <h2>7. Fees and Payments</h2>
              <p>
                PromptFi charges a platform fee on transactions to support development and operations. Current fee structure:
              </p>
              <ul>
                <li>Platform fee: 5% of prompt sales</li>
                <li>Gas fees: Paid by users for blockchain transactions</li>
                <li>Withdrawal fees: May apply for token conversions</li>
              </ul>

              <h2>8. Prohibited Activities</h2>
              <p>
                You may not:
              </p>
              <ul>
                <li>Upload illegal, harmful, or offensive content</li>
                <li>Manipulate ratings or reviews</li>
                <li>Attempt to hack or exploit the platform</li>
                <li>Create multiple accounts to abuse rewards</li>
                <li>Violate intellectual property rights</li>
                <li>Engage in market manipulation</li>
              </ul>

              <h2>9. Disclaimers and Limitations</h2>
              <p>
                PromptFi is provided "as is" without warranties. We are not liable for:
              </p>
              <ul>
                <li>Loss of funds due to user error or wallet issues</li>
                <li>Quality or effectiveness of purchased prompts</li>
                <li>Blockchain network issues or delays</li>
                <li>Third-party service interruptions</li>
                <li>Market volatility of tokens</li>
              </ul>

              <h2>10. Indemnification</h2>
              <p>
                You agree to indemnify and hold harmless PromptFi from any claims, damages, or expenses arising from your use of the platform or violation of these terms.
              </p>

              <h2>11. Termination</h2>
              <p>
                We may terminate or suspend your access to the platform for violations of these terms. You may stop using the platform at any time, though blockchain transactions are irreversible.
              </p>

              <h2>12. Governing Law</h2>
              <p>
                These terms are governed by the laws of [Jurisdiction]. Any disputes will be resolved through binding arbitration.
              </p>

              <h2>13. Changes to Terms</h2>
              <p>
                We reserve the right to modify these terms at any time. Continued use of the platform constitutes acceptance of updated terms.
              </p>

              <h2>14. Contact Information</h2>
              <p>
                For questions about these terms, contact us at:
              </p>
              <ul>
                <li>Email: legal@promptfi.com</li>
                <li>Discord: PromptFi Community</li>
                <li>Address: [Company Address]</li>
              </ul>
            </div>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
}