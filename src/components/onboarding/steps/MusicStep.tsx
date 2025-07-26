import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { OnboardingData } from '../OnboardingFlow';
import { ChevronLeft, Music, Mic } from 'lucide-react';

interface MusicStepProps {
  data: OnboardingData;
  updateData: (data: Partial<OnboardingData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

export const MusicStep = ({ data, updateData, onNext, onPrev }: MusicStepProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (data.favSong.trim() && data.favArtist.trim()) {
      onNext();
    }
  };

  const isValid = data.favSong.trim() && data.favArtist.trim();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2 mb-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 bg-primary rounded-full flex items-center justify-center"
          >
            <Music className="w-6 h-6 text-primary-foreground" />
          </motion.div>
        </div>
        <h1 className="text-3xl font-bold text-foreground">
          What's your vibe? 🎵
        </h1>
        <p className="text-muted-foreground">
          Share your current favorite song and artist
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="favSong" className="text-sm font-medium flex items-center gap-2">
            <Music className="w-4 h-4 text-primary" />
            Current favorite song
          </Label>
          <Input
            id="favSong"
            type="text"
            placeholder="e.g., Blinding Lights"
            value={data.favSong}
            onChange={(e) => updateData({ favSong: e.target.value })}
            className="h-12 text-base"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="favArtist" className="text-sm font-medium flex items-center gap-2">
            <Mic className="w-4 h-4 text-primary" />
            Favorite artist
          </Label>
          <Input
            id="favArtist"
            type="text"
            placeholder="e.g., The Weeknd"
            value={data.favArtist}
            onChange={(e) => updateData({ favArtist: e.target.value })}
            className="h-12 text-base"
          />
        </div>

        {(data.favSong || data.favArtist) && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-primary/5 rounded-lg border border-primary/20"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                <Music className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground">
                  {data.favSong || 'Your favorite song'}
                </p>
                <p className="text-sm text-muted-foreground">
                  by {data.favArtist || 'Your favorite artist'}
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
              Continue
            </Button>
          </motion.div>
        </div>
      </form>
    </motion.div>
  );
};