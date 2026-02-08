import { motion } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { PageHeader } from '@/components/ui/PageHeader';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { FileText, BookOpen, TrendingUp, BarChart3, Lightbulb } from 'lucide-react';

import { ResourceDownloadButton } from '@/components/ui/ResourceDownloadButton';

const ResourcesPolicyHandbook = () => {
  const resourceBaseUrl = 'https://modelwef.org/resources/pdfs';

  const economicConcepts = [
    { title: 'Opportunity Cost', desc: 'The value of the next best alternative foregone when making a decision.' },
    { title: 'Marginal Analysis', desc: 'Examining incremental changes to determine optimal decisions.' },
    { title: 'Market Equilibrium', desc: 'The point where supply and demand curves intersect, determining price.' },
    { title: 'Externalities', desc: 'Costs or benefits that affect parties not directly involved in a transaction.' },
    { title: 'Fiscal Policy', desc: 'Government spending and taxation decisions that influence the economy.' },
    { title: 'Monetary Policy', desc: 'Central bank actions that affect money supply and interest rates.' },
  ];

  return (
    <Layout>
      <PageHeader title="Policy Proposal Handbook" subtitle="Master Round 1 with comprehensive guidance on crafting effective economic policy proposals." />

      <section className="py-20 bg-background">
        <div className="section-container">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-card border border-border rounded-lg p-8" style={{ boxShadow: 'var(--shadow-card)' }}>
                <div className="flex items-center gap-3 mb-6">
                  <FileText className="text-accent" size={28} />
                  <h2 className="text-2xl font-bold text-foreground">Policy Proposal Handbook</h2>
                </div>
                <p className="text-muted-foreground mb-6">The official guide to writing winning policy proposals at MWEF. Learn the structure, evaluation criteria, and best practices.</p>
                <ResourceDownloadButton
                  url={`${resourceBaseUrl}/policy-proposal-handbook.pdf`}
                  label="Download Handbook"
                  variant="primary"
                />
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-card border border-border rounded-lg p-8" style={{ boxShadow: 'var(--shadow-card)' }}>
                <div className="flex items-center gap-3 mb-6">
                  <BookOpen className="text-accent" size={28} />
                  <h2 className="text-2xl font-bold text-foreground">Brief Economics Rundown</h2>
                </div>
                <p className="text-muted-foreground mb-6">A concise introduction to essential economic concepts and frameworks needed for MWEF participation.</p>
                <ResourceDownloadButton
                  url={`${resourceBaseUrl}/economics-rundown.pdf`}
                  label="Download"
                  variant="outline"
                />
              </motion.div>
            </div>

            <div className="space-y-6">
              <div className="bg-primary text-primary-foreground rounded-lg p-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2"><Lightbulb size={20} />Round 1 Tips</h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0 mt-2" /><span>Start with a clear problem statement</span></li>
                  <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0 mt-2" /><span>Include cost-benefit analysis</span></li>
                  <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0 mt-2" /><span>Address trade-offs explicitly</span></li>
                  <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0 mt-2" /><span>Provide implementation timeline</span></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-secondary">
        <div className="section-container">
          <SectionHeader title="Advanced Economic Concepts" subtitle="Key theoretical frameworks you'll need to understand for sophisticated policy analysis." center />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {economicConcepts.map((concept, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="bg-card border border-border rounded-lg p-6" style={{ boxShadow: 'var(--shadow-card)' }}>
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-4"><TrendingUp className="text-accent" size={20} /></div>
                <h3 className="font-semibold text-foreground mb-2">{concept.title}</h3>
                <p className="text-muted-foreground text-sm">{concept.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ResourcesPolicyHandbook;
