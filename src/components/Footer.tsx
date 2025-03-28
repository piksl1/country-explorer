
import { motion } from "framer-motion";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="border-t border-border/50 py-6 glass glass-dark">
      <div className="container mx-auto px-6">
        <motion.div 
          className="flex flex-col md:flex-row justify-between items-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-muted-foreground text-sm">
            © {currentYear} Countries Explorer. All rights reserved.
          </p>
          <p className="text-muted-foreground text-sm">
            Designed with ❤️ for geographical explorers worldwide
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
