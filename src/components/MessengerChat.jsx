import { useEffect, useRef, useState } from 'react';
import { Bike, MessageCircle, Send, Sparkles, X } from 'lucide-react';
import { useLanguage } from '../context/useLanguage';

function getReplyKey(message) {
  const text = message.toLowerCase();

  if (
    text.includes('battery') ||
    text.includes('soh') ||
    text.includes('charge') ||
    text.includes('akku') ||
    text.includes('batterie') ||
    text.includes('laden') ||
    text.includes('ბატარე')
  ) {
    return 'battery';
  }
  if (
    text.includes('city') ||
    text.includes('where') ||
    text.includes('service') ||
    text.includes('location') ||
    text.includes('stadt') ||
    text.includes('wo') ||
    text.includes('standort') ||
    text.includes('ქალაქ') ||
    text.includes('ადგილ') ||
    text.includes('სად')
  ) {
    return 'cities';
  }
  if (
    text.includes('price') ||
    text.includes('cost') ||
    text.includes('€') ||
    text.includes('euro') ||
    text.includes('preis') ||
    text.includes('kosten') ||
    text.includes('ტარიფ') ||
    text.includes('ფას') ||
    text.includes('ღირებულ')
  ) {
    return 'price';
  }
  if (
    text.includes('selection') ||
    text.includes('choose') ||
    text.includes('buy') ||
    text.includes('advice') ||
    text.includes('kaufberatung') ||
    text.includes('auswahl') ||
    text.includes('kaufen') ||
    text.includes('კონსულტ') ||
    text.includes('შერჩევ') ||
    text.includes('შესაბამისობ')
  ) {
    return 'selection';
  }
  if (
    text.includes('mechanic') ||
    text.includes('hire') ||
    text.includes('inspection') ||
    text.includes('audit') ||
    text.includes('check') ||
    text.includes('mechaniker') ||
    text.includes('prüf') ||
    text.includes('pruef') ||
    text.includes('kontroll') ||
    text.includes('ექსპერტ') ||
    text.includes('მექანიკოს') ||
    text.includes('შეკეთ') ||
    text.includes('შემოწმ') ||
    text.includes('დიაგნოსტ') ||
    text.includes('მომსახურ')
  ) {
    return 'mechanic';
  }

  return 'fallback';
}

export default function MessengerChat() {
  const { t } = useLanguage();
  const copy = t.chat;
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([{ role: 'assistant', replyKey: 'greeting' }]);
  const [isTyping, setIsTyping] = useState(false);
  const messageEndRef = useRef(null);
  const replyTimerRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      messageEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [isOpen, messages, isTyping]);

  useEffect(
    () => () => {
      window.clearTimeout(replyTimerRef.current);
    },
    [],
  );

  function sendMessage(message) {
    const trimmedMessage = message.trim();
    if (!trimmedMessage || isTyping) return;

    setMessages((currentMessages) => [
      ...currentMessages,
      { role: 'user', text: trimmedMessage },
    ]);
    setInput('');
    setIsTyping(true);
    replyTimerRef.current = window.setTimeout(() => {
      setMessages((currentMessages) => [
        ...currentMessages,
        { role: 'assistant', replyKey: getReplyKey(trimmedMessage) },
      ]);
      setIsTyping(false);
    }, 650);
  }

  function handleSubmit(event) {
    event.preventDefault();
    sendMessage(input);
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      {isOpen && (
        <section
          aria-label={copy.ariaLabel}
          className="flex h-[min(620px,calc(100dvh-7rem))] w-[min(390px,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl shadow-slate-900/20"
        >
          <header className="flex items-center justify-between bg-gradient-to-r from-blue-700 via-blue-600 to-sky-500 px-5 py-4 text-white">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/15 ring-1 ring-white/25">
                <Bike aria-hidden="true" size={23} />
              </div>
              <div className="min-w-0">
                <h2 className="truncate text-base font-bold">{copy.title}</h2>
                <p className="mt-0.5 flex items-center gap-1.5 text-xs text-blue-100">
                  <span className="h-2 w-2 rounded-full bg-emerald-300" />
                  {copy.support}
                </p>
              </div>
            </div>
            <button
              aria-label={copy.close}
              className="rounded-full p-2 text-white/90 transition hover:bg-white/15 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              onClick={() => setIsOpen(false)}
              type="button"
            >
              <X aria-hidden="true" size={20} />
            </button>
          </header>

          <div
            aria-live="polite"
            className="flex-1 space-y-4 overflow-y-auto bg-slate-50 px-4 py-5"
          >
            {messages.map((message, index) => (
              <div
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                key={`${message.role}-${index}`}
              >
                <p
                  className={`max-w-[86%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
                    message.role === 'user'
                      ? 'rounded-br-md bg-blue-600 text-white'
                      : 'rounded-bl-md border border-slate-100 bg-white text-slate-700'
                  }`}
                >
                  {message.role === 'assistant' && message.replyKey
                    ? message.replyKey === 'greeting'
                      ? copy.greeting
                      : copy.replies[message.replyKey]
                    : message.text}
                </p>
              </div>
            ))}
            {isTyping && (
              <div aria-label={copy.typing} className="flex justify-start">
                <div className="flex gap-1 rounded-2xl rounded-bl-md border border-slate-100 bg-white px-4 py-3 shadow-sm">
                  <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400 [animation-delay:-0.2s]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400 [animation-delay:-0.1s]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400" />
                </div>
              </div>
            )}
            <div ref={messageEndRef} />
          </div>

          <div className="border-t border-slate-100 bg-white px-4 pb-4 pt-3">
            <div className="mb-3 flex gap-2 overflow-x-auto pb-1">
              {copy.topics.map((topic) => (
                <button
                  className="shrink-0 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700 transition hover:border-blue-300 hover:bg-blue-100 disabled:cursor-not-allowed disabled:opacity-50"
                  disabled={isTyping}
                  key={topic}
                  onClick={() => sendMessage(topic)}
                  type="button"
                >
                  {topic}
                </button>
              ))}
            </div>

            <form className="flex items-center gap-2" onSubmit={handleSubmit}>
              <label className="sr-only" htmlFor="pruffo-chat-input">
                {copy.inputLabel}
              </label>
              <input
                autoComplete="off"
                className="h-11 min-w-0 flex-1 rounded-full border border-slate-200 bg-slate-50 px-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
                id="pruffo-chat-input"
                onChange={(event) => setInput(event.target.value)}
                placeholder={copy.placeholder}
                value={input}
              />
              <button
                aria-label={copy.send}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white transition hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                disabled={!input.trim() || isTyping}
                type="submit"
              >
                <Send aria-hidden="true" size={18} />
              </button>
            </form>

            <a
              className="mt-3 flex min-h-11 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#d4af37] to-amber-300 px-4 py-2.5 text-sm font-bold text-slate-950 shadow-sm transition hover:brightness-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2"
              href="https://www.messenger.com/"
              rel="noreferrer"
              target="_blank"
            >
              <MessageCircle aria-hidden="true" size={17} />
              {copy.messenger}
            </a>
          </div>
        </section>
      )}

      <button
        aria-expanded={isOpen}
        aria-label={isOpen ? copy.close : copy.open}
        className="relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700 text-white shadow-xl shadow-blue-900/30 transition duration-200 hover:scale-105 hover:shadow-2xl focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-300 focus-visible:ring-offset-2"
        onClick={() => setIsOpen((open) => !open)}
        type="button"
      >
        {isOpen ? (
          <X aria-hidden="true" size={27} />
        ) : (
          <>
            <MessageCircle aria-hidden="true" fill="currentColor" size={29} />
            <Sparkles
              aria-hidden="true"
              className="absolute right-3 top-3 text-blue-100"
              size={11}
            />
            <span className="absolute right-0 top-0 flex h-4 w-4">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex h-4 w-4 rounded-full border-2 border-white bg-red-500" />
            </span>
          </>
        )}
      </button>
    </div>
  );
}
