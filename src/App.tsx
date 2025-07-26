import React, { useState } from 'react';
import { OnboardingFlow } from './components/onboarding/OnboardingFlow';
import ProfileDashboard from './components/profile/ProfileDashboard';
import ConnectModal from './components/profile/ConnectModal';

interface ProfileData {
  name: string;
  age: string;
  gender: string;
  aboutMe: string;
  profileImage: string;
  favSong: string;
  favArtist: string;
  image2: string;
  numberStats: Array<{ number: string; description: string }>;
  image3: string;
  skills: string[];
  story: string;
  image4: string;
  meetingPreferences: string;
}

function App() {
  const [currentView, setCurrentView] = useState<'onboarding' | 'profile'>('onboarding');
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [isConnectModalOpen, setIsConnectModalOpen] = useState(false);

  const handleOnboardingComplete = (data: any) => {
    // Transform onboarding data to profile data format
    const transformedData: ProfileData = {
      name: data.name || 'Anonymous',
      age: data.age || '25',
      gender: data.gender || 'Other',
      aboutMe: data.aboutMe || 'No description provided',
      profileImage: data.profileImage || '',
      favSong: data.favSong || 'Unknown Song',
      favArtist: data.favArtist || 'Unknown Artist',
      image2: data.image2 || '',
      numberStats: data.numberStats || [
        { number: '0', description: 'No stats provided' },
        { number: '0', description: 'No stats provided' },
        { number: '0', description: 'No stats provided' }
      ],
      image3: data.image3 || '',
      skills: data.skills || [],
      story: data.story || 'No story provided',
      image4: data.image4 || '',
      meetingPreferences: data.meetingPreferences || 'is kind and interesting'
    };
    
    setProfileData(transformedData);
    setCurrentView('profile');
  };

  const handleNextProfile = () => {
    // In a real app, this would load the next profile
    console.log('Loading next profile...');
    // For demo, we'll just reset to onboarding
    setCurrentView('onboarding');
    setProfileData(null);
  };

  const handleConnect = () => {
    console.log('Connected!');
    // In a real app, this would send a connection request
    alert('Connection sent! 💕');
  };

  const handleConnectWithNote = () => {
    setIsConnectModalOpen(true);
  };

  const handleSendNote = (note: string) => {
    console.log('Note sent:', note);
    // In a real app, this would send the note
    alert(`Note sent: "${note}" 💌`);
  };

  return (
    <div className="min-h-screen bg-background">
      {currentView === 'onboarding' && (
        <OnboardingFlow onComplete={handleOnboardingComplete} />
      )}
      
      {currentView === 'profile' && profileData && (
        <ProfileDashboard
          profileData={profileData}
          onNextProfile={handleNextProfile}
          onConnect={handleConnect}
          onConnectWithNote={handleConnectWithNote}
        />
      )}

      <ConnectModal
        isOpen={isConnectModalOpen}
        onClose={() => setIsConnectModalOpen(false)}
        onSend={handleSendNote}
        recipientName={profileData?.name || 'User'}
      />
    </div>
  );
}

export default App;