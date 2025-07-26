import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Heart } from 'lucide-react';

interface ConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSend: (note: string) => void;
  recipientName: string;
}

const ConnectModal: React.FC<ConnectModalProps> = ({
  isOpen,
  onClose,
  onSend,
  recipientName
}) => {
  const [note, setNote] = useState('');
  const [isSending, setIsSending] = useState(false);

  const handleSend = async () => {
    if (!note.trim()) return;
    
    setIsSending(true);
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate sending
    onSend(note);
    setNote('');
    setIsSending(false);
    onClose();
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const modalVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      y: 50
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 50,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={onClose}
        >
          <motion.div
            className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl"
            variants={modalVariants}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-accent">Send a Note</h2>
                  <p className="text-accent/60 text-sm">to {recipientName}</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <X className="w-4 h-4 text-gray-600" />
              </button>
            </div>

            {/* Note Input */}
            <div className="mb-6">
              <label className="block text-accent font-medium mb-3">
                Your message
              </label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Hey! I'd love to connect with you..."
                className="w-full h-32 p-4 border-2 border-gray-200 rounded-2xl resize-none focus:border-primary focus:outline-none transition-colors"
                maxLength={200}
              />
              <div className="flex justify-between items-center mt-2">
                <p className="text-gray-500 text-sm">
                  {note.length}/200 characters
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setNote("Hey! I'd love to connect with you 😊")}
                    className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full hover:bg-gray-200 transition-colors"
                  >
                    Friendly
                  </button>
                  <button
                    onClick={() => setNote("I think we'd get along great! Want to chat?")}
                    className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full hover:bg-gray-200 transition-colors"
                  >
                    Casual
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 py-3 border-2 border-gray-200 text-gray-700 font-medium rounded-2xl hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <motion.button
                onClick={handleSend}
                disabled={!note.trim() || isSending}
                className="flex-1 py-3 bg-primary text-white font-medium rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition-colors"
                whileHover={!isSending ? { scale: 1.02 } : {}}
                whileTap={!isSending ? { scale: 0.98 } : {}}
              >
                <div className="flex items-center justify-center gap-2">
                  {isSending ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                    />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                  {isSending ? 'Sending...' : 'Send Note'}
                </div>
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ConnectModal;