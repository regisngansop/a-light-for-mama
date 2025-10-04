import { useEffect, useState } from "react";
import mamanDjikiPhoto from "@/assets/maman-djiki-ruth.png";
import backgroundPortrait from "@/assets/background-portrait.png";

const Index = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <main className="min-h-screen relative">
      {/* Background Image with Overlay */}
      <div className="fixed inset-0 z-0">
        <img 
          src={backgroundPortrait} 
          alt="" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/85 to-background/95"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-transparent to-background/90"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20">
        <div className={`max-w-4xl mx-auto text-center space-y-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          
          {/* Photo */}
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-3xl animate-glow"></div>
            <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto rounded-full overflow-hidden border-4 border-primary/30 shadow-2xl">
              <img 
                src={mamanDjikiPhoto} 
                alt="Maman Djiki Ruth"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Name */}
          <div className="space-y-2">
            <h1 className="text-5xl md:text-7xl font-bold text-gradient">
              Maman Djiki Ruth
            </h1>
            <div className="h-1 w-32 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto"></div>
          </div>

          {/* Opening Quote */}
          <p className="text-xl md:text-2xl text-foreground/80 italic font-light">
            L'amour ne s'arrête pas.
          </p>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-primary/30 rounded-full flex items-start justify-center p-2">
            <div className="w-1.5 h-3 bg-primary/50 rounded-full"></div>
          </div>
        </div>
      </section>

        {/* Tribute Text Section */}
        <section className="relative py-20 px-4">
        <div className="max-w-3xl mx-auto space-y-12">
          
          {/* Decorative Line */}
          <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>

          {/* Main Tribute */}
          <article className="space-y-8 text-lg md:text-xl leading-relaxed text-foreground/90">
            <p className="animate-fade-in-up" style={{ animationDelay: '0.2s', animationFillMode: 'backwards' }}>
              Mon cœur est meurtri, mais je rends grâce à Dieu.
              Grâce pour ces souvenirs empreints d'amour, d'humour et d'enseignements.
              Tu nous laisses un héritage immense, inestimable et indissoluble.
            </p>

            <div className="my-8 p-8 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl border border-primary/10 shadow-soft animate-fade-in-up" style={{ animationDelay: '0.4s', animationFillMode: 'backwards' }}>
              <p className="text-center font-medium text-primary">
                Que le Seigneur t'ouvre grandement les portes du paradis.
              </p>
            </div>

            <p className="animate-fade-in-up" style={{ animationDelay: '0.6s', animationFillMode: 'backwards' }}>
              Tu as été, toute ta vie, une femme de prière, d'amour et de partage.
              Tes journées étaient un hymne à la bonté, à la joie et à la foi —
              une lumière née de la prière.
            </p>

            <p className="animate-fade-in-up" style={{ animationDelay: '0.8s', animationFillMode: 'backwards' }}>
              Depuis notre enfance, tu as semé dans nos cœurs la lumière, la tendresse,
              et la crainte de Dieu.
            </p>

            <p className="animate-fade-in-up" style={{ animationDelay: '1s', animationFillMode: 'backwards' }}>
              Même pendant ces années sans voir, comme ta petite sœur tu voyais l'essentiel.
              Avec la prière pour repère, tu as passé ta vie à prier, aimer, partager et répandre la joie.
              Ta condition ne t'a jamais freinée — elle a agrandi ta foi,
              et fait de toi un repère, un pilier, un exemple pour nos vies.
            </p>

            <div className="my-12 space-y-6 p-8 bg-gradient-to-br from-secondary/10 to-primary/5 rounded-2xl border border-secondary/20 animate-fade-in-up" style={{ animationDelay: '1.2s', animationFillMode: 'backwards' }}>
              <p className="text-center text-xl md:text-2xl font-semibold">
                Aujourd'hui, nous ne pleurons plus…
              </p>
              <p className="text-center">
                Car grande-mère s'est endormie, elle repose en paix auprès de Dieu qu'elle a tant aimé.
              </p>
              <p className="text-center">
                Et dans nos âmes, ton amour reste indéfectible —
              </p>
              <p className="text-center text-2xl font-bold text-gradient">
                éternel
              </p>
            </div>

            <p className="text-center text-2xl md:text-3xl font-bold text-primary animate-fade-in-up" style={{ animationDelay: '1.4s', animationFillMode: 'backwards' }}>
              Je t'aime
            </p>
            
            <p className="text-center text-xl md:text-2xl font-semibold animate-fade-in-up" style={{ animationDelay: '1.6s', animationFillMode: 'backwards' }}>
              Maman Djiki Ruth
            </p>
          </article>

          {/* Decorative Line */}
          <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>

        </div>
      </section>

        {/* Footer Section */}
        <section className="relative py-16 px-4">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <div className="inline-block p-6 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full">
            <svg 
              className="w-12 h-12 text-primary" 
              fill="currentColor" 
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
          <p className="text-muted-foreground italic">
            « Son amour brille à jamais dans nos cœurs »
          </p>
        </div>
        </section>
      </div>
    </main>
  );
};

export default Index;
