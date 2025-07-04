import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Card } from '@/components/ui/card';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-purple-950 dark:via-black dark:to-blue-950">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Privacy Policy
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Last updated: January 2025
            </p>
          </div>

          <Card className="p-8">
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <h2>1. Information We Collect</h2>
              <p>
                PromptFi is a decentralized platform that prioritizes user privacy. We collect minimal information necessary to provide our services:
              </p>
              <ul>
                <li>Wallet addresses for blockchain interactions</li>
                <li>Prompt content and metadata you choose to upload</li>
                <li>Transaction data recorded on the blockchain</li>
                <li>Basic usage analytics to improve the platform</li>
              </ul>

              <h2>2. How We Use Your Information</h2>
              <p>We use the collected information to:</p>
              <ul>
                <li>Facilitate prompt marketplace transactions</li>
                <li>Enable DAO governance participation</li>
                <li>Provide customer support</li>
                <li>Improve platform functionality and user experience</li>
                <li>Comply with legal obligations</li>
              </ul>

              <h2>3. Data Storage and Security</h2>
              <p>
                Your data security is our priority. We implement industry-standard security measures:
              </p>
              <ul>
                <li>Prompt content is stored on IPFS for decentralized access</li>
                <li>Sensitive data is encrypted both in transit and at rest</li>
                <li>We use secure, audited smart contracts</li>
                <li>Regular security audits and penetration testing</li>
              </ul>

              <h2>4. Blockchain Transparency</h2>
              <p>
                As a blockchain-based platform, certain information is publicly visible:
              </p>
              <ul>
                <li>Wallet addresses and transaction history</li>
                <li>Prompt purchases and tips</li>
                <li>DAO voting records</li>
                <li>Token balances and transfers</li>
              </ul>

              <h2>5. Third-Party Services</h2>
              <p>
                We integrate with third-party services that have their own privacy policies:
              </p>
              <ul>
                <li>Wallet providers (MetaMask, WalletConnect, etc.)</li>
                <li>IPFS storage networks</li>
                <li>Analytics services (anonymized data only)</li>
              </ul>

              <h2>6. Your Rights</h2>
              <p>You have the right to:</p>
              <ul>
                <li>Access your personal data</li>
                <li>Correct inaccurate information</li>
                <li>Delete your account and associated data</li>
                <li>Export your data</li>
                <li>Opt out of non-essential data collection</li>
              </ul>

              <h2>7. Data Retention</h2>
              <p>
                We retain your data only as long as necessary to provide our services. Blockchain data is permanent and cannot be deleted, but you can stop using the platform at any time.
              </p>

              <h2>8. International Transfers</h2>
              <p>
                As a decentralized platform, data may be processed globally. We ensure appropriate safeguards are in place for international data transfers.
              </p>

              <h2>9. Children's Privacy</h2>
              <p>
                PromptFi is not intended for users under 13 years of age. We do not knowingly collect personal information from children under 13.
              </p>

              <h2>10. Changes to This Policy</h2>
              <p>
                We may update this privacy policy from time to time. We will notify users of significant changes through the platform or email.
              </p>

              <h2>11. Contact Us</h2>
              <p>
                If you have questions about this privacy policy, please contact us at:
              </p>
              <ul>
                <li>Email: privacy@promptfi.com</li>
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