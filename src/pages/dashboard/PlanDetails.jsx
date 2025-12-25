import SeoHead from '../../components/seo/SeoHead'
import { Check } from 'lucide-react'

export default function PlanDetails() {
  const plans = [
    {
      name: 'Basic Plan',
      price: '₹1,999',
      period: 'per year',
      features: [
        'Single professional landing page',
        'Subpath URL: kashpages.in/your-business',
        'Contact buttons (Phone, WhatsApp, Instagram, Google Maps)',
        'Basic SEO optimization',
        'Mobile responsive design',
        'Fast loading times',
        'Paid content updates: ₹99/hour'
      ],
      limitations: [
        'No custom domain',
        'Limited free changes after launch'
      ]
    },
    {
      name: 'Standard Plan',
      price: '₹4,999',
      period: 'per year',
      features: [
        'Everything in Basic Plan',
        'Advanced SEO optimization',
        'Google My Business integration help',
        'Launch consultation & strategy',
        '24-hour free content changes after launch',
        'Priority support',
        'Analytics setup',
        'Social media optimization'
      ],
      limitations: [
        'Paid updates after 24 hours of launch'
      ]
    },
    {
      name: 'Custom Development',
      price: 'From ₹9,999',
      period: 'one-time',
      features: [
        'Full custom website or web application',
        'Custom domain included',
        'E-commerce capabilities (if needed)',
        'Booking/appointment systems',
        'Admin panels & dashboards',
        'Complete source code delivered',
        'No future maintenance responsibility',
        'Scalable architecture'
      ],
      limitations: [
        'Project-specific pricing',
        'Timeline varies by complexity'
      ]
    }
  ]

  return (
    <>
      <SeoHead
        title="Plans"
        description="View KashPages pricing plans and features"
      />

      <div>
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Our Plans</h2>
          <p className="text-gray-600">Choose the perfect plan for your business needs</p>
        </div>

        <div className="space-y-8">
          {plans.map((plan, idx) => (
            <div key={idx} className="bg-white border border-gray-200 rounded-xl p-8">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-primary">{plan.price}</span>
                  <span className="text-gray-600">/ {plan.period}</span>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">Included:</h4>
                <ul className="space-y-3">
                  {plan.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {plan.limitations && plan.limitations.length > 0 && (
                <div className="pt-6 border-t border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-3">Limitations:</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    {plan.limitations.map((limit, lIdx) => (
                      <li key={lIdx}>• {limit}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-xl">
          <h3 className="font-semibold text-gray-900 mb-3">How to Get Started</h3>
          <div className="space-y-2 text-sm text-gray-700">
            <p><strong>1. Contact Us:</strong> Reach out via phone, WhatsApp, or email</p>
            <p><strong>2. Discuss Your Needs:</strong> We'll help you choose the right plan</p>
            <p><strong>3. We Build:</strong> Our team creates your landing page</p>
            <p><strong>4. Review & Launch:</strong> You review, we make changes, then go live</p>
            <p><strong>5. Payment:</strong> Pay via bank transfer, UPI, or cash</p>
          </div>
        </div>

        <div className="mt-8 p-6 bg-gray-900 text-white rounded-xl">
          <h3 className="font-semibold mb-3">Contact Admin</h3>
          <div className="space-y-2 text-sm">
            <p>📞 Phone: +91-XXXX-XXXX</p>
            <p>💬 WhatsApp: +91-XXXX-XXXX</p>
            <p>📧 Email: admin@kashpages.in</p>
            <p>📍 Office: Srinagar, Jammu & Kashmir</p>
          </div>
        </div>
      </div>
    </>
  )
}
