import { useEffect, useState, useRef } from "react";
import mamanNjikiPhoto from "@/assets/maman-djiki-ruth.png";
import backgroundPortrait from "@/assets/background-portrait.png";
import doveWithOliveBranch from "@/assets/dove-with-olive-branch.png";
import { Bird } from "lucide-react";

const Index = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [audioStarted, setAudioStarted] = useState(false);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [selectedMusic, setSelectedMusic] = useState('audio'); // 'audio' ou 'bella'
  const audioRef = useRef<HTMLAudioElement>(null);
  
  // Médias pour le carousel - alternance image/vidéo
  const images = [
    { type: 'image', src: mamanNjikiPhoto, alt: 'Maman Njiki Ruth' },
    { type: 'image', src: '/image.png', alt: 'Maman Njiki Ruth - Photo 2' },
    { type: 'image', src: '/love.png', alt: 'Maman Njiki Ruth - Moment d\'amour' }
  ];
  
  const videos = [
    { type: 'video', src: '/video_segments/video_segment_1.mp4', alt: 'Maman Njiki Ruth - Vidéo 1' },
    { type: 'video', src: '/video_segments/video_segment_2.mp4', alt: 'Maman Njiki Ruth - Vidéo 2' },
    { type: 'video', src: '/video_segments/video_segment_3.mp4', alt: 'Maman Njiki Ruth - Vidéo 3' },
    { type: 'video', src: '/video_segments/video_segment_4.mp4', alt: 'Maman Njiki Ruth - Vidéo 4' },
    { type: 'video', src: '/video_segments/video_segment_5.mp4', alt: 'Maman Njiki Ruth - Vidéo 5' },
    { type: 'video', src: '/video_segments/video_segment_6.mp4', alt: 'Maman Njiki Ruth - Vidéo 6' },
    { type: 'video', src: '/video_segments/video_segment_7.mp4', alt: 'Maman Njiki Ruth - Vidéo 7' },
    { type: 'video', src: '/video_segments/video_segment_8.mp4', alt: 'Maman Njiki Ruth - Vidéo 8' },
    { type: 'video', src: '/video_segments/video_segment_9.mp4', alt: 'Maman Njiki Ruth - Vidéo 9' },
    { type: 'video', src: '/video_segments/video_segment_10.mp4', alt: 'Maman Njiki Ruth - Vidéo 10' }
  ];
  
  // Créer une séquence alternée : image → vidéo → image → vidéo...
  const mediaItems = [];
  const maxLength = Math.max(images.length, videos.length);
  
  for (let i = 0; i < maxLength; i++) {
    // Ajouter image si elle existe
    if (i < images.length) {
      mediaItems.push(images[i]);
    }
    // Ajouter vidéo si elle existe
    if (i < videos.length) {
      mediaItems.push(videos[i]);
    }
  }

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Carousel automatique des médias
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMediaIndex((prevIndex) => 
        (prevIndex + 1) % mediaItems.length
      );
    }, 4000); // Change toutes les 4 secondes pour l'alternance

    return () => clearInterval(interval);
  }, [mediaItems.length]);

  useEffect(() => {
    // Démarrer l'audio immédiatement au chargement
    const startAudioImmediately = () => {
      if (audioRef.current && !audioStarted) {
        audioRef.current.volume = 0.3;
        audioRef.current.muted = false;
        
        // Essayer de jouer immédiatement
        audioRef.current.play().then(() => {
          setAudioStarted(true);
          console.log("Audio démarré immédiatement");
        }).catch((error) => {
          console.log("Démarrage immédiat échoué, tentative dans 2s:", error);
          
          // Retry après 2 secondes
          setTimeout(() => {
            if (audioRef.current && !audioStarted) {
              audioRef.current.play().then(() => {
                setAudioStarted(true);
                console.log("Audio démarré après délai");
              }).catch((retryError) => {
                console.log("Retry échoué:", retryError);
                // Dernière tentative avec interaction
                const handleUserInteraction = () => {
                  if (audioRef.current && !audioStarted) {
                    audioRef.current.play().then(() => {
                      setAudioStarted(true);
                      console.log("Audio démarré après interaction");
                    });
                  }
                };
                
                document.addEventListener('click', handleUserInteraction, { once: true });
                document.addEventListener('touchstart', handleUserInteraction, { once: true });
                document.addEventListener('keydown', handleUserInteraction, { once: true });
              });
            }
          }, 2000);
        });
      }
    };

    // Démarrer immédiatement
    startAudioImmediately();
  }, []);

  // Fonction pour démarrer l'audio manuellement
  const startAudio = () => {
    if (audioRef.current && !audioStarted) {
      audioRef.current.play().then(() => {
        setAudioStarted(true);
      }).catch(console.error);
    }
  };

  // Fonction pour changer de musique
  const changeMusic = (musicType: 'audio' | 'bella') => {
    setSelectedMusic(musicType);
    setAudioStarted(false);
    
    // Redémarrer l'audio avec la nouvelle musique
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.load(); // Recharger la source
        audioRef.current.play().then(() => {
          setAudioStarted(true);
        }).catch(console.error);
      }
    }, 100);
  };

  return (
    <main className="min-h-screen relative">
      {/* Audio en arrière-plan */}
      <audio
        ref={audioRef}
        loop
        preload="auto"
        autoPlay
        muted={false}
        className="hidden"
        onLoadedData={() => {
          if (audioRef.current && !audioStarted) {
            audioRef.current.play().then(() => {
              setAudioStarted(true);
              console.log("Audio démarré via onLoadedData");
            }).catch(console.error);
          }
        }}
        onCanPlayThrough={() => {
          if (audioRef.current && !audioStarted) {
            audioRef.current.play().then(() => {
              setAudioStarted(true);
              console.log("Audio démarré via onCanPlayThrough");
            }).catch(console.error);
          }
        }}
      >
        <source src={selectedMusic === 'bella' ? '/bella.mp3' : '/audio.mp3'} type="audio/mpeg" />
        Votre navigateur ne supporte pas l'élément audio.
      </audio>
      {/* Background Image with Overlay */}
      <div className="fixed inset-0 z-0">
        <img 
          src={backgroundPortrait} 
          alt="" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/70 to-background/80"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-background/75 via-transparent to-background/75"></div>
      </div>

      {/* Floating Decorative Elements - Arrière-plan */}
      <div className="fixed inset-0 z-5 pointer-events-none overflow-hidden">
        {/* Bulles d'amour partout - Arrière-plan */}
        <div className="absolute top-[10vh] left-[10vw] text-primary/10 w-6 h-6 animate-float" style={{ animationDelay: '0.5s' }}>
          <div className="w-full h-full rounded-full bg-primary/15 animate-pulse">💕</div>
        </div>
        <div className="absolute top-[25vh] right-[15vw] text-primary/12 w-8 h-8 animate-float" style={{ animationDelay: '1.2s' }}>
          <div className="w-full h-full rounded-full bg-primary/12 animate-pulse">💖</div>
        </div>
        <div className="absolute top-[45vh] left-[20vw] text-primary/10 w-5 h-5 animate-float" style={{ animationDelay: '2.8s' }}>
          <div className="w-full h-full rounded-full bg-primary/15 animate-pulse">💝</div>
        </div>
        <div className="absolute top-[60vh] right-[25vw] text-primary/12 w-7 h-7 animate-float" style={{ animationDelay: '1.8s' }}>
          <div className="w-full h-full rounded-full bg-primary/12 animate-pulse">💗</div>
        </div>
        <div className="absolute bottom-[30vh] left-[15vw] text-primary/10 w-6 h-6 animate-float" style={{ animationDelay: '3.2s' }}>
          <div className="w-full h-full rounded-full bg-primary/15 animate-pulse">💕</div>
        </div>
        <div className="absolute bottom-[15vh] right-[20vw] text-primary/12 w-8 h-8 animate-float" style={{ animationDelay: '0.9s' }}>
          <div className="w-full h-full rounded-full bg-primary/12 animate-pulse">💖</div>
        </div>
        <div className="absolute top-[80vh] left-[30vw] text-primary/10 w-5 h-5 animate-float" style={{ animationDelay: '2.5s' }}>
          <div className="w-full h-full rounded-full bg-primary/15 animate-pulse">💝</div>
        </div>
        <div className="absolute top-[5vh] right-[30vw] text-primary/12 w-7 h-7 animate-float" style={{ animationDelay: '1.5s' }}>
          <div className="w-full h-full rounded-full bg-primary/12 animate-pulse">💗</div>
        </div>
        
      </div>

      {/* Content - Carte élégante */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-8">
        {/* Carte principale avec image de fond */}
        <div className="w-full max-w-5xl bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border-4 border-white/30 transform hover:shadow-3xl transition-all duration-500 overflow-hidden relative">
          {/* Image de fond sur la carte */}
          <div className="absolute inset-0 z-0">
            <img 
              src={backgroundPortrait} 
              alt="" 
              className="w-full h-full object-cover rounded-3xl opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/40 to-white/60 rounded-3xl"></div>
          </div>
          
          {/* En-tête de la carte avec bordure décorative */}
          <div className="bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 p-6 border-b-4 border-white/20 shadow-lg relative overflow-hidden">
            {/* Effet de brillance */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-white/10"></div>
            <div className="text-center relative z-10">
              <h1 className="text-4xl md:text-6xl font-bold text-white text-elegant-bold mb-2">
                En Mémoire de
              </h1>
              <h2 className="text-4xl md:text-5xl font-semibold text-white text-elegant">
                Maman Njiki Ruth
              </h2>
              {!audioStarted ? (
                <button 
                  onClick={startAudio}
                  className="mt-4 px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-full border border-white/30 transition-all duration-300 hover:scale-105 text-sm"
                >
                  🎵 Démarrer la musique
                </button>
              ) : (
                <div className="mt-4 space-y-3">
                  <div className="flex items-center justify-center space-x-2 text-white/80">
                    <div className="w-3 h-3 bg-white/60 rounded-full animate-pulse"></div>
                    <span className="text-sm">🎵 Musique d'ambiance</span>
                  </div>
                  
                  {/* Sélecteur de musique */}
                  <div className="flex items-center justify-center space-x-2">
                    <button
                      onClick={() => changeMusic('audio')}
                      className={`px-3 py-1 rounded-full text-xs transition-all duration-300 ${
                        selectedMusic === 'audio' 
                          ? 'bg-white/30 text-white border border-white/50' 
                          : 'bg-white/10 text-white/70 border border-white/20 hover:bg-white/20'
                      }`}
                    >
                      Ko Am
                    </button>
                    <button
                      onClick={() => changeMusic('bella')}
                      className={`px-3 py-1 rounded-full text-xs transition-all duration-300 ${
                        selectedMusic === 'bella' 
                          ? 'bg-white/30 text-white border border-white/50' 
                          : 'bg-white/10 text-white/70 border border-white/20 hover:bg-white/20'
                      }`}
                    >
                      Bella
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Contenu de la carte */}
          <div className="p-8 md:p-12 relative z-10">
            {/* Carousel de médias dans la carte avec colombe */}
            <div className="text-center mb-8 relative">
              <div className="relative inline-block">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-3xl animate-glow"></div>
                <div className="relative w-48 h-48 md:w-64 md:h-64 mx-auto rounded-full overflow-hidden border-4 border-primary/30 shadow-2xl">
                  {/* Carousel de médias */}
                  <div className="relative w-full h-full">
                    {mediaItems.map((item, index) => (
                      <div
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-1000 ${
                          index === currentMediaIndex ? 'opacity-100' : 'opacity-0'
                        }`}
                      >
                        {item.type === 'image' ? (
                          <img 
                            src={item.src} 
                            alt={item.alt}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <video 
                            src={item.src} 
                            alt={item.alt}
                            className="w-full h-full object-cover"
                            autoPlay
                            loop
                            muted
                            playsInline
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Colombe de paix à côté de la photo */}
                <div className="absolute -top-8 -right-8 z-20">
                  <img 
                    src={doveWithOliveBranch} 
                    alt="Colombe de paix" 
                    className="w-28 h-28 object-contain drop-shadow-lg animate-float"
                    style={{ animationDelay: '0s' }}
                  />
                </div>
                
                {/* Indicateurs du carousel */}
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {mediaItems.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentMediaIndex 
                          ? 'bg-primary scale-125' 
                          : 'bg-primary/30'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Citation d'ouverture */}
            <div className="text-center mb-8">
              <p className="text-2xl md:text-3xl text-foreground/80 italic font-light text-elegant">
                L'amour ne s'arrête pas.
              </p>
            </div>

            {/* Texte d'hommage */}
            <div className="space-y-8">
              {/* Ligne décorative */}
              <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>

              {/* Main Tribute */}
              <article className="space-y-8 text-xl md:text-2xl leading-relaxed text-foreground/90 text-elegant">
            <p className="animate-fade-in-up" style={{ animationDelay: '0.2s', animationFillMode: 'backwards' }}>
              Nos cœurs sont meurtris, mais nous rendons grâce à Dieu.
              Grâce pour ces souvenirs empreints d'amour, d'humour et d'enseignements.
              Tu nous laisses un héritage immense, inestimable et indissoluble.
            </p>

            <div className="my-8 p-8 bg-primary rounded-2xl shadow-2xl border-2 border-white/20 transform hover:scale-105 transition-all duration-300 animate-fade-in-up relative overflow-hidden" style={{ animationDelay: '0.4s', animationFillMode: 'backwards' }}>
              {/* Effet de brillance sur la carte */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5 pointer-events-none"></div>
              
              {/* Contenu de la carte */}
              <div className="relative z-10">
                <p className="text-center font-medium text-white text-elegant-bold text-xl md:text-2xl leading-relaxed">
                  Que le Seigneur t'ouvre grandement les portes du paradis.
                </p>
              </div>
              
              {/* Bordure décorative en bas */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-white/30 rounded-full"></div>
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
              <p className="text-center text-2xl md:text-3xl font-semibold text-elegant-bold">
                Aujourd'hui, nous ne pleurons plus…
              </p>
              <p className="text-center text-lg md:text-xl">
                Car grande-mère s'est endormie, elle repose en paix auprès de Dieu qu'elle a tant aimé.
              </p>
              <p className="text-center text-lg md:text-xl">
                Et dans nos âmes, ton amour reste indéfectible —
              </p>
              <p className="text-center text-3xl md:text-4xl font-bold text-gradient text-elegant-bold">
                éternel
              </p>
            </div>

            <p className="text-center text-2xl md:text-3xl font-bold text-primary animate-fade-in-up text-elegant-bold" style={{ animationDelay: '1.4s', animationFillMode: 'backwards' }}>
              Nous t'aimons
            </p>
            
              <p className="text-center text-xl md:text-2xl font-semibold animate-fade-in-up text-elegant-bold" style={{ animationDelay: '1.6s', animationFillMode: 'backwards' }}>
                Maman Njiki Ruth
              </p>
              </article>
            
            {/* Pied de la carte */}
            <div className="mt-12 pt-8 border-t-2 border-primary/20">
              <div className="text-center">
                <div className="inline-block p-4 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full mb-4">
                  <svg 
                    className="w-8 h-8 text-primary" 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <p className="text-muted-foreground italic text-base md:text-lg">
                  « Son amour brille à jamais dans nos cœurs »
                </p>
                <p className="text-muted-foreground text-sm mt-4">
                  Régis Armel Ngansop | "Miguel"
                </p>
              </div>
            </div>
            </div>
          </div>
          
          {/* Effet de brillance sur la carte */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/10 pointer-events-none"></div>
        </div>
      </div>
    </main>
  );
};

export default Index;
