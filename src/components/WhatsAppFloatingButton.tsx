import React, {useState} from 'react';
import {MessageCircle, X} from 'lucide-react';
import {siteConfig} from '../config/site';
import {trackConversionEvent} from '../utils/analytics';
import {buildWhatsAppUrl} from '../utils/whatsapp';

interface WhatsAppFloatingButtonProps {
  onFallbackQuote: () => void;
}

export const WhatsAppFloatingButton: React.FC<WhatsAppFloatingButtonProps> = ({
  onFallbackQuote,
}) => {
  const [showConfigNotice, setShowConfigNotice] = useState(false);
  const directWhatsappUrl = buildWhatsAppUrl(
    siteConfig.contact.defaultWhatsappMessage
  );

  if (directWhatsappUrl) {
    return (
      <a
        href={directWhatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() =>
          trackConversionEvent('whatsapp_clicked', {source: 'floating_button'})
        }
        aria-label="Contactar a iClean por WhatsApp"
        className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#0C482B] text-white border border-[#78D34B]/40 shadow-lg hover:bg-[#093A22] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#78D34B]"
      >
        <MessageCircle className="w-5 h-5 text-[#78D34B]" aria-hidden="true" />
        <span className="hidden sm:inline text-sm font-semibold whitespace-nowrap">
          WhatsApp
        </span>
      </a>
    );
  }

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2">
      {showConfigNotice && (
        <div
          role="dialog"
          aria-label="Contacto rápido WhatsApp"
          className="w-72 sm:w-80 bg-white text-[#17251D] rounded-xl p-4 shadow-xl border border-[#17251D]/15"
        >
          <div className="flex items-start justify-between gap-2 mb-2">
            <p className="font-display text-sm font-bold text-[#0C482B]">
              Atendimento WhatsApp iClean
            </p>
            <button
              type="button"
              onClick={() => setShowConfigNotice(false)}
              aria-label="Fechar janela WhatsApp"
              className="text-[#17251D]/60 hover:text-[#17251D] p-1 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <p className="text-xs text-[#17251D]/75 leading-relaxed mb-3">
            O número oficial de WhatsApp pode ser ativado em{' '}
            <code>VITE_WHATSAPP_NUMBER</code> ou <code>src/config/site.ts</code>.
            Entretanto, pode preparar o seu pedido diretamente no formulário.
          </p>
          <button
            type="button"
            onClick={() => {
              setShowConfigNotice(false);
              onFallbackQuote();
            }}
            className="w-full py-2.5 px-4 rounded-lg bg-[#0C482B] text-white text-xs font-semibold hover:bg-[#093A22] transition-colors cursor-pointer"
          >
            Ir para pedido de orçamento
          </button>
        </div>
      )}

      <button
        type="button"
        onClick={() => {
          trackConversionEvent('whatsapp_clicked', {
            source: 'floating_button_notice',
          });
          setShowConfigNotice((prev) => !prev);
        }}
        aria-expanded={showConfigNotice}
        aria-label="Abrir contacto rápido WhatsApp"
        className="inline-flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#0C482B] text-white border border-[#78D34B]/40 shadow-lg hover:bg-[#093A22] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#78D34B]"
      >
        <MessageCircle className="w-5 h-5 text-[#78D34B]" aria-hidden="true" />
        <span className="hidden sm:inline text-sm font-semibold whitespace-nowrap">
          WhatsApp
        </span>
      </button>
    </div>
  );
};
