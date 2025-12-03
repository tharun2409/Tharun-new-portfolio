import React from 'react';
import { RESUME_DATA, Job, Education } from './types';
import { VoiceAgent } from './components/VoiceAgent';
import { 
  BriefcaseIcon, 
  AcademicCapIcon, 
  EnvelopeIcon, 
  PhoneIcon, 
  GlobeAltIcon,
  BoltIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 selection:bg-sky-500/30">
      {/* Header */}
      <header className="fixed top-0 w-full z-40 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold tracking-tight text-white">
            THARUN<span className="text-sky-500">BALAJI</span>
          </h1>
          <nav className="hidden md:flex gap-6 text-sm font-medium text-slate-400">
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <a href="#skills" className="hover:text-white transition-colors">Skills</a>
            <a href="#experience" className="hover:text-white transition-colors">Experience</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          </nav>
        </div>
      </header>

      <main className="pt-20">
        {/* Hero Section */}
        <section id="about" className="relative py-20 sm:py-32 px-4 flex flex-col items-center justify-center text-center overflow-hidden">
           {/* Background decorative blob */}
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sky-500/20 rounded-full blur-3xl -z-10 opacity-30 animate-pulse"></div>

          <div className="max-w-4xl mx-auto">
            <h2 className="text-sky-400 font-semibold tracking-wide uppercase mb-4 text-sm sm:text-base">
              Marketing Professional & AI Specialist
            </h2>
            <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight mb-8 text-white">
              Automating the Future with <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-indigo-400 to-purple-400">
                AI & n8n
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed mb-10">
              {RESUME_DATA.summary}
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <a href="#contact" className="px-8 py-3 bg-white text-slate-900 rounded-full font-bold hover:bg-slate-200 transition-colors">
                Get in Touch
              </a>
              <a href={RESUME_DATA.contact.portfolio} target="_blank" rel="noopener noreferrer" className="px-8 py-3 bg-slate-800 text-white border border-slate-700 rounded-full font-bold hover:bg-slate-700 transition-colors">
                View Portfolio
              </a>
            </div>
          </div>
        </section>

        {/* Highlighted Skill: AI Automation */}
        <section className="py-16 bg-slate-800/50 border-y border-slate-800">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 text-sky-400 text-xs font-bold mb-4">
                  <BoltIcon className="w-4 h-4" />
                  FEATURED EXPERTISE
                </div>
                <h3 className="text-3xl font-bold mb-4">AI Automation with n8n</h3>
                <p className="text-slate-300 mb-6">
                  Leveraging node-based workflow automation to bridge the gap between creative marketing strategies and technical execution. 
                  Specializing in building custom AI agents, automated content pipelines, and intelligent customer support systems.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-900 p-4 rounded-lg border border-slate-700">
                    <span className="block text-2xl font-bold text-white mb-1">Workflow</span>
                    <span className="text-sm text-slate-400">Optimization</span>
                  </div>
                  <div className="bg-slate-900 p-4 rounded-lg border border-slate-700">
                    <span className="block text-2xl font-bold text-white mb-1">Agentic</span>
                    <span className="text-sm text-slate-400">Workflows</span>
                  </div>
                </div>
              </div>
              <div className="flex-1 relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-sky-500 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
                <div className="relative bg-slate-900 border border-slate-700 rounded-2xl p-8 hover:border-sky-500/50 transition-colors duration-300">
                   {/* Abstract visualization of a node graph */}
                   <svg className="w-full h-48 text-slate-600" viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="50" cy="100" r="20" className="fill-sky-500 animate-pulse" />
                      <path d="M70 100 H 130" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
                      <rect x="130" y="80" width="60" height="40" rx="8" className="stroke-indigo-500 stroke-2 fill-slate-800" />
                      <path d="M190 100 H 250" stroke="currentColor" strokeWidth="2" />
                      <rect x="250" y="80" width="60" height="40" rx="8" className="stroke-purple-500 stroke-2 fill-slate-800" />
                      <path d="M310 100 H 350" stroke="currentColor" strokeWidth="2" />
                      <circle cx="370" cy="100" r="15" className="fill-green-500" />
                   </svg>
                   <div className="mt-4 text-center text-sm font-mono text-sky-300">
                     // n8n_workflow_active
                   </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Grid */}
        <section id="skills" className="py-20 max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-3 mb-10">
            <SparklesIcon className="w-8 h-8 text-purple-400" />
            <h2 className="text-3xl font-bold">Skills & Technologies</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {RESUME_DATA.skills.map((skill, idx) => (
              <div key={idx} className="bg-slate-800/50 hover:bg-slate-800 border border-slate-700 hover:border-sky-500/50 p-4 rounded-xl transition-all duration-300 flex items-center gap-3 group">
                <div className="w-2 h-2 bg-sky-500 rounded-full group-hover:scale-150 transition-transform"></div>
                <span className="font-medium">{skill}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-20 bg-slate-800/30">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="flex items-center gap-3 mb-10">
              <BriefcaseIcon className="w-8 h-8 text-indigo-400" />
              <h2 className="text-3xl font-bold">Experience</h2>
            </div>
            
            <div className="space-y-8">
              {RESUME_DATA.experience.map((job: Job, idx) => (
                <div key={idx} className="relative pl-8 md:pl-0">
                  {/* Timeline Line for Desktop */}
                  <div className="hidden md:block absolute left-[50%] top-0 bottom-0 w-px bg-slate-700 -translate-x-1/2"></div>
                  
                  <div className={`md:flex items-start justify-between gap-10 ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                    <div className="md:w-1/2 mb-4 md:mb-0"></div>
                    
                    {/* Timeline Dot */}
                    <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-slate-900 border-2 border-indigo-500 rounded-full mt-1.5 z-10"></div>

                    <div className="md:w-1/2">
                      <div className="bg-slate-900 border border-slate-700 p-6 rounded-2xl hover:shadow-xl hover:shadow-indigo-500/10 transition-shadow">
                        <h3 className="text-xl font-bold text-white">{job.role}</h3>
                        <div className="flex items-center gap-2 text-indigo-400 font-medium mt-1 mb-3">
                          <span>{job.company}</span>
                          <span>•</span>
                          <span className="text-sm text-slate-500">{job.location}</span>
                        </div>
                        <p className="text-slate-400 text-sm leading-relaxed">
                          {job.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section className="py-20 max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-3 mb-10">
            <AcademicCapIcon className="w-8 h-8 text-pink-400" />
            <h2 className="text-3xl font-bold">Education</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {RESUME_DATA.education.map((edu: Education, idx) => (
              <div key={idx} className="flex gap-4 items-start p-6 rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-800/50">
                <div className="w-12 h-12 rounded-lg bg-pink-500/10 flex items-center justify-center shrink-0">
                  <span className="text-lg font-bold text-pink-400">{edu.year.split('-')[1]}</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{edu.degree}</h3>
                  <div className="text-slate-400 mt-1">{edu.school}</div>
                  <div className="text-xs text-slate-500 mt-2 uppercase tracking-wider">{edu.location}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer/Contact */}
        <footer id="contact" className="bg-slate-950 py-20 border-t border-slate-800">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-8">Let's Create Something Extraordinary</h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
               <div className="flex flex-col items-center gap-2 p-6 bg-slate-900/50 rounded-xl border border-slate-800">
                  <PhoneIcon className="w-6 h-6 text-sky-500" />
                  <span className="text-slate-400">Phone</span>
                  <a href={`tel:${RESUME_DATA.contact.phone}`} className="text-white font-medium hover:text-sky-400">{RESUME_DATA.contact.phone}</a>
               </div>
               <div className="flex flex-col items-center gap-2 p-6 bg-slate-900/50 rounded-xl border border-slate-800">
                  <EnvelopeIcon className="w-6 h-6 text-sky-500" />
                  <span className="text-slate-400">Email</span>
                  <a href={`mailto:${RESUME_DATA.contact.email}`} className="text-white font-medium hover:text-sky-400">{RESUME_DATA.contact.email}</a>
               </div>
            </div>

            <div className="flex justify-center gap-6">
              <a href={RESUME_DATA.contact.portfolio} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">
                <GlobeAltIcon className="w-6 h-6" />
              </a>
              {/* WhatsApp specific link */}
               <a href={`https://wa.me/${RESUME_DATA.contact.whatsapp.replace(/\D/g,'')}`} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-green-500 transition-colors flex items-center gap-2">
                 WhatsApp
               </a>
            </div>
            
            <p className="mt-12 text-slate-600 text-sm">
              © {new Date().getFullYear()} Tharun Balaji. All rights reserved.
            </p>
          </div>
        </footer>
      </main>

      {/* Voice Agent Overlay */}
      <VoiceAgent />
    </div>
  );
}

export default App;