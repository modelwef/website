import { useState } from 'react';
import { motion } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { PageHeader } from '@/components/ui/PageHeader';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { toast } from 'sonner';
import { Building2, User, CheckCircle } from 'lucide-react';

const GetInvolved = () => {
  const [partnershipForm, setPartnershipForm] = useState({
    organization: '',
    contact: '',
    email: '',
    partnershipType: '',
    message: '',
  });

  const [volunteerForm, setVolunteerForm] = useState({
    name: '',
    school: '',
    email: '',
    experience: '',
    role: '',
  });

  const handlePartnershipSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Partnership inquiry submitted! We will contact you soon.');
    setPartnershipForm({ organization: '', contact: '', email: '', partnershipType: '', message: '' });
  };

  const handleVolunteerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Volunteer application submitted! We will review your application.');
    setVolunteerForm({ name: '', school: '', email: '', experience: '', role: '' });
  };

  return (
    <Layout>
      <PageHeader
        title="Get Involved"
        subtitle="Partner with MWEF or join our team as a volunteer."
      />

      {/* Partnership Form */}
      <section className="py-20 md:py-28 bg-background">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <SectionHeader
                title="Partnership Opportunities"
                subtitle="Interested in sponsoring or partnering with MWEF? We'd love to hear from you."
              />
              <div className="space-y-4 text-muted-foreground">
                <p>
                  MWEF offers various partnership opportunities for organizations looking to engage with the next generation of economic leaders.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="text-accent" size={18} />
                    <span>Brand visibility at a premier academic event</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="text-accent" size={18} />
                    <span>Access to talented, motivated students</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="text-accent" size={18} />
                    <span>Support economics education in the region</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <form
                onSubmit={handlePartnershipSubmit}
                className="bg-card border border-border rounded-lg p-6 md:p-8"
                style={{ boxShadow: 'var(--shadow-card)' }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <Building2 className="text-accent" size={24} />
                  <h3 className="text-xl font-semibold text-foreground">Partnership Inquiry</h3>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="form-label">Organization Name</label>
                    <input
                      type="text"
                      className="form-input"
                      value={partnershipForm.organization}
                      onChange={(e) => setPartnershipForm({ ...partnershipForm, organization: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="form-label">Contact Person</label>
                    <input
                      type="text"
                      className="form-input"
                      value={partnershipForm.contact}
                      onChange={(e) => setPartnershipForm({ ...partnershipForm, contact: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="form-label">Email Address</label>
                    <input
                      type="email"
                      className="form-input"
                      value={partnershipForm.email}
                      onChange={(e) => setPartnershipForm({ ...partnershipForm, email: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="form-label">Partnership Type</label>
                    <select
                      className="form-input"
                      value={partnershipForm.partnershipType}
                      onChange={(e) => setPartnershipForm({ ...partnershipForm, partnershipType: e.target.value })}
                      required
                    >
                      <option value="">Select type</option>
                      <option value="sponsor">Title Sponsor</option>
                      <option value="media">Media Partner</option>
                      <option value="academic">Academic Partner</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="form-label">Message</label>
                    <textarea
                      className="form-input min-h-[100px]"
                      value={partnershipForm.message}
                      onChange={(e) => setPartnershipForm({ ...partnershipForm, message: e.target.value })}
                    />
                  </div>
                  <button type="submit" className="w-full btn-primary">
                    Submit Inquiry
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Volunteer Form */}
      <section className="py-20 md:py-28 bg-secondary">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:order-2"
            >
              <SectionHeader
                title="Join Our Team"
                subtitle="Interested in becoming a Chair or Admin volunteer for MWEF?"
              />
              <div className="space-y-4 text-muted-foreground">
                <p>
                  We're looking for dedicated individuals to help run MWEF. Available positions include:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="text-accent" size={18} />
                    <span>Committee Chairs</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="text-accent" size={18} />
                    <span>Administrative Volunteers</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="text-accent" size={18} />
                    <span>Media Team Members</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="text-accent" size={18} />
                    <span>Event Coordinators</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:order-1"
            >
              <form
                onSubmit={handleVolunteerSubmit}
                className="bg-card border border-border rounded-lg p-6 md:p-8"
                style={{ boxShadow: 'var(--shadow-card)' }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <User className="text-accent" size={24} />
                  <h3 className="text-xl font-semibold text-foreground">Volunteer Application</h3>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="form-label">Full Name</label>
                    <input
                      type="text"
                      className="form-input"
                      value={volunteerForm.name}
                      onChange={(e) => setVolunteerForm({ ...volunteerForm, name: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="form-label">School</label>
                    <input
                      type="text"
                      className="form-input"
                      value={volunteerForm.school}
                      onChange={(e) => setVolunteerForm({ ...volunteerForm, school: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="form-label">Email Address</label>
                    <input
                      type="email"
                      className="form-input"
                      value={volunteerForm.email}
                      onChange={(e) => setVolunteerForm({ ...volunteerForm, email: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="form-label">Previous Experience</label>
                    <textarea
                      className="form-input min-h-[80px]"
                      placeholder="MUN/debate experience, leadership roles, etc."
                      value={volunteerForm.experience}
                      onChange={(e) => setVolunteerForm({ ...volunteerForm, experience: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="form-label">Preferred Role</label>
                    <select
                      className="form-input"
                      value={volunteerForm.role}
                      onChange={(e) => setVolunteerForm({ ...volunteerForm, role: e.target.value })}
                      required
                    >
                      <option value="">Select role</option>
                      <option value="chair">Committee Chair</option>
                      <option value="admin">Administrative Volunteer</option>
                      <option value="media">Media Team</option>
                      <option value="coordinator">Event Coordinator</option>
                    </select>
                  </div>
                  <button type="submit" className="w-full btn-primary">
                    Submit Application
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default GetInvolved;
