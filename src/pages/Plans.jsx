import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { Check } from 'lucide-react'

export default function Plans() {
  const plans = [
    {
      name: 'Basic',
      price: '₹2,999',
      duration: 'per year',
      description: 'Essential presence for small businesses',
      features: [
        'Professional landing page',
        'Contact buttons (Phone, WhatsApp)',
        'Location map',
        'Basic SEO optimization',
        'Google indexed',
        'Mobile responsive',
        'Annual renewal'
      ]
    },
    {
      name: 'Standard',
      price: '₹4,999',
      duration: 'per year',
      description: 'Enhanced presence for growing businesses',
      features: [
        'Everything in Basic',
        'Instagram integration',
        'Image gallery',
        'Enhanced SEO',
        'Custom design elements',
        'Priority support',
        'Faster updates'
      ],
      popular: true
    },
    {
      name: 'Custom',
      price: 'Custom',
      duration: 'pricing',
      description: 'Tailored solution for unique needs',
      features: [
        'Everything in Standard',
        'Custom HTML/CSS/JS',
        'Advanced integrations',
        'Premium design',
        'Dedicated support',
        'Flexible terms',
        'White-label option'
      ]
    }
  ]

  return (
    <>
      <Helmet>
        <title>Plans & Pricing - KashPages</title>
        <meta name="description" content="Simple, transparent pricing for professional digital presence in Kashmir." />
      </Helmet>

      <div className="bg-white">
        {/* Hero */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6">
              Simple, transparent pricing.
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Choose the plan that fits your business. No hidden fees. No surprises.
            </p>
          </div>
        </section>

        {/* Plans */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8">
              {plans.map((plan, index) => (
                <div
                  key={index}
                  className={`relative bg-white rounded-3xl p-8 ${
                    plan.popular
                      ? 'ring-2 ring-gray-900 shadow-2xl'
                      : 'ring-1 ring-gray-200 shadow-lg'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <span className="inline-block bg-gray-900 text-white px-4 py-1 rounded-full text-sm font-medium">
                        Most Popular
                      </span>
                    </div>
                  )}

                  <div className="mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                    <div className="flex items-baseline gap-2 mb-3">
                      <span className="text-5xl font-bold text-gray-900">{plan.price}</span>
                      <span className="text-gray-600">{plan.duration}</span>
                    </div>
                    <p className="text-gray-600">{plan.description}</p>
                  </div>

                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    to="/contact"
                    className={`block w-full text-center px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                      plan.popular
                        ? 'bg-gray-900 text-white hover:bg-gray-800'
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }`}
                  >
                    Get Started
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
              Common Questions
            </h2>

            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  What's included in the annual fee?
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Your page hosting, maintenance, SEO optimization, and Google indexing. Everything you need to stay online and discoverable for the full year.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Can I upgrade later?
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Yes. Contact us anytime to upgrade your plan. We'll pro-rate the difference and apply it to your new plan.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  What happens after the year?
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  You'll receive a renewal notice before expiry. Renew to keep your page live, or let it expire if you no longer need it. No auto-billing.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Do you offer refunds?
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  We offer a 7-day satisfaction guarantee. If you're not happy with your page within the first week, we'll refund your payment in full.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Ready to get published?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Contact us to discuss your business and choose the right plan.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-gray-900 rounded-full hover:bg-gray-800 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Contact Us
            </Link>
          </div>
        </section>
      </div>
    </>
  )
}
