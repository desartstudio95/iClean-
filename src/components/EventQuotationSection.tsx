import React, {useState} from 'react';
import {
  AlertCircle,
  CalendarDays,
  Check,
  CheckCircle2,
  Copy,
  Loader2,
  MessageCircle,
  Send,
  Users,
} from 'lucide-react';
import {siteConfig} from '../config/site';
import {trackConversionEvent} from '../utils/analytics';
import {buildWhatsAppUrl, submitToConfiguredBackend} from '../utils/whatsapp';

interface EventFormState {
  fullName: string;
  organization: string;
  phone: string;
  email: string;
  eventType: string;
  eventDate: string;
  eventLocation: string;
  estimatedAttendees: string;
  venueSize: string;
  cleaningStage: string;
  notes: string;
}

type EventFormErrors = Partial<Record<keyof EventFormState, string>>;

const EVENT_TYPE_OPTIONS = [
  'Show / Concerto',
  'Festival',
  'Casamento',
  'Festa de aniversário',
  'Evento corporativo',
  'Exposição / Feira',
  'Cerimónia',
  'Celebração privada',
];

const CLEANING_STAGE_OPTIONS = [
  'Pacote completo (Antes, Durante e Depois)',
  'Pré-evento (Antes do evento)',
  'Durante o evento',
  'Pós-evento (Depois do evento)',
];

export const EventQuotationSection: React.FC = () => {
  const [form, setForm] = useState<EventFormState>({
    fullName: '',
    organization: '',
    phone: '',
    email: '',
    eventType: EVENT_TYPE_OPTIONS[0],
    eventDate: '',
    eventLocation: '',
    estimatedAttendees: '',
    venueSize: '',
    cleaningStage: CLEANING_STAGE_OPTIONS[0],
    notes: '',
  });

  const [errors, setErrors] = useState<EventFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submittedData, setSubmittedData] = useState<{
    data: EventFormState;
    sentToBackend: boolean;
  } | null>(null);
  const [copiedSummary, setCopiedSummary] = useState(false);
  const [hasTrackedStart, setHasTrackedStart] = useState(false);

  const validate = (data: EventFormState): EventFormErrors => {
    const nextErrors: EventFormErrors = {};
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
    if (!data.eventDate) {
      nextErrors.eventDate = 'Indique a data do evento.';
    }
    if (data.eventLocation.trim().length < 2) {
      nextErrors.eventLocation = 'Indique o local ou recinto do evento.';
    }
    if (!data.estimatedAttendees.trim()) {
      nextErrors.estimatedAttendees =
        'Indique o número estimado de participantes.';
    }
    return nextErrors;
  };

  const buildSummaryText = (data: EventFormState): string => {
    const lines = [
      `Pedido de Orçamento para Evento — ${siteConfig.brand.name}`,
      `Nome: ${data.fullName}`,
    ];
    if (data.organization.trim()) {
      lines.push(`Organização / Empresa: ${data.organization.trim()}`);
    }
    lines.push(`Telefone / WhatsApp: ${data.phone}`);
    if (data.email.trim()) {
      lines.push(`E-mail: ${data.email.trim()}`);
    }
    lines.push(
      `Tipo de evento: ${data.eventType}`,
      `Data do evento: ${data.eventDate}`,
      `Local do evento: ${data.eventLocation}`,
      `Participantes estimados: ${data.estimatedAttendees}`
    );
    if (data.venueSize.trim()) {
      lines.push(`Dimensão do recinto: ${data.venueSize.trim()}`);
    }
    lines.push(`Fase de limpeza: ${data.cleaningStage}`);
    if (data.notes.trim()) {
      lines.push(`Informações adicionais: ${data.notes.trim()}`);
    }
    return lines.join('\n');
  };

  const handleChange = (field: keyof EventFormState, value: string) => {
    if (!hasTrackedStart) {
      setHasTrackedStart(true);
      trackConversionEvent('event_quotation_started', {
        eventType: form.eventType,
      });
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
        formType: 'event_quotation',
        ...form,
        source: 'iclean-events-page',
      });
      trackConversionEvent('quotation_form_submitted', {
        formType: 'event_quotation',
        eventType: form.eventType,
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
      id="orcamento-evento"
      aria-labelledby="event-quote-heading"
      className="bg-[#0C482B] text-white py-20 lg:py-28 scroll-mt-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column */}
          <div className="lg:col-span-5">
            <p className="text-sm font-semibold text-[#78D34B] mb-2">
              Orçamento Especializado para Eventos
            </p>
            <h2
              id="event-quote-heading"
              className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white leading-[1.12] text-balance mb-5"
            >
              Planeie a operação de limpeza do seu evento com antecedência.
            </h2>
            <p className="text-base text-white/85 leading-relaxed mb-8">
              Partilhe a dimensão, o tipo de evento e as fases em que pretende o
              apoio da iClean. Prepararemos uma proposta operacional ajustada ao
              seu recinto em Maputo.
            </p>

            <div className="space-y-5 pt-6 border-t border-white/15">
              <div className="flex items-start gap-3">
                <CalendarDays
                  className="w-5 h-5 text-[#78D34B] shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <div>
                  <p className="font-semibold text-sm text-white">
                    Cobertura modular ou completa
                  </p>
                  <p className="text-sm text-white/75 mt-0.5">
                    Escolha apoio antes, durante, depois do evento ou o pacote
                    completo.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Users
                  className="w-5 h-5 text-[#78D34B] shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <div>
                  <p className="font-semibold text-sm text-white">
                    Equipa dimensionada ao público
                  </p>
                  <p className="text-sm text-white/75 mt-0.5">
                    Operadores uniformizados e pontos de recolha organizados
                    conforme a lotação prevista.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-7">
            <div className="bg-white text-[#17251D] rounded-2xl p-6 sm:p-9 shadow-xl">
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
                        Pedido de orçamento para evento preparado
                      </h3>
                      <p className="text-sm text-[#17251D]/75 mt-1 leading-relaxed">
                        {submittedData.sentToBackend
                          ? 'Os detalhes do seu evento foram enviados ao servidor configurado e o resumo para WhatsApp está pronto abaixo.'
                          : 'Resumo estruturado localmente com todos os dados do seu evento, pronto para envio via WhatsApp ou cópia.'}
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
                            source: 'event_quotation_confirmation',
                          })
                        }
                        className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-[#0C482B] text-white font-semibold text-sm hover:bg-[#093821] transition-colors whitespace-nowrap"
                      >
                        <MessageCircle className="w-4 h-4" aria-hidden="true" />
                        <span>Enviar evento via WhatsApp</span>
                      </a>
                    ) : (
                      <div className="w-full rounded-lg bg-[#F7F9F7] border border-[#17251D]/15 p-3.5 text-xs text-[#17251D]/80">
                        <span className="font-semibold text-[#0C482B]">
                          Integração WhatsApp configurável:
                        </span>{' '}
                        Configure <code>VITE_WHATSAPP_NUMBER</code> ou{' '}
                        <code>siteConfig.contact.whatsappNumber</code> para
                        ativar o envio direto pelo WhatsApp.
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
                        htmlFor="event-fullName"
                        className="block text-sm font-semibold text-[#17251D] mb-1.5"
                      >
                        Nome completo <span className="text-[#0C482B]">*</span>
                      </label>
                      <input
                        id="event-fullName"
                        type="text"
                        required
                        value={form.fullName}
                        onChange={(e) => handleChange('fullName', e.target.value)}
                        placeholder="Ex.: Carlos Tembe"
                        aria-invalid={Boolean(errors.fullName)}
                        aria-describedby={
                          errors.fullName ? 'event-error-fullName' : undefined
                        }
                        className={`w-full px-4 py-3 rounded-lg border text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#0C482B] ${
                          errors.fullName
                            ? 'border-red-500'
                            : 'border-[#17251D]/20'
                        }`}
                      />
                      {errors.fullName && (
                        <p
                          id="event-error-fullName"
                          className="mt-1 text-xs text-red-700 font-medium"
                        >
                          {errors.fullName}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="event-organization"
                        className="block text-sm font-semibold text-[#17251D] mb-1.5"
                      >
                        Organização / empresa
                      </label>
                      <input
                        id="event-organization"
                        type="text"
                        value={form.organization}
                        onChange={(e) =>
                          handleChange('organization', e.target.value)
                        }
                        placeholder="Produtora, empresa ou particular"
                        className="w-full px-4 py-3 rounded-lg border border-[#17251D]/20 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#0C482B]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="event-phone"
                        className="block text-sm font-semibold text-[#17251D] mb-1.5"
                      >
                        Telefone / WhatsApp{' '}
                        <span className="text-[#0C482B]">*</span>
                      </label>
                      <input
                        id="event-phone"
                        type="tel"
                        required
                        value={form.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}
                        placeholder="+258 84 ..."
                        aria-invalid={Boolean(errors.phone)}
                        aria-describedby={
                          errors.phone ? 'event-error-phone' : undefined
                        }
                        className={`w-full px-4 py-3 rounded-lg border text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#0C482B] ${
                          errors.phone
                            ? 'border-red-500'
                            : 'border-[#17251D]/20'
                        }`}
                      />
                      {errors.phone && (
                        <p
                          id="event-error-phone"
                          className="mt-1 text-xs text-red-700 font-medium"
                        >
                          {errors.phone}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="event-email"
                        className="block text-sm font-semibold text-[#17251D] mb-1.5"
                      >
                        E-mail (opcional)
                      </label>
                      <input
                        id="event-email"
                        type="email"
                        value={form.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        placeholder="eventos@organizacao.co.mz"
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={
                          errors.email ? 'event-error-email' : undefined
                        }
                        className={`w-full px-4 py-3 rounded-lg border text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#0C482B] ${
                          errors.email
                            ? 'border-red-500'
                            : 'border-[#17251D]/20'
                        }`}
                      />
                      {errors.email && (
                        <p
                          id="event-error-email"
                          className="mt-1 text-xs text-red-700 font-medium"
                        >
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="event-type"
                        className="block text-sm font-semibold text-[#17251D] mb-1.5"
                      >
                        Tipo de evento <span className="text-[#0C482B]">*</span>
                      </label>
                      <select
                        id="event-type"
                        value={form.eventType}
                        onChange={(e) =>
                          handleChange('eventType', e.target.value)
                        }
                        className="w-full px-4 py-3 rounded-lg border border-[#17251D]/20 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#0C482B]"
                      >
                        {EVENT_TYPE_OPTIONS.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="event-date"
                        className="block text-sm font-semibold text-[#17251D] mb-1.5"
                      >
                        Data do evento <span className="text-[#0C482B]">*</span>
                      </label>
                      <input
                        id="event-date"
                        type="date"
                        required
                        value={form.eventDate}
                        onChange={(e) =>
                          handleChange('eventDate', e.target.value)
                        }
                        aria-invalid={Boolean(errors.eventDate)}
                        aria-describedby={
                          errors.eventDate ? 'event-error-date' : undefined
                        }
                        className={`w-full px-4 py-3 rounded-lg border text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#0C482B] ${
                          errors.eventDate
                            ? 'border-red-500'
                            : 'border-[#17251D]/20'
                        }`}
                      />
                      {errors.eventDate && (
                        <p
                          id="event-error-date"
                          className="mt-1 text-xs text-red-700 font-medium"
                        >
                          {errors.eventDate}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="event-location"
                        className="block text-sm font-semibold text-[#17251D] mb-1.5"
                      >
                        Local do evento{' '}
                        <span className="text-[#0C482B]">*</span>
                      </label>
                      <input
                        id="event-location"
                        type="text"
                        required
                        value={form.eventLocation}
                        onChange={(e) =>
                          handleChange('eventLocation', e.target.value)
                        }
                        placeholder="Ex.: Costa do Sol, Pavilhão, Hotel"
                        aria-invalid={Boolean(errors.eventLocation)}
                        aria-describedby={
                          errors.eventLocation
                            ? 'event-error-location'
                            : undefined
                        }
                        className={`w-full px-4 py-3 rounded-lg border text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#0C482B] ${
                          errors.eventLocation
                            ? 'border-red-500'
                            : 'border-[#17251D]/20'
                        }`}
                      />
                      {errors.eventLocation && (
                        <p
                          id="event-error-location"
                          className="mt-1 text-xs text-red-700 font-medium"
                        >
                          {errors.eventLocation}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="event-attendees"
                        className="block text-sm font-semibold text-[#17251D] mb-1.5"
                      >
                        Número estimado de participantes{' '}
                        <span className="text-[#0C482B]">*</span>
                      </label>
                      <input
                        id="event-attendees"
                        type="text"
                        required
                        value={form.estimatedAttendees}
                        onChange={(e) =>
                          handleChange('estimatedAttendees', e.target.value)
                        }
                        placeholder="Ex.: 250 convidados ou 2.000 pessoas"
                        aria-invalid={Boolean(errors.estimatedAttendees)}
                        aria-describedby={
                          errors.estimatedAttendees
                            ? 'event-error-attendees'
                            : undefined
                        }
                        className={`w-full px-4 py-3 rounded-lg border text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#0C482B] ${
                          errors.estimatedAttendees
                            ? 'border-red-500'
                            : 'border-[#17251D]/20'
                        }`}
                      />
                      {errors.estimatedAttendees && (
                        <p
                          id="event-error-attendees"
                          className="mt-1 text-xs text-red-700 font-medium"
                        >
                          {errors.estimatedAttendees}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="event-size"
                        className="block text-sm font-semibold text-[#17251D] mb-1.5"
                      >
                        Dimensão do recinto (opcional)
                      </label>
                      <input
                        id="event-size"
                        type="text"
                        value={form.venueSize}
                        onChange={(e) =>
                          handleChange('venueSize', e.target.value)
                        }
                        placeholder="Ex.: 1.500 m², jardim + tenda"
                        className="w-full px-4 py-3 rounded-lg border border-[#17251D]/20 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#0C482B]"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="event-stage"
                        className="block text-sm font-semibold text-[#17251D] mb-1.5"
                      >
                        Fase de limpeza <span className="text-[#0C482B]">*</span>
                      </label>
                      <select
                        id="event-stage"
                        value={form.cleaningStage}
                        onChange={(e) =>
                          handleChange('cleaningStage', e.target.value)
                        }
                        className="w-full px-4 py-3 rounded-lg border border-[#17251D]/20 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#0C482B]"
                      >
                        {CLEANING_STAGE_OPTIONS.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="event-notes"
                      className="block text-sm font-semibold text-[#17251D] mb-1.5"
                    >
                      Informações adicionais
                    </label>
                    <textarea
                      id="event-notes"
                      rows={3}
                      value={form.notes}
                      onChange={(e) => handleChange('notes', e.target.value)}
                      placeholder="Indique horários de montagem/desmontagem, número de sanitários ou necessidades especiais..."
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
                          <span>Solicitar orçamento para o meu evento</span>
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
