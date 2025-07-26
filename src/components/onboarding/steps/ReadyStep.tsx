import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { OnboardingData } from '../OnboardingFlow';
import { ChevronLeft, Sparkles, ArrowRight } from 'lucide-react';

interface ReadyStepProps {
  data: OnboardingData;
  onPrev: () => void;
  onNext: () => void;
}

export const ReadyStep = ({ data, onPrev, onNext }: ReadyStepProps) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateProfile = () => {
    setIsGenerating(true);
    // Simulate profile generation
    setTimeout(() => {
      setIsGenerating(false);
      onNext(); // Navigate to profile dashboard
    }, 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 text-center"
    >
      <div className="space-y-4">
        <motion.div
          animate={{ 
            rotate: [0, 10, -10, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            repeatType: "reverse"
          }}
          className="w-20 h-20 bg-gradient-to-br from-primary to-primary/70 rounded-full flex items-center justify-center mx-auto"
        >
          <Sparkles className="w-10 h-10 text-primary-foreground" />
        </motion.div>
        
        <h1 className="text-4xl font-bold text-foreground">
          Ready to shine? ✨
        </h1>
        <p className="text-muted-foreground text-lg">
          We're about to create your amazing profile!
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        className="bg-card border rounded-2xl p-6 space-y-4"
      >
        <h3 className="font-semibold text-foreground">Your profile will include:</h3>
        <div className="grid grid-cols-2 gap-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            Personal info
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            About me story
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            Photo gallery
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            Music taste
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            Fun stats
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            Skills & interests
          </div>
        </div>
      </motion.div>

      {isGenerating ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-4"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto"
          />
          <p className="text-muted-foreground">
            Creating your lovable profile...
          </p>
        </motion.div>
      ) : (
        <div className="flex gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={onPrev}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Back
          </Button>
          
          <motion.div
            className="flex-1"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              onClick={handleGenerateProfile}
              className="w-full h-12 text-base font-medium flex items-center gap-2"
            >
              Generate My Profile
              <ArrowRight className="w-4 h-4" />
            </Button>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};