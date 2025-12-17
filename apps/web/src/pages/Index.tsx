import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import PropertyCard from "@/components/PropertyCard";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Users, TrendingDown } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";
import property4 from "@/assets/property-4.jpg";

const Index = () => {
  const { t } = useLanguage();

  const properties = [
    {
      id: 1,
      image: property1,
      title: "Modern Downtown Loft",
      location: "Downtown, New York",
      price: "2,500",
      bedrooms: 2,
      bathrooms: 2,
      area: "1,200 sqft",
      type: "Apartment",
      featured: true,
    },
    {
      id: 2,
      image: property2,
      title: "Cozy Studio Apartment",
      location: "Brooklyn, New York",
      price: "1,400",
      bedrooms: 1,
      bathrooms: 1,
      area: "550 sqft",
      type: "Studio",
      featured: false,
    },
    {
      id: 3,
      image: property3,
      title: "Luxury Penthouse",
      location: "Manhattan, New York",
      price: "5,200",
      bedrooms: 3,
      bathrooms: 3,
      area: "2,400 sqft",
      type: "Penthouse",
      featured: true,
    },
    {
      id: 4,
      image: property4,
      title: "Spacious Family Home",
      location: "Queens, New York",
      price: "3,100",
      bedrooms: 3,
      bathrooms: 2,
      area: "1,800 sqft",
      type: "Apartment",
      featured: false,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />

      {/* Featured Properties Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">
                {t("home.featuredProperties")}
              </h2>
              <p className="text-muted-foreground">{t("home.handPicked")}</p>
            </div>
            <Button
              variant="ghost"
              className="hidden md:flex items-center gap-2"
            >
              {t("home.viewAll")}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {properties.map((property) => (
              <PropertyCard key={property.id} {...property} />
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Button variant="outline" className="w-full">
              {t("home.viewAllProperties")}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              {t("home.whyChoose")}
            </h2>
            <p className="text-muted-foreground">{t("home.whyChooseDesc")}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-xl bg-card border border-border hover:shadow-card-hover transition-shadow">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingDown className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {t("home.noAgentFees")}
              </h3>
              <p className="text-muted-foreground">
                {t("home.noAgentFeesDesc")}
              </p>
            </div>
            <div className="text-center p-6 rounded-xl bg-card border border-border hover:shadow-card-hover transition-shadow">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {t("home.verifiedListings")}
              </h3>
              <p className="text-muted-foreground">
                {t("home.verifiedListingsDesc")}
              </p>
            </div>
            <div className="text-center p-6 rounded-xl bg-card border border-border hover:shadow-card-hover transition-shadow">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {t("home.directCommunication")}
              </h3>
              <p className="text-muted-foreground">
                {t("home.directCommunicationDesc")}
              </p>
            </div>
            heroImage
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              {t("home.readyToFind")}
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-8">
              {t("home.joinThousands")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="accent" className="text-base">
                <Link to="/search">{t("home.startSearching")}</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="bg-background/10 border-primary-foreground/20 text-primary-foreground hover:bg-background/20 text-base"
              >
                <Link to="/list-property-info">
                  {t("home.listYourProperty")}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
