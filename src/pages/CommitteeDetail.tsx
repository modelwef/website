import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, Target, Lightbulb } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { committees } from '@/data/committees';

const CommitteeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const committee = committees.find(c => c.id === id);

  if (!committee) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Committee not found</h1>
            <Link to="/committees" className="text-accent hover:underline">
              Back to Committees
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Header */}
      <div className="bg-primary text-primary-foreground py-16 md:py-24">
        <div className="section-container">
          <Link
            to="/committees"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft size={18} />
            Back to Committees
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="inline-block px-4 py-1.5 bg-accent/20 text-accent rounded-full text-sm font-medium mb-4">
              {committee.category}
            </span>
            <h1 className="text-3xl md:text-5xl font-bold mb-2">
              {committee.name}
            </h1>
            <p className="text-2xl text-white/60 font-bold">({committee.abbreviation})</p>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <section className="py-16 md:py-24 bg-background">
        <div className="section-container">
          <div className="max-w-4xl">
            {/* Overview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-12"
            >
              <div className="flex items-center gap-3 mb-4">
                <BookOpen className="text-accent" size={24} />
                <h2 className="text-2xl font-bold text-foreground">Overview</h2>
              </div>
              <p className="text-muted-foreground text-lg leading-relaxed">
                {committee.overview}
              </p>
            </motion.div>

            {/* Issue at Hand */}
            {committee.issueAtHand && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-12"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Target className="text-accent" size={24} />
                  <h2 className="text-2xl font-bold text-foreground">Issue at Hand</h2>
                </div>
                <div className="bg-accent/5 border-l-4 border-accent p-6 rounded-r-lg">
                  <p className="text-foreground text-lg font-medium">
                    {committee.issueAtHand}
                  </p>
                </div>
              </motion.div>
            )}

            {/* Abstract */}
            {committee.abstract && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mb-12"
              >
                <h2 className="text-2xl font-bold text-foreground mb-4">Abstract</h2>
                <div className="text-muted-foreground text-lg leading-relaxed space-y-4">
                  {committee.abstract.split('\n\n').map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Task */}
            {committee.task && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mb-12"
              >
                <h2 className="text-2xl font-bold text-foreground mb-4">Task</h2>
                <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
                  <p className="text-foreground text-lg">
                    {committee.task}
                  </p>
                </div>
              </motion.div>
            )}

            {/* Tips */}
            {committee.tips && committee.tips.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mb-12"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Lightbulb className="text-accent" size={24} />
                  <h2 className="text-2xl font-bold text-foreground">Tips for Before the Event</h2>
                </div>
                <ul className="space-y-3">
                  {committee.tips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/10 text-accent text-sm font-medium flex items-center justify-center mt-0.5">
                        {index + 1}
                      </span>
                      <span className="text-muted-foreground">{tip}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {/* Rounds */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="grid md:grid-cols-2 gap-6"
            >
              <div className="bg-card border border-border rounded-lg p-6" style={{ boxShadow: 'var(--shadow-card)' }}>
                <div className="text-accent font-bold text-lg mb-2">Round 1</div>
                <h3 className="font-semibold text-foreground mb-2">Solution Proposal Round</h3>
                <p className="text-muted-foreground text-sm">{committee.round1Info}</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-6" style={{ boxShadow: 'var(--shadow-card)' }}>
                <div className="text-accent font-bold text-lg mb-2">Round 2</div>
                <h3 className="font-semibold text-foreground mb-2">Debate Round</h3>
                <p className="text-muted-foreground text-sm">{committee.round2Info}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CommitteeDetail;
