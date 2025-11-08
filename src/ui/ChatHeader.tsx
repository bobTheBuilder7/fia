import logo from "@/assets/logo.png";

const ChatHeader = () => {
  return (
    <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logo} alt="FIA Logo" className="h-12 w-auto" />
            <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              Digital Think Tank
            </h1>
            <p className="text-xs text-muted-foreground">AI-Powered Relationship Pattern Analysis</p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <div className="px-4 py-2 rounded-full bg-success/10 border border-success/20">
              <span className="text-sm font-medium text-success-foreground">Ready to Analyze</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default ChatHeader;
