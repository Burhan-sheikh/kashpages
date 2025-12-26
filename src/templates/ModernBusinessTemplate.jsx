import { Phone, Mail, MapPin, Clock, ExternalLink } from 'lucide-react'

export default function ModernBusinessTemplate({ data }) {
  const {
    businessName = 'Your Business Name',
    tagline = 'Professional services you can trust',
    description = 'We provide high-quality services to help your business grow.',
    services = [],
    about = 'About your business goes here.',
    phone = '+91-9999999999',
    email = 'info@business.com',
    address = 'Srinagar, Kashmir',
    hours = 'Mon-Sat: 9 AM - 6 PM',
    whatsapp = '919999999999',
    instagram = '',
    facebook = ''
  } = data

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-32">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:32px_32px]"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl sm:text-7xl font-bold mb-6">
            {businessName}
          </h1>
          <p className="text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            {tagline}
          </p>
          <p className="text-lg text-gray-400 mb-10 max-w-2xl mx-auto">
            {description}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={`tel:${phone}`}
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-900 rounded-full font-semibold hover:bg-gray-100 transition-colors"
            >
              <Phone className="w-5 h-5" />
              Call Now
            </a>
            <a
              href={`https://wa.me/${whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-green-500 text-white rounded-full font-semibold hover:bg-green-600 transition-colors"
            >
              <Phone className="w-5 h-5" />
              WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Services Section */}
      {services.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
              <p className="text-xl text-gray-600">What we offer</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <div key={index} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                    <span className="text-2xl">{service.icon || '⚡'}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {service.name}
                  </h3>
                  <p className="text-gray-600">
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* About Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">About Us</h2>
          </div>
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 leading-relaxed text-center">
              {about}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Get in Touch</h2>
            <p className="text-xl text-gray-300">We're here to help</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <a
              href={`tel:${phone}`}
              className="flex items-center gap-4 p-6 bg-gray-800 rounded-2xl hover:bg-gray-700 transition-colors"
            >
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Phone</p>
                <p className="font-semibold">{phone}</p>
              </div>
            </a>
            
            <a
              href={`mailto:${email}`}
              className="flex items-center gap-4 p-6 bg-gray-800 rounded-2xl hover:bg-gray-700 transition-colors"
            >
              <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Email</p>
                <p className="font-semibold break-all">{email}</p>
              </div>
            </a>
            
            <div className="flex items-center gap-4 p-6 bg-gray-800 rounded-2xl">
              <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Location</p>
                <p className="font-semibold">{address}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 p-6 bg-gray-800 rounded-2xl">
              <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Hours</p>
                <p className="font-semibold">{hours}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Links */}
      {(instagram || facebook) && (
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center gap-4">
              {instagram && (
                <a
                  href={`https://instagram.com/${instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-medium hover:opacity-90 transition-opacity"
                >
                  <ExternalLink className="w-4 h-4" />
                  Instagram
                </a>
              )}
              {facebook && (
                <a
                  href={`https://facebook.com/${facebook}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  Facebook
                </a>
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
