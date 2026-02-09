import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Users, Calendar, MapPin, Trophy, BookOpen, Globe } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { CountdownTimer } from '@/components/ui/CountdownTimer';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { CommitteeCard } from '@/components/cards/CommitteeCard';
import { StatsSection } from '@/components/ui/StatsSection';
import { committees } from '@/data/committees';
import heroBg from '@/assets/hero-bg.jpg';

const conferenceDate = new Date('2026-02-21T09:00:00');

const features = [
  {
    icon: BookOpen,
    title: 'Rigorous Economics',
    description: 'Engage with complex global economic problems through evidence-based analysis and debate.',
  },
  {
    icon: Users,
    title: 'Years 7–12',
    description: 'Open to all schools with Junior & Senior categories and country/institutional delegations.',
  },
  {
    icon: Trophy,
    title: 'Competitive Excellence',
    description: 'Awards for Best Participant, Best Speaker, and Committee Winners across all forums.',
  },
  {
    icon: Globe,
    title: 'Global Perspective',
    description: 'Represent nations and institutions from around the world in economic policy debates.',
  },
];

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-primary/80" />
        <div className="absolute inset-0 bg-hero-pattern" />
        
        <div className="section-container relative z-10 text-center py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="w-20 h-1 bg-accent mx-auto mb-8" />
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
              Model World Economic Forum
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto mb-8 leading-relaxed">
              Dubai's #1 Economics Competition — where students design real-world economic solutions and engage in sharp, evidence-based debate.
            </p>

            {/* Countdown */}
            <div className="mb-10">
              <p className="text-white/70 text-sm uppercase tracking-widest mb-4">Conference begins in</p>
              <div className="flex justify-center">
                <CountdownTimer targetDate={conferenceDate} />
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="inline-flex items-center justify-center gap-2 bg-accent text-accent-foreground font-semibold px-8 py-4 rounded-md text-lg transition-all duration-200 hover:opacity-90"
              >
                Register Now
                <ArrowRight size={20} />
              </Link>
              <Link
                to="/resources/committees"
                className="inline-flex items-center justify-center gap-2 border-2 border-white/80 text-white font-semibold px-8 py-4 rounded-md text-lg transition-all duration-200 hover:bg-white hover:text-primary"
              >
                Explore Committees
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-white rounded-full"
            />
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <StatsSection />

      {/* What is MWEF */}
      <section className="py-20 md:py-28 bg-background">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="accent-bar mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                What is MWEF?
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  The Model World Economic Forum (MWEF) is more than a competition for high-school students — it is a platform where economic theory meets real-world policy-making. Participants are challenged to confront complex global economic problems, evaluate trade-offs, and design solutions grounded in rigorous economic reasoning.
                </p>
                <p>
                  At MWEF, classroom learning transforms into structured debate, strategic negotiation, and evidence-based policy formulation, mirroring the discussions that shape global economic decisions today.
                </p>
              </div>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-accent font-medium mt-6 hover:gap-3 transition-all"
              >
                Learn more about MWEF
                <ArrowRight size={18} />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-2 gap-4"
            >
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-card border border-border rounded-lg p-5 hover:border-accent/30 transition-all duration-300"
                  style={{ boxShadow: 'var(--shadow-card)' }}
                >
                  <feature.icon className="text-accent mb-3" size={28} />
                  <h4 className="font-semibold text-foreground mb-2">{feature.title}</h4>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Event Details Strip */}
      <section className="bg-primary py-8">
        <div className="section-container">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 text-white">
            <div className="flex items-center gap-3">
              <Calendar className="text-accent" size={24} />
              <div>
                <p className="text-sm text-white/70">Date</p>
                <p className="font-semibold">21st February 2026</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="text-accent" size={24} />
              <div>
                <p className="text-sm text-white/70">Location</p>
                <p className="font-semibold">Dubai, UAE</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Users className="text-accent" size={24} />
              <div>
                <p className="text-sm text-white/70">Participants</p>
                <p className="font-semibold">Years 7–12</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Committees Preview */}
      <section className="py-20 md:py-28 bg-secondary">
        <div className="section-container">
          <SectionHeader
            title="Our Committees"
            subtitle="Explore our specialized economic forums, each addressing critical global challenges through rigorous analysis and debate."
            center
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {committees.slice(0, 6).map((committee, index) => (
              <CommitteeCard
                key={committee.id}
                id={committee.id}
                name={committee.name}
                abbreviation={committee.abbreviation}
                category={committee.categoryShort}
                description={committee.overview}
                index={index}
              />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-10"
          >
            <Link
              to="/resources/committees"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-6 py-3 rounded-md transition-all duration-200 hover:opacity-90"
            >
              View All Committees
              <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Who Can Participate */}
      <section className="py-20 md:py-28 bg-secondary">
        <div className="section-container">
          <div className="max-w-4xl mx-auto text-center">
            <SectionHeader
              title="Who Can Participate?"
              subtitle="MWEF welcomes students from all backgrounds who are passionate about economics and global affairs."
              center
            />

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
              {[
                { label: 'Years 7–12', desc: 'All grade levels welcome' },
                { label: 'Open to All Schools', desc: 'Public & private schools' },
                { label: 'Junior & Senior', desc: 'Age-appropriate categories' },
                { label: 'Country Delegations', desc: 'Represent global economies' },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card border border-border rounded-lg p-6 text-center"
                  style={{ boxShadow: 'var(--shadow-card)' }}
                >
                  <h4 className="font-bold text-lg text-foreground mb-2">{item.label}</h4>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-20">
        <div className="section-container text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Shape the Future of Economics?
            </h2>
            <p className="text-white/80 text-lg max-w-2xl mx-auto mb-8">
              Join Dubai's most prestigious economics competition and develop real-world policy-making skills.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="inline-flex items-center justify-center gap-2 bg-accent text-accent-foreground font-semibold px-8 py-4 rounded-md transition-all duration-200 hover:opacity-90"
              >
                Register Now
                <ArrowRight size={20} />
              </Link>
              <Link
                to="/get-involved"
                className="inline-flex items-center justify-center gap-2 border-2 border-white/80 text-white font-semibold px-8 py-4 rounded-md transition-all duration-200 hover:bg-white hover:text-primary"
              >
                Get Involved
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
