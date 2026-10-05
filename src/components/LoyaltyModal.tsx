import React, { useState } from 'react';
import { X, Award, Check, Sparkles, Coffee, Gift } from 'lucide-react';

interface LoyaltyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LoyaltyModal: React.FC<LoyaltyModalProps> = ({ isOpen, onClose }) => {
  const [stamps, setStamps] = useState<number>(7);
  const [rewardClaimed, setRewardClaimed] = useState(false);

  if (!isOpen) return null;

  const totalSlots = 10;
  const isComplete = stamps >= totalSlots;

  const handleAddStamp = () => {
    if (stamps < totalSlots) {
      setStamps((prev) => prev + 1);
    }
  };

  const handleClaimReward = () => {
    setRewardClaimed(true);
  };

  const handleResetCard = () => {
    setStamps(0);
    setRewardClaimed(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div 
        className="relative w-full max-w-lg bg-stone-900 text-stone-100 rounded-xl shadow-2xl border border-stone-800 overflow-hidden flex flex-col"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="p-6 bg-stone-950 border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            <div>
              <span className="text-[11px] uppercase tracking-widest text-amber-400 font-semibold block">
                The Roaster’s Guild
              </span>
              <h3 className="font-serif text-xl font-medium text-white">
                Digital Atelier Stamp Pass
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close pass"
            className="p-1.5 text-stone-400 hover:text-white rounded-md transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Card Body */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Member Card Graphic */}
          <div className="bg-gradient-to-br from-stone-800 to-stone-900 border border-stone-700/80 rounded-xl p-6 shadow-inner relative overflow-hidden">
            <div className="flex justify-between items-start mb-6">
              <div>
                <p className="font-serif text-lg text-amber-200">Kōhī Atelier & Roastery</p>
                <p className="text-[11px] text-stone-400 font-mono">Member ID: #GUILD-4809</p>
              </div>
              <span className="text-xs bg-amber-950/80 text-amber-300 border border-amber-700/50 px-2 py-0.5 rounded font-mono">
                {stamps} / 10 Stamps
              </span>
            </div>

            {/* Stamp Slots Grid (2 rows of 5) */}
            <div className="grid grid-cols-5 gap-3 my-4">
              {Array.from({ length: totalSlots }).map((_, index) => {
                const isStamped = index < stamps;
                const isRewardSlot = index === 9;

                return (
                  <div
                    key={index}
                    className={`aspect-square rounded-full flex items-center justify-center border transition-all ${
                      isStamped
                        ? 'bg-amber-700/80 border-amber-500 text-white shadow-sm'
                        : isRewardSlot
                        ? 'border-dashed border-amber-400/60 bg-amber-950/30 text-amber-300'
                        : 'border-dashed border-stone-700 bg-stone-900/60 text-stone-600'
                    }`}
                  >
                    {isStamped ? (
                      <Coffee className="w-4 h-4 fill-white/80" />
                    ) : isRewardSlot ? (
                      <Gift className="w-4 h-4" />
                    ) : (
                      <span className="font-mono text-xs text-stone-600">{index + 1}</span>
                    )}
                  </div>
                );
              })}
            </div>

            <p className="text-[11px] text-stone-400 text-center mt-4">
              Collect 1 stamp per in-person visit or mobile order. 10th stamp grants a free single-origin beverage or bag.
            </p>
          </div>

          {/* Unlocked Reward State */}
          {isComplete && !rewardClaimed && (
            <div className="p-4 bg-emerald-950/60 border border-emerald-600/60 rounded-lg text-center space-y-2">
              <div className="flex items-center justify-center gap-1.5 text-emerald-300 text-xs font-semibold">
                <Sparkles className="w-4 h-4" />
                <span>Guild Reward Ready to Redeem!</span>
              </div>
              <p className="text-xs text-stone-300">
                You’ve earned a complimentary drink or fresh 250g bean bag of your choice.
              </p>
              <button
                type="button"
                onClick={handleClaimReward}
                className="mt-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded transition-colors cursor-pointer"
              >
                Claim Free Reward
              </button>
            </div>
          )}

          {rewardClaimed && (
            <div className="p-4 bg-stone-800 border border-stone-700 rounded-lg text-center space-y-2">
              <div className="flex items-center justify-center gap-1 text-amber-300 text-xs font-semibold">
                <Check className="w-4 h-4" />
                <span>Voucher Active: VOUCHER-GUILD-FREE</span>
              </div>
              <p className="text-xs text-stone-400 font-mono">
                Present to Barista on duty or apply at checkout.
              </p>
              <button
                type="button"
                onClick={handleResetCard}
                className="text-[11px] text-stone-500 hover:text-stone-300 underline cursor-pointer mt-1"
              >
                Start New Stamp Card
              </button>
            </div>
          )}

          {/* Interactive Simulation Controls */}
          {!isComplete && (
            <div className="pt-2 flex items-center justify-between">
              <span className="text-xs text-stone-400">
                {10 - stamps} stamp{10 - stamps > 1 ? 's' : ''} left until reward
              </span>

              <button
                type="button"
                onClick={handleAddStamp}
                className="px-4 py-2 bg-amber-800 hover:bg-amber-700 text-white text-xs font-medium rounded transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <Coffee className="w-3.5 h-3.5" />
                <span>Simulate Stamp on Visit</span>
              </button>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 bg-stone-950 border-t border-stone-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-stone-300 hover:text-white bg-stone-800 hover:bg-stone-700 rounded transition-colors cursor-pointer"
          >
            Close Pass
          </button>
        </div>

      </div>
    </div>
  );
};
