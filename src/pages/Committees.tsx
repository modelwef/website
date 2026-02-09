import { Layout } from '@/components/layout/Layout';
import { PageHeader } from '@/components/ui/PageHeader';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { CommitteeCard } from '@/components/cards/CommitteeCard';
import { committees } from '@/data/committees';

const Committees = () => {
  const seniorCommittees = committees.filter(c => c.categoryShort === 'Senior');
  const juniorCommittees = committees.filter(c => c.categoryShort === 'Junior');

  return (
    <Layout>
      <PageHeader
        title="Committees"
        subtitle="Explore our specialized economic forums, each addressing critical global challenges through rigorous analysis and debate."
      />

      {/* Senior Committees */}
      <section className="py-20 md:py-28 bg-background">
        <div className="section-container">
          <SectionHeader
            title="Senior Committees"
            subtitle="Advanced forums for experienced participants tackling complex macroeconomic and global policy challenges."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {seniorCommittees.map((committee, index) => (
              <CommitteeCard
                key={committee.id}
                id={committee.id}
                name={committee.name}
                abbreviation={committee.abbreviation}
                category={committee.category}
                description={committee.overview}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Junior Committees */}
      <section className="py-20 md:py-28 bg-secondary">
        <div className="section-container">
          <SectionHeader
            title="Junior Committees"
            subtitle="Introductory forums designed for newer participants to engage with foundational economic concepts and debates."
          />

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl">
            {juniorCommittees.map((committee, index) => (
              <CommitteeCard
                key={committee.id}
                id={committee.id}
                name={committee.name}
                abbreviation={committee.abbreviation}
                category={committee.category}
                description={committee.overview}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* How Committees Work */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center">
            <div className="accent-bar mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-primary-foreground">How Committees Work</h2>
            <p className="text-white/80 text-lg leading-relaxed mb-8">
              Committees are used for Round 1 (Solution Proposal Round). Round 2 topics are decided internally within each committee, featuring structured 5 vs 5 proposition and opposition debates on policy implementations relevant to the committee's domain.
            </p>
            <div className="grid sm:grid-cols-3 gap-6">
              <div className="bg-white/5 border border-white/10 rounded-lg p-5">
                <div className="text-accent font-bold text-2xl mb-2">Round 1</div>
                <p className="text-white/70 text-sm">Solution Proposals</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-lg p-5">
                <div className="text-accent font-bold text-2xl mb-2">Round 2</div>
                <p className="text-white/70 text-sm">Policy Debate</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-lg p-5">
                <div className="text-accent font-bold text-2xl mb-2">Round 3</div>
                <p className="text-white/70 text-sm">Crisis & POI</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Committees;
