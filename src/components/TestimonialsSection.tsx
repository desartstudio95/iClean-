import React, {useEffect, useState} from 'react';
import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  MessageSquarePlus,
  Quote,
  Send,
  Star,
  X,
} from 'lucide-react';
import {siteConfig} from '../config/site';
import {SERVICE_DETAILS} from '../data/pagesData';
import {buildWhatsAppUrl, submitToConfiguredBackend} from '../utils/whatsapp';
import {SafeImage} from './SafeImage';

interface TestimonialsSectionProps {
  onGlobalBackground?: boolean;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  onGlobalBackground = false,
}) => {
  const testimonials = siteConfig.verifiedTestimonials;
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);

  const [customerName, setCustomerName] = useState('');
  const [serviceCategory, setServiceCategory] = useState(
    SERVICE_DETAILS[0].title
  );
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [feedbackSent, setFeedbackSent] = useState(false);

  useEffect(() => {
    if (!isFeedbackOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsFeedbackOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isFeedbackOpen]);

  const handleSubmitFeedback = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (customerName.trim().length < 2) {
      setFormError('Indique o seu nome.');
      return;
    }
    if (comment.trim().length < 10) {
      setFormError('Escreva um comentário com pelo menos 10 caracteres.');
      return;
    }

    try {
      await submitToConfiguredBackend({
        formType: 'customer_feedback',
        customerName: customerName.trim(),
        serviceCategory,
        rating,
        comment: comment.trim(),
        permissionGranted,
      });
      setFeedbackSent(true);
    } catch (err) {
      setFormError(
        err instanceof Error
          ? err.message
          : 'Não foi possível enviar a avaliação neste momento.'
      );
    }
  };

  const feedbackSummary = [
    `Avaliação de Cliente — ${siteConfig.brand.name}`,
    `Nome: ${customerName}`,
    `Serviço: ${serviceCategory}`,
    `Classificação: ${rating}/5`,
    `Comentário: ${comment}`,
    `Autorização de publicação: ${permissionGranted ? 'Sim' : 'Não'}`,
  ].join('\n');

  const feedbackWhatsappUrl = buildWhatsAppUrl(feedbackSummary);

  const current =
    testimonials.length > 0 ? testimonials[activeIndex] : undefined;

  return (
    <section
      aria-labelledby="testimonials-heading"
      className={`py-20 lg:py-24 border-b ${
        onGlobalBackground
          ? 'bg-[#061F13]/25 border-white/12'
          : 'bg-[#F7F9F7] border-[#17251D]/8'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <p
              className={`text-sm font-semibold mb-2 ${
                onGlobalBackground ? 'text-[#78D34B]' : 'text-[#0C482B]'
              }`}
            >
              Experiência dos Clientes
            </p>
            <h2
              id="testimonials-heading"
              className={`font-display text-3xl sm:text-4xl font-bold tracking-tight text-balance ${
                onGlobalBackground ? 'text-white' : 'text-[#17251D]'
              }`}
            >
              A confiança dos nossos clientes é a nossa maior recompensa.
            </h2>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {testimonials.length > 1 && (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() =>
                    setActiveIndex((prev) =>
                      prev === 0 ? testimonials.length - 1 : prev - 1
                    )
                  }
                  aria-label="Testemunho anterior"
                  className={`w-11 h-11 rounded-lg border flex items-center justify-center transition-colors cursor-pointer ${
                    onGlobalBackground
                      ? 'bg-white/15 border-white/25 text-white hover:bg-white/25'
                      : 'bg-white border-[#17251D]/15 text-[#17251D] hover:border-[#0C482B] hover:text-[#0C482B]'
                  }`}
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setActiveIndex((prev) =>
                      prev === testimonials.length - 1 ? 0 : prev + 1
                    )
                  }
                  aria-label="Próximo testemunho"
                  className={`w-11 h-11 rounded-lg border flex items-center justify-center transition-colors cursor-pointer ${
                    onGlobalBackground
                      ? 'bg-white/15 border-white/25 text-white hover:bg-white/25'
                      : 'bg-white border-[#17251D]/15 text-[#17251D] hover:border-[#0C482B] hover:text-[#0C482B]'
                  }`}
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}

            <button
              type="button"
              onClick={() => {
                setFeedbackSent(false);
                setFormError(null);
                setIsFeedbackOpen(true);
              }}
              className={`inline-flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 ${
                onGlobalBackground
                  ? 'bg-[#78D34B] text-[#092E1B] hover:bg-[#87DF5A] focus-visible:outline-[#78D34B]'
                  : 'bg-[#0C482B] text-white hover:bg-[#093821] focus-visible:outline-[#0C482B]'
              }`}
            >
              <MessageSquarePlus
                className={`w-4 h-4 ${
                  onGlobalBackground ? 'text-[#092E1B]' : 'text-[#78D34B]'
                }`}
                aria-hidden="true"
              />
              <span>Partilhe a sua experiência.</span>
            </button>
          </div>
        </div>

        {/* Verified Testimonials Carousel vs Honest Empty State */}
        {current ? (
          <div
            className={`rounded-2xl p-8 sm:p-10 lg:p-12 border ${
              onGlobalBackground
                ? 'bg-gradient-to-br from-[#FFFFFF] via-[#F7FCF6] to-[#EAF6E7] border-[#78D34B]/30 shadow-[0_16px_36px_-14px_rgba(6,31,19,0.4)]'
                : 'bg-white border-[#17251D]/10'
            }`}
          >
            <div className="flex items-center justify-between gap-4 mb-6">
              <Quote className="w-8 h-8 text-[#78D34B]" aria-hidden="true" />
              <div
                className="flex items-center gap-1"
                aria-label={`Classificação: ${current.rating} de 5 estrelas`}
              >
                {Array.from({length: 5}).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < current.rating
                        ? 'text-[#0C482B] fill-[#78D34B]'
                        : 'text-[#17251D]/20'
                    }`}
                    aria-hidden="true"
                  />
                ))}
              </div>
            </div>

            <blockquote className="font-display text-xl sm:text-2xl font-medium text-[#17251D] leading-snug max-w-4xl mb-8">
              “{current.comment}”
            </blockquote>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-[#17251D]/10">
              <div className="flex items-center gap-3.5">
                {current.photoUrl && current.hasPhotoPermission && (
                  <SafeImage
                    src={current.photoUrl}
                    alt={current.photoAlt || current.customerName}
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-full object-cover border border-[#17251D]/15"
                  />
                )}
                <div>
                  <p className="font-semibold text-base text-[#17251D]">
                    {current.customerName}
                  </p>
                  <p className="text-sm text-[#17251D]/70">
                    {current.serviceCategory}
                  </p>
                </div>
              </div>

              {testimonials.length > 1 && (
                <div
                  className="flex items-center gap-2"
                  role="tablist"
                  aria-label="Selecionar testemunho"
                >
                  {testimonials.map((item, idx) => (
                    <button
                      key={item.id}
                      type="button"
                      role="tab"
                      aria-selected={idx === activeIndex}
                      aria-label={`Testemunho ${idx + 1}`}
                      onClick={() => setActiveIndex(idx)}
                      className={`h-2.5 rounded-full transition-all cursor-pointer ${
                        idx === activeIndex
                          ? 'w-7 bg-[#0C482B]'
                          : 'w-2.5 bg-[#17251D]/20 hover:bg-[#17251D]/40'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div
            className={`rounded-2xl p-8 sm:p-12 border ${
              onGlobalBackground
                ? 'bg-gradient-to-br from-[#FFFFFF] via-[#F7FCF6] to-[#EAF6E7] border-[#78D34B]/30 shadow-[0_16px_36px_-14px_rgba(6,31,19,0.4)]'
                : 'bg-white border-[#17251D]/10'
            }`}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <p className="text-xs font-semibold text-[#0C482B] uppercase tracking-wider">
                  Avaliações Verificadas
                </p>
                <h3
                  className={`font-display text-2xl sm:text-3xl font-bold text-balance ${
                    onGlobalBackground ? 'text-[#0C482B]' : 'text-[#17251D]'
                  }`}
                >
                  Estamos a recolher avaliações reais de clientes atendidos pela iClean.
                </h3>
                <p className="text-base text-[#17251D]/75 leading-relaxed max-w-2xl">
                  Por respeito à transparência, publicamos exclusivamente
                  opiniões autênticas e autorizadas por clientes reais em
                  Maputo. Se já utilizou os nossos serviços residenciais,
                  empresariais, pós-obra, de condomínios ou eventos, teremos
                  todo o gosto em ouvir a sua avaliação.
                </p>
              </div>

              <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setFeedbackSent(false);
                    setFormError(null);
                    setIsFeedbackOpen(true);
                  }}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-[#78D34B] text-[#092E1B] font-semibold text-sm sm:text-base hover:bg-[#87DF5A] transition-colors cursor-pointer whitespace-nowrap"
                >
                  <MessageSquarePlus className="w-4 h-4" aria-hidden="true" />
                  <span>Partilhe a sua experiência.</span>
                </button>
                <p className="text-xs text-[#17251D]/65 lg:text-right">
                  Publicação sujeita à sua autorização expressa.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Feedback Submission Modal */}
      {isFeedbackOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="feedback-modal-title"
          onClick={() => setIsFeedbackOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#071D12]/75 backdrop-blur-xs"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white text-[#17251D] rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-start justify-between gap-4 mb-5">
              <div>
                <p className="text-xs font-semibold text-[#0C482B] mb-1">
                  Avaliação de Serviço
                </p>
                <h3
                  id="feedback-modal-title"
                  className="font-display text-2xl font-bold text-[#17251D]"
                >
                  Partilhe a sua experiência.
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsFeedbackOpen(false)}
                aria-label="Fechar formulário de avaliação"
                className="w-9 h-9 rounded-lg border border-[#17251D]/15 flex items-center justify-center hover:bg-[#F7F9F7] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {feedbackSent ? (
              <div className="space-y-5" role="status" aria-live="polite">
                <div className="flex items-start gap-3">
                  <CheckCircle2
                    className="w-6 h-6 text-[#0C482B] shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="font-semibold text-base text-[#17251D]">
                      Obrigado pelo seu feedback!
                    </p>
                    <p className="text-sm text-[#17251D]/75 mt-1">
                      A sua avaliação foi preparada com sucesso.
                    </p>
                  </div>
                </div>

                <pre className="bg-[#F7F9F7] border border-[#17251D]/10 rounded-xl p-4 text-xs text-[#17251D]/85 whitespace-pre-wrap font-sans">
                  {feedbackSummary}
                </pre>

                <div className="flex flex-wrap gap-3">
                  {feedbackWhatsappUrl && (
                    <a
                      href={feedbackWhatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-[#0C482B] text-white text-sm font-semibold hover:bg-[#093821]"
                    >
                      Enviar por WhatsApp
                    </a>
                  )}
                  <button
                    type="button"
                    onClick={() => setIsFeedbackOpen(false)}
                    className="px-5 py-2.5 rounded-lg border border-[#17251D]/15 text-sm font-medium hover:bg-[#F7F9F7] cursor-pointer"
                  >
                    Fechar
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmitFeedback} className="space-y-4">
                {formError && (
                  <p role="alert" className="text-xs font-medium text-red-700 bg-red-50 border border-red-200 rounded-lg p-3">
                    {formError}
                  </p>
                )}

                <div>
                  <label
                    htmlFor="fb-name"
                    className="block text-sm font-semibold mb-1"
                  >
                    Nome *
                  </label>
                  <input
                    id="fb-name"
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="O seu nome ou empresa"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#17251D]/20 text-sm focus:outline-none focus:ring-2 focus:ring-[#0C482B]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="fb-service"
                    className="block text-sm font-semibold mb-1"
                  >
                    Serviço contratado *
                  </label>
                  <select
                    id="fb-service"
                    value={serviceCategory}
                    onChange={(e) => setServiceCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#17251D]/20 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#0C482B]"
                  >
                    {SERVICE_DETAILS.map((s) => (
                      <option key={s.slug} value={s.title}>
                        {s.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <span className="block text-sm font-semibold mb-1.5">
                    Classificação
                  </span>
                  <div className="flex items-center gap-1.5">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => setRating(value)}
                        aria-label={`${value} estrelas`}
                        className="p-1.5 rounded hover:bg-[#F7F9F7] cursor-pointer"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            value <= rating
                              ? 'text-[#0C482B] fill-[#78D34B]'
                              : 'text-[#17251D]/25'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="fb-comment"
                    className="block text-sm font-semibold mb-1"
                  >
                    Comentário *
                  </label>
                  <textarea
                    id="fb-comment"
                    rows={3}
                    required
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Conte-nos como foi a experiência com a equipa iClean..."
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#17251D]/20 text-sm focus:outline-none focus:ring-2 focus:ring-[#0C482B]"
                  />
                </div>

                <label className="flex items-start gap-2.5 text-xs text-[#17251D]/80 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={permissionGranted}
                    onChange={(e) => setPermissionGranted(e.target.checked)}
                    className="mt-0.5 accent-[#0C482B]"
                  />
                  <span>
                    Autorizo a eventual publicação do meu comentário e nome no
                    website da iClean após verificação.
                  </span>
                </label>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#0C482B] text-white font-semibold text-sm hover:bg-[#093821] transition-colors cursor-pointer"
                >
                  <Send className="w-4 h-4" aria-hidden="true" />
                  <span>Enviar avaliação</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
