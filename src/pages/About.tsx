import { motion } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { PageHeader } from '@/components/ui/PageHeader';
import { SectionHeader } from '@/components/ui/SectionHeader';

const About = () => {
  return (
    <Layout>
      <PageHeader
        title="About MWEF"
        subtitle="Welcome to the Model World Economic Forum — Dubai's premier economics simulation conference."
      />

      <section className="py-20 md:py-28 bg-background">
        <div className="section-container">
          <div className="max-w-4xl">
            <SectionHeader title="Welcome to MWEF" />
            <div className="space-y-6 text-muted-foreground leading-relaxed text-lg">
              <p>
                Inspired by the World Economic Forum, the Model World Economic Forum (MWEF) is an advanced academic simulation that places students in the role of policymakers, economists, corporate leaders, and international institutions.
              </p>
              <p>
                Delegates will represent nations and global economic bodies, engaging in structured economic debate, policy drafting, and strategic decision-making under real-world constraints such as trade-offs, limited resources, political feasibility, and long-term consequences.
              </p>
              <p>
                This conference challenges students to think critically about the world's most pressing economic issues, from sustainable development and income inequality to financial stability and the digital economy.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-secondary">
        <div className="section-container">
          <div className="grid lg:grid-cols-3 gap-8">
            {[
              { title: 'Our Mission', content: 'To cultivate the next generation of economic leaders by providing a platform for rigorous debate, policy analysis, and strategic thinking on global economic challenges.' },
              { title: 'Our Vision', content: 'To become the leading economics simulation conference in the region, recognized for academic excellence, professional standards, and meaningful delegate experiences.' },
              { title: 'Our Values', content: 'Academic rigor, evidence-based reasoning, inclusive participation, global perspective, and commitment to understanding complex economic trade-offs.' },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card border border-border rounded-lg p-8"
                style={{ boxShadow: 'var(--shadow-card)' }}
              >
                <div className="w-12 h-1 bg-accent mb-4" />
                <h3 className="text-xl font-bold text-foreground mb-4">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.content}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-primary text-primary-foreground">
        <div className="section-container">
          <SectionHeader title="Why MWEF?" subtitle="What sets the Model World Economic Forum apart from other academic competitions." center light />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Real-World Relevance', desc: 'Engage with actual global economic challenges faced by policymakers and institutions.' },
              { title: 'Economic Focus', desc: 'Unlike traditional MUN, MWEF emphasizes economic reasoning, trade-offs, and policy analysis.' },
              { title: 'Structured Debate', desc: 'Multi-round format tests research, argumentation, and crisis response skills.' },
              { title: 'Professional Standards', desc: 'Experience mirrors actual World Economic Forum proceedings and institutional discussions.' },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6"
              >
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

export default About;
