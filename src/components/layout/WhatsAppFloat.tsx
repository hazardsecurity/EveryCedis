import { whatsappLink } from "@/lib/site";

export function WhatsAppFloat() {
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener"
      aria-label="Chat with Every₵edi on WhatsApp"
      className="wa-float press group fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-40 inline-flex h-14 items-center gap-2 rounded-full bg-forest pl-4 pr-5 text-white shadow-[0_14px_30px_-12px_rgba(0,51,30,0.7)] hover:bg-canopy sm:right-6"
    >
      <svg viewBox="0 0 32 32" className="h-6 w-6" aria-hidden="true">
        <path
          fill="currentColor"
          d="M16 3C8.8 3 3 8.7 3 15.8c0 2.5.7 4.8 2 6.8L3 29l6.6-2a13 13 0 0 0 6.4 1.7c7.2 0 13-5.7 13-12.8S23.2 3 16 3zm0 23.3c-2 0-4-.6-5.7-1.6l-.4-.2-3.9 1.2 1.2-3.8-.3-.4a10.5 10.5 0 0 1-1.7-5.7C5.2 10 10 5.4 16 5.4S26.8 10 26.8 15.8 22 26.3 16 26.3zm5.9-7.8c-.3-.2-1.9-1-2.2-1-.3-.2-.5-.2-.7.1l-1 1.2c-.2.2-.4.3-.7.1a8.7 8.7 0 0 1-4.3-3.7c-.3-.6.3-.5.9-1.7.1-.2 0-.4 0-.5l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.4-1.1 1.1-1.1 2.7s1.2 3.1 1.3 3.3c.2.2 2.3 3.5 5.5 4.9 2 .9 2.8.9 3.8.8.6-.1 1.9-.8 2.1-1.5.3-.7.3-1.4.2-1.5 0-.2-.3-.3-.6-.4z"
        />
      </svg>
      <span className="text-sm font-semibold">WhatsApp us</span>
    </a>
  );
}
