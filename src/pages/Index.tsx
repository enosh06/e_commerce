import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ArrowLeftRight, Code2 } from "lucide-react";

const Index = () => {
  const [num1, setNum1] = useState<string>("42");
  const [num2, setNum2] = useState<string>("89");
  const [isSwapping, setIsSwapping] = useState(false);
  const [showCode, setShowCode] = useState(false);

  const handleSwap = () => {
    setIsSwapping(true);
    
    setTimeout(() => {
      const temp = num1;
      setNum1(num2);
      setNum2(temp);
      setIsSwapping(false);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Number Swapper
          </h1>
          <p className="text-lg text-muted-foreground">
            Watch the magic of variable swapping in action
          </p>
        </div>

        {/* Main Card */}
        <Card className="p-8 backdrop-blur-sm bg-card/50 border-2 shadow-2xl">
          <div className="space-y-8">
            {/* Number Inputs */}
            <div className="grid md:grid-cols-2 gap-6 items-center">
              <div className="space-y-3">
                <label className="text-sm font-semibold text-foreground">
                  First Number
                </label>
                <Input
                  type="number"
                  value={num1}
                  onChange={(e) => setNum1(e.target.value)}
                  className={`text-3xl h-20 text-center font-bold bg-input border-2 transition-all duration-500 ${
                    isSwapping ? "scale-95 opacity-50" : "scale-100 opacity-100"
                  }`}
                  placeholder="Enter number"
                />
              </div>

              <div className="space-y-3">
                <label className="text-sm font-semibold text-foreground">
                  Second Number
                </label>
                <Input
                  type="number"
                  value={num2}
                  onChange={(e) => setNum2(e.target.value)}
                  className={`text-3xl h-20 text-center font-bold bg-input border-2 transition-all duration-500 ${
                    isSwapping ? "scale-95 opacity-50" : "scale-100 opacity-100"
                  }`}
                  placeholder="Enter number"
                />
              </div>
            </div>

            {/* Swap Button */}
            <div className="flex justify-center">
              <Button
                onClick={handleSwap}
                disabled={isSwapping}
                size="lg"
                className="h-16 px-12 text-lg font-semibold bg-gradient-to-r from-primary to-secondary hover:shadow-elegant transition-all duration-300 hover:scale-105 disabled:scale-100"
              >
                <ArrowLeftRight
                  className={`mr-3 h-6 w-6 transition-transform duration-500 ${
                    isSwapping ? "rotate-180" : "rotate-0"
                  }`}
                />
                {isSwapping ? "Swapping..." : "Swap Numbers"}
              </Button>
            </div>

            {/* Code Toggle */}
            <div className="pt-4 border-t">
              <Button
                variant="ghost"
                onClick={() => setShowCode(!showCode)}
                className="w-full justify-center text-muted-foreground hover:text-foreground"
              >
                <Code2 className="mr-2 h-5 w-5" />
                {showCode ? "Hide" : "Show"} the Code
              </Button>

              {showCode && (
                <div className="mt-4 p-5 bg-muted/50 rounded-lg border-2 border-border font-mono text-sm space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                  <div className="text-accent font-semibold">// JavaScript Swap Logic:</div>
                  <div className="text-foreground/80">
                    <span className="text-destructive">const</span> temp = num1;
                  </div>
                  <div className="text-foreground/80">
                    num1 = num2;
                  </div>
                  <div className="text-foreground/80">
                    num2 = temp;
                  </div>
                  <div className="pt-3 text-muted-foreground text-xs border-t border-border/50 mt-4">
                    Using a temporary variable to safely swap values
                  </div>
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* Info Cards */}
        <div className="grid md:grid-cols-3 gap-4">
          <Card className="p-4 bg-card/30 backdrop-blur-sm border hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-primary">3</div>
              <div className="text-sm text-muted-foreground">Lines of Code</div>
            </div>
          </Card>
          <Card className="p-4 bg-card/30 backdrop-blur-sm border hover:border-secondary/50 transition-all duration-300 hover:shadow-lg">
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-secondary">1</div>
              <div className="text-sm text-muted-foreground">Temp Variable</div>
            </div>
          </Card>
          <Card className="p-4 bg-card/30 backdrop-blur-sm border hover:border-accent/50 transition-all duration-300 hover:shadow-lg">
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-accent">∞</div>
              <div className="text-sm text-muted-foreground">Possibilities</div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
