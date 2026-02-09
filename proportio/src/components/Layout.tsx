import { ReactNode } from "react";
import Navbar from "./Navbar";
import ObliqueLines from "./ObliqueLines";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen bg-background relative">
      <ObliqueLines />
      <Navbar />
      <main className="relative z-10 pt-16">
        {children}
      </main>
      <footer className="relative z-10 border-t border-border/50 py-12 px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground tracking-wide">
            © 2026 Proportio.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
