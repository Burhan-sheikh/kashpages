import { Check, Sparkles, Zap, Crown } from 'lucide-react'
import Header from '../components/layout/Header'
import { Link } from 'react-router-dom'

export default function Plans() {
  const plans = [
    {
      name: 'Basic',
      price: '2,999',
      period: 'per year',
      description: 'Perfect for small businesses getting started online',
      icon: Sparkles,
      color: 'from-blue-500 to-cyan-500',
      features: [
        'Choose from 3 professional templates',
        'Custom subdomain (yourname.kashpages.in)',
        'Mobile responsive design',
        'Basic SEO optimization',
        'Contact form integration',
        'Google Maps integration',
        '24/7 email support',
        '99.9% uptime guarantee'
      ],
      popular: false
    },
    {
      name: 'Standard',
      price: '4,999',
      period: 'per year',
      description: 'Most popular choice for growing businesses',
      icon: Zap,
      color: 'from-purple-500 to-pink-500',
      features: [
        'Everything in Basic',
        'Custom domain support (yourname.com)',
        'Advanced SEO optimization',
        'WhatsApp integration',
        'Instagram & Facebook links',
        'Priority email & phone support',
        'Monthly content updates',
        'Analytics dashboard',
        'Remove KashPages branding'
      ],
      popular: true
    },
    {
      name: 'Custom',
      price: 'Custom',
      period: 'pricing',
      description: 'Tailored solutions for unique business needs',
      icon: Crown,
      color: 'from-orange-500 to-red-500',
      features: [
        'Everything in Standard',
        'Fully custom design',
        'Advanced features & integrations',
        'E-commerce capabilities',
        'Booking system integration',
        'Payment gateway integration',
        'Dedicated account manager',
        'Unlimited revisions',
        'White-label solution'
      ],
      popular: false
    }
  ]

  const faqs = [
    {
      question: 'Can I switch plans later?',
      answer: 'Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately.'
    },
    {
      question: 'What happens after one year?',
      answer: 'Simply renew your subscription to keep your page live. We'll send you reminders 30 days before expiry.'
    },
    {
      question: 'Do I need technical knowledge?',
      answer: 'Not at all! Our platform is designed for everyone. No coding required - just fill in your information and publish.'
    },
    {
      question: 'Can I use my own domain?',
      answer: 'Yes, with Standard and Custom plans you can connect your own domain name (e.g., yourbusiness.com).'
    },
    {
      question: 'Is there a setup fee?',
      answer: 'No setup fees! The price you see is all you pay. No hidden charges.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept bank transfers, UPI, and cash payments. Contact us for payment details.'
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl sm:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Simple, Transparent Pricing
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Choose the plan that fits your business. All plans include professional templates, 
            mobile optimization, and our commitment to your success.
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-gray-200">
            <Check className="w-5 h-5 text-green-600" />
            <span className="text-sm font-medium text-gray-700">No credit card required to start</span>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => {
              const Icon = plan.icon
              return (
                <div
                  key={index}
                  className={`relative bg-white rounded-3xl p-8 transition-all ${
                    plan.popular
                      ? 'border-2 border-purple-600 shadow-2xl md:scale-105'
                      : 'border border-gray-200 shadow-lg'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-semibold rounded-full shadow-lg">
                      Most Popular
                    </div>
                  )}
                  
                  {/* Icon */}
                  <div className={`w-14 h-14 bg-gradient-to-r ${plan.color} rounded-2xl flex items-center justify-center mb-6`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>

                  {/* Plan Name */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-6">{plan.description}</p>

                  {/* Price */}
                  <div className="mb-8">
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-medium text-gray-900">₹</span>
                      <span className="text-5xl font-bold text-gray-900">{plan.price}</span>
                    </div>
                    <p className="text-gray-600 mt-1">{plan.period}</p>
                  </div>

                  {/* Features */}
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <Link
                    to="/contact"
                    className={`block w-full py-4 text-center rounded-full font-semibold transition-all ${
                      plan.popular
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-xl'
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }`}
                  >
                    Get Started
                  </Link>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Compare Plans</h2>
            <p className="text-xl text-gray-600">See what's included in each plan</p>
          </div>
          
          <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left">Feature</th>
                    <th className="px-6 py-4 text-center">Basic</th>
                    <th className="px-6 py-4 text-center">Standard</th>
                    <th className="px-6 py-4 text-center">Custom</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 text-gray-900">Professional Templates</td>
                    <td className="px-6 py-4 text-center"><Check className="w-5 h-5 text-green-600 mx-auto" /></td>
                    <td className="px-6 py-4 text-center"><Check className="w-5 h-5 text-green-600 mx-auto" /></td>
                    <td className="px-6 py-4 text-center"><Check className="w-5 h-5 text-green-600 mx-auto" /></td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 text-gray-900">Mobile Responsive</td>
                    <td className="px-6 py-4 text-center"><Check className="w-5 h-5 text-green-600 mx-auto" /></td>
                    <td className="px-6 py-4 text-center"><Check className="w-5 h-5 text-green-600 mx-auto" /></td>
                    <td className="px-6 py-4 text-center"><Check className="w-5 h-5 text-green-600 mx-auto" /></td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-gray-900">Custom Domain</td>
                    <td className="px-6 py-4 text-center text-gray-400">-</td>
                    <td className="px-6 py-4 text-center"><Check className="w-5 h-5 text-green-600 mx-auto" /></td>
                    <td className="px-6 py-4 text-center"><Check className="w-5 h-5 text-green-600 mx-auto" /></td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 text-gray-900">Advanced SEO</td>
                    <td className="px-6 py-4 text-center text-gray-400">-</td>
                    <td className="px-6 py-4 text-center"><Check className="w-5 h-5 text-green-600 mx-auto" /></td>
                    <td className="px-6 py-4 text-center"><Check className="w-5 h-5 text-green-600 mx-auto" /></td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-gray-900">Custom Design</td>
                    <td className="px-6 py-4 text-center text-gray-400">-</td>
                    <td className="px-6 py-4 text-center text-gray-400">-</td>
                    <td className="px-6 py-4 text-center"><Check className="w-5 h-5 text-green-600 mx-auto" /></td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 text-gray-900">E-commerce Integration</td>
                    <td className="px-6 py-4 text-center text-gray-400">-</td>
                    <td className="px-6 py-4 text-center text-gray-400">-</td>
                    <td className="px-6 py-4 text-center"><Check className="w-5 h-5 text-green-600 mx-auto" /></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">Everything you need to know about our plans</p>
          </div>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{faq.question}</h3>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-10">
            Join hundreds of Kashmir businesses already online with KashPages
          </p>
          <Link
            to="/contact"
            className="inline-block px-8 py-4 bg-white text-gray-900 rounded-full font-semibold text-lg hover:shadow-2xl transition-all"
          >
            Contact Us Today
          </Link>
        </div>
      </section>
    </div>
  )
}
