import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { OnboardingData } from '../OnboardingFlow';
import { ChevronLeft, Plus, X, Code, Lightbulb } from 'lucide-react';

interface SkillsStepProps {
  data: OnboardingData;
  updateData: (data: Partial<OnboardingData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

export const SkillsStep = ({ data, updateData, onNext, onPrev }: SkillsStepProps) => {
  const [newSkill, setNewSkill] = useState('');

  const addSkill = () => {
    if (newSkill.trim() && !data.skills.includes(newSkill.trim())) {
      updateData({ skills: [...data.skills, newSkill.trim()] });
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    updateData({ skills: data.skills.filter(skill => skill !== skillToRemove) });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (data.skills.length > 0 && data.story.trim()) {
      onNext();
    }
  };

  const isValid = data.skills.length > 0 && data.story.trim().length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-foreground">
          What are you good at? 💡
        </h1>
        <p className="text-muted-foreground">
          Share your skills and tell us more about yourself
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-3">
          <Label className="text-sm font-medium flex items-center gap-2">
            <Code className="w-4 h-4 text-primary" />
            Your skills
          </Label>
          
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="e.g., JavaScript, Photography, Cooking"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1"
            />
            <Button
              type="button"
              onClick={addSkill}
              disabled={!newSkill.trim()}
              size="icon"
              variant="outline"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>

          {data.skills.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-wrap gap-2"
            >
              {data.skills.map((skill, index) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Badge
                    variant="secondary"
                    className="flex items-center gap-1 px-3 py-1"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => removeSkill(skill)}
                      className="ml-1 hover:text-destructive"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="story" className="text-sm font-medium flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-primary" />
            Tell us something interesting (max 50 words)
          </Label>
          <Textarea
            id="story"
            placeholder="Share a fun fact, hobby, or anything that makes you unique..."
            value={data.story}
            onChange={(e) => updateData({ story: e.target.value })}
            className="min-h-[100px] resize-none"
            maxLength={250}
          />
          <div className="text-right text-xs text-muted-foreground">
            {data.story.split(' ').filter(word => word.length > 0).length}/50 words
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