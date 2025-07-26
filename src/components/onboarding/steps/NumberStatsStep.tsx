import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { OnboardingData } from '../OnboardingFlow';
import { ChevronLeft, TrendingUp, Target, Zap } from 'lucide-react';

const STAT_ICONS = [TrendingUp, Target, Zap];

interface NumberStatsStepProps {
  data: OnboardingData;
  updateData: (data: Partial<OnboardingData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

export const NumberStatsStep = ({ data, updateData, onNext, onPrev }: NumberStatsStepProps) => {
  const handleStatChange = (index: number, field: 'number' | 'description', value: string) => {
    const newStats = [...data.numberStats];
    newStats[index] = { ...newStats[index], [field]: value };
    updateData({ numberStats: newStats });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const hasValidStats = data.numberStats.some(stat => 
      stat.number.trim() && stat.description.trim()
    );
    if (hasValidStats) {
      onNext();
    }
  };

  const hasValidStats = data.numberStats.some(stat => 
    stat.number.trim() && stat.description.trim()
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-foreground">
          Fun facts about you 📊
        </h1>
        <p className="text-muted-foreground">
          Share 3 quirky numbers that define you
        </p>
        <p className="text-xs text-muted-foreground">
          e.g., 150 - kg lifted, 3 - countries visited, 0 - unread messages
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          {data.numberStats.map((stat, index) => {
            const IconComponent = STAT_ICONS[index];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="space-y-3"
              >
                <Label className="text-sm font-medium flex items-center gap-2">
                  <IconComponent className="w-4 h-4 text-primary" />
                  Stat #{index + 1}
                </Label>
                <div className="flex gap-3">
                  <div className="w-20">
                    <Input
                      type="text"
                      placeholder="150"
                      value={stat.number}
                      onChange={(e) => handleStatChange(index, 'number', e.target.value)}
                      className="h-12 text-center text-lg font-bold"
                    />
                  </div>
                  <div className="flex-1">
                    <Input
                      type="text"
                      placeholder="kg lifted"
                      value={stat.description}
                      onChange={(e) => handleStatChange(index, 'description', e.target.value)}
                      className="h-12"
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {hasValidStats && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-3 gap-3"
          >
            {data.numberStats.map((stat, index) => {
              if (!stat.number.trim() || !stat.description.trim()) return null;
              const IconComponent = STAT_ICONS[index];
              return (
                <motion.div
                  key={index}
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-3 bg-primary/5 rounded-lg border border-primary/20 text-center"
                >
                  <IconComponent className="w-5 h-5 text-primary mx-auto mb-1" />
                  <div className="text-lg font-bold text-foreground">
                    {stat.number}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {stat.description}
                  </div>
                </motion.div>
              );
            })}
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
            animate={{ opacity: hasValidStats ? 1 : 0.5 }}
            transition={{ duration: 0.2 }}
          >
            <Button
              type="submit"
              disabled={!hasValidStats}
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