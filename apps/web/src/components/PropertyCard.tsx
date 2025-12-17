import { MapPin, Bed, Bath, Square } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";

interface PropertyCardProps {
  image: string;
  title: string;
  location: string;
  price: string;
  bedrooms: number;
  bathrooms: number;
  area: string;
  type: string;
  featured?: boolean;
}

const PropertyCard = ({
  image,
  title,
  location,
  price,
  bedrooms,
  bathrooms,
  area,
  type,
  featured = false,
}: PropertyCardProps) => {
  const { t } = useLanguage();
  
  return (
    <Card className="group overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-elegant border-border">
      <div className="relative overflow-hidden aspect-[4/3]">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {featured && (
          <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground">
            {t("propertyCard.featured")}
          </Badge>
        )}
        <Badge className="absolute top-4 right-4 bg-card text-card-foreground backdrop-blur-sm">
          {type}
        </Badge>
      </div>
      
      <CardContent className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="font-semibold text-lg text-foreground mb-1 group-hover:text-primary transition-colors">
              {title}
            </h3>
            <div className="flex items-center text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 mr-1" />
              {location}
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-primary">${price}</div>
            <div className="text-xs text-muted-foreground">{t("propertyCard.perMonth")}</div>
          </div>
        </div>

        <div className="flex items-center gap-4 pt-4 border-t border-border">
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Bed className="h-4 w-4" />
            <span>{bedrooms} {t("propertyCard.beds")}</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Bath className="h-4 w-4" />
            <span>{bathrooms} {t("propertyCard.baths")}</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Square className="h-4 w-4" />
            <span>{area}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyCard;
