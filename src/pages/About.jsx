import { Helmet } from 'react-helmet-async'
import { CheckCircle, XCircle } from 'lucide-react'

export default function About() {
  return (
    <>
      <Helmet>
        <title>About KashPages - Professional Digital Publishing</title>
        <meta name="description" content="Learn about KashPages: what we do, what we don't do, and why we're different." />
      </Helmet>

      <div className="bg-white">
        {/* Hero */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6">
              About KashPages
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              We're a digital publishing platform for Kashmir businesses.
              Not a website builder. Not a marketplace. A curated publishing layer.
            </p>
          </div>
        </section>

        {/* What We Do */}
        <section className="py-20 border-t border-gray-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-12">What We Do</h2>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Professional Publishing
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    We create and publish high-quality landing pages for Kashmir businesses. Every page is designed, reviewed, and optimized by our team.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Contact-Based Presence
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Your page features phone, WhatsApp, Instagram, and location links. Customers contact you directly. Simple and effective.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    SEO & Discovery
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Every page is indexed by Google and optimized for local search. Your business becomes discoverable online.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Manual, Curated Approach
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    We work with you to understand your business and create the right page. No templates, no automation. Just quality.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What We Don't Do */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-12">What We Don't Do</h2>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <XCircle className="w-6 h-6 text-gray-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    We're Not a Website Builder
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    You don't get a dashboard to drag and drop. We handle everything. This keeps quality high and complexity low.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <XCircle className="w-6 h-6 text-gray-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    No E-commerce
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    We don't offer online stores or payment processing. Your page is for discovery and contact, not transactions.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <XCircle className="w-6 h-6 text-gray-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    No Booking Systems
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    We don't handle appointments or reservations. Customers reach out directly through your contact methods.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <XCircle className="w-6 h-6 text-gray-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Not a Marketplace
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Your page stands alone. We don't aggregate businesses or facilitate comparisons. You have your own space.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Different */}
        <section className="py-20 border-t border-gray-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Why We're Different
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              Most platforms give you tools. We give you results.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              Website builders require technical knowledge, time, and design skills. They're overwhelming for business owners who just want to be found online.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              KashPages removes that burden. We're a publishing service, not a software tool. You provide information, we create quality. This approach ensures every business on KashPages looks professional and trustworthy.
            </p>
            <p className="text-gray-600 leading-relaxed">
              For Kashmir businesses, this means faster time to market, consistent branding, and peace of mind.
            </p>
          </div>
        </section>
      </div>
    </>
  )
}
