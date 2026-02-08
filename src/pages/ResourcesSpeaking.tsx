import { motion } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { PageHeader } from '@/components/ui/PageHeader';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Mic, FileText, MessageSquare, Users, Zap } from 'lucide-react';

import { ResourceDownloadButton } from '@/components/ui/ResourceDownloadButton';

const ResourcesSpeaking = () => {
  const resourceBaseUrl = 'https://modelwef.org/resources/pdfs';

  const debateTips = [
    { title: 'Structure Your Arguments', tips: ['Use claim-evidence-impact format', 'Lead with your strongest point', 'Anticipate counterarguments', 'Prepare rebuttals in advance'] },
    { title: 'Delivery Techniques', tips: ['Maintain eye contact with judges', 'Vary your vocal pace and tone', 'Use strategic pauses for emphasis', 'Project confidence even when uncertain'] },
    { title: 'Economic Argumentation', tips: ['Ground claims in economic theory', 'Use real-world examples', 'Quantify impacts when possible', 'Address both short and long-term effects'] },
  ];

  return (
    <Layout>
      <PageHeader title="Speaking Resources" subtitle="Develop your debate skills and master Round 2 with our comprehensive speaking guides." />

      <section className="py-20 bg-background">
        <div className="section-container">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-card border border-border rounded-lg p-8" style={{ boxShadow: 'var(--shadow-card)' }}>
                <div className="flex items-center gap-3 mb-6">
                  <FileText className="text-accent" size={28} />
                  <h2 className="text-2xl font-bold text-foreground">Debate Handbook</h2>
                </div>
                <p className="text-muted-foreground mb-6">Comprehensive guide to effective debate techniques, argumentation strategies, and economic reasoning for Round 2.</p>
                <ResourceDownloadButton
                  url={`${resourceBaseUrl}/debate-handbook.pdf`}
                  label="Download Handbook"
                  variant="primary"
                />
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-card border border-border rounded-lg p-8" style={{ boxShadow: 'var(--shadow-card)' }}>
                <div className="flex items-center gap-3 mb-6">
                  <Mic className="text-accent" size={28} />
                  <h2 className="text-2xl font-bold text-foreground">Delegate Handbook</h2>
                </div>
                <p className="text-muted-foreground mb-6">Everything you need to know about participating in MWEF as a delegate, from preparation to conference day.</p>
                <ResourceDownloadButton
                  url={`${resourceBaseUrl}/delegate-handbook.pdf`}
                  label="Download"
                  variant="outline"
                />
              </motion.div>
            </div>

            <div className="space-y-6">
              <div className="bg-primary text-primary-foreground rounded-lg p-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2"><MessageSquare size={20} />Round 2 Format</h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0 mt-2" /><span>5 vs 5 structured debate</span></li>
                  <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0 mt-2" /><span>For vs Against positions</span></li>
                  <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0 mt-2" /><span>Team preparation phase</span></li>
                  <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0 mt-2" /><span>Cross-examination rounds</span></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-secondary">
        <div className="section-container">
          <SectionHeader title="Debate Tips & Strategies" subtitle="Master these techniques to excel in structured economic debate." center />
          <div className="grid md:grid-cols-3 gap-6">
            {debateTips.map((section, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="bg-card border border-border rounded-lg p-6" style={{ boxShadow: 'var(--shadow-card)' }}>
                <h3 className="font-semibold text-foreground mb-4">{section.title}</h3>
                <ul className="space-y-2">
                  {section.tips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-3"><span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0 mt-2" /><span className="text-muted-foreground text-sm">{tip}</span></li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ResourcesSpeaking;
