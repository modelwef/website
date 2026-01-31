import { motion } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { PageHeader } from '@/components/ui/PageHeader';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { FileEdit, MessageSquare, AlertTriangle, Award, Clock, Users } from 'lucide-react';

const AboutConference = () => {
  const rounds = [
    {
      number: 1,
      title: 'Solution Proposal Round',
      icon: FileEdit,
      description: 'One large global economic problem per committee. Each delegate is assigned a distinct stakeholder.',
      details: ['Delegates submit a typed policy proposal document', 'Evaluation based on economic reasoning', 'Feasibility and cost–benefit analysis assessed', 'Trade-off awareness and policy clarity evaluated'],
    },
    {
      number: 2,
      title: 'Debate Round',
      icon: MessageSquare,
      description: 'Committee-specific economic scenarios where delegates choose For or Against positions.',
      details: ['Team preparation phase', 'Structured 5 vs 5 debate format', 'Chairs award Committee Winner', 'Best Speaker of Conference recognized'],
    },
    {
      number: 3,
      title: 'Crisis & POI Round',
      icon: AlertTriangle,
      description: 'Staff introduce intentionally uneconomic or irrational statements for delegates to challenge.',
      details: ['Delegates respond with Points of Information', 'Tests economic intuition and logical correction', 'Speed of reasoning assessed', 'Critical thinking under pressure'],
    },
  ];

  return (
    <Layout>
      <PageHeader title="Conference Structure" subtitle="Understand the format, rounds, and evaluation criteria for MWEF." />

      <section className="py-16 bg-secondary">
        <div className="section-container">
          <div className="grid md:grid-cols-3 gap-6">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-card border border-border rounded-lg p-6 text-center" style={{ boxShadow: 'var(--shadow-card)' }}>
              <Clock className="text-accent mx-auto mb-3" size={32} />
              <h3 className="font-semibold text-foreground mb-1">Date</h3>
              <p className="text-2xl font-bold text-primary">21st February 2026</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="bg-card border border-border rounded-lg p-6 text-center" style={{ boxShadow: 'var(--shadow-card)' }}>
              <Users className="text-accent mx-auto mb-3" size={32} />
              <h3 className="font-semibold text-foreground mb-1">Format</h3>
              <p className="text-2xl font-bold text-primary">Multi-Round</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="bg-card border border-border rounded-lg p-6 text-center" style={{ boxShadow: 'var(--shadow-card)' }}>
              <Award className="text-accent mx-auto mb-3" size={32} />
              <h3 className="font-semibold text-foreground mb-1">Style</h3>
              <p className="text-2xl font-bold text-primary">Modified Economics MUN</p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-background">
        <div className="section-container">
          <SectionHeader title="Conference Rounds" subtitle="MWEF features three distinct rounds, each testing different aspects of economic reasoning and debate skills." center />
          <div className="space-y-8 max-w-4xl mx-auto">
            {rounds.map((round, index) => (
              <motion.div key={round.number} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="bg-card border border-border rounded-lg overflow-hidden" style={{ boxShadow: 'var(--shadow-card)' }}>
                <div className="bg-primary/5 border-b border-border p-6 flex items-center gap-4">
                  <div className="w-14 h-14 rounded-lg bg-accent/10 flex items-center justify-center"><round.icon className="text-accent" size={28} /></div>
                  <div>
                    <span className="text-accent font-bold text-sm">Round {round.number}</span>
                    <h3 className="text-xl font-bold text-foreground">{round.title}</h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-muted-foreground mb-4">{round.description}</p>
                  <ul className="space-y-2">
                    {round.details.map((detail, i) => (
                      <li key={i} className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" /><span className="text-foreground text-sm">{detail}</span></li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-primary text-primary-foreground">
        <div className="section-container">
          <SectionHeader title="Evaluation Criteria" subtitle="Delegates are evaluated on multiple dimensions throughout the conference." center light />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Economic Reasoning', desc: 'Quality of economic analysis and understanding of concepts' },
              { title: 'Policy Feasibility', desc: 'Practical applicability of proposed solutions' },
              { title: 'Argumentation', desc: 'Strength and clarity of debate arguments' },
              { title: 'Trade-off Awareness', desc: 'Recognition and analysis of economic trade-offs' },
            ].map((item, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="bg-white/5 border border-white/10 rounded-lg p-6">
                <h4 className="font-semibold text-lg mb-2 text-primary-foreground">{item.title}</h4>
                <p className="text-white/70 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AboutConference;
