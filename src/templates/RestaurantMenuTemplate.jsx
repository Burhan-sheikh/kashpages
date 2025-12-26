import { Phone, MapPin, Clock, Instagram, Facebook, UtensilsCrossed } from 'lucide-react'

export default function RestaurantMenuTemplate({ data }) {
  const {
    restaurantName = 'Restaurant Name',
    tagline = 'Authentic flavors, memorable experiences',
    description = 'Welcome to our restaurant. We serve delicious food made with love.',
    menuCategories = [],
    specialties = [],
    gallery = [],
    phone = '+91-9999999999',
    whatsapp = '919999999999',
    address = 'Srinagar, Kashmir',
    hours = 'Daily: 11 AM - 10 PM',
    instagram = '',
    facebook = '',
    delivery = false
  } = data

  return (
    <div className="min-h-screen bg-amber-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-red-900 via-red-800 to-orange-900 text-white py-32">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLTItMi0yLTJzLTItMC0yIDJjMCAyIDIgMiAyIDJzMiAwIDItMnptMCAyMGMwLTItMi0yLTItMnMtMi0wLTIgMmMwIDIgMiAyIDIgMnMyIDAgMi0yem0tMjAtMjBjMC0yLTItMi0yLTJzLTItMC0yIDJjMCAyIDIgMiAyIDJzMiAwIDItMnptMCAyMGMwLTItMi0yLTItMnMtMi0wLTIgMmMwIDIgMiAyIDIgMnMyIDAgMi0yem0yMC00MGMwLTItMi0yLTItMnMtMi0wLTIgMmMwIDIgMiAyIDIgMnMyIDAgMi0yem0tMjAgMGMwLTItMi0yLTItMnMtMi0wLTIgMmMwIDIgMiAyIDIgMnMyIDAgMi0yeiIvPjwvZz48L2c+PC9zdmc+')] bg-repeat"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6">
            <UtensilsCrossed className="w-10 h-10" />
          </div>
          <h1 className="text-5xl sm:text-7xl font-bold mb-6">
            {restaurantName}
          </h1>
          <p className="text-2xl text-orange-100 mb-8">{tagline}</p>
          <p className="text-lg text-orange-200 mb-10 max-w-2xl mx-auto">
            {description}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={`tel:${phone}`}
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-red-900 rounded-full font-semibold hover:bg-orange-50 transition-colors"
            >
              <Phone className="w-5 h-5" />
              Call to Order
            </a>
            <a
              href={`https://wa.me/${whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-green-500 text-white rounded-full font-semibold hover:bg-green-600 transition-colors"
            >
              <Phone className="w-5 h-5" />
              WhatsApp Order
            </a>
          </div>
        </div>
      </section>

      {/* Specialties Section */}
      {specialties.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Chef's Specials</h2>
              <p className="text-xl text-gray-600">Our signature dishes</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {specialties.map((dish, index) => (
                <div key={index} className="group">
                  <div className="aspect-square bg-gray-100 rounded-2xl mb-4 overflow-hidden">
                    {dish.image ? (
                      <img
                        src={dish.image}
                        alt={dish.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-4xl">
                        {dish.emoji || '🍽️'}
                      </div>
                    )}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {dish.name}
                  </h3>
                  <p className="text-gray-600 mb-3">{dish.description}</p>
                  {dish.price && (
                    <p className="text-2xl font-bold text-red-600">₹{dish.price}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Menu Section */}
      {menuCategories.length > 0 && (
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-16 text-center">Our Menu</h2>
            <div className="space-y-12">
              {menuCategories.map((category, index) => (
                <div key={index}>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-red-600">
                    {category.name}
                  </h3>
                  <div className="space-y-4">
                    {category.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex justify-between items-start gap-4">
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold text-gray-900 mb-1">
                            {item.name}
                            {item.vegetarian && (
                              <span className="ml-2 text-green-600 text-sm">🌱</span>
                            )}
                          </h4>
                          <p className="text-gray-600 text-sm">{item.description}</p>
                        </div>
                        {item.price && (
                          <span className="text-lg font-bold text-red-600 whitespace-nowrap">
                            ₹{item.price}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Gallery Section */}
      {gallery.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Gallery</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {gallery.map((image, index) => (
                <div key={index} className="aspect-square bg-gray-100 rounded-2xl overflow-hidden">
                  <img
                    src={image}
                    alt={`Gallery ${index + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Info Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Visit Us</h2>
            <p className="text-xl text-gray-300">We look forward to serving you</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Phone</h3>
              <a href={`tel:${phone}`} className="text-gray-300 hover:text-white">
                {phone}
              </a>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Location</h3>
              <p className="text-gray-300">{address}</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Hours</h3>
              <p className="text-gray-300">{hours}</p>
            </div>
          </div>

          {delivery && (
            <div className="text-center bg-green-600 rounded-2xl p-6">
              <p className="text-xl font-semibold">🚀 Now delivering to your doorstep!</p>
            </div>
          )}
        </div>
      </section>

      {/* Social Links */}
      {(instagram || facebook) && (
        <section className="py-12 bg-amber-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center gap-4">
              {instagram && (
                <a
                  href={`https://instagram.com/${instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-medium hover:opacity-90 transition-opacity"
                >
                  <Instagram className="w-5 h-5" />
                  Follow on Instagram
                </a>
              )}
              {facebook && (
                <a
                  href={`https://facebook.com/${facebook}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-colors"
                >
                  <Facebook className="w-5 h-5" />
                  Like on Facebook
                </a>
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
