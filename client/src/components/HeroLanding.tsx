import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Droplet, Users, Waves, Award, Heart, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

interface HeroLandingProps {
  onStartMission: () => void;
}

export default function HeroLanding({ onStartMission }: HeroLandingProps) {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#1A5F7A] via-[#1A5F7A] to-[#57C5B6]">
      {/* Floating Particles Background */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            animate={{
              y: [0, -20, 0],
              x: [0, Math.sin(i) * 10, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 py-12 lg:py-20 relative z-10">
        <div className="max-w-6xl mx-auto text-center space-y-12">
          
          {/* Branded Hero Section */}
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* charity: water Logo Section */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <div className="text-[#57C5B6] text-2xl font-bold mb-4">charity: water</div>
              <div className="text-white/90 text-sm">Official Logo Integration</div>
            </div>

            {/* Glowing Droplet */}
            <motion.div 
              className="flex justify-center"
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#57C5B6] to-[#1A5F7A] rounded-full blur-xl opacity-60 animate-pulse"></div>
                <div className="relative bg-gradient-to-br from-[#57C5B6] to-[#1A5F7A] rounded-full p-8 border-4 border-white/30">
                  <Droplet className="w-16 h-16 text-white fill-current" />
                  <div className="absolute top-2 right-2 w-3 h-3 bg-white rounded-full animate-ping"></div>
                </div>
              </div>
            </motion.div>

            {/* Game Title */}
            <div className="space-y-4">
              <motion.h1 
                className="text-6xl lg:text-8xl font-black bg-gradient-to-r from-white via-[#57C5B6] to-white bg-clip-text text-transparent leading-tight"
                animate={{ 
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{
                  backgroundSize: "200% 200%"
                }}
              >
                🎯 H2O HERO QUIZ 🎯
              </motion.h1>
              
              {/* Mission Statement */}
              <motion.p 
                className="text-xl lg:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                🌊 Join charity: water's mission to end the global water crisis. 
                Learn about clean water access, test your knowledge, and discover how every 
                correct answer helps fund real water projects around the world! 💧
              </motion.p>
            </div>
          </motion.div>

          {/* charity: water Impact Metrics */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <Card className="bg-white/10 backdrop-blur-sm p-6 space-y-3 border border-white/20 hover:bg-white/15 transition-all duration-300 group">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Droplet className="w-12 h-12 text-[#57C5B6] mx-auto group-hover:text-white transition-colors" />
              </motion.div>
              <p className="text-3xl font-bold text-white tabular-nums">703M</p>
              <p className="text-white/80 text-sm font-medium">lack clean water at home</p>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm p-6 space-y-3 border border-white/20 hover:bg-white/15 transition-all duration-300 group">
              <motion.div
                animate={{ 
                  boxShadow: [
                    "0 0 20px rgba(87, 197, 182, 0.3)",
                    "0 0 40px rgba(87, 197, 182, 0.6)",
                    "0 0 20px rgba(87, 197, 182, 0.3)"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="rounded-full p-2"
              >
                <Users className="w-12 h-12 text-[#57C5B6] mx-auto group-hover:text-white transition-colors" />
              </motion.div>
              <p className="text-3xl font-bold text-white tabular-nums">1.5B</p>
              <p className="text-white/80 text-sm font-medium">lack safe sanitation</p>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm p-6 space-y-3 border border-white/20 hover:bg-white/15 transition-all duration-300 group">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                <Award className="w-12 h-12 text-[#FFD700] mx-auto group-hover:text-white transition-colors" />
              </motion.div>
              <p className="text-3xl font-bold text-white tabular-nums">91,000+</p>
              <p className="text-white/80 text-sm font-medium">water projects funded by c:w</p>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm p-6 space-y-3 border border-white/20 hover:bg-white/15 transition-all duration-300 group">
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Heart className="w-12 h-12 text-[#FF6B35] mx-auto group-hover:text-white transition-colors fill-current" />
              </motion.div>
              <p className="text-3xl font-bold text-white tabular-nums">16.8M+</p>
              <p className="text-white/80 text-sm font-medium">people served by charity:water</p>
            </Card>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div 
            className="space-y-6 pt-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                className="text-2xl font-bold px-16 py-8 h-auto bg-gradient-to-r from-[#1A5F7A] to-[#57C5B6] text-white hover:from-[#57C5B6] hover:to-[#1A5F7A] transition-all duration-500 shadow-2xl border-2 border-white/20 relative overflow-hidden group"
                onClick={onStartMission}
                data-testid="button-start-mission"
              >
                <motion.div
                  className="absolute inset-0 bg-white/20"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.5 }}
                />
                <span className="relative z-10 flex items-center gap-3">
                  🌟 START MISSION 🌊
                </span>
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="inline-block"
            >
              <a
                href="https://charitywater.org"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[#57C5B6] hover:text-white transition-colors text-lg font-semibold group"
              >
                🔗 Visit charity: water
                <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>
          </motion.div>

        </div>
      </div>

      {/* Wave Animation at Bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 overflow-hidden">
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-40"
          style={{
            background: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120'%3E%3Cpath d='M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z' fill='%23ffffff20'%3E%3C/path%3E%3C/svg%3E\") repeat-x",
            backgroundSize: "1200px 120px",
          }}
          animate={{
            x: [0, -1200],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>
    </div>
  );
}
