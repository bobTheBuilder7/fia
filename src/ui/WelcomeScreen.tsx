import { FileText, Shield, TrendingUp, Zap } from "lucide-react";

const WelcomeScreen = () => {
  const features = [
    {
      icon: Shield,
      title: "Personal Story Analysis",
      description: "Share your relationship experiences in a safe, confidential space",
      color: "text-primary",
    },
    {
      icon: FileText,
      title: "Script Matching",
      description: "AI searches movie scripts for similar relationship patterns",
      color: "text-secondary",
    },
    {
      icon: TrendingUp,
      title: "Pattern Recognition",
      description: "Identify manipulation tactics and red flags in your relationships",
      color: "text-accent",
    },
    {
      icon: Zap,
      title: "Instant Insights",
      description: "Receive detailed analysis comparing your story to known patterns",
      color: "text-success",
    },
  ];

  return (
    <div className="flex-1 flex items-center justify-center py-12 px-4">
      <div className="max-w-3xl mx-auto text-center space-y-8">
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
            Welcome to Digital Think Tank
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Share your relationship story and our AI will search for similar patterns in movie scripts, 
            helping you identify manipulation tactics and predatory behaviors you might be experiencing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-12">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="p-6 rounded-xl bg-card border border-border shadow-soft hover:shadow-medium transition-all duration-300 animate-in fade-in slide-in-from-bottom-5"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="flex flex-col items-center text-center gap-3">
                <div className={`p-3 rounded-full bg-gradient-to-br from-primary/10 to-secondary/10 ${feature.color}`}>
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-base">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-8 flex items-center justify-center gap-2 text-xs text-muted-foreground animate-in fade-in duration-1000">
          <Shield className="h-4 w-4" />
          <span>Confidential analysis • No data stored • Secure processing</span>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
