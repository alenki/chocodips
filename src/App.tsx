import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturedTrio from './components/FeaturedTrio';
import MenuSection from './components/MenuSection';
import ItemModal from './components/ItemModal';
import About from './components/About';
import Location from './components/Location';
import Footer from './components/Footer';
import type { MenuItem } from './types/menu';

export default function App() {
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <FeaturedTrio onItemClick={setSelectedItem} />
        <MenuSection onItemClick={setSelectedItem} />
        <About />
        <Location />
      </main>
      <Footer />
      <ItemModal item={selectedItem} onClose={() => setSelectedItem(null)} />
    </>
  );
}
