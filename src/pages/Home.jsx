import { Link } from 'react-router-dom'
import SeoHead from '../components/seo/SeoHead'
import Button from '../components/ui/Button'
import { Phone, MessageCircle, Instagram, MapPin, Globe, Zap, Shield, TrendingUp } from 'lucide-react'

export default function Home() {
  const features = [
    {
      icon: <Globe className="w-8 h-8" />,
      title: 'Professional Landing Pages',
      description: 'Beautiful, SEO-optimized pages that showcase your Kashmir business to the world'
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Lightning Fast',
      description: 'Optimized for speed and performance. Your customers find you instantly on Google'
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Trusted Platform',
      description: 'We handle everything. Focus on your business while we manage your online presence'
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'Contact-Based Leads',
      description: 'Direct phone, WhatsApp, Instagram, and Maps integration for instant customer connection'
    }
  ]

  const plans = [
    {
      name: 'Basic',
      price: '₹1,999',
      period: 'per year',
      features: [
        'Single landing page',
        'Subpath URL (kashpages.in/your-business)',
        'Contact buttons (Phone, WhatsApp, Instagram, Maps)',
        'Basic SEO optimization',
        'Paid updates: ₹99/hour'
      ],
      cta: 'Get Started',
      popular: false
    },
    {
      name: 'Standard',
      price: '₹4,999',
      period: 'per year',
      features: [
        'Everything in Basic',
        'Advanced SEO optimization',
        'Launch support & consultation',
        '24-hour free changes after launch',
        'Priority support',
        'Google My Business optimization'
      ],
      cta: 'Most Popular',
      popular: true
    },
    {
      name: 'Custom',
      price: 'Custom',
      period: 'one-time',
      features: [
        'Full custom website or web app',
        'Custom domain included',
        'Complete source code',
        'E-commerce, booking systems, etc.',
        'No future responsibility',
        'Starting from ₹9,999'
      ],
      cta: 'Contact Us',
      popular: false
    }
  ]

  return (
    <>
      <SeoHead
        title="KashPages - Professional Landing Pages for Kashmir Businesses"
        description="Create beautiful, SEO-optimized landing pages for your Kashmir business. Contact-based leads through phone, WhatsApp, Instagram, and Maps. Trusted by local businesses."
        keywords={['kashmir business', 'landing pages', 'srinagar', 'local business', 'kashpages']}
        ogUrl="https://kashpages.in"
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-50 via-white to-blue-50 py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Your Business Deserves
              <span className="block text-primary mt-2">A Professional Presence</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
              Beautiful landing pages for Kashmir businesses.
              <span className="block mt-2">No setup. No hassle. Just results.</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/explore">
                <Button size="lg" className="w-full sm:w-auto text-lg px-8 py-4">
                  Explore Pages
                </Button>
              </Link>
              <Link to="#plans">
                <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg px-8 py-4">
                  View Plans
                </Button>
              </Link>
            </div>
            <p className="mt-6 text-sm text-gray-500">
              ✔️ No credit card required · ✔️ Contact-based service
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Three simple steps to get your business online
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {[
              { step: '01', title: 'Contact Us', desc: 'Reach out via WhatsApp, phone, or Instagram. Tell us about your business.' },
              { step: '02', title: 'We Build', desc: 'Our team creates a beautiful, SEO-optimized landing page for you.' },
              { step: '03', title: 'Go Live', desc: 'Your page goes live at kashpages.in/your-business. Start getting customers!' }
            ].map((item, idx) => (
              <div key={idx} className="relative text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary font-bold text-2xl mb-6">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Why Choose KashPages?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Built specifically for Kashmir businesses
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-primary mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Connect Instantly
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Every page includes direct contact buttons
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { icon: <Phone className="w-8 h-8" />, label: 'Phone Call' },
              { icon: <MessageCircle className="w-8 h-8" />, label: 'WhatsApp' },
              { icon: <Instagram className="w-8 h-8" />, label: 'Instagram' },
              { icon: <MapPin className="w-8 h-8" />, label: 'Google Maps' }
            ].map((method, idx) => (
              <div key={idx} className="text-center p-6 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="text-primary mx-auto mb-3 flex justify-center">{method.icon}</div>
                <p className="text-sm font-medium text-gray-900">{method.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="plans" className="py-20 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose the plan that fits your business needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, idx) => (
              <div
                key={idx}
                className={`relative bg-white rounded-2xl shadow-lg p-8 ${
                  plan.popular ? 'ring-2 ring-primary scale-105 z-10' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-600">/ {plan.period}</span>
                  </div>
                </div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-3">
                      <span className="text-primary mt-1">✔</span>
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  size="lg"
                  variant={plan.popular ? 'primary' : 'outline'}
                  className="w-full"
                >
                  {plan.cta}
                </Button>
              </div>
            ))}
          </div>

          <p className="text-center text-gray-600 mt-12 max-w-3xl mx-auto">
            <strong>Note:</strong> All prices are one-time payments. No hidden fees. No automatic renewals.
            Contact us for any questions or custom requirements.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-lg md:text-xl mb-8 opacity-90">
            Join Kashmir's growing community of businesses with professional online presence
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/explore">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                Explore Examples
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline" className="w-full sm:w-auto bg-white text-primary hover:bg-gray-100">
                Sign Up Free
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer Disclaimer */}
      <section className="py-12 bg-gray-900 text-gray-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-sm">
            <p className="mb-4">
              <strong className="text-white">Contact-Based Service:</strong> KashPages is a publishing platform.
              All transactions happen through direct contact (phone, WhatsApp, email).
              No online payments, no e-commerce, no bookings.
            </p>
            <p>
              Your landing page provides contact information for customers to reach you directly.
              Perfect for service-based businesses in Kashmir.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
