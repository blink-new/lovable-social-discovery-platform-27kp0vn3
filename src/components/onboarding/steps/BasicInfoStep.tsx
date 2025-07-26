import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { OnboardingData } from '../OnboardingFlow';

interface BasicInfoStepProps {
  data: OnboardingData;
  updateData: (data: Partial<OnboardingData>) => void;
  onNext: () => void;
}

export const BasicInfoStep = ({ data, updateData, onNext }: BasicInfoStepProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (data.name && data.age && data.gender) {
      onNext();
    }
  };

  const isValid = data.name && data.age && data.gender;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-foreground">
          Let's get to know you! 👋
        </h1>
        <p className="text-muted-foreground">
          Tell us a bit about yourself to get started
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-sm font-medium">
            What's your name?
          </Label>
          <Input
            id="name"
            type="text"
            placeholder="Enter your name"
            value={data.name}
            onChange={(e) => updateData({ name: e.target.value })}
            className="h-12 text-base"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="age" className="text-sm font-medium">
            How old are you?
          </Label>
          <Input
            id="age"
            type="number"
            placeholder="Enter your age"
            value={data.age}
            onChange={(e) => updateData({ age: e.target.value })}
            className="h-12 text-base"
            min="18"
            max="100"
          />
        </div>

        <div className="space-y-3">
          <Label className="text-sm font-medium">Gender</Label>
          <div className="flex gap-3">
            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => updateData({ gender: 'men' })}
              className={`flex-1 h-12 rounded-lg border-2 transition-all duration-200 ${
                data.gender === 'men'
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border bg-card hover:border-primary/50'
              }`}
            >
              <span className="font-medium">Men</span>
            </motion.button>
            
            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => updateData({ gender: 'women' })}
              className={`flex-1 h-12 rounded-lg border-2 transition-all duration-200 ${
                data.gender === 'women'
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border bg-card hover:border-primary/50'
              }`}
            >
              <span className="font-medium">Women</span>
            </motion.button>
          </div>
        </div>

        <motion.div
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
      </form>
    </motion.div>
  );
};