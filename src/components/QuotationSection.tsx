import React, {useEffect, useState} from 'react';
import {
  AlertCircle,
  Check,
  CheckCircle2,
  Copy,
  Loader2,
  MapPin,
  MessageCircle,
  Send,
} from 'lucide-react';
import {SERVICE_DETAILS} from '../data/pagesData';
import {siteConfig} from '../config/site';
import {trackConversionEvent} from '../utils/analytics';
import {buildWhatsAppUrl, submitToConfiguredBackend} from '../utils/whatsapp';

interface QuotationSectionProps {
  preselectedService?: string;
  sectionId?: string;
  onGlobalBackground?: boolean;
}

interface FormState {
  fullName: string;
  phone: string;
  email: string;
  serviceCategory: string;
  location: string;
  propertySize: string;
  preferredDate: string;
  frequency: string;
  notes: string;
}

type FormErrors = Partial<Record<keyof FormState, string>>;

const FREQUENCY_OPTIONS = [
  'Serviço pontual (único)',
  'Diária',
  'Semanal',
  'Quinzenal',
  'Mensal',
  'A definir na avaliação',
];

export const QuotationSection: React.FC<QuotationSectionProps> = ({
  preselectedService = '',
  sectionId = 'orcamento',
  onGlobalBackground = false,
}) => {
  const [form, setForm] = useState<FormState>({
    fullName: '',
    phone: '',
    email: '',
    serviceCategory: preselectedService || SERVICE_DETAILS[0].title,
    location: '',
    propertySize: '',
    preferredDate: '',
    frequency: FREQUENCY_OPTIONS[0],
    notes: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submittedData, setSubmittedData] = useState<{
    data: FormState;
    sentToBackend: boolean;
  } | null>(null);
  const [copiedSummary, setCopiedSummary] = useState(false);
  const [hasTrackedStart, setHasTrackedStart] = useState(false);

  useEffect(() => {
    if (preselectedService) {
      setForm((prev) => ({...prev, serviceCategory: preselectedService}));
    }
  }, [preselectedService]);

  const validate = (data: FormState): FormErrors => {
    const nextErrors: FormErrors = {};
    if (data.fullName.trim().length < 2) {
      nextErrors.fullName = 'Indique o seu nome completo.';
    }
    const digits = data.phone.replace(/\D/g, '');
    if (digits.length < 8) {
      nextErrors.phone = 'Indique um número de telefone ou WhatsApp válido.';
    }
    if (data.email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.email.trim())) {
        nextErrors.email = 'Indique um endereço de e-mail válido.';
      }
    }
    if (!data.serviceCategory) {
      nextErrors.serviceCategory = 'Selecione a categoria de serviço.';
    }
    if (data.location.trim().length < 2) {
      nextErrors.location = 'Indique o bairro ou localização em Maputo.';
    }
    if (data.propertySize.trim().length < 2) {
      nextErrors.propertySize =
        'Indique a dimensão aproximada (ex.: 120 m², T3, 300 pessoas).';
    }
    if (!data.preferredDate) {
      nextErrors.preferredDate = 'Selecione uma data pretendida.';
    }
    return nextErrors;
  };

  const buildSummaryText = (data: FormState): string => {
    const lines = [
      `Pedido de Orçamento — ${siteConfig.brand.name}`,
      `Nome: ${data.fullName}`,
      `Telefone / WhatsApp: ${data.phone}`,
    ];
    if (data.email.trim()) {
      lines.push(`E-mail: ${data.email.trim()}`);
    }
    lines.push(
      `Serviço: ${data.serviceCategory}`,
      `Localização: ${data.location}`,
      `Dimensão do espaço: ${data.propertySize}`,
      `Data pretendida: ${data.preferredDate}`,
      `Frequência: ${data.frequency}`
    );
    if (data.notes.trim()) {
      lines.push(`Detalhes adicionais: ${data.notes.trim()}`);
    }
    return lines.join('\n');
  };

  const handleChange = (field: keyof FormState, value: string) => {
    if (!hasTrackedStart) {
      setHasTrackedStart(true);
      trackConversionEvent('quotation_form_started', {sectionId});
    }
    setForm((prev) => ({...prev, [field]: value}));
    if (errors[field]) {
      setErrors((prev) => ({...prev, [field]: undefined}));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    const validationErrors = validate(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const {sentToBackend} = await submitToConfiguredBackend({
        formType: 'general_quotation',
        ...form,
        source: 'iclean-website',
      });
      trackConversionEvent('quotation_form_submitted', {
        formType: 'general_quotation',
        serviceCategory: form.serviceCategory,
      });
      setSubmittedData({data: {...form}, sentToBackend});
    } catch (err) {
      setSubmitError(
        err instanceof Error
          ? err.message
          : 'Ocorreu um erro ao preparar o pedido. Tente novamente.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopySummary = async () => {
    if (!submittedData) return;
    try {
      await navigator.clipboard.writeText(buildSummaryText(submittedData.data));
      setCopiedSummary(true);
      setTimeout(() => setCopiedSummary(false), 2500);
    } catch {
      setCopiedSummary(false);
    }
  };

  const whatsappUrl = submittedData
    ? buildWhatsAppUrl(buildSummaryText(submittedData.data))
    : null;

  return (
    <section
      id={sectionId}
      aria-labelledby={`${sectionId}-heading`}
      className={`text-white py-20 lg:py-28 scroll-mt-16 ${
        onGlobalBackground
          ? 'bg-[#0C482B]/65 backdrop-blur-[2px]'
          : 'bg-[#0C482B]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column */}
          <div className="lg:col-span-5">
            <p className="text-sm font-semibold text-[#78D34B] mb-2">
              Pedido de Orçamento
            </p>
            <h2
              id={`${sectionId}-heading`}
              className="font-display text-3xl sm:text-4xl lg:text-[2.65rem] font-bold tracking-tight text-white leading-[1.12] text-balance mb-5"
            >
              Vamos deixar o seu espaço impecável?
            </h2>
            <p className="text-base text-white/85 leading-relaxed mb-8">
              Preencha os detalhes do seu imóvel, escritório ou condomínio. A
              nossa equipa em Maputo avalia as suas necessidades e prepara uma
              proposta clara e ajustada.
            </p>

            <div className="space-y-5 pt-6 border-t border-white/15">
              <div className="flex items-start gap-3">
                <MapPin
                  className="w-5 h-5 text-[#78D34B] shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <div>
                  <p className="font-semibold text-sm text-white">
                    Área de cobertura
                  </p>
                  <p className="text-sm text-white/75 mt-0.5">
                    {siteConfig.contact.address} · {siteConfig.contact.hours}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2
                  className="w-5 h-5 text-[#78D34B] shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <div>
                  <p className="font-semibold text-sm text-white">
                    Orçamento transparente
                  </p>
                  <p className="text-sm text-white/75 mt-0.5">
                    Os campos marcados com * são obrigatórios para dimensionar
                    corretamente a equipa e os recursos.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-7">
            <div
              className={`text-[#17251D] rounded-2xl p-6 sm:p-9 shadow-[0_18px_42px_-14px_rgba(4,18,11,0.5)] ${
                onGlobalBackground
                  ? 'bg-gradient-to-b from-[#FFFFFF] via-[#FBFDFB] to-[#EAF6E7] border border-[#78D34B]/30'
                  : 'bg-white'
              }`}
            >
              {submittedData ? (
                <div className="space-y-6" role="status" aria-live="polite">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#78D34B]/25 flex items-center justify-center shrink-0">
                      <CheckCircle2
                        className="w-6 h-6 text-[#0C482B]"
                        aria-hidden="true"
                      />
                    </div>
                    <div>
                      <h3 className="font-display text-2xl font-bold text-[#17251D]">
                        Pedido de orçamento preparado
                      </h3>
                      <p className="text-sm text-[#17251D]/75 mt-1 leading-relaxed">
                        {submittedData.sentToBackend
                          ? 'O seu pedido foi transmitido ao servidor configurado e o resumo para WhatsApp está pronto abaixo.'
                          : 'Resumo estruturado preparado localmente e pronto para envio direto por WhatsApp ou cópia.'}
                      </p>
                    </div>
                  </div>

                  <pre className="bg-[#F7F9F7] border border-[#17251D]/10 rounded-xl p-4 text-xs sm:text-sm text-[#17251D]/90 whitespace-pre-wrap font-sans leading-relaxed">
                    {buildSummaryText(submittedData.data)}
                  </pre>

                  <div className="flex flex-col sm:flex-row flex-wrap gap-3">
                    {whatsappUrl ? (
                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() =>
                          trackConversionEvent('whatsapp_clicked', {
                            source: 'general_quotation_confirmation',
                          })
                        }
                        className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-[#0C482B] text-white font-semibold text-sm hover:bg-[#093821] transition-colors whitespace-nowrap"
                      >
                        <MessageCircle className="w-4 h-4" aria-hidden="true" />
                        <span>Enviar pedido via WhatsApp</span>
                      </a>
                    ) : (
                      <div className="w-full rounded-lg bg-[#F7F9F7] border border-[#17251D]/15 p-3.5 text-xs text-[#17251D]/80">
                        <span className="font-semibold text-[#0C482B]">
                          Integração WhatsApp configurável:
                        </span>{' '}
                        Defina <code>VITE_WHATSAPP_NUMBER</code> ou atualize{' '}
                        <code>siteConfig.contact.whatsappNumber</code> para
                        ativar o envio direto no botão de WhatsApp.
                      </div>
                    )}

                    <button
                      type="button"
                      onClick={handleCopySummary}
                      className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-lg border border-[#17251D]/20 text-[#17251D] font-semibold text-sm hover:bg-[#F7F9F7] transition-colors cursor-pointer whitespace-nowrap"
                    >
                      {copiedSummary ? (
                        <>
                          <Check className="w-4 h-4 text-[#0C482B]" />
                          <span>Resumo copiado</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          <span>Copiar resumo</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setSubmittedData(null);
                        setErrors({});
                      }}
                      className="inline-flex items-center justify-center px-5 py-3.5 rounded-lg text-sm font-medium text-[#0C482B] hover:bg-[#F7F9F7] transition-colors cursor-pointer whitespace-nowrap"
                    >
                      Editar ou novo pedido
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  {submitError && (
                    <div
                      role="alert"
                      className="flex items-start gap-2.5 p-3.5 rounded-lg bg-red-50 border border-red-200 text-red-900 text-sm"
                    >
                      <AlertCircle
                        className="w-4 h-4 shrink-0 mt-0.5 text-red-700"
                        aria-hidden="true"
                      />
                      <span>{submitError}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor={`${sectionId}-fullName`}
                        className="block text-sm font-semibold text-[#17251D] mb-1.5"
                      >
                        Nome completo <span className="text-[#0C482B]">*</span>
                      </label>
                      <input
                        id={`${sectionId}-fullName`}
                        type="text"
                        required
                        value={form.fullName}
                        onChange={(e) => handleChange('fullName', e.target.value)}
                        placeholder="Ex.: Ana Mondlane"
                        aria-invalid={Boolean(errors.fullName)}
                        aria-describedby={
                          errors.fullName ? `${sectionId}-error-fullName` : undefined
                        }
                        className={`w-full px-4 py-3 rounded-lg border text-sm bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#0C482B] ${
                          errors.fullName
                            ? 'border-red-500'
                            : 'border-[#17251D]/20'
                        }`}
                      />
                      {errors.fullName && (
                        <p
                          id={`${sectionId}-error-fullName`}
                          className="mt-1 text-xs text-red-700 font-medium"
                        >
                          {errors.fullName}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor={`${sectionId}-phone`}
                        className="block text-sm font-semibold text-[#17251D] mb-1.5"
                      >
                        Telefone / WhatsApp{' '}
                        <span className="text-[#0C482B]">*</span>
                      </label>
                      <input
                        id={`${sectionId}-phone`}
                        type="tel"
                        required
                        value={form.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}
                        placeholder="+258 84 ..."
                        aria-invalid={Boolean(errors.phone)}
                        aria-describedby={
                          errors.phone ? `${sectionId}-error-phone` : undefined
                        }
                        className={`w-full px-4 py-3 rounded-lg border text-sm bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#0C482B] ${
                          errors.phone
                            ? 'border-red-500'
                            : 'border-[#17251D]/20'
                        }`}
                      />
                      {errors.phone && (
                        <p
                          id={`${sectionId}-error-phone`}
                          className="mt-1 text-xs text-red-700 font-medium"
                        >
                          {errors.phone}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor={`${sectionId}-email`}
                        className="block text-sm font-semibold text-[#17251D] mb-1.5"
                      >
                        E-mail (opcional)
                      </label>
                      <input
                        id={`${sectionId}-email`}
                        type="email"
                        value={form.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        placeholder="nome@empresa.co.mz"
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={
                          errors.email ? `${sectionId}-error-email` : undefined
                        }
                        className={`w-full px-4 py-3 rounded-lg border text-sm bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#0C482B] ${
                          errors.email
                            ? 'border-red-500'
                            : 'border-[#17251D]/20'
                        }`}
                      />
                      {errors.email && (
                        <p
                          id={`${sectionId}-error-email`}
                          className="mt-1 text-xs text-red-700 font-medium"
                        >
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor={`${sectionId}-service`}
                        className="block text-sm font-semibold text-[#17251D] mb-1.5"
                      >
                        Categoria de serviço{' '}
                        <span className="text-[#0C482B]">*</span>
                      </label>
                      <select
                        id={`${sectionId}-service`}
                        value={form.serviceCategory}
                        onChange={(e) =>
                          handleChange('serviceCategory', e.target.value)
                        }
                        className="w-full px-4 py-3 rounded-lg border border-[#17251D]/20 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#0C482B]"
                      >
                        {SERVICE_DETAILS.map((service) => (
                          <option key={service.slug} value={service.title}>
                            {service.title}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor={`${sectionId}-location`}
                        className="block text-sm font-semibold text-[#17251D] mb-1.5"
                      >
                        Localização (Bairro / Zona){' '}
                        <span className="text-[#0C482B]">*</span>
                      </label>
                      <input
                        id={`${sectionId}-location`}
                        type="text"
                        required
                        value={form.location}
                        onChange={(e) => handleChange('location', e.target.value)}
                        placeholder="Ex.: Polana, Sommerschield, Baixa"
                        aria-invalid={Boolean(errors.location)}
                        aria-describedby={
                          errors.location ? `${sectionId}-error-location` : undefined
                        }
                        className={`w-full px-4 py-3 rounded-lg border text-sm bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#0C482B] ${
                          errors.location
                            ? 'border-red-500'
                            : 'border-[#17251D]/20'
                        }`}
                      />
                      {errors.location && (
                        <p
                          id={`${sectionId}-error-location`}
                          className="mt-1 text-xs text-red-700 font-medium"
                        >
                          {errors.location}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor={`${sectionId}-size`}
                        className="block text-sm font-semibold text-[#17251D] mb-1.5"
                      >
                        Dimensão do espaço ou recinto{' '}
                        <span className="text-[#0C482B]">*</span>
                      </label>
                      <input
                        id={`${sectionId}-size`}
                        type="text"
                        required
                        value={form.propertySize}
                        onChange={(e) =>
                          handleChange('propertySize', e.target.value)
                        }
                        placeholder="Ex.: 250 m², T3, edifício 4 pisos"
                        aria-invalid={Boolean(errors.propertySize)}
                        aria-describedby={
                          errors.propertySize ? `${sectionId}-error-size` : undefined
                        }
                        className={`w-full px-4 py-3 rounded-lg border text-sm bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#0C482B] ${
                          errors.propertySize
                            ? 'border-red-500'
                            : 'border-[#17251D]/20'
                        }`}
                      />
                      {errors.propertySize && (
                        <p
                          id={`${sectionId}-error-size`}
                          className="mt-1 text-xs text-red-700 font-medium"
                        >
                          {errors.propertySize}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor={`${sectionId}-date`}
                        className="block text-sm font-semibold text-[#17251D] mb-1.5"
                      >
                        Data pretendida{' '}
                        <span className="text-[#0C482B]">*</span>
                      </label>
                      <input
                        id={`${sectionId}-date`}
                        type="date"
                        required
                        value={form.preferredDate}
                        onChange={(e) =>
                          handleChange('preferredDate', e.target.value)
                        }
                        aria-invalid={Boolean(errors.preferredDate)}
                        aria-describedby={
                          errors.preferredDate ? `${sectionId}-error-date` : undefined
                        }
                        className={`w-full px-4 py-3 rounded-lg border text-sm bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#0C482B] ${
                          errors.preferredDate
                            ? 'border-red-500'
                            : 'border-[#17251D]/20'
                        }`}
                      />
                      {errors.preferredDate && (
                        <p
                          id={`${sectionId}-error-date`}
                          className="mt-1 text-xs text-red-700 font-medium"
                        >
                          {errors.preferredDate}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor={`${sectionId}-frequency`}
                        className="block text-sm font-semibold text-[#17251D] mb-1.5"
                      >
                        Frequência (limpeza recorrente)
                      </label>
                      <select
                        id={`${sectionId}-frequency`}
                        value={form.frequency}
                        onChange={(e) =>
                          handleChange('frequency', e.target.value)
                        }
                        className="w-full px-4 py-3 rounded-lg border border-[#17251D]/20 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#0C482B]"
                      >
                        {FREQUENCY_OPTIONS.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor={`${sectionId}-notes`}
                      className="block text-sm font-semibold text-[#17251D] mb-1.5"
                    >
                      Detalhes adicionais
                    </label>
                    <textarea
                      id={`${sectionId}-notes`}
                      rows={3}
                      value={form.notes}
                      onChange={(e) => handleChange('notes', e.target.value)}
                      placeholder="Descreva horários preferenciais, tipo de pavimento ou exigências específicas..."
                      className="w-full px-4 py-3 rounded-lg border border-[#17251D]/20 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#0C482B] resize-y"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-lg bg-[#78D34B] text-[#092E1B] font-semibold text-base hover:bg-[#87DF5A] disabled:opacity-60 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0C482B]"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2
                            className="w-4 h-4 animate-spin"
                            aria-hidden="true"
                          />
                          <span>A preparar pedido...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" aria-hidden="true" />
                          <span>Solicitar orçamento</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
