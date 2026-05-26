import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Calendar, Music, Ticket, X } from 'lucide-react';

/**
 * Events Component
 * 
 * Displays exclusive events and brand experiences.
 * Each event can be clicked to open a detailed modal with more information.
 * It uses i18next for localized titles and descriptions.
 * 
 * @returns {JSX.Element} The rendered events section
 */
export const Events = () => {
  const { t } = useTranslation();
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  const events = [
    { Icon: Calendar, title: t('HOME.EVENTS_EVENT1_TITLE'), desc: t('HOME.EVENTS_EVENT1_DESC'), longDesc: t('HOME.EVENTS_EVENT1_LONG_DESC'), color: 'text-blue-400' },
    { Icon: Music, title: t('HOME.EVENTS_EVENT2_TITLE'), desc: t('HOME.EVENTS_EVENT2_DESC'), longDesc: t('HOME.EVENTS_EVENT2_LONG_DESC'), color: 'text-purple-400' },
    { Icon: Ticket, title: t('HOME.EVENTS_EVENT3_TITLE'), desc: t('HOME.EVENTS_EVENT3_DESC'), longDesc: t('HOME.EVENTS_EVENT3_LONG_DESC'), color: 'text-green-400' }
  ];

  return (
    <section className="py-32 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-500/5 rounded-full blur-[120px] -z-10"></div>
      
      <div className="container mx-auto px-6">
        <div className="text-center mb-20 space-y-4">
          <div className="inline-block px-4 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 font-bold text-xs tracking-widest uppercase">
            {t('HOME.EVENTS_SUBTITLE')}
          </div>
          <h2 className="text-5xl md:text-7xl font-figtree font-black tracking-tight leading-none">
            {t('HOME.EVENTS_TITLE')}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {events.map((item, idx) => (
            <div key={idx} className="glass p-12 rounded-[2.5rem] flex flex-col items-center text-center group hover:scale-[1.05] transition-all duration-500 shadow-2xl border-white/10">
              <div className="p-6 bg-white/5 rounded-2xl mb-8 group-hover:rotate-12 transition-transform">
                <item.Icon className={item.color} size={48} />
              </div>
              <h3 className="text-2xl font-black mb-4 font-figtree tracking-tight">{item.title}</h3>
              <p className="opacity-50 font-bold uppercase text-xs tracking-widest">{item.desc}</p>
              <button 
                onClick={() => setSelectedEvent(item)}
                className="mt-8 text-sm font-black text-blue-500 hover:text-blue-400 transition-colors"
              >
                {t('HOME.EVENTS_MORE_INFO')}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Event Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 z-[110] bg-black/90 flex items-center justify-center p-6 animate-in fade-in duration-300">
          <div className="glass max-w-2xl w-full p-12 rounded-[3rem] relative animate-in zoom-in-95 duration-300 border-white/20">
            <button 
              onClick={() => setSelectedEvent(null)}
              className="absolute top-8 right-8 p-2 hover:bg-white/10 rounded-full transition-colors text-white"
            >
              <X size={32} />
            </button>
            
            <div className="flex flex-col items-center text-center space-y-8">
              <div className="p-8 bg-white/5 rounded-3xl">
                <selectedEvent.Icon className={selectedEvent.color} size={64} />
              </div>
              <div className="space-y-4">
                <h3 className="text-4xl md:text-5xl font-black font-figtree tracking-tight text-white">{selectedEvent.title}</h3>
                <p className="text-blue-400 font-black uppercase tracking-[0.2em] text-sm">{selectedEvent.desc}</p>
              </div>
              <p className="text-xl leading-relaxed opacity-70 font-medium text-white/80">
                {selectedEvent.longDesc}
              </p>
              <button 
                onClick={() => setSelectedEvent(null)}
                className="px-10 py-4 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-2xl transition-all hover:scale-105 active:scale-95 shadow-xl shadow-blue-500/20"
              >
                {t('COMMON.CLOSE')}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};