import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Droplets, Flame, Scale, Timer as TimerIcon } from 'lucide-react';
import { BREW_GUIDES } from '../data/coffeeData';

export const BrewGuideSection: React.FC = () => {
  const [selectedGuideId, setSelectedGuideId] = useState('v60');
  const [coffeeDose, setCoffeeDose] = useState<number>(18);
  
  // Timer state
  const [isRunning, setIsRunning] = useState(false);
  const [seconds, setSeconds] = useState(0);

  const guide = BREW_GUIDES.find((g) => g.id === selectedGuideId) || BREW_GUIDES[0];
  const calculatedWater = Math.round(coffeeDose * guide.ratio);

  // Timer interval
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRunning) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning]);

  const handleResetTimer = () => {
    setIsRunning(false);
    setSeconds(0);
  };

  // Determine current active step in guide
  let accumulatedTime = 0;
  let currentStepIndex = 0;
  for (let i = 0; i < guide.steps.length; i++) {
    accumulatedTime += guide.steps[i].timeSeconds;
    if (seconds < accumulatedTime) {
      currentStepIndex = i;
      break;
    }
    if (i === guide.steps.length - 1) {
      currentStepIndex = guide.steps.length - 1;
    }
  }

  const activeStep = guide.steps[currentStepIndex];
  const currentTargetWater = activeStep.targetWater(coffeeDose);

  const formatTimer = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <section id="brew-lab" className="py-20 bg-stone-900 text-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="text-xs uppercase tracking-widest text-amber-400 font-semibold mb-2">
            The Atelier Brew Lab
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-white font-normal tracking-tight">
            Precision Ratio Calculator & Brew Timer
          </h2>
          <p className="text-stone-400 text-sm mt-3 leading-relaxed">
            Specialty coffee is an exact science of mass, thermal transfer, and surface contact. 
            Dial in your morning brew to professional barista standards.
          </p>
        </div>

        {/* Method Picker Tabs */}
        <div className="flex justify-center gap-2 mb-10 overflow-x-auto pb-2 scrollbar-none">
          {BREW_GUIDES.map((b) => (
            <button
              key={b.id}
              onClick={() => {
                setSelectedGuideId(b.id);
                handleResetTimer();
              }}
              className={`px-4 py-2.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                selectedGuideId === b.id
                  ? 'bg-amber-800 text-white shadow-sm ring-1 ring-amber-600'
                  : 'bg-stone-800/80 text-stone-300 hover:bg-stone-800 hover:text-white'
              }`}
            >
              {b.method}
            </button>
          ))}
        </div>

        {/* Two-Column Grid: Left is Calculator & Parameters, Right is Interactive Live Timer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Calculator Controls (7 cols) */}
          <div className="lg:col-span-7 bg-stone-800/50 border border-stone-700/70 rounded-xl p-6 sm:p-8 backdrop-blur-xs">
            <h3 className="font-serif text-xl text-stone-100 font-medium mb-1">
              {guide.method} Recipe Formula
            </h3>
            <p className="text-xs text-stone-400 mb-6">
              {guide.description}
            </p>

            {/* Coffee Dose Slider */}
            <div className="space-y-3 mb-8 pb-6 border-b border-stone-700/60">
              <div className="flex justify-between items-center text-sm">
                <span className="text-stone-300 font-medium">Coffee Dry Dose (Grounds)</span>
                <span className="font-mono text-amber-300 font-semibold text-lg tabular-nums">
                  {coffeeDose}g
                </span>
              </div>
              <input
                type="range"
                min="12"
                max="40"
                step="1"
                value={coffeeDose}
                onChange={(e) => setCoffeeDose(Number(e.target.value))}
                className="w-full accent-amber-600 cursor-pointer h-2 bg-stone-700 rounded-lg"
              />
              <div className="flex justify-between text-[11px] text-stone-500">
                <span>Single Cup (12g–15g)</span>
                <span>Standard Mug (18g)</span>
                <span>Two Person Carafe (30g–40g)</span>
              </div>
            </div>

            {/* Technical Parameters Matrix */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              <div className="p-3.5 bg-stone-900/80 rounded-lg border border-stone-700/50">
                <div className="flex items-center gap-1.5 text-xs text-stone-400 mb-1">
                  <Droplets className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Target Water</span>
                </div>
                <p className="font-mono text-lg font-semibold text-stone-100 tabular-nums">
                  {calculatedWater}g
                </p>
                <p className="text-[10px] text-stone-500 mt-0.5">Ratio 1:{guide.ratio}</p>
              </div>

              <div className="p-3.5 bg-stone-900/80 rounded-lg border border-stone-700/50">
                <div className="flex items-center gap-1.5 text-xs text-stone-400 mb-1">
                  <Flame className="w-3.5 h-3.5 text-amber-500" />
                  <span>Water Temp</span>
                </div>
                <p className="font-mono text-base font-semibold text-stone-100 tabular-nums">
                  {guide.waterTemp.split('/')[0]}
                </p>
                <p className="text-[10px] text-stone-500 mt-0.5">Off-boil 45s</p>
              </div>

              <div className="p-3.5 bg-stone-900/80 rounded-lg border border-stone-700/50">
                <div className="flex items-center gap-1.5 text-xs text-stone-400 mb-1">
                  <Scale className="w-3.5 h-3.5 text-stone-400" />
                  <span>Grind Spec</span>
                </div>
                <p className="text-xs font-medium text-stone-200 truncate">
                  {guide.recommendedGrind.split('(')[0]}
                </p>
                <p className="text-[10px] text-stone-500 mt-0.5 truncate">{guide.recommendedGrind.split('(')[1]?.replace(')', '') || 'Medium'}</p>
              </div>

              <div className="p-3.5 bg-stone-900/80 rounded-lg border border-stone-700/50">
                <div className="flex items-center gap-1.5 text-xs text-stone-400 mb-1">
                  <TimerIcon className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Target Time</span>
                </div>
                <p className="font-mono text-base font-semibold text-stone-100 tabular-nums">
                  {guide.brewTime}
                </p>
                <p className="text-[10px] text-stone-500 mt-0.5">Total contact</p>
              </div>
            </div>

            {/* Step-by-Step Instructions */}
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-wider font-semibold text-stone-400">
                Pour Schedule for {coffeeDose}g Dose
              </p>
              {guide.steps.map((st, idx) => (
                <div
                  key={st.stage}
                  className={`p-3 rounded-lg border text-xs transition-colors ${
                    currentStepIndex === idx && isRunning
                      ? 'bg-amber-950/40 border-amber-600/80 text-stone-100'
                      : 'bg-stone-900/40 border-stone-700/40 text-stone-300'
                  }`}
                >
                  <div className="flex items-center justify-between font-medium text-stone-200 mb-1">
                    <span>{st.stage} ({st.timeSeconds}s)</span>
                    <span className="font-mono text-amber-300 font-semibold tabular-nums">
                      Target: {st.targetWater(coffeeDose)}g
                    </span>
                  </div>
                  <p className="text-stone-400 leading-relaxed text-[11px]">
                    {st.instruction}
                  </p>
                </div>
              ))}
            </div>

          </div>

          {/* Right Column: Live Stopwatch & Active Step Visualizer (5 cols) */}
          <div className="lg:col-span-5 bg-stone-950 border border-stone-800 rounded-xl p-6 sm:p-8 text-center flex flex-col items-center justify-between min-h-[460px]">
            <div className="w-full">
              <span className="text-[11px] uppercase tracking-widest text-amber-400 font-semibold">
                Barista Extraction Stopwatch
              </span>

              {/* Digital Big Clock */}
              <div className="my-6">
                <div className="font-mono text-6xl sm:text-7xl font-bold tracking-tight text-white tabular-nums">
                  {formatTimer(seconds)}
                </div>
                <p className="text-xs text-stone-500 mt-1 font-mono">
                  Target Drawdown: {guide.brewTime}
                </p>
              </div>

              {/* Active Stage Callout */}
              <div className="bg-stone-900/90 border border-stone-800 rounded-lg p-4 text-left mb-6">
                <div className="flex items-center justify-between text-xs text-stone-400 mb-1">
                  <span>Current Phase</span>
                  <span className="text-amber-400 font-medium">{activeStep.stage}</span>
                </div>
                <div className="flex items-baseline justify-between mt-2 pt-2 border-t border-stone-800">
                  <span className="text-xs text-stone-400">Scale Reading:</span>
                  <span className="font-mono text-xl font-bold text-amber-300 tabular-nums">
                    {currentTargetWater}g
                  </span>
                </div>
                <p className="text-[11px] text-stone-400 mt-2 leading-relaxed">
                  {activeStep.instruction}
                </p>
              </div>
            </div>

            {/* Timer Buttons */}
            <div className="w-full flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setIsRunning(!isRunning)}
                className={`flex-1 py-3 px-4 rounded-md font-semibold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer ${
                  isRunning
                    ? 'bg-amber-600 hover:bg-amber-500 text-white'
                    : 'bg-stone-100 hover:bg-white text-stone-900 shadow-md'
                }`}
              >
                {isRunning ? (
                  <>
                    <Pause className="w-4 h-4" />
                    <span>Pause Timer</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-stone-900" />
                    <span>Start Brew Timer</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleResetTimer}
                aria-label="Reset timer"
                className="p-3 rounded-md bg-stone-800 hover:bg-stone-700 text-stone-300 transition-colors cursor-pointer"
                title="Reset timer to 00:00"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
