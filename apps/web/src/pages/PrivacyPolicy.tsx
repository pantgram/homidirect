import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const PrivacyPolicy = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <Button asChild variant="ghost" className="mb-6">
          <Link to="/" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            {t("privacy.backToHome")}
          </Link>
        </Button>

        <h1 className="text-4xl font-bold text-foreground mb-4">{t("privacy.title")}</h1>
        <p className="text-muted-foreground mb-8">{t("privacy.lastUpdated")}</p>

        <div className="prose prose-slate dark:prose-invert max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">{t("privacy.section1.title")}</h2>
            <p className="text-muted-foreground mb-4">{t("privacy.section1.content")}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">{t("privacy.section2.title")}</h2>
            <p className="text-muted-foreground mb-4">{t("privacy.section2.content")}</p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>{t("privacy.section2.item1")}</li>
              <li>{t("privacy.section2.item2")}</li>
              <li>{t("privacy.section2.item3")}</li>
              <li>{t("privacy.section2.item4")}</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">{t("privacy.section3.title")}</h2>
            <p className="text-muted-foreground mb-4">{t("privacy.section3.content")}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">{t("privacy.section4.title")}</h2>
            <p className="text-muted-foreground mb-4">{t("privacy.section4.content")}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">{t("privacy.section5.title")}</h2>
            <p className="text-muted-foreground mb-4">{t("privacy.section5.content")}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">{t("privacy.section6.title")}</h2>
            <p className="text-muted-foreground mb-4">{t("privacy.section6.content")}</p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
