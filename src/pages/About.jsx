import { Award, Target, Heart, Users, Zap, Shield } from 'lucide-react'
import Header from '../components/layout/Header'

export default function About() {
  const values = [
    {
      icon: Heart,
      title: 'Customer First',
      description: 'We put our customers at the heart of everything we do, ensuring their success is our success.'
    },
    {
      icon: Zap,
      title: 'Innovation',
      description: 'Constantly improving our platform with cutting-edge technology and user-friendly features.'
    },
    {
      icon: Shield,
      title: 'Trust & Security',
      description: 'Your data and business information is protected with enterprise-grade security.'
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Building a thriving community of Kashmir businesses growing together online.'
    }
  ]

  const team = [
    {
      name: 'Leadership Team',
      role: 'Driving Innovation',
      description: 'Experienced professionals dedicated to empowering local businesses'
    },
    {
      name: 'Development Team',
      role: 'Building Excellence',
      description: 'Talented developers creating robust, scalable solutions'
    },
    {
      name: 'Support Team',
      role: '24/7 Assistance',
      description: 'Always here to help your business succeed online'
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl sm:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Empowering Kashmir Businesses
              </span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              KashPages is on a mission to bring every Kashmir business online with professional, 
              easy-to-create pages that drive real results.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full mb-6">
                <Target className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-semibold text-blue-600">Our Mission</span>
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Making Online Presence Accessible to Everyone
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                We believe every business in Kashmir deserves a professional online presence, 
                regardless of technical expertise or budget. That's why we created KashPages - 
                a platform that makes it incredibly easy to get online.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                No coding required. No complicated setup. Just beautiful, professional pages 
                that help your business grow.
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-500 to-purple-500 rounded-3xl p-12 text-white">
              <div className="space-y-8">
                <div>
                  <div className="text-5xl font-bold mb-2">500+</div>
                  <div className="text-blue-100">Businesses Online</div>
                </div>
                <div>
                  <div className="text-5xl font-bold mb-2">10k+</div>
                  <div className="text-blue-100">Visitors Per Month</div>
                </div>
                <div>
                  <div className="text-5xl font-bold mb-2">99.9%</div>
                  <div className="text-blue-100">Uptime Guaranteed</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-xl text-gray-600">The principles that guide everything we do</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <div key={index} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mb-6">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Story</h2>
            <p className="text-xl text-gray-600">How KashPages came to be</p>
          </div>
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 leading-relaxed mb-6">
              KashPages was born from a simple observation: talented businesses in Kashmir 
              were struggling to establish an online presence. Complex website builders, 
              expensive developers, and technical barriers were keeping amazing businesses 
              from reaching their full potential.
            </p>
            <p className="text-gray-700 leading-relaxed mb-6">
              We knew there had to be a better way. So we set out to create a platform that 
              anyone could use - from carpet sellers in old city to café owners in Lal Chowk, 
              from freelance designers to restaurant owners.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Today, over 500 Kashmir businesses have gone online with KashPages. They're 
              reaching new customers, growing their revenue, and competing in the digital age - 
              all without writing a single line of code.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Team</h2>
            <p className="text-xl text-gray-600">Dedicated professionals working for your success</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white p-8 rounded-3xl shadow-lg text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <Users className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-blue-600 font-medium mb-4">{member.role}</p>
                <p className="text-gray-600">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Join Our Growing Community
          </h2>
          <p className="text-xl text-blue-100 mb-10">
            Be part of the digital transformation of Kashmir businesses
          </p>
          <a
            href="/signup"
            className="inline-block px-8 py-4 bg-white text-gray-900 rounded-full font-semibold text-lg hover:shadow-2xl transition-all"
          >
            Get Started Today
          </a>
        </div>
      </section>
    </div>
  )
}
