import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { ArrowRight, Shield, Zap, Globe, CheckCircle } from 'lucide-react'

export default function Home() {
  return (
    <>
      <Helmet>
        <title>KashPages - Professional Digital Presence for Kashmir Businesses</title>
        <meta name="description" content="Trusted digital publishing platform for Kashmir businesses. Get your professional landing page without the complexity." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-100 via-transparent to-transparent opacity-50"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 mb-6">
              Your Business.
              <br />
              <span className="text-gray-600">Professionally Published.</span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              We create and publish professional landing pages for Kashmir businesses.
              No builders. No complexity. Just your presence, done right.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/explore" 
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-gray-900 rounded-full hover:bg-gray-800 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Explore Pages
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link 
                to="/contact" 
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-gray-900 bg-white border-2 border-gray-200 rounded-full hover:border-gray-300 transition-all duration-200"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Publishing, not building.
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We handle the technical work. You focus on your business.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-2xl mb-6">
                <Shield className="w-8 h-8 text-gray-900" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">Professional</h3>
              <p className="text-gray-600 leading-relaxed">
                Every page is crafted and reviewed by our team. Quality guaranteed.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-2xl mb-6">
                <Zap className="w-8 h-8 text-gray-900" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">Fast</h3>
              <p className="text-gray-600 leading-relaxed">
                Your page goes live within 24 hours. No waiting, no delays.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-2xl mb-6">
                <Globe className="w-8 h-8 text-gray-900" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">Discoverable</h3>
              <p className="text-gray-600 leading-relaxed">
                SEO-optimized and indexed. Your business found by customers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Three steps to online.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <div className="text-5xl font-bold text-gray-200 mb-4">01</div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">Contact Us</h3>
              <p className="text-gray-600 leading-relaxed">
                Share your business details with us through phone, WhatsApp, or email.
              </p>
            </div>

            <div>
              <div className="text-5xl font-bold text-gray-200 mb-4">02</div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">We Create</h3>
              <p className="text-gray-600 leading-relaxed">
                Our team designs and publishes your professional landing page.
              </p>
            </div>

            <div>
              <div className="text-5xl font-bold text-gray-200 mb-4">03</div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">You're Live</h3>
              <p className="text-gray-600 leading-relaxed">
                Your page is published, indexed, and ready to receive customers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Ready to get started?
          </h2>
          <p className="text-xl text-gray-300 mb-10">
            Join Kashmir businesses already published on KashPages.
          </p>
          <Link 
            to="/contact" 
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-gray-900 bg-white rounded-full hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Contact Us Today
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>
    </>
  )
}
