import { Helmet } from 'react-helmet-async'
import { Phone, Mail, MessageCircle, MapPin } from 'lucide-react'

export default function Contact() {
  return (
    <>
      <Helmet>
        <title>Contact Us - KashPages</title>
        <meta name="description" content="Get in touch with KashPages. We're here to help your business get online." />
      </Helmet>

      <div className="bg-white">
        {/* Hero */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6">
              Let's get you online.
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Contact us to discuss your business and get started with KashPages.
            </p>
          </div>
        </section>

        {/* Contact Methods */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid sm:grid-cols-2 gap-8">
              {/* Phone */}
              <a
                href="tel:+919999999999"
                className="group bg-gray-50 rounded-2xl p-8 hover:bg-gray-100 transition-all duration-200"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                      <Phone className="w-6 h-6 text-gray-900" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Phone</h3>
                    <p className="text-gray-600 mb-2">Call us directly</p>
                    <p className="text-gray-900 font-medium">+91-XXXX-XXXX</p>
                  </div>
                </div>
              </a>

              {/* WhatsApp */}
              <a
                href="https://wa.me/919999999999"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-gray-50 rounded-2xl p-8 hover:bg-gray-100 transition-all duration-200"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                      <MessageCircle className="w-6 h-6 text-gray-900" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">WhatsApp</h3>
                    <p className="text-gray-600 mb-2">Message us anytime</p>
                    <p className="text-gray-900 font-medium">+91-XXXX-XXXX</p>
                  </div>
                </div>
              </a>

              {/* Email */}
              <a
                href="mailto:hello@kashpages.in"
                className="group bg-gray-50 rounded-2xl p-8 hover:bg-gray-100 transition-all duration-200"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                      <Mail className="w-6 h-6 text-gray-900" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Email</h3>
                    <p className="text-gray-600 mb-2">Send us an email</p>
                    <p className="text-gray-900 font-medium">hello@kashpages.in</p>
                  </div>
                </div>
              </a>

              {/* Location */}
              <div className="bg-gray-50 rounded-2xl p-8">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-gray-900" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Location</h3>
                    <p className="text-gray-600 mb-2">Based in Kashmir</p>
                    <p className="text-gray-900 font-medium">Srinagar, J&K</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Information */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">What to prepare</h2>
            
            <div className="bg-white rounded-2xl p-8 space-y-4">
              <p className="text-gray-700">
                When you contact us, have the following information ready:
              </p>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="text-gray-400 mt-1">•</span>
                  <span>Your business name and type</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gray-400 mt-1">•</span>
                  <span>What you sell or what service you provide</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gray-400 mt-1">•</span>
                  <span>Your contact details (phone, WhatsApp, Instagram)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gray-400 mt-1">•</span>
                  <span>Your business location (for Google Maps)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gray-400 mt-1">•</span>
                  <span>Any photos or logos (optional)</span>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
