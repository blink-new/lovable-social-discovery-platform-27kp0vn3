import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { OnboardingData } from '../OnboardingFlow';
import { ChevronLeft, Upload, X } from 'lucide-react';

interface ImageUploadStepProps {
  data: OnboardingData;
  updateData: (data: Partial<OnboardingData>) => void;
  onNext: () => void;
  onPrev: () => void;
  imageKey: keyof OnboardingData;
  title: string;
}

export const ImageUploadStep = ({ 
  data, 
  updateData, 
  onNext, 
  onPrev, 
  imageKey, 
  title 
}: ImageUploadStepProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const currentImage = data[imageKey] as File | null;

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      updateData({ [imageKey]: file });
    }
  };

  const handleRemoveImage = () => {
    updateData({ [imageKey]: null });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext(); // Allow skipping image uploads
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-foreground">
          {title} 📷
        </h1>
        <p className="text-muted-foreground">
          Show us more of your personality
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          {currentImage ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative"
            >
              <div className="w-full aspect-square rounded-2xl overflow-hidden bg-muted">
                <img
                  src={URL.createObjectURL(currentImage)}
                  alt="Upload preview"
                  className="w-full h-full object-cover"
                />
              </div>
              <motion.button
                type="button"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleRemoveImage}
                className="absolute top-3 right-3 w-8 h-8 bg-secondary/80 backdrop-blur-sm rounded-full flex items-center justify-center text-secondary-foreground hover:bg-secondary"
              >
                <X className="w-4 h-4" />
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => fileInputRef.current?.click()}
              className="w-full aspect-square rounded-2xl border-2 border-dashed border-border bg-muted/30 flex flex-col items-center justify-center cursor-pointer hover:border-primary/50 transition-colors"
            >
              <Upload className="w-12 h-12 text-muted-foreground mb-4" />
              <p className="text-sm font-medium text-foreground mb-1">
                Click to upload photo
              </p>
              <p className="text-xs text-muted-foreground">
                JPG, PNG up to 10MB (optional)
              </p>
            </motion.div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
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
          
          <Button
            type="submit"
            className="flex-1 h-12 text-base font-medium"
          >
            {currentImage ? 'Continue' : 'Skip for now'}
          </Button>
        </div>
      </form>
    </motion.div>
  );
};