import React from 'react';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, ArrowRight, Music, Code, Target, Star } from 'lucide-react';

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

interface ProfileDashboardProps {
  profileData: ProfileData;
  onNextProfile: () => void;
  onConnect: () => void;
  onConnectWithNote: () => void;
}

const ProfileDashboard: React.FC<ProfileDashboardProps> = ({
  profileData,
  onNextProfile,
  onConnect,
  onConnectWithNote
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const slideFromRight = {
    hidden: { opacity: 0, x: 100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const bounceVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        type: "spring",
        bounce: 0.4
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <motion.div
        className="max-w-md mx-auto px-4 py-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Main Profile Image with Name, Age, Gender */}
        <motion.div
          className="relative mb-6 rounded-3xl overflow-hidden shadow-2xl"
          variants={cardVariants}
        >
          <div className="aspect-[4/5] bg-gradient-to-br from-primary/20 to-accent/20">
            {profileData.profileImage ? (
              <img
                src={profileData.profileImage}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-32 h-32 bg-primary/20 rounded-full flex items-center justify-center">
                  <span className="text-4xl">👤</span>
                </div>
              </div>
            )}
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
            <h1 className="text-white text-3xl font-bold mb-1">{profileData.name}</h1>
            <p className="text-white/90 text-lg">{profileData.age} • {profileData.gender}</p>
          </div>
        </motion.div>

        {/* About Me Flashcard */}
        <motion.div
          className="mb-6 p-6 rounded-2xl bg-accent/90 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-accent"
          variants={cardVariants}
        >
          <h3 className="text-white font-semibold mb-3 text-lg">About Me</h3>
          <p className="text-white/90 leading-relaxed">{profileData.aboutMe}</p>
        </motion.div>

        {/* Image 2 */}
        {profileData.image2 && (
          <motion.div
            className="mb-6 rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300"
            variants={cardVariants}
          >
            <img
              src={profileData.image2}
              alt="Profile 2"
              className="w-full aspect-[4/3] object-cover"
            />
          </motion.div>
        )}

        {/* Music Flashcard */}
        <motion.div
          className="mb-6 p-6 rounded-2xl bg-primary/10 border border-primary/20 shadow-lg"
          variants={slideFromRight}
        >
          <div className="flex items-center gap-4 mb-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="w-12 h-12 bg-primary rounded-full flex items-center justify-center"
            >
              <Music className="w-6 h-6 text-white" />
            </motion.div>
            <div className="flex-1">
              <h3 className="font-semibold text-accent mb-1">Currently Vibing To</h3>
              <p className="text-accent/80 font-medium">{profileData.favSong}</p>
              <p className="text-accent/60 text-sm">by {profileData.favArtist}</p>
            </div>
            <div className="text-2xl">🎤</div>
          </div>
        </motion.div>

        {/* Image 3 */}
        {profileData.image3 && (
          <motion.div
            className="mb-6 rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300"
            variants={cardVariants}
          >
            <img
              src={profileData.image3}
              alt="Profile 3"
              className="w-full aspect-[4/3] object-cover"
            />
          </motion.div>
        )}

        {/* Number Stats Flashcard */}
        <motion.div
          className="mb-6 p-6 rounded-2xl bg-accent/90 backdrop-blur-sm shadow-lg"
          variants={bounceVariants}
        >
          <h3 className="text-white font-semibold mb-4 text-lg">Fun Facts</h3>
          <div className="grid grid-cols-1 gap-4">
            {profileData.numberStats.map((stat, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-4 p-3 bg-white/10 rounded-xl"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                  {index === 0 && <Star className="w-5 h-5 text-white" />}
                  {index === 1 && <Target className="w-5 h-5 text-white" />}
                  {index === 2 && <Heart className="w-5 h-5 text-white" />}
                </div>
                <div className="flex-1">
                  <span className="text-white text-2xl font-bold">{stat.number}</span>
                  <p className="text-white/80 text-sm">{stat.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Image 4 */}
        {profileData.image4 && (
          <motion.div
            className="mb-6 rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300"
            variants={cardVariants}
          >
            <img
              src={profileData.image4}
              alt="Profile 4"
              className="w-full aspect-[4/3] object-cover"
            />
          </motion.div>
        )}

        {/* Skills & Story Flashcard */}
        <motion.div
          className="mb-6 p-6 rounded-2xl bg-primary/10 border border-primary/20 shadow-lg"
          variants={cardVariants}
          whileHover={{ y: -5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <h3 className="font-semibold text-accent mb-3 flex items-center gap-2">
                <Code className="w-5 h-5" />
                Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {profileData.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-primary text-white text-sm rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-accent mb-3">My Story</h3>
              <p className="text-accent/80 text-sm leading-relaxed">{profileData.story}</p>
            </div>
          </div>
        </motion.div>

        {/* Meeting Preferences Flashcard */}
        <motion.div
          className="mb-8 p-6 rounded-2xl bg-accent/90 backdrop-blur-sm shadow-lg"
          variants={cardVariants}
        >
          <h3 className="text-white font-semibold mb-3 text-lg">Looking For</h3>
          <motion.p
            className="text-white/90 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            I like to meet someone who {profileData.meetingPreferences}
          </motion.p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          className="flex flex-col gap-4"
          variants={cardVariants}
        >
          <motion.button
            onClick={onConnect}
            className="w-full py-4 bg-primary text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center justify-center gap-2">
              <Heart className="w-5 h-5" />
              Connect
            </div>
          </motion.button>

          <motion.button
            onClick={onConnectWithNote}
            className="w-full py-4 bg-accent text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center justify-center gap-2">
              <MessageCircle className="w-5 h-5" />
              Connect with a Note
            </div>
          </motion.button>

          <motion.button
            onClick={onNextProfile}
            className="w-full py-4 border-2 border-primary text-primary font-semibold rounded-2xl hover:bg-primary hover:text-white transition-all duration-300"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center justify-center gap-2">
              <ArrowRight className="w-5 h-5" />
              Next Profile
            </div>
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ProfileDashboard;