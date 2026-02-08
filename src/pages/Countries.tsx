import { motion } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { PageHeader } from '@/components/ui/PageHeader';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { countryRegions, institutions } from '@/data/countries';
import { Building2, Globe } from 'lucide-react';

const Countries = () => {
  return (
    <Layout>
      <PageHeader
        title="Countries & Institutions"
        subtitle="Explore the nations and global economic bodies you can represent at MWEF."
      />

      {/* Institutions */}
      <section className="py-20 md:py-28 bg-background">
        <div className="section-container">
          <SectionHeader
            title="Institutional Delegations"
            subtitle="Represent major international economic organizations and shape global policy discussions."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {institutions.map((institution, index) => (
              <motion.div
                key={institution.abbreviation}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card border border-border rounded-lg p-6 hover:border-accent/30 transition-all duration-300"
                style={{ boxShadow: 'var(--shadow-card)' }}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Building2 className="text-accent" size={24} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs font-bold rounded">
                        {institution.abbreviation}
                      </span>
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">
                      {institution.name}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {institution.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Country Delegations */}
      <section className="py-20 md:py-28 bg-secondary">
        <div className="section-container">
          <SectionHeader
            title="Country Delegations"
            subtitle="Represent nations from around the world in economic policy discussions."
          />

          <div className="space-y-10">
            {countryRegions.map((region, regionIndex) => (
              <motion.div
                key={region.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: regionIndex * 0.1 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <Globe className="text-accent" size={20} />
                  <h3 className="text-xl font-semibold text-foreground">{region.name}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {region.countries.map((country) => (
                    <span
                      key={country}
                      className="px-4 py-2 bg-card border border-border rounded-md text-sm font-medium text-foreground hover:border-accent/40 transition-colors cursor-default"
                    >
                      {country}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Selection Info */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="section-container text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-primary-foreground">Delegation Assignment</h2>
          <p className="text-white/80 max-w-2xl mx-auto">
            Country and institutional assignments will be made after registration closes. Delegates can indicate preferences, but final assignments are based on availability and conference balance.
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default Countries;
