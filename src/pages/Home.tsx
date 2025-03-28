import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Globe, MapPin, Search, BarChart2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 flex flex-col">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/20 dark:from-primary/5 dark:to-accent/10 -z-10" />
          <div className="container mx-auto px-6 py-20 md:py-32">
            <div className="max-w-3xl mx-auto text-center">
              <motion.h1
                className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70"
                initial={{ y: -30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                Explore the World's Data
              </motion.h1>

              <motion.p
                className="text-lg md:text-xl text-muted-foreground mb-10 md:leading-relaxed"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Discover information about countries around the globe and trace
                IP addresses to their geographic locations with our powerful
                tools.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Link to="/ip-tracker">
                  <Button size="lg" className="gap-2 font-medium">
                    <MapPin className="w-5 h-5" />
                    Try IP Tracker
                  </Button>
                </Link>
                <Link to="/countries">
                  <Button
                    variant="outline"
                    size="lg"
                    className="gap-2 font-medium"
                  >
                    <Globe className="w-5 h-5" />
                    Explore Countries
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-secondary/50 dark:bg-secondary/20">
          <div className="container mx-auto px-6">
            <motion.h2
              className="text-3xl font-bold text-center mb-16"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Powerful Features
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <motion.div
                className="glass glass-dark p-8 rounded-lg shadow-md flex flex-col items-center text-center"
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-6">
                  <Globe className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4">
                  Countries Explorer
                </h3>
                <p className="text-muted-foreground mb-6">
                  Browse and search countries worldwide with detailed
                  information about population, region, languages, and more.
                </p>
                <Link
                  to="/countries"
                  className="text-primary font-medium inline-flex items-center gap-2 hover:underline"
                >
                  Explore Countries <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>

              {/* Feature 2 */}
              <motion.div
                className="glass glass-dark p-8 rounded-lg shadow-md flex flex-col items-center text-center"
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-6">
                  <MapPin className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4">
                  IP Address Tracker
                </h3>
                <p className="text-muted-foreground mb-6">
                  Trace any IP address or domain to locate its geographical
                  position and get detailed information about the region.
                </p>
                <Link
                  to="/ip-tracker"
                  className="text-primary font-medium inline-flex items-center gap-2 hover:underline"
                >
                  Track IP Address <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>

              {/* Feature 3 */}
              <motion.div
                className="glass glass-dark p-8 rounded-lg shadow-md flex flex-col items-center text-center"
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-6">
                  <Search className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Powerful Search</h3>
                <p className="text-muted-foreground mb-6">
                  Quickly find information with our intuitive search
                  functionality, filtering countries by name or region.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto glass glass-dark rounded-2xl overflow-hidden shadow-lg">
              <div className="p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="text-center md:text-left">
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">
                    Ready to explore?
                  </h2>
                  <p className="text-muted-foreground max-w-md">
                    Start discovering countries and tracking IP addresses with
                    our comprehensive tools.
                  </p>
                </div>
                <div className="flex gap-4">
                  <Link to="/countries">
                    <Button className="gap-2">
                      <Globe className="w-5 h-5" />
                      Countries
                    </Button>
                  </Link>
                  <Link to="/ip-tracker">
                    <Button variant="outline" className="gap-2">
                      <MapPin className="w-5 h-5" />
                      IP Tracker
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
