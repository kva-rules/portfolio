import { useState } from 'react';
import { Send, Mail, Linkedin, Github, CheckCircle2, AlertCircle } from 'lucide-react';
import { PROFILE_DATA } from '../data/profile';
import { validateContactForm, createMailtoLink, ContactFormValues, ValidationErrors } from '../utils/validation';

export function Contact() {
  const { contact } = PROFILE_DATA;

  const [formValues, setFormValues] = useState<ContactFormValues>({
    name: '',
    email: '',
    message: '',
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (field: keyof ContactFormValues, value: string) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validateContactForm(formValues);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Generate prefilled mailto link
    const mailtoUrl = createMailtoLink(contact.email, formValues);
    
    // Open user's email client
    window.location.href = mailtoUrl;

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormValues({ name: '', email: '', message: '' });
    }, 4000);
  };

  return (
    <section id="contact" className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Box */}
        <div className="p-6 sm:p-10 lg:p-12 rounded-3xl bg-white dark:bg-[#131C38] border border-slate-200 dark:border-slate-700/50 shadow-xl dark:shadow-2xl relative overflow-hidden">
          
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 blur-[100px] pointer-events-none rounded-full" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 relative z-10">
            
            {/* Left Column: Direct Links & Narrative */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
              <div>
                <div className="text-xs font-mono uppercase tracking-widest text-cyan-600 dark:text-cyan-400 font-bold mb-2">
                  Contact Node
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight leading-tight mb-4">
                  {contact.headline}
                </h2>
                <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                  {contact.subheadline}
                </p>

                {/* Direct Connect Buttons */}
                <div className="space-y-3">
                  <a
                    href={`mailto:${contact.email}`}
                    className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-[#0B1020] border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-300 hover:border-cyan-400/50 transition-colors"
                  >
                    <div className="p-2 rounded-lg bg-cyan-100 dark:bg-cyan-950/40 text-cyan-600 dark:text-cyan-400">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div className="overflow-hidden">
                      <div className="text-[10px] font-mono uppercase text-slate-500 dark:text-slate-400">Direct Email</div>
                      <div className="text-xs sm:text-sm font-semibold truncate text-slate-900 dark:text-slate-200">
                        {contact.email}
                      </div>
                    </div>
                  </a>

                  <a
                    href={contact.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-[#0B1020] border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-300 hover:border-cyan-400/50 transition-colors"
                  >
                    <div className="p-2 rounded-lg bg-cyan-100 dark:bg-cyan-950/40 text-cyan-600 dark:text-cyan-400">
                      <Linkedin className="w-4 h-4" />
                    </div>
                    <div className="overflow-hidden">
                      <div className="text-[10px] font-mono uppercase text-slate-500 dark:text-slate-400">LinkedIn Profile</div>
                      <div className="text-xs sm:text-sm font-semibold truncate text-slate-900 dark:text-slate-200">
                        linkedin.com/in/abhidhab-mellwyn
                      </div>
                    </div>
                  </a>

                  <a
                    href={contact.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-[#0B1020] border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-300 hover:border-cyan-400/50 transition-colors"
                  >
                    <div className="p-2 rounded-lg bg-cyan-100 dark:bg-cyan-950/40 text-cyan-600 dark:text-cyan-400">
                      <Github className="w-4 h-4" />
                    </div>
                    <div className="overflow-hidden">
                      <div className="text-[10px] font-mono uppercase text-slate-500 dark:text-slate-400">GitHub Codebase</div>
                      <div className="text-xs sm:text-sm font-semibold truncate text-slate-900 dark:text-slate-200">
                        github.com/kva-rules
                      </div>
                    </div>
                  </a>
                </div>
              </div>

              <div className="text-xs font-mono text-slate-500 dark:text-slate-400 pt-4 border-t border-slate-200 dark:border-slate-800">
                Ready to deploy resilient microservices &amp; intelligent agents.
              </div>
            </div>

            {/* Right Column: Interactive Form */}
            <div className="lg:col-span-7">
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Name */}
                <div>
                  <label htmlFor="contact-name" className="block text-xs font-mono uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                    Your Name *
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    value={formValues.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    placeholder="Dr. Jane Doe"
                    className={`w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-[#0B1020] border text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 text-sm focus:outline-none transition-all ${
                      errors.name
                        ? 'border-rose-500 focus:ring-1 focus:ring-rose-500'
                        : 'border-slate-200 dark:border-slate-800 focus:border-cyan-500 dark:focus:border-cyan-400 focus:ring-1 focus:ring-cyan-500 dark:focus:ring-cyan-400'
                    }`}
                  />
                  {errors.name && (
                    <p className="mt-1 text-xs text-rose-500 dark:text-rose-400 flex items-center gap-1 font-mono">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.name}</span>
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="contact-email" className="block text-xs font-mono uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                    Email Address *
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    value={formValues.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    placeholder="jane@company.com"
                    className={`w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-[#0B1020] border text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 text-sm focus:outline-none transition-all ${
                      errors.email
                        ? 'border-rose-500 focus:ring-1 focus:ring-rose-500'
                        : 'border-slate-200 dark:border-slate-800 focus:border-cyan-500 dark:focus:border-cyan-400 focus:ring-1 focus:ring-cyan-500 dark:focus:ring-cyan-400'
                    }`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-rose-500 dark:text-rose-400 flex items-center gap-1 font-mono">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.email}</span>
                    </p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="contact-message" className="block text-xs font-mono uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                    Project / Role Inquiries *
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    value={formValues.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    placeholder="Let's talk about full-stack architectures, microservices, or autonomous agent integration..."
                    className={`w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-[#0B1020] border text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 text-sm focus:outline-none transition-all ${
                      errors.message
                        ? 'border-rose-500 focus:ring-1 focus:ring-rose-500'
                        : 'border-slate-200 dark:border-slate-800 focus:border-cyan-500 dark:focus:border-cyan-400 focus:ring-1 focus:ring-cyan-500 dark:focus:ring-cyan-400'
                    }`}
                  />
                  {errors.message && (
                    <p className="mt-1 text-xs text-rose-500 dark:text-rose-400 flex items-center gap-1 font-mono">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.message}</span>
                    </p>
                  )}
                </div>

                {/* Submit Feedback Notification */}
                {submitted && (
                  <div className="p-3 rounded-xl bg-emerald-950/50 border border-emerald-500/40 text-emerald-300 text-xs font-mono flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>
                      Mail client opened! Your draft has been prefilled to <strong>{contact.email}</strong>.
                    </span>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm bg-cyan-400 text-slate-950 hover:bg-cyan-300 transition-all shadow-[0_0_16px_rgba(34,211,238,0.35)] hover:shadow-[0_0_24px_rgba(34,211,238,0.5)] active:scale-95"
                >
                  <Send className="w-4 h-4" />
                  <span>Transmit Message</span>
                </button>

              </form>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
