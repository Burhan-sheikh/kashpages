import { Search, Filter, ExternalLink, Sparkles } from 'lucide-react'
import Header from '../components/layout/Header'
import { useState } from 'react'

export default function Explore() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = [
    { id: 'all', name: 'All Businesses', count: 12 },
    { id: 'business', name: 'Business', count: 5 },
    { id: 'portfolio', name: 'Portfolio', count: 4 },
    { id: 'restaurant', name: 'Restaurant', count: 3 }
  ]

  const examplePages = [
    {
      name: 'Kashmir Carpets',
      slug: 'kashmir-carpets',
      category: 'business',
      template: 'Modern Business',
      description: 'Authentic Kashmiri carpets and handicrafts',
      image: '🧶'
    },
    {
      name: 'Aisha Designer',
      slug: 'aisha-designer',
      category: 'portfolio',
      template: 'Minimal Portfolio',
      description: 'Graphic designer specializing in branding',
      image: '🎨'
    },
    {
      name: 'Wazwan House',
      slug: 'wazwan-house',
      category: 'restaurant',
      template: 'Restaurant Menu',
      description: 'Authentic Kashmiri Wazwan cuisine',
      image: '🍛'
    },
    {
      name: 'Srinagar Home Services',
      slug: 'srinagar-services',
      category: 'business',
      template: 'Modern Business',
      description: 'Professional home repair and maintenance',
      image: '🔧'
    },
    {
      name: 'Kashmir Photography',
      slug: 'kashmir-photos',
      category: 'portfolio',
      template: 'Minimal Portfolio',
      description: 'Professional photography services',
      image: '📸'
    },
    {
      name: 'Dal Lake Cafe',
      slug: 'dal-lake-cafe',
      category: 'restaurant',
      template: 'Restaurant Menu',
      description: 'Coffee and light bites with a view',
      image: '☕'
    },
    {
      name: 'Kashmir Tours',
      slug: 'kashmir-tours',
      category: 'business',
      template: 'Modern Business',
      description: 'Guided tours across Kashmir valley',
      image: '🏔️'
    },
    {
      name: 'Freelance Writer',
      slug: 'freelance-writer',
      category: 'portfolio',
      template: 'Minimal Portfolio',
      description: 'Content writer and journalist',
      image: '✍️'
    },
    {
      name: 'Kashmiri Kitchen',
      slug: 'kashmiri-kitchen',
      category: 'restaurant',
      template: 'Restaurant Menu',
      description: 'Traditional Kashmiri home-style cooking',
      image: '🍲'
    },
    {
      name: 'Tech Solutions Kashmir',
      slug: 'tech-solutions',
      category: 'business',
      template: 'Modern Business',
      description: 'IT services and software development',
      image: '💻'
    },
    {
      name: 'Kashmir Handicrafts',
      slug: 'kashmir-handicrafts',
      category: 'business',
      template: 'Modern Business',
      description: 'Traditional papier-mache and woodwork',
      image: '🏺'
    },
    {
      name: 'Web Developer Portfolio',
      slug: 'web-dev-portfolio',
      category: 'portfolio',
      template: 'Minimal Portfolio',
      description: 'Full-stack web developer',
      image: '🚀'
    }
  ]

  const filteredPages = examplePages.filter(page => {
    const matchesCategory = selectedCategory === 'all' || page.category === selectedCategory
    const matchesSearch = page.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         page.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm border border-gray-200 mb-8">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-gray-700">Live Examples</span>
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Explore Pages
              </span>
            </h1>
            <p className="text-xl text-gray-600">
              See how Kashmir businesses are using KashPages to grow online. 
              Get inspired for your own page!
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by business name or type..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-200 rounded-full focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-gray-300'
                }`}
              >
                {category.name}
                <span className="ml-2 text-sm opacity-75">({category.count})</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Pages Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredPages.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-gray-600">No pages found matching your search</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPages.map((page, index) => (
                <div
                  key={index}
                  className="group bg-white rounded-3xl overflow-hidden border border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all"
                >
                  {/* Thumbnail */}
                  <div className="h-48 bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center text-7xl">
                    {page.image}
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {page.name}
                      </h3>
                      <span className="px-3 py-1 bg-blue-100 text-blue-600 text-xs font-medium rounded-full">
                        {page.template}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-4">{page.description}</p>
                    <a
                      href={`/${page.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-blue-600 font-medium hover:gap-3 transition-all"
                    >
                      View Page
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Create Your Own Page?
          </h2>
          <p className="text-xl text-blue-100 mb-10">
            Get your business online in just 10 minutes with KashPages
          </p>
          <a
            href="/signup"
            className="inline-block px-8 py-4 bg-white text-gray-900 rounded-full font-semibold text-lg hover:shadow-2xl transition-all"
          >
            Get Started Free
          </a>
        </div>
      </section>
    </div>
  )
}
