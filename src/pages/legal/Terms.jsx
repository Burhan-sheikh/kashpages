import { Helmet } from 'react-helmet-async'

export default function Terms() {
  return (
    <>
      <Helmet>
        <title>Terms of Service - KashPages</title>
        <meta name="description" content="KashPages Terms of Service" />
      </Helmet>

      <div className="bg-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Terms of Service</h1>
          <p className="text-gray-600 mb-12">Last updated: December 2025</p>

          <div className="prose prose-lg max-w-none">
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">1. Service Description</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                KashPages provides professional landing page publishing services for businesses in Kashmir. We create, host, and maintain your business landing page.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">2. Account Terms</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                You must provide accurate information when contacting us. You are responsible for maintaining the confidentiality of your account credentials.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">3. Payment Terms</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                All fees are in Indian Rupees (INR) and are billed annually. Payment is required before your page is published. We offer a 7-day satisfaction guarantee.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">4. Content Guidelines</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                You are responsible for ensuring your content is accurate, legal, and does not infringe on third-party rights. We reserve the right to refuse or remove content that violates our guidelines.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">5. Page Expiry</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Your page remains active for one year from the purchase date. You will receive renewal notices before expiry. Unpublished or expired pages may be removed from public view.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">6. Modifications</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                All page modifications are handled by KashPages. Contact us to request updates. Major changes may incur additional fees.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">7. Termination</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We reserve the right to terminate or suspend access to our services for violations of these terms or for any other reason at our discretion.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">8. Limitation of Liability</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                KashPages is not liable for any indirect, incidental, or consequential damages arising from the use of our service.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">9. Contact</h2>
              <p className="text-gray-700 leading-relaxed">
                For questions about these terms, contact us at hello@kashpages.in
              </p>
            </section>
          </div>
        </div>
      </div>
    </>
  )
}
