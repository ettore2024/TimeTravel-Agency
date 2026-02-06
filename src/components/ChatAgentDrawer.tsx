import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Send } from "lucide-react";
import { destinations } from "@/data/destinations";
import { usePlan } from "@/utils/planStore";

const prompts = [
  "Which era fits me?",
  "Risk level?",
  "Outfit tips",
  "Build my plan"
];

type ChatMessage = { role: "user" | "assistant"; content: string };

function getDestinationLabel(id?: string | null) {
  return destinations.find((d) => d.id === id)?.title ?? "your chosen era";
}

export function ChatAgentDrawer() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "assistant", content: "Welcome back. Tell me how you want to feel." }
  ]);
  const { plan } = usePlan();
  const apiBase = import.meta.env.VITE_API_URL ?? "";

  const context = useMemo(() => {
    const destination = getDestinationLabel(plan.destinationId);
    return `Destination: ${destination}. Comfort ${plan.preferences.comfort}/100. Discretion ${plan.preferences.discretion}/100. Pace ${plan.preferences.pace}/100. Traveler type ${plan.preferences.travelerType}. Duration ${plan.preferences.duration}.`;
  }, [plan]);

  const send = async (content: string) => {
    if (!content.trim()) return;
    const nextMessages = [...messages, { role: "user", content }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch(`${apiBase}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: nextMessages,
          context
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              "The channel is quiet right now. Try again in a moment." +
              (errorText ? ` (${errorText})` : "")
          }
        ]);
        return;
      }

      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.content || "" }
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "The signal is unstable. I'll reconnect as soon as possible."
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <motion.button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-3 rounded-full bg-[color:rgba(67,215,255,0.2)] px-5 py-3 text-xs uppercase tracking-[0.35em] shadow-glow"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
      >
        <MessageCircle size={16} />
        Time Agent
      </motion.button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-6 right-6 z-50 h-[70vh] w-[min(420px,92vw)]"
          >
            <div className="glass-strong flex h-full flex-col overflow-hidden rounded-3xl">
              <div className="flex items-center justify-between border-b border-[color:rgba(245,243,238,0.1)] px-6 py-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-[color:rgba(245,243,238,0.6)]">
                    Time Agent
                  </p>
                  <p className="text-sm">Concierge channel live</p>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="text-xs uppercase tracking-[0.3em] text-[color:rgba(245,243,238,0.6)]"
                >
                  Close
                </button>
              </div>
              <div className="flex-1 space-y-4 overflow-y-auto px-6 py-4 text-sm">
                {messages.map((message, index) => (
                  <div key={`${message.role}-${index}`} className="glass rounded-2xl p-4">
                    <p className="text-[color:rgba(245,243,238,0.6)]">
                      {message.role === "user" ? "You" : "Agent"}
                    </p>
                    <p className="mt-2 whitespace-pre-wrap">{message.content}</p>
                  </div>
                ))}
                {loading && (
                  <div className="glass rounded-2xl p-4">
                    <p className="text-[color:rgba(245,243,238,0.6)]">Agent</p>
                    <p className="mt-2">Typing...</p>
                  </div>
                )}
              </div>
              <div className="border-t border-[color:rgba(245,243,238,0.1)] px-6 py-4">
                <div className="flex flex-wrap gap-2">
                  {prompts.map((prompt) => (
                    <button
                      key={prompt}
                      type="button"
                      onClick={() => send(prompt)}
                      className="glass rounded-full px-3 py-2 text-[0.6rem] uppercase tracking-[0.3em]"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
                <form
                  className="mt-4 flex items-center gap-2"
                  onSubmit={(event) => {
                    event.preventDefault();
                    void send(input);
                  }}
                >
                  <input
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    placeholder="Ask your Time Agent"
                    className="flex-1 rounded-full border border-[color:rgba(245,243,238,0.15)] bg-[color:rgba(7,8,11,0.45)] px-4 py-3 text-xs uppercase tracking-[0.3em]"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="glass rounded-full p-3"
                  >
                    <Send size={16} />
                  </button>
                </form>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
