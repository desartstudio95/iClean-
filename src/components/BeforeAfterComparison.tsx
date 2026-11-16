import React, {useRef, useState} from 'react';
import {Info, MoveHorizontal} from 'lucide-react';
import {BEFORE_AFTER_PAIR} from '../data/icleanData';
import {SafeImage} from './SafeImage';

interface BeforeAfterComparisonProps {
  kicker?: string;
  headline?: string;
  description?: string;
  beforeImage?: string;
  beforeAlt?: string;
  afterImage?: string;
  afterAlt?: string;
  isDemonstration?: boolean;
  onDarkCanvas?: boolean;
}

export const BeforeAfterComparison: React.FC<BeforeAfterComparisonProps> = ({
  kicker = 'Comparação Interativa',
  headline = 'Veja a diferença que a limpeza pode fazer.',
  description = BEFORE_AFTER_PAIR.subtitle,
  beforeImage = BEFORE_AFTER_PAIR.beforeImage,
  beforeAlt = BEFORE_AFTER_PAIR.beforeAlt,
  afterImage = BEFORE_AFTER_PAIR.afterImage,
  afterAlt = BEFORE_AFTER_PAIR.afterAlt,
  isDemonstration = true,
  onDarkCanvas = false,
}) => {
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const sliderContainerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);

  const clampPercent = (value: number) => Math.min(96, Math.max(4, value));

  const updateSliderFromPointer = (clientX: number) => {
    const el = sliderContainerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const percent = ((clientX - rect.left) / rect.width) * 100;
    setSliderPosition(clampPercent(Math.round(percent)));
  };

  const handleHandleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setSliderPosition((prev) => clampPercent(prev - 5));
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      setSliderPosition((prev) => clampPercent(prev + 5));
    } else if (e.key === 'Home') {
      e.preventDefault();
      setSliderPosition(4);
    } else if (e.key === 'End') {
      e.preventDefault();
      setSliderPosition(96);
    }
  };

  return (
    <div
      className={`rounded-2xl p-5 sm:p-8 lg:p-10 border ${
        onDarkCanvas
          ? 'bg-gradient-to-br from-[#FFFFFF] via-[#F7FCF6] to-[#EAF6E7] border-[#78D34B]/30 shadow-[0_16px_36px_-14px_rgba(6,31,19,0.4)]'
          : 'bg-[#F7F9F7] border-[#17251D]/10'
      }`}
    >
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 mb-6">
        <div className="max-w-2xl">
          <p className="text-xs sm:text-sm font-semibold text-[#0C482B] mb-1.5">
            {kicker}
          </p>
          <h3
            className={`font-display text-2xl sm:text-3xl font-bold tracking-tight text-balance ${
              onDarkCanvas ? 'text-[#0C482B]' : 'text-[#17251D]'
            }`}
          >
            {headline}
          </h3>
          <p className="text-sm sm:text-base text-[#17251D]/75 mt-2 leading-relaxed">
            {description}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => setSliderPosition(90)}
            className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
              sliderPosition >= 75
                ? 'bg-[#0C482B] text-white'
                : 'bg-white text-[#17251D] border border-[#17251D]/15 hover:bg-white/80'
            }`}
          >
            Ver Antes
          </button>
          <button
            type="button"
            onClick={() => setSliderPosition(50)}
            className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
              sliderPosition > 25 && sliderPosition < 75
                ? 'bg-[#0C482B] text-white'
                : 'bg-white text-[#17251D] border border-[#17251D]/15 hover:bg-white/80'
            }`}
          >
            Comparar 50/50
          </button>
          <button
            type="button"
            onClick={() => setSliderPosition(10)}
            className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
              sliderPosition <= 25
                ? 'bg-[#0C482B] text-white'
                : 'bg-white text-[#17251D] border border-[#17251D]/15 hover:bg-white/80'
            }`}
          >
            Ver Depois
          </button>
        </div>
      </div>

      <div
        ref={sliderContainerRef}
        onPointerDown={(e) => {
          isDraggingRef.current = true;
          e.currentTarget.setPointerCapture(e.pointerId);
          updateSliderFromPointer(e.clientX);
        }}
        onPointerMove={(e) => {
          if (isDraggingRef.current) {
            updateSliderFromPointer(e.clientX);
          }
        }}
        onPointerUp={() => {
          isDraggingRef.current = false;
        }}
        onPointerCancel={() => {
          isDraggingRef.current = false;
        }}
        className="relative aspect-[16/10] sm:aspect-[16/9] max-h-[540px] w-full rounded-xl overflow-hidden select-none touch-none cursor-ew-resize bg-[#17251D]"
      >
        {/* After layer */}
        <SafeImage
          src={afterImage}
          alt={afterAlt}
          width={1280}
          height={720}
          fallbackTitle="Imagem Depois da Limpeza"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Before clipped layer */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`}}
        >
          <SafeImage
            src={beforeImage}
            alt={beforeAlt}
            width={1280}
            height={720}
            fallbackTitle="Imagem Antes da Limpeza"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Overlay labels */}
        <span className="absolute top-4 left-4 z-10 px-3 py-1 rounded bg-[#17251D]/88 text-white text-xs font-semibold tracking-wide pointer-events-none">
          Antes
        </span>
        <span className="absolute top-4 right-4 z-10 px-3 py-1 rounded bg-[#0C482B]/92 text-[#78D34B] text-xs font-semibold tracking-wide pointer-events-none">
          Depois
        </span>

        {/* Accessible keyboard slider handle */}
        <div
          role="slider"
          tabIndex={0}
          aria-label="Controlo deslizante para comparar Antes e Depois"
          aria-valuemin={4}
          aria-valuemax={96}
          aria-valuenow={sliderPosition}
          onKeyDown={handleHandleKeyDown}
          className="absolute inset-y-0 z-20 w-0.5 bg-white shadow-md focus:outline-none group"
          style={{left: `${sliderPosition}%`}}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-11 h-11 rounded-full bg-white text-[#0C482B] shadow-lg flex items-center justify-center border-2 border-[#0C482B]/25 group-focus-visible:ring-4 group-focus-visible:ring-[#78D34B]">
            <MoveHorizontal className="w-5 h-5" aria-hidden="true" />
          </div>
        </div>
      </div>

      {/* Explicit demonstration notice + accessible range fallback */}
      <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {isDemonstration && (
          <p className="flex items-center gap-2 text-xs text-[#17251D]/70">
            <Info className="w-4 h-4 text-[#0C482B] shrink-0" aria-hidden="true" />
            <span>
              Exemplo ilustrativo do mesmo espaço comercial — preparado para
              fotografias reais de projetos iClean.
            </span>
          </p>
        )}

        <div className="flex items-center gap-3 sm:ml-auto">
          <label
            htmlFor="before-after-range"
            className="text-xs font-medium text-[#17251D]/75 whitespace-nowrap"
          >
            Ajustar divisão:
          </label>
          <input
            id="before-after-range"
            type="range"
            min={4}
            max={96}
            value={sliderPosition}
            onChange={(e) => setSliderPosition(Number(e.target.value))}
            className="w-32 accent-[#0C482B] cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};
