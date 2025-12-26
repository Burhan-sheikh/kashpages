import { Mail, Phone, MapPin, ExternalLink, Briefcase } from 'lucide-react'

export default function MinimalPortfolioTemplate({ data }) {
  const {
    name = 'Your Name',
    title = 'Professional Title',
    bio = 'A brief introduction about yourself and your work.',
    skills = [],
    projects = [],
    testimonials = [],
    email = 'hello@example.com',
    phone = '+91-9999999999',
    location = 'Srinagar, Kashmir',
    linkedin = '',
    github = '',
    portfolio = ''
  } = data

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-8"></div>
          <h1 className="text-6xl sm:text-7xl font-bold text-gray-900 mb-4">
            {name}
          </h1>
          <p className="text-2xl text-gray-600 mb-8">{title}</p>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-12">
            {bio}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={`mailto:${email}`}
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-gray-900 text-gray-900 rounded-full font-medium hover:bg-gray-900 hover:text-white transition-colors"
            >
              <Mail className="w-4 h-4" />
              Get in Touch
            </a>
            {portfolio && (
              <a
                href={portfolio}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-colors"
              >
                <Briefcase className="w-4 h-4" />
                View Work
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      {skills.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Skills</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-6 py-3 bg-white border border-gray-200 rounded-full text-gray-700 font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Projects Section */}
      {projects.length > 0 && (
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Work</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {projects.map((project, index) => (
                <div key={index} className="group">
                  <div className="aspect-video bg-gray-100 rounded-2xl mb-4 overflow-hidden">
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        {project.name}
                      </div>
                    )}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {project.name}
                  </h3>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-gray-900 font-medium hover:underline"
                    >
                      View Project
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonials Section */}
      {testimonials.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Testimonials</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-white p-8 rounded-2xl">
                  <p className="text-gray-700 mb-6 italic">"{testimonial.text}"</p>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-12">Let's Work Together</h2>
          <div className="flex flex-wrap justify-center gap-6">
            <a
              href={`mailto:${email}`}
              className="flex items-center gap-2 text-gray-700 hover:text-gray-900"
            >
              <Mail className="w-5 h-5" />
              {email}
            </a>
            <a
              href={`tel:${phone}`}
              className="flex items-center gap-2 text-gray-700 hover:text-gray-900"
            >
              <Phone className="w-5 h-5" />
              {phone}
            </a>
            <span className="flex items-center gap-2 text-gray-700">
              <MapPin className="w-5 h-5" />
              {location}
            </span>
          </div>
          
          {(linkedin || github) && (
            <div className="flex justify-center gap-4 mt-8">
              {linkedin && (
                <a
                  href={`https://linkedin.com/in/${linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-colors"
                >
                  LinkedIn
                </a>
              )}
              {github && (
                <a
                  href={`https://github.com/${github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-colors"
                >
                  GitHub
                </a>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
