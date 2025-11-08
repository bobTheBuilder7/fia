import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

const ChatInput = ({ onSendMessage, isLoading }: ChatInputProps) => {
  const [input, setInput] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    onSendMessage(input);
    setInput("");
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        onSendMessage(`Analyze this script:\n\n${content}`);
      };
      reader.onerror = () => {
        toast({
          title: "Upload Error",
          description: "Failed to read the file. Please try again.",
          variant: "destructive",
        });
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="sticky bottom-0 bg-gradient-to-t from-background via-background to-transparent pt-6 pb-4">
      <div className="container mx-auto px-4">
        <form onSubmit={handleSubmit} className="relative">
          <div className="flex flex-col gap-3 bg-card rounded-2xl border border-border shadow-strong p-4">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Share your relationship story... Our AI will find similar patterns in movie scripts to help you understand what you might be experiencing."
              className="min-h-[100px] resize-none border-0 focus-visible:ring-0 text-sm"
              disabled={isLoading}
            />
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">Your story is confidential and secure</span>
              </div>
              <Button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
              >
                {isLoading ? (
                  <>
                    <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-background border-t-transparent" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Analyze
                  </>
                )}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatInput;
