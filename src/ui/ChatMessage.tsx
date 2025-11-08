import { AlertTriangle, CheckCircle, Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  message: {
    id: string;
    role: "user" | "assistant";
    content: string;
    analysis?: {
      findings: Array<{
        type: "warning" | "danger" | "info";
        title: string;
        description: string;
      }>;
    };
  };
}

const ChatMessage = ({ message }: ChatMessageProps) => {
  const isUser = message.role === "user";

  return (
    <div
      className={cn(
        "flex w-full mb-6 animate-in fade-in slide-in-from-bottom-3 duration-500",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "max-w-[80%] rounded-2xl px-5 py-4 shadow-medium transition-all duration-300 hover:shadow-strong",
          isUser
            ? "bg-gradient-to-br from-primary to-primary-glow text-primary-foreground"
            : "bg-card border border-border"
        )}
      >
        <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>

        {message.analysis && (
          <div className="mt-4 space-y-3 pt-4 border-t border-white/10">
            <h4 className="font-semibold text-sm flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Analysis Results
            </h4>
            {message.analysis.findings.map((finding, idx) => (
              <div
                key={idx}
                className={cn(
                  "p-3 rounded-lg border",
                  finding.type === "danger" && "bg-destructive/10 border-destructive/30",
                  finding.type === "warning" && "bg-accent/10 border-accent/30",
                  finding.type === "info" && "bg-secondary/10 border-secondary/30"
                )}
              >
                <div className="flex items-start gap-2">
                  {finding.type === "danger" && <AlertTriangle className="h-4 w-4 text-destructive mt-0.5" />}
                  {finding.type === "warning" && <Info className="h-4 w-4 text-accent mt-0.5" />}
                  {finding.type === "info" && <CheckCircle className="h-4 w-4 text-secondary mt-0.5" />}
                  <div className="flex-1">
                    <h5 className="font-semibold text-xs mb-1">{finding.title}</h5>
                    <p className="text-xs opacity-90">{finding.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
