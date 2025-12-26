// Template Registry
// All available templates are registered here

import ModernBusinessTemplate from './ModernBusinessTemplate'
import MinimalPortfolioTemplate from './MinimalPortfolioTemplate'
import RestaurantMenuTemplate from './RestaurantMenuTemplate'

export const templates = [
  {
    id: 'modern-business',
    name: 'Modern Business',
    description: 'Clean and professional design perfect for businesses, shops, and services',
    category: 'Business',
    thumbnail: '/templates/modern-business-thumb.jpg',
    component: ModernBusinessTemplate,
    features: [
      'Hero section with call-to-action',
      'Services showcase',
      'About section',
      'Contact form',
      'Location map',
      'Responsive design'
    ],
    colors: {
      primary: '#1f2937', // gray-800
      secondary: '#3b82f6', // blue-500
      accent: '#10b981' // green-500
    },
    sections: ['hero', 'services', 'about', 'contact', 'location']
  },
  {
    id: 'minimal-portfolio',
    name: 'Minimal Portfolio',
    description: 'Elegant and simple design for professionals, freelancers, and creatives',
    category: 'Portfolio',
    thumbnail: '/templates/minimal-portfolio-thumb.jpg',
    component: MinimalPortfolioTemplate,
    features: [
      'Clean hero section',
      'Work/project gallery',
      'Skills showcase',
      'Testimonials',
      'Contact details',
      'Minimalist aesthetic'
    ],
    colors: {
      primary: '#111827', // gray-900
      secondary: '#6b7280', // gray-500
      accent: '#f59e0b' // amber-500
    },
    sections: ['hero', 'work', 'skills', 'testimonials', 'contact']
  },
  {
    id: 'restaurant-menu',
    name: 'Restaurant Menu',
    description: 'Appetizing design for restaurants, cafes, and food businesses',
    category: 'Food & Beverage',
    thumbnail: '/templates/restaurant-menu-thumb.jpg',
    component: RestaurantMenuTemplate,
    features: [
      'Hero with food imagery',
      'Menu sections',
      'Special offers',
      'Gallery',
      'Hours & location',
      'Online ordering CTA'
    ],
    colors: {
      primary: '#dc2626', // red-600
      secondary: '#f59e0b', // amber-500
      accent: '#059669' // emerald-600
    },
    sections: ['hero', 'menu', 'specials', 'gallery', 'info']
  }
]

export const getTemplateById = (id) => {
  return templates.find(t => t.id === id)
}

export const getTemplatesByCategory = (category) => {
  return templates.filter(t => t.category === category)
}

export const getAllCategories = () => {
  return [...new Set(templates.map(t => t.category))]
}
