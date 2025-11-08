import { MessageSquare, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface ChatHistory {
  id: string;
  title: string;
  timestamp: Date;
}

interface SidebarProps {
  chatHistory: ChatHistory[];
  currentChatId?: string;
  onSelectChat: (id: string) => void;
  onNewChat: () => void;
  onDeleteChat: (id: string) => void;
}

const Sidebar = ({ chatHistory, currentChatId, onSelectChat, onNewChat, onDeleteChat }: SidebarProps) => {
  return (
    <aside className="w-64 bg-card border-r border-border flex flex-col h-screen">
      <div className="p-4 border-b border-border">
        <Button
          onClick={onNewChat}
          className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Conversation
        </Button>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-2">
          {chatHistory.length === 0 ? (
            <div className="text-center text-muted-foreground text-sm py-8">
              No conversations yet
            </div>
          ) : (
            chatHistory.map((chat) => (
              <div
                key={chat.id}
                className={cn(
                  "group relative flex items-center gap-2 p-3 rounded-lg cursor-pointer transition-all duration-200",
                  currentChatId === chat.id
                    ? "bg-primary/10 border border-primary/20"
                    : "hover:bg-muted/50"
                )}
                onClick={() => onSelectChat(chat.id)}
              >
                <MessageSquare className="h-4 w-4 text-primary shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{chat.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {chat.timestamp.toLocaleDateString()}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteChat(chat.id);
                  }}
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            ))
          )}
        </div>
      </ScrollArea>

      <div className="p-4 border-t border-border">
        <Button variant="outline" className="w-full">
          Sign Out
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;
