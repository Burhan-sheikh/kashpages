import { Helmet } from 'react-helmet-async'

export default function Privacy() {
  return (
    <>
      <Helmet>
        <title>Privacy Policy - KashPages</title>
        <meta name="description" content="KashPages Privacy Policy" />
      </Helmet>

      <div className="bg-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
          <p className="text-gray-600 mb-12">Last updated: December 2025</p>

          <div className="prose prose-lg max-w-none">
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">1. Information We Collect</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We collect information you provide directly to us, including:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Business name and contact information</li>
                <li>Email address and phone number</li>
                <li>Business description and location</li>
                <li>Payment information (processed securely)</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">2. How We Use Your Information</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Create and maintain your landing page</li>
                <li>Process payments and send receipts</li>
                <li>Communicate with you about your account</li>
                <li>Improve our services</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">3. Information Sharing</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We do not sell or rent your personal information to third parties. Your business information is displayed publicly on your landing page as intended.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">4. Data Security</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We implement appropriate security measures to protect your information. However, no method of transmission over the Internet is 100% secure.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">5. Cookies</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We use cookies to improve your experience on our website. You can disable cookies in your browser settings, though this may affect functionality.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">6. Third-Party Services</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We use Firebase for authentication and Firestore for data storage. These services have their own privacy policies.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">7. Your Rights</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                You have the right to access, update, or delete your personal information. Contact us to exercise these rights.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">8. Changes to This Policy</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">9. Contact Us</h2>
              <p className="text-gray-700 leading-relaxed">
                If you have questions about this privacy policy, contact us at hello@kashpages.in
              </p>
            </section>
          </div>
        </div>
      </div>
    </>
  )
}
