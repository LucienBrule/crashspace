import Header from '@/components/SceneRelease/Header';
import AsciiArt from '@/components/SceneRelease/AsciiArt';
import InfoBlock from '@/components/SceneRelease/InfoBlock';
import KoanScroll from '@/components/SceneRelease/KoanScroll';
import Footer from '@/components/SceneRelease/Footer';

export default function SceneRelease() {
  return (
    <div className="max-w-screen-lg mx-auto p-8 text-sm text-white bg-black font-mono">
      <Header />
      <AsciiArt />
      <InfoBlock />
      <KoanScroll />
      <Footer />
    </div>
  );
}
