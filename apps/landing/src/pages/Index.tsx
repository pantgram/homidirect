const Index = () => {
  return (
    <main className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--primary)/0.08),transparent_70%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.3)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.3)_1px,transparent_1px)] bg-[size:60px_60px]" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          {/* Logo */}
          <div className="animate-fade-up flex items-center justify-center gap-3 mb-12">
            <div className="w-200 h-100  flex items-center justify-center">
              <img src="/logo.png" alt="HomiDirect" className="h-20 w-30" />
            </div>
            <span className="text-5xl font-bold text-foreground">
              HomiDirect
            </span>
          </div>

          {/* Badge */}
          <div className="animate-fade-up-delay-1 inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full border border-accent/20 mb-8">
            <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
            <span className="text-sm text-accent font-medium">
              Launching Soon
            </span>
          </div>

          {/* Headline */}
          <h1 className="animate-fade-up-delay-1 text-4xl md:text-6xl font-bold text-foreground leading-tight mb-6">
            A new way to rent homes
            <br />
            Is coming
          </h1>

          {/* Description */}
          <p className="animate-fade-up-delay-2 text-lg md:text-xl text-muted-foreground mb-10 max-w-lg mx-auto leading-relaxed">
            Skip the middlemen. Connect directly with property owners and find
            your perfect rental faster, easier, and more affordable.
          </p>

          {/* Footer */}
          <p className="animate-fade-up-delay-3 text-sm text-muted-foreground">
            © 2025 HomiDirect. All rights reserved.
          </p>
        </div>
      </div>
    </main>
  );
};

export default Index;
