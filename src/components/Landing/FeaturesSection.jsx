import React from 'react';

function FeaturesSection() {
  const features = [
    {
      title: "Role-based Access",
      description: "Comprehensive access control with three distinct roles: Super Admin for system-wide management, Admin for organizational oversight, and User for meeting participation. Each role has tailored permissions and capabilities.",
      icon: (
        <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
        </svg>
      ),
      benefits: [
        "Super Admin: Full system control",
        "Admin: Organization management",
        "User: Meeting participation",
        "Secure permission system"
      ]
    },
    {
      title: "Easy Meeting Creation",
      description: "Intuitive meeting creation process with smart scheduling, automated invitations, and seamless integration. Set up meetings in minutes with our user-friendly interface and powerful automation features.",
      icon: (
        <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a4 4 0 118 0v4m-4 8a2 2 0 100-4 2 2 0 000 4zm0 0v3m-3-3h6m-6 0H3m15 0a2 2 0 100-4 2 2 0 000 4zm0 0v3m-3-3h6m-6 0h3" />
        </svg>
      ),
      benefits: [
        "Quick setup process",
        "Smart scheduling assistant",
        "Automated invitations",
        "Calendar integration"
      ]
    },
    {
      title: "Digital Signatures & Attendance",
      description: "Advanced tracking system with digital signature capabilities and real-time attendance monitoring. Ensure accountability and maintain comprehensive records of all meeting participants and activities.",
      icon: (
        <svg className="w-12 h-12 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      benefits: [
        "Digital signature capture",
        "Real-time attendance tracking",
        "Comprehensive reporting",
        "Audit trail maintenance"
      ]
    }
  ];

  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Powerful Features for Modern Meetings
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to manage meetings efficiently, from creation to completion
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center justify-center w-20 h-20 bg-gray-50 rounded-full mb-6 mx-auto">
                {feature.icon}
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 mb-6 leading-relaxed">
                {feature.description}
              </p>
              
              <ul className="space-y-2">
                {feature.benefits.map((benefit, benefitIndex) => (
                  <li key={benefitIndex} className="flex items-center text-sm text-gray-700">
                    <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturesSection;
