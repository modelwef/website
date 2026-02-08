import { Layout } from '@/components/layout/Layout';
import { PageHeader } from '@/components/ui/PageHeader';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ResourceCard } from '@/components/cards/ResourceCard';
import { delegateResources } from '@/data/resources';
import { motion } from 'framer-motion';
import { Info } from 'lucide-react';

const Resources = () => {
  return (
    <Layout>
      <PageHeader
        title="Delegate Resources"
        subtitle="Access essential documents, handbooks, and guides to prepare for MWEF."
      />

      {/* Resources List */}
      <section className="py-20 md:py-28 bg-background">
        <div className="section-container">
          <SectionHeader
            title="Conference Documents"
            subtitle="Download official MWEF resources to prepare for the conference."
          />

          <div className="space-y-4 max-w-3xl">
            {delegateResources.map((resource, index) => (
              <ResourceCard
                key={resource.title}
                title={resource.title}
                description={resource.description}
                index={index}
                url={resource.url}
              />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-8 bg-accent/5 border border-accent/20 rounded-lg p-6 flex items-start gap-4 max-w-3xl"
          >
            <Info className="text-accent flex-shrink-0 mt-1" size={20} />
            <div>
              <h4 className="font-semibold text-foreground mb-1">Resources Coming Soon</h4>
              <p className="text-muted-foreground text-sm">
                Official conference documents will be released closer to the event date. Check back regularly for updates.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Preparation Tips */}
      <section className="py-20 bg-secondary">
        <div className="section-container">
          <SectionHeader
            title="Preparation Tips"
            subtitle="General guidance to help you prepare for MWEF."
            center
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Research Your Country/Institution',
                tips: [
                  'Study economic indicators (GDP, inflation, unemployment)',
                  'Understand major industries and trade relationships',
                  'Know current economic policies and challenges',
                ],
              },
              {
                title: 'Understand Committee Topics',
                tips: [
                  'Read the committee background guide thoroughly',
                  'Research multiple perspectives on the issue',
                  'Prepare evidence and statistics to support arguments',
                ],
              },
              {
                title: 'Develop Economic Reasoning',
                tips: [
                  'Practice identifying trade-offs in policy decisions',
                  'Consider both short-term and long-term consequences',
                  'Think about who benefits and who bears costs',
                ],
              },
              {
                title: 'Practice Debate Skills',
                tips: [
                  'Structure arguments with clear claims and evidence',
                  'Anticipate counterarguments and prepare rebuttals',
                  'Practice speaking clearly and confidently',
                ],
              },
              {
                title: 'Draft Policy Proposals',
                tips: [
                  'Create realistic, implementable solutions',
                  'Include cost estimates and feasibility analysis',
                  'Consider political and social constraints',
                ],
              },
              {
                title: 'Review Economic Concepts',
                tips: [
                  'Supply and demand, market equilibrium',
                  'Fiscal and monetary policy tools',
                  'International trade and development economics',
                ],
              },
            ].map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card border border-border rounded-lg p-6"
                style={{ boxShadow: 'var(--shadow-card)' }}
              >
                <h3 className="font-semibold text-foreground mb-4">{section.title}</h3>
                <ul className="space-y-2">
                  {section.tips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0 mt-2" />
                      <span className="text-muted-foreground text-sm">{tip}</span>
                    </li>
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

export default Resources;
