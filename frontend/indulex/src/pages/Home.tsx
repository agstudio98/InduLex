import { Main } from './home/Main';
import { Who } from './home/Who';
import { Slogans } from './home/Slogans';
import { Timeline } from './home/Timeline';
import { Top } from './home/Top';
import { Events } from './home/Events';
import { Pays } from './home/Pays';
import { Carrousel } from './home/Carrousel';

/**
 * Home Page Component
 * 
 * The landing page of the InduLex application.
 * It serves as an orchestrator for various landing sections including:
 * - Hero (Main)
 * - Essence (Who)
 * - Brand Slogans
 * - Product Carrousel
 * - Brand Evolution (Timeline)
 * - Featured Items (Top)
 * - Events & Experiences
 * - Payment Benefits (Pays)
 * 
 * @returns {JSX.Element} The rendered home page
 */
export const Home = () => {
  return (
    <div className="animate-fade-in">
      <Main />
      <Who />
      <Slogans />
      <Carrousel />
      <Timeline />
      <Top />
      <Events />
      <Pays />
    </div>
  );
};