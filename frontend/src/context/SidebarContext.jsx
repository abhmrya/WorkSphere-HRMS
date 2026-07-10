import { createContext, useContext, useState } from "react";

const SidebarContext = createContext(null);

// Wrap your dashboard layout with <SidebarProvider> so the hamburger
// button in Navbar and the drawer in Sidebar can talk to each other.
export function SidebarProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  const value = {
    isOpen,
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
    toggle: () => setIsOpen((prev) => !prev),
  };

  return (
    <SidebarContext.Provider value={value}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = useContext(SidebarContext);

  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }

  return context;
}
