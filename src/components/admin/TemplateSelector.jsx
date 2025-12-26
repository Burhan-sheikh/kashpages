import { useState } from 'react'
import { templates } from '../../templates/templateRegistry'
import { Check, Eye } from 'lucide-react'

export default function TemplateSelector({ selectedTemplate, onSelect, onClose }) {
  const [previewTemplate, setPreviewTemplate] = useState(null)

  const handleSelect = (templateId) => {
    onSelect(templateId)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm">
      <div className="bg-white rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Choose a Template</h2>
            <p className="text-gray-600 mt-1">Select a pre-designed layout for your page</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Templates Grid */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((template) => (
              <div
                key={template.id}
                className={`group relative bg-white border-2 rounded-2xl overflow-hidden cursor-pointer transition-all ${
                  selectedTemplate === template.id
                    ? 'border-gray-900 shadow-lg'
                    : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                }`}
                onClick={() => handleSelect(template.id)}
              >
                {/* Thumbnail */}
                <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center relative overflow-hidden">
                  {/* Placeholder design preview */}
                  <div className="absolute inset-0 p-4">
                    <div className="h-full border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                      <span className="text-4xl">{template.id === 'modern-business' ? '💼' : template.id === 'minimal-portfolio' ? '🎨' : '🍽️'}</span>
                    </div>
                  </div>
                  
                  {/* Selected Badge */}
                  {selectedTemplate === template.id && (
                    <div className="absolute top-3 right-3 w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center">
                      <Check className="w-5 h-5 text-white" />
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {template.name}
                      </h3>
                      <p className="text-xs text-gray-500">{template.category}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    {template.description}
                  </p>
                  
                  {/* Features */}
                  <div className="space-y-1">
                    {template.features.slice(0, 3).map((feature, index) => (
                      <div key={index} className="flex items-center gap-2 text-xs text-gray-500">
                        <Check className="w-3 h-3 text-green-600" />
                        {feature}
                      </div>
                    ))}
                    {template.features.length > 3 && (
                      <p className="text-xs text-gray-400 italic">
                        +{template.features.length - 3} more features
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
          <p className="text-sm text-gray-600">
            {templates.length} templates available
          </p>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-6 py-2 text-gray-700 hover:bg-gray-200 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => handleSelect(null)}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              No Template (Custom HTML)
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
