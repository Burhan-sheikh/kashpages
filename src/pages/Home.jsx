import { Link } from 'react-router-dom'
import { ArrowRight, Check, Sparkles, Zap, Globe, Shield, TrendingUp, Users, Layout, Palette, Code, Clock, Star, Award, Target, Heart } from 'lucide-react'
import Header from '../components/layout/Header'

export default function Home() {
  const features = [
    {
      icon: Layout,
      title: 'Professional Templates',
      description: 'Choose from beautifully designed templates that work for any business'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Pages load in under 2 seconds, keeping your customers engaged'
    },
    {
      icon: Globe,
      title: 'SEO Optimized',
      description: 'Built-in SEO features help customers find you on Google'
    },
    {
      icon: Shield,
      title: 'Secure & Reliable',
      description: 'Enterprise-grade security keeps your business information safe'
    },
    {
      icon: Palette,
      title: 'No Coding Required',
      description: 'Create stunning pages with our easy-to-use visual editor'
    },
    {
      icon: Clock,
      title: 'Live in Minutes',
      description: 'Get your business online in less than 10 minutes'
    }
  ]

  const templates = [
    {
      name: 'Modern Business',
      description: 'Perfect for shops, services, and professional businesses',
      icon: '💼',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      name: 'Minimal Portfolio',
      description: 'Showcase your work with elegance and simplicity',
      icon: '🎨',
      color: 'from-purple-500 to-pink-500'
    },
    {
      name: 'Restaurant Menu',
      description: 'Appetizing designs for food and beverage businesses',
      icon: '🍽️',
      color: 'from-orange-500 to-red-500'
    }
  ]

  const stats = [
    { label: 'Active Businesses', value: '500+', icon: Users },
    { label: 'Templates', value: '3', icon: Layout },
    { label: 'Uptime', value: '99.9%', icon: Shield },
    { label: 'Avg. Load Time', value: '<2s', icon: Zap }
  ]

  const testimonials = [
    {
      text: "KashPages transformed our online presence. We're now getting 3x more customer inquiries!",
      author: 'Rahul Sharma',
      business: 'Kashmir Carpets',
      rating: 5
    },
    {
      text: "Setting up our restaurant page took only 10 minutes. The menu template is perfect!",
      author: 'Aisha Khan',
      business: 'Wazwan House',
      rating: 5
    },
    {
      text: "As a freelancer, the portfolio template helps me showcase my work beautifully.",
      author: 'Arjun Mehta',
      business: 'Freelance Designer',
      rating: 5
    }
  ]

  const plans = [
    {
      name: 'Basic',
      price: '₹2,999',
      period: '/year',
      features: [
        'Professional template',
        'Custom domain (yourname.kashpages.in)',
        'Mobile responsive',
        'Basic SEO',
        'Contact form',
        '24/7 support'
      ],
      popular: false
    },
    {
      name: 'Standard',
      price: '₹4,999',
      period: '/year',
      features: [
        'Everything in Basic',
        'Custom domain support',
        'Advanced SEO',
        'WhatsApp integration',
        'Google Maps integration',
        'Priority support',
        'Monthly updates'
      ],
      popular: true
    },
    {
      name: 'Custom',
      price: 'Custom',
      period: 'pricing',
      features: [
        'Everything in Standard',
        'Fully custom design',
        'Advanced features',
        'E-commerce integration',
        'Analytics dashboard',
        'Dedicated manager',
        'Unlimited revisions'
      ],
      popular: false
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50"></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-300 rounded-full filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-300 rounded-full filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-300 rounded-full filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm border border-gray-200 mb-8">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-gray-700">Trusted by 500+ Kashmir businesses</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-gray-900 via-blue-800 to-purple-900 bg-clip-text text-transparent">
                Your Business,
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Online in Minutes
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-xl sm:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
              Create stunning, professional pages for your business without any coding. Choose a template, add your content, and go live instantly.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Link
                to="/signup"
                className="group w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold text-lg hover:shadow-2xl hover:shadow-blue-500/50 transition-all flex items-center justify-center gap-2"
              >
                Get Started Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/explore"
                className="w-full sm:w-auto px-8 py-4 bg-white text-gray-700 rounded-full font-semibold text-lg border-2 border-gray-300 hover:border-gray-400 transition-all"
              >
                View Examples
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-600" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-600" />
                <span>Setup in 10 minutes</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-600" />
                <span>24/7 support</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-2xl mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-blue-100">{stat.label}</div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Powerful features designed to help your business grow online
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div
                  key={index}
                  className="group p-8 bg-gradient-to-br from-white to-gray-50 rounded-3xl border border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all"
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Templates Section */}
      <section className="py-32 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Beautiful Templates for Every Business
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose from professionally designed templates and customize to match your brand
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {templates.map((template, index) => (
              <div
                key={index}
                className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all"
              >
                <div className={`h-48 bg-gradient-to-br ${template.color} flex items-center justify-center`}>
                  <span className="text-7xl">{template.icon}</span>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-3">{template.name}</h3>
                  <p className="text-gray-600 mb-6">{template.description}</p>
                  <Link
                    to="/plans"
                    className="inline-flex items-center gap-2 text-blue-600 font-medium hover:gap-3 transition-all"
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/explore"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-900 rounded-full font-semibold border-2 border-gray-300 hover:border-gray-400 transition-all"
            >
              View All Templates
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Loved by Kashmir Businesses
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See what our customers have to say about their experience
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-3xl border border-gray-200 shadow-lg"
              >
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 text-lg mb-6 leading-relaxed italic">
                  "{testimonial.text}"
                </p>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.author}</p>
                  <p className="text-sm text-gray-600">{testimonial.business}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-32 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the plan that fits your business needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`relative bg-white rounded-3xl p-8 ${
                  plan.popular
                    ? 'border-2 border-blue-600 shadow-2xl scale-105'
                    : 'border border-gray-200 shadow-lg'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-semibold rounded-full">
                    Most Popular
                  </div>
                )}
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-600">{plan.period}</span>
                  </div>
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
                  className={`block w-full py-4 text-center rounded-full font-semibold transition-all ${
                    plan.popular
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-xl'
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

      {/* CTA Section */}
      <section className="py-32 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Ready to Take Your Business Online?
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Join hundreds of Kashmir businesses already thriving online with KashPages
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/signup"
              className="w-full sm:w-auto px-8 py-4 bg-white text-gray-900 rounded-full font-semibold text-lg hover:shadow-2xl transition-all"
            >
              Start Free Today
            </Link>
            <Link
              to="/contact"
              className="w-full sm:w-auto px-8 py-4 bg-transparent text-white rounded-full font-semibold text-lg border-2 border-white hover:bg-white/10 transition-all"
            >
              Talk to Us
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">KashPages</span>
              </div>
              <p className="text-sm leading-relaxed">
                Empowering Kashmir businesses to thrive online with professional, easy-to-create pages.
              </p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/explore" className="hover:text-white transition-colors">Templates</Link></li>
                <li><Link to="/plans" className="hover:text-white transition-colors">Pricing</Link></li>
                <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQs</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-800 text-center text-sm">
            <p>&copy; 2025 KashPages. All rights reserved. Made with <Heart className="w-4 h-4 text-red-500 inline" /> in Kashmir</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
