import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { OnboardingData } from '../OnboardingFlow';
import { ChevronLeft } from 'lucide-react';

const ABOUT_ME_PROMPTS = [
  "I'm passionate about...",
  "My perfect weekend involves...",
  "I can't live without...",
  "My friends would describe me as...",
  "I'm currently obsessed with...",
  "My biggest adventure was...",
  "I'm learning how to...",
  "My guilty pleasure is...",
  "I'm most proud of...",
  "My dream vacation would be...",
  "I collect...",
  "My favorite way to unwind is...",
  "I'm secretly really good at...",
  "My life motto is...",
  "I'm always up for...",
  "My biggest fear is...",
  "I wish I could...",
  "My favorite childhood memory is...",
  "I'm working towards...",
  "My superpower would be..."
];

interface AboutMeStepProps {
  data: OnboardingData;
  updateData: (data: Partial<OnboardingData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

export const AboutMeStep = ({ data, updateData, onNext, onPrev }: AboutMeStepProps) => {
  const [selectedPrompt, setSelectedPrompt] = useState('');

  const handlePromptSelect = (prompt: string) => {
    setSelectedPrompt(prompt);
    updateData({ aboutMe: prompt });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (data.aboutMe.trim()) {
      onNext();
    }
  };

  const isValid = data.aboutMe.trim().length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-foreground">
          Tell us about yourself ✨
        </h1>
        <p className="text-muted-foreground">
          Pick a prompt or write your own
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-3">
          <Label className="text-sm font-medium">Choose a prompt to get started:</Label>
          <div className="grid grid-cols-1 gap-2 max-h-40 overflow-y-auto">
            {ABOUT_ME_PROMPTS.slice(0, 8).map((prompt, index) => (
              <motion.button
                key={index}
                type="button"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => handlePromptSelect(prompt)}
                className={`p-3 text-left rounded-lg border transition-all duration-200 ${
                  selectedPrompt === prompt
                    ? 'border-primary bg-primary/5 text-primary'
                    : 'border-border bg-card hover:border-primary/50'
                }`}
              >
                <span className="text-sm">{prompt}</span>
              </motion.button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="aboutMe" className="text-sm font-medium">
            Or write your own:
          </Label>
          <Textarea
            id="aboutMe"
            placeholder="Tell us something interesting about yourself..."
            value={data.aboutMe}
            onChange={(e) => updateData({ aboutMe: e.target.value })}
            className="min-h-[100px] resize-none"
            maxLength={200}
          />
          <div className="text-right text-xs text-muted-foreground">
            {data.aboutMe.length}/200
          </div>
        </div>

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
            initial={{ opacity: 0 }}
            animate={{ opacity: isValid ? 1 : 0.5 }}
            transition={{ duration: 0.2 }}
          >
            <Button
              type="submit"
              disabled={!isValid}
              className="w-full h-12 text-base font-medium"
            >
              Continue
            </Button>
          </motion.div>
        </div>
      </form>
    </motion.div>
  );
};