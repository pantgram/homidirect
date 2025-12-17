import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const TermsOfService = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <Button asChild variant="ghost" className="mb-6">
          <Link to="/" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            {t("terms.backToHome")}
          </Link>
        </Button>

        <h1 className="text-4xl font-bold text-foreground mb-4">{t("terms.title")}</h1>
        <p className="text-muted-foreground mb-8">{t("terms.lastUpdated")}</p>

        <div className="prose prose-slate dark:prose-invert max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">{t("terms.section1.title")}</h2>
            <p className="text-muted-foreground mb-4">{t("terms.section1.content")}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">{t("terms.section2.title")}</h2>
            <p className="text-muted-foreground mb-4">{t("terms.section2.content")}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">{t("terms.section3.title")}</h2>
            <p className="text-muted-foreground mb-4">{t("terms.section3.content")}</p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>{t("terms.section3.item1")}</li>
              <li>{t("terms.section3.item2")}</li>
              <li>{t("terms.section3.item3")}</li>
              <li>{t("terms.section3.item4")}</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">{t("terms.section4.title")}</h2>
            <p className="text-muted-foreground mb-4">{t("terms.section4.content")}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">{t("terms.section5.title")}</h2>
            <p className="text-muted-foreground mb-4">{t("terms.section5.content")}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">{t("terms.section6.title")}</h2>
            <p className="text-muted-foreground mb-4">{t("terms.section6.content")}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">{t("terms.section7.title")}</h2>
            <p className="text-muted-foreground mb-4">{t("terms.section7.content")}</p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TermsOfService;
