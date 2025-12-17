import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

const Auth = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    
    // Simulate login
    setTimeout(() => {
      setIsLoading(false);
      
      // Store login state (NOTE: This is not secure - for demo only without backend)
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userEmail", email);
      
      toast({
        title: t("auth.loginSuccess"),
        description: t("auth.welcomeBackMsg"),
      });
      navigate("/");
    }, 1000);
  };

  const handleSignup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const isTenant = formData.get("tenant") === "on";
    const isPropertyOwner = formData.get("propertyOwner") === "on";
    
    if (!isTenant && !isPropertyOwner) {
      setIsLoading(false);
      toast({
        title: t("auth.roleRequired"),
        description: t("auth.roleRequiredMsg"),
        variant: "destructive",
      });
      return;
    }
    
    // Simulate signup
    setTimeout(() => {
      setIsLoading(false);
      
      // Store user data (NOTE: This is not secure - for demo only without backend)
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userEmail", email);
      localStorage.setItem("isTenant", String(isTenant));
      localStorage.setItem("isPropertyOwner", String(isPropertyOwner));
      
      toast({
        title: t("auth.accountCreated"),
        description: t("auth.welcomeMsg"),
      });
      navigate("/");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">{t("auth.login")}</TabsTrigger>
              <TabsTrigger value="signup">{t("auth.signup")}</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <Card>
                <CardHeader>
                  <CardTitle>{t("auth.welcomeBack")}</CardTitle>
                  <CardDescription>
                    {t("auth.loginDesc")}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="login-email">{t("auth.email")}</Label>
                      <Input
                        id="login-email"
                        name="email"
                        type="email"
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="login-password">{t("auth.password")}</Label>
                      <Input
                        id="login-password"
                        type="password"
                        placeholder="••••••••"
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? t("auth.loggingIn") : t("auth.loginButton")}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="signup">
              <Card>
                <CardHeader>
                  <CardTitle>{t("auth.createAccount")}</CardTitle>
                  <CardDescription>
                    {t("auth.signupDesc")}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSignup} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="signup-name">{t("auth.fullName")}</Label>
                      <Input
                        id="signup-name"
                        type="text"
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-email">{t("auth.email")}</Label>
                      <Input
                        id="signup-email"
                        name="email"
                        type="email"
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-password">{t("auth.password")}</Label>
                      <Input
                        id="signup-password"
                        type="password"
                        placeholder="••••••••"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-confirm">{t("auth.confirmPassword")}</Label>
                      <Input
                        id="signup-confirm"
                        type="password"
                        placeholder="••••••••"
                        required
                      />
                    </div>
                    <div className="space-y-3">
                      <Label>{t("auth.iAmA")}</Label>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="tenant" name="tenant" />
                          <label
                            htmlFor="tenant"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {t("auth.tenant")}
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="propertyOwner" name="propertyOwner" />
                          <label
                            htmlFor="propertyOwner"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {t("auth.propertyOwner")}
                          </label>
                        </div>
                      </div>
                    </div>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? t("auth.creatingAccount") : t("auth.signUpButton")}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Auth;
