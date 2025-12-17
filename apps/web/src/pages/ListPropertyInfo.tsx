import { Home, DollarSign, MapPin, CheckCircle, ArrowRight } from "lucide-react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const ListPropertyInfo = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [isPropertyOwner, setIsPropertyOwner] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    const propertyOwner = localStorage.getItem("isPropertyOwner") === "true";
    setIsLoggedIn(loggedIn);
    setIsPropertyOwner(propertyOwner);
  }, []);

  const handleGetStarted = () => {
    if (!isLoggedIn) {
      navigate("/auth");
    } else if (!isPropertyOwner) {
      navigate("/auth");
    } else {
      navigate("/list-property");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="max-w-3xl mx-auto mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {t("listInfo.title")}
          </h1>
          <p className="text-lg text-muted-foreground">
            {t("listInfo.subtitle")}
          </p>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
          <Card>
            <CardHeader>
              <Home className="h-8 w-8 text-primary mb-2" />
              <CardTitle>{t("listInfo.noFees")}</CardTitle>
              <CardDescription>
                {t("listInfo.noFeesDesc")}
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <DollarSign className="h-8 w-8 text-primary mb-2" />
              <CardTitle>{t("listInfo.setPrice")}</CardTitle>
              <CardDescription>
                {t("listInfo.setPriceDesc")}
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <MapPin className="h-8 w-8 text-primary mb-2" />
              <CardTitle>{t("listInfo.directContact")}</CardTitle>
              <CardDescription>
                {t("listInfo.directContactDesc")}
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Steps */}
        <Card className="max-w-3xl mx-auto mb-12">
          <CardHeader>
            <CardTitle>{t("listInfo.howToList")}</CardTitle>
            <CardDescription>
              {t("listInfo.howToListDesc")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{t("listInfo.step1")}</h3>
                  <p className="text-sm text-muted-foreground">
                    {t("listInfo.step1Desc")}
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{t("listInfo.step2")}</h3>
                  <p className="text-sm text-muted-foreground">
                    {t("listInfo.step2Desc")}
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{t("listInfo.step3")}</h3>
                  <p className="text-sm text-muted-foreground">
                    {t("listInfo.step3Desc")}
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                  4
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{t("listInfo.step4")}</h3>
                  <p className="text-sm text-muted-foreground">
                    {t("listInfo.step4Desc")}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="text-center max-w-2xl mx-auto">
          {!isLoggedIn && (
            <div className="bg-muted/50 rounded-lg p-6 mb-6">
              <p className="text-sm text-muted-foreground mb-4">
                {t("listInfo.needRegister")}
              </p>
            </div>
          )}
          {isLoggedIn && !isPropertyOwner && (
            <div className="bg-muted/50 rounded-lg p-6 mb-6">
              <p className="text-sm text-muted-foreground mb-4">
                {t("listInfo.tenantAccount")}
              </p>
            </div>
          )}
          <Button size="lg" onClick={handleGetStarted} className="group">
            {!isLoggedIn || !isPropertyOwner ? t("listInfo.registerButton") : t("listInfo.startListing")}
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-card border-t border-border mt-20">
        <div className="container mx-auto px-4 py-8">
          <p className="text-center text-muted-foreground text-sm">
            {t("common.footer")}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ListPropertyInfo;
