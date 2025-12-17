import { useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import Navigation from "@/components/Navigation";
import PropertyCard from "@/components/PropertyCard";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { useLanguage } from "@/contexts/LanguageContext";
import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";
import property4 from "@/assets/property-4.jpg";

const SearchResults = () => {
  const { t } = useLanguage();
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([500, 5000]);

  const properties = [
    {
      image: property1,
      title: "Modern Downtown Apartment",
      location: "Downtown, City Center",
      price: "2,500",
      bedrooms: 2,
      bathrooms: 2,
      area: "1,200 sq ft",
      type: "Apartment",
      featured: true,
    },
    {
      image: property2,
      title: "Cozy Studio Near University",
      location: "University District",
      price: "1,200",
      bedrooms: 1,
      bathrooms: 1,
      area: "650 sq ft",
      type: "Studio",
    },
    {
      image: property3,
      title: "Spacious Family House",
      location: "Suburban Area",
      price: "3,800",
      bedrooms: 4,
      bathrooms: 3,
      area: "2,500 sq ft",
      type: "House",
      featured: true,
    },
    {
      image: property4,
      title: "Luxury Penthouse",
      location: "Waterfront",
      price: "5,500",
      bedrooms: 3,
      bathrooms: 2,
      area: "2,000 sq ft",
      type: "Penthouse",
    },
    {
      image: property1,
      title: "Charming Townhouse",
      location: "Historic District",
      price: "2,200",
      bedrooms: 3,
      bathrooms: 2,
      area: "1,800 sq ft",
      type: "Townhouse",
    },
    {
      image: property2,
      title: "Modern Loft",
      location: "Arts District",
      price: "2,800",
      bedrooms: 2,
      bathrooms: 1,
      area: "1,400 sq ft",
      type: "Loft",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        {/* Search Bar */}
        <div className="bg-card rounded-lg shadow-card p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder={t("search.placeholder")}
                className="pl-10"
                defaultValue="Downtown"
              />
            </div>
            <Button 
              variant="outline" 
              onClick={() => setShowFilters(!showFilters)}
              className="md:w-auto"
            >
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              {t("search.filters")}
            </Button>
            <Button className="md:w-auto">{t("search.search")}</Button>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-border">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    {t("search.propertyType")}
                  </label>
                  <Select defaultValue="all">
                    <SelectTrigger>
                      <SelectValue placeholder={t("common.selectType")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">{t("search.allTypes")}</SelectItem>
                      <SelectItem value="apartment">{t("search.apartment")}</SelectItem>
                      <SelectItem value="house">{t("search.house")}</SelectItem>
                      <SelectItem value="studio">{t("search.studio")}</SelectItem>
                      <SelectItem value="penthouse">{t("search.penthouse")}</SelectItem>
                      <SelectItem value="townhouse">{t("search.townhouse")}</SelectItem>
                      <SelectItem value="loft">{t("search.loft")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    {t("search.bedrooms")}
                  </label>
                  <Select defaultValue="all">
                    <SelectTrigger>
                      <SelectValue placeholder={t("search.bedrooms")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">{t("search.any")}</SelectItem>
                      <SelectItem value="1">1+</SelectItem>
                      <SelectItem value="2">2+</SelectItem>
                      <SelectItem value="3">3+</SelectItem>
                      <SelectItem value="4">4+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    {t("search.bathrooms")}
                  </label>
                  <Select defaultValue="all">
                    <SelectTrigger>
                      <SelectValue placeholder={t("search.bathrooms")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">{t("search.any")}</SelectItem>
                      <SelectItem value="1">1+</SelectItem>
                      <SelectItem value="2">2+</SelectItem>
                      <SelectItem value="3">3+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="mt-6">
                <label className="text-sm font-medium text-foreground mb-4 block">
                  {t("search.priceRange")}: ${priceRange[0]} - ${priceRange[1]}
                </label>
                <Slider
                  min={0}
                  max={10000}
                  step={100}
                  value={priceRange}
                  onValueChange={setPriceRange}
                  className="w-full"
                />
              </div>
            </div>
          )}
        </div>

        {/* Results Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              {t("search.results")}
            </h1>
            <p className="text-muted-foreground">
              {t("search.foundProperties").replace("{count}", properties.length.toString()).replace("{location}", "Downtown")}
            </p>
          </div>
          <Select defaultValue="featured">
            <SelectTrigger className="w-[200px] mt-4 sm:mt-0">
              <SelectValue placeholder={t("search.sortBy")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">{t("search.featuredFirst")}</SelectItem>
              <SelectItem value="price-low">{t("search.priceLowToHigh")}</SelectItem>
              <SelectItem value="price-high">{t("search.priceHighToLow")}</SelectItem>
              <SelectItem value="newest">{t("search.newestFirst")}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Property Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {properties.map((property, index) => (
            <PropertyCard key={index} {...property} />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center gap-2">
          <Button variant="outline">{t("search.previous")}</Button>
          <Button variant="default">1</Button>
          <Button variant="outline">2</Button>
          <Button variant="outline">3</Button>
          <Button variant="outline">{t("search.next")}</Button>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SearchResults;
