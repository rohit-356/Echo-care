import React from 'react';

const teamMembers = [
  {
    name: "Rohit",
    role: "Lead Developer",
    contribution: "Architected the core React application, integrated the audio-visual feedback systems, and managed the technical implementation of the EchoCare platform features."
  },
  {
    name: "Kushal Jawrani",
    role: "Backend Developer",
    contribution: "Engineered the robust server-side logic to ensure secure data handling and optimized platform performance for a seamless, lag-free user experience."
  },
  {
    name: "Ojas Roy",
    role: "UI/UX Designer",
    contribution: "Crafted the calming aesthetic and accessible interface, ensuring every interaction feels safe, gentle, and intuitive for users seeking support."
  },
  {
    name: "Robin",
    role: "Researcher",
    contribution: "Conducted in-depth research on early mental health indicators and support methodologies to ensure our care tools provide accurate, empathetic, and relevant guidance."
  },
];

const TeamSection = () => {
  return (
    <section className="py-20 bg-white min-h-screen relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Meet the Team
          </h2>
          <p className="mt-4 text-xl text-gray-500">
            The minds behind <span style={{ color: '#8b5cf6' }}>EchoCare</span>.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member, index) => (
            <div 
              key={index} 
              className="bg-gray-50 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 flex flex-col items-center text-center h-full"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {member.name}
              </h3>
              
              <span 
                className="text-xs font-semibold px-3 py-1 rounded-full mb-6 uppercase tracking-wide" 
                style={{ backgroundColor: '#f3e8ff', color: '#7c3aed' }}
              >
                {member.role}
              </span>
              
              <p className="text-gray-600 text-sm leading-relaxed">
                {member.contribution}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Minimalist Bat-Signal Logo */}
      <div className="flex flex-col items-center justify-center py-10 opacity-80 hover:opacity-100 transition-opacity duration-500">
         <svg 
            width="80" 
            height="40" 
            viewBox="0 0 200 100" 
            fill="#1a1a1a" 
            xmlns="http://www.w3.org/2000/svg"
         >
            <path d="M100 20C70 20 50 40 40 50C30 40 10 30 0 30C5 60 20 80 40 80C35 90 40 100 50 100C60 90 80 80 100 90C120 80 140 90 150 100C160 100 165 90 160 80C180 80 195 60 200 30C190 30 170 40 160 50C150 40 130 20 100 20Z" />
         </svg>
         <p className="text-[10px] font-bold uppercase tracking-widest mt-2 text-gray-400">Guardian of EchoCare</p>
      </div>

    </section>
  );
};

export default TeamSection;