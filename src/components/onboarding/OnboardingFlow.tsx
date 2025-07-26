import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProgressIndicator } from './ProgressIndicator';
import { BasicInfoStep } from './steps/BasicInfoStep';
import { AboutMeStep } from './steps/AboutMeStep';
import { ProfileImageStep } from './steps/ProfileImageStep';
import { MusicStep } from './steps/MusicStep';
import { ImageUploadStep } from './steps/ImageUploadStep';
import { NumberStatsStep } from './steps/NumberStatsStep';
import { SkillsStep } from './steps/SkillsStep';
import { MeetingPreferencesStep } from './steps/MeetingPreferencesStep';
import { ReadyStep } from './steps/ReadyStep';

export interface OnboardingData {
  name: string;
  age: string;
  gender: 'men' | 'women' | '';
  aboutMe: string;
  profileImage: File | null;
  favSong: string;
  favArtist: string;
  image2: File | null;
  numberStats: Array<{ number: string; description: string }>;
  image3: File | null;
  skills: string[];
  story: string;
  image4: File | null;
  meetingPreference: string;
}

const TOTAL_STEPS = 10;

interface OnboardingFlowProps {
  onComplete: (data: OnboardingData) => void;
}

export const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [data, setData] = useState<OnboardingData>({
    name: '',
    age: '',
    gender: '',
    aboutMe: '',
    profileImage: null,
    favSong: '',
    favArtist: '',
    image2: null,
    numberStats: [
      { number: '', description: '' },
      { number: '', description: '' },
      { number: '', description: '' }
    ],
    image3: null,
    skills: [],
    story: '',
    image4: null,
    meetingPreference: ''
  });

  const updateData = (newData: Partial<OnboardingData>) => {
    setData(prev => ({ ...prev, ...newData }));
  };

  const nextStep = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Convert File objects to URLs for the profile dashboard
      const processedData = {
        ...data,
        profileImage: data.profileImage ? URL.createObjectURL(data.profileImage) : '',
        image2: data.image2 ? URL.createObjectURL(data.image2) : '',
        image3: data.image3 ? URL.createObjectURL(data.image3) : '',
        image4: data.image4 ? URL.createObjectURL(data.image4) : '',
        meetingPreferences: data.meetingPreference
      };
      onComplete(processedData);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <BasicInfoStep data={data} updateData={updateData} onNext={nextStep} />;
      case 2:
        return <AboutMeStep data={data} updateData={updateData} onNext={nextStep} onPrev={prevStep} />;
      case 3:
        return <ProfileImageStep data={data} updateData={updateData} onNext={nextStep} onPrev={prevStep} />;
      case 4:
        return <MusicStep data={data} updateData={updateData} onNext={nextStep} onPrev={prevStep} />;
      case 5:
        return <ImageUploadStep data={data} updateData={updateData} onNext={nextStep} onPrev={prevStep} imageKey="image2" title="Add Another Photo" />;
      case 6:
        return <NumberStatsStep data={data} updateData={updateData} onNext={nextStep} onPrev={prevStep} />;
      case 7:
        return <ImageUploadStep data={data} updateData={updateData} onNext={nextStep} onPrev={prevStep} imageKey="image3" title="One More Photo" />;
      case 8:
        return <SkillsStep data={data} updateData={updateData} onNext={nextStep} onPrev={prevStep} />;
      case 9:
        return <ImageUploadStep data={data} updateData={updateData} onNext={nextStep} onPrev={prevStep} imageKey="image4" title="Final Photo" />;
      case 10:
        return <MeetingPreferencesStep data={data} updateData={updateData} onNext={nextStep} onPrev={prevStep} />;
      default:
        return <ReadyStep data={data} onPrev={prevStep} onNext={nextStep} />;
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <ProgressIndicator currentStep={currentStep} totalSteps={TOTAL_STEPS} />
      
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};