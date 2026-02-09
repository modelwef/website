import { motion } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { PageHeader } from '@/components/ui/PageHeader';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { BookOpen, FileText, Download, Shield, AlertTriangle, CheckCircle } from 'lucide-react';

const ResourcesRules = () => {
  const codeOfConduct = [
    { title: 'Professional Behavior', items: ['Treat all participants with respect', 'Maintain academic integrity', 'Follow chair instructions promptly', 'Dress appropriately (business formal)'] },
    { title: 'Debate Ethics', items: ['No personal attacks or ad hominem arguments', 'Base arguments on facts and logic', 'Accept defeat gracefully', 'Congratulate winners sincerely'] },
    { title: 'Venue Rules', items: ['Arrive on time for all sessions', 'Keep phones on silent', 'No food in committee rooms', 'Maintain cleanliness in all areas'] },
  ];

  const procedures = [
    { title: 'Points of Information', desc: 'Used in Round 3 to challenge uneconomic statements with logical corrections.' },
    { title: 'Motion to Extend', desc: 'Request additional speaking time from the chair (granted at discretion).' },
    { title: 'Right of Reply', desc: 'Address misrepresentations of your position made by other participants.' },
    { title: 'Suspension of Debate', desc: 'Temporary halt for caucus or break (requires chair approval).' },
  ];

  return (
    <Layout>
      <PageHeader title="Rules & Procedures" subtitle="Official conference rules, code of conduct, and procedural guidelines for MWEF participants." />

      <section className="py-20 bg-background">
        <div className="section-container">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-card border border-border rounded-lg p-8" style={{ boxShadow: 'var(--shadow-card)' }}>
                <div className="flex items-center gap-3 mb-6">
                  <BookOpen className="text-accent" size={28} />
                  <h2 className="text-2xl font-bold text-foreground">Conference Rules</h2>
                </div>
                <p className="text-muted-foreground mb-6">Complete rules and procedures for the MWEF conference, including debate formats, scoring criteria, and official guidelines.</p>
                <button className="btn-primary flex items-center gap-2"><Download size={18} />Download Rules (Coming Soon)</button>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-card border border-border rounded-lg p-8" style={{ boxShadow: 'var(--shadow-card)' }}>
                <div className="flex items-center gap-3 mb-6">
                  <Shield className="text-accent" size={28} />
                  <h2 className="text-2xl font-bold text-foreground">Code of Conduct</h2>
                </div>
                <p className="text-muted-foreground mb-6">Behavioral expectations, dress code, and ethical guidelines for all participants and staff.</p>
                <button className="btn-outline flex items-center gap-2"><Download size={18} />Download (Coming Soon)</button>
              </motion.div>
            </div>

            <div className="space-y-6">
              <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6">
                <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2"><AlertTriangle className="text-destructive" size={20} />Important</h3>
                <p className="text-sm text-muted-foreground">Violations of the code of conduct may result in disqualification. All participants must read and acknowledge the rules before the conference.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-secondary">
        <div className="section-container">
          <SectionHeader title="Code of Conduct" subtitle="Expected behavior and ethical standards for all MWEF participants." center />
          <div className="grid md:grid-cols-3 gap-6">
            {codeOfConduct.map((section, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="bg-card border border-border rounded-lg p-6" style={{ boxShadow: 'var(--shadow-card)' }}>
                <h3 className="font-semibold text-foreground mb-4">{section.title}</h3>
                <ul className="space-y-2">
                  {section.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3"><CheckCircle className="text-accent flex-shrink-0 mt-0.5" size={16} /><span className="text-muted-foreground text-sm">{item}</span></li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="section-container">
          <SectionHeader title="Procedural Motions" subtitle="Key parliamentary procedures you should know." center />
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {procedures.map((procedure, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="bg-card border border-border rounded-lg p-6" style={{ boxShadow: 'var(--shadow-card)' }}>
                <h4 className="font-semibold text-foreground mb-2">{procedure.title}</h4>
                <p className="text-muted-foreground text-sm">{procedure.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ResourcesRules;
