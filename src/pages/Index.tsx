
import React from 'react';
import StarField from '@/components/StarField';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const { user } = useAuth();
  
  return (
    <div className="min-h-screen relative overflow-hidden">
      <StarField />
      
      <div className="container mx-auto px-4 pt-32 pb-20">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <div className="animate-float mb-8">
            <div className="h-32 w-32 rounded-full bg-cosmic-accent/20 flex items-center justify-center">
              <span className="text-5xl">✨</span>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-cosmic-light text-glow mb-6 animate-fade-in">
            Discover Your Cosmic Path
          </h1>
          
          <p className="text-lg md:text-xl text-cosmic-light/80 mb-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Uncover the mysteries of the universe and gain insights into your destiny through our celestial guidance.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full mt-12">
            {featuredCards.map((card, index) => (
              <div 
                key={card.title} 
                className="cosmic-glass p-6 rounded-lg hover:scale-105 transition-transform animate-fade-in"
                style={{ animationDelay: `${0.3 + index * 0.1}s` }}
              >
                <div className="bg-cosmic-accent/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">{card.icon}</span>
                </div>
                <h3 className="text-xl font-semibold text-cosmic-light mb-2">{card.title}</h3>
                <p className="text-cosmic-light/70 text-sm">{card.description}</p>
                <Button 
                  variant="link" 
                  className="mt-4 text-cosmic-accent hover:text-cosmic-light"
                >
                  Explore
                </Button>
              </div>
            ))}
          </div>
          
          {!user && (
            <div className="mt-20 mb-10 text-center animate-fade-in" style={{ animationDelay: "0.6s" }}>
              <h2 className="text-2xl md:text-3xl font-semibold text-cosmic-light mb-4">
                Join Our Cosmic Community
              </h2>
              <p className="text-cosmic-light/80 mb-6 max-w-xl mx-auto">
                Create an account to save your readings, receive personalized horoscopes, and unlock exclusive cosmic content.
              </p>
            </div>
          )}
          
          <div className="mt-16 relative w-full max-w-4xl mx-auto cosmic-glass p-8 rounded-lg animate-fade-in" style={{ animationDelay: "0.7s" }}>
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
              <div className="bg-cosmic-accent/30 p-2 rounded-full">
                <span className="text-2xl">🔮</span>
              </div>
            </div>
            <h3 className="text-xl font-semibold text-cosmic-light mb-4 text-center">Today's Cosmic Insight</h3>
            <p className="text-cosmic-light/90 italic text-center">
              "The alignment of Jupiter and Venus suggests a time of expansion and growth. 
              New opportunities may present themselves in unexpected ways - stay open to 
              possibilities that seem to come from beyond the visible realm."
            </p>
          </div>
        </div>
      </div>
      
      <footer className="mt-auto py-8 cosmic-glass">
        <div className="container mx-auto px-4 text-center text-cosmic-light/60 text-sm">
          <p>© 2025 Astral Access | Cosmic Guidance for Your Journey</p>
        </div>
      </footer>
    </div>
  );
};

// Featured cards data
const featuredCards = [
  {
    icon: "♈",
    title: "Daily Horoscope",
    description: "Receive personalized daily insights based on your zodiac sign and planetary alignments.",
  },
  {
    icon: "🌙",
    title: "Moon Phases",
    description: "Track lunar cycles and understand how they influence your emotions and energy.",
  },
  {
    icon: "🔮",
    title: "Tarot Reading",
    description: "Get guidance through mystical tarot spreads interpreted by cosmic experts.",
  },
];

export default Index;
