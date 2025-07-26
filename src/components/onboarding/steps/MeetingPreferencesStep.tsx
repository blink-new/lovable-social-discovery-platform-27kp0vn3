import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { OnboardingData } from '../OnboardingFlow';
import { ChevronLeft, Heart } from 'lucide-react';

interface MeetingPreferencesStepProps {
  data: OnboardingData;
  updateData: (data: Partial<OnboardingData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

export const MeetingPreferencesStep = ({ 
  data, 
  updateData, 
  onNext, 
  onPrev 
}: MeetingPreferencesStepProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (data.meetingPreference.trim()) {
      onNext();
    }
  };

  const isValid = data.meetingPreference.trim().length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center mb-4">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-12 h-12 bg-primary rounded-full flex items-center justify-center"
          >
            <Heart className="w-6 h-6 text-primary-foreground" />
          </motion.div>
        </div>
        <h1 className="text-3xl font-bold text-foreground">
          Who would you love to meet? 💕
        </h1>
        <p className="text-muted-foreground">
          Describe your ideal connection
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="meetingPreference" className="text-sm font-medium">
            I like to meet someone who...
          </Label>
          <Textarea
            id="meetingPreference"
            placeholder="shares my love for adventure, has a great sense of humor, enjoys deep conversations..."
            value={data.meetingPreference}
            onChange={(e) => updateData({ meetingPreference: e.target.value })}
            className="min-h-[120px] resize-none"
            maxLength={300}
          />
          <div className="text-right text-xs text-muted-foreground">
            {data.meetingPreference.length}/300
          </div>
        </div>

        {data.meetingPreference.trim() && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-primary/5 rounded-lg border border-primary/20"
          >
            <div className="flex items-start gap-3">
              <Heart className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-foreground mb-1">
                  Looking for someone who...
                </p>
                <p className="text-sm text-muted-foreground">
                  {data.meetingPreference}
                </p>
              </div>
            </div>
          </motion.div>
        )}

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
              Almost done!
            </Button>
          </motion.div>
        </div>
      </form>
    </motion.div>
  );
};