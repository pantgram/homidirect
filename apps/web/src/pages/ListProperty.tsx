import { useState, useEffect } from "react";
import { Upload, FileCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

const ListProperty = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [images, setImages] = useState<File[]>([]);
  const [verificationDoc, setVerificationDoc] = useState<File | null>(null);

  useEffect(() => {
    // Check if user is logged in and is a property owner
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const isPropertyOwner = localStorage.getItem("isPropertyOwner") === "true";

    if (!isLoggedIn || !isPropertyOwner) {
      toast({
        title: t("listForm.accessDenied"),
        description: t("listForm.accessDeniedDesc"),
        variant: "destructive",
      });
      navigate("/list-property-info");
    }
  }, [navigate, toast, t]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.files);
      setImages([...images, ...newImages]);
    }
  };

  const handleVerificationUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setVerificationDoc(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: t("listForm.listed"),
      description: t("listForm.listedDesc"),
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="max-w-3xl mx-auto mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            {t("listForm.title")}
          </h1>
          <p className="text-lg text-muted-foreground">
            {t("listForm.subtitle")}
          </p>
        </div>

        {/* Form */}
        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle>{t("listForm.propertyDetails")}</CardTitle>
            <CardDescription>
              {t("listForm.propertyDetailsDesc")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">{t("listForm.propertyTitle")}</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Modern 2BR Apartment in Downtown"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="type">{t("listForm.propertyType")}</Label>
                    <Select required>
                      <SelectTrigger id="type">
                        <SelectValue placeholder={t("common.selectType")} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="apartment">Apartment</SelectItem>
                        <SelectItem value="house">House</SelectItem>
                        <SelectItem value="studio">Studio</SelectItem>
                        <SelectItem value="penthouse">Penthouse</SelectItem>
                        <SelectItem value="townhouse">Townhouse</SelectItem>
                        <SelectItem value="loft">Loft</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="price">{t("listForm.monthlyRent")}</Label>
                    <Input
                      id="price"
                      type="number"
                      placeholder="2,500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="location">{t("listForm.location")}</Label>
                  <Input
                    id="location"
                    placeholder="Full address"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="bedrooms">{t("listForm.bedrooms")}</Label>
                    <Select required>
                      <SelectTrigger id="bedrooms">
                        <SelectValue placeholder={t("common.select")} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1</SelectItem>
                        <SelectItem value="2">2</SelectItem>
                        <SelectItem value="3">3</SelectItem>
                        <SelectItem value="4">4</SelectItem>
                        <SelectItem value="5">5+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="bathrooms">{t("listForm.bathrooms")}</Label>
                    <Select required>
                      <SelectTrigger id="bathrooms">
                        <SelectValue placeholder={t("common.select")} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1</SelectItem>
                        <SelectItem value="1.5">1.5</SelectItem>
                        <SelectItem value="2">2</SelectItem>
                        <SelectItem value="2.5">2.5</SelectItem>
                        <SelectItem value="3">3+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="area">{t("listForm.area")}</Label>
                    <Input
                      id="area"
                      type="number"
                      placeholder="1200"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">{t("listForm.description")}</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your property, amenities, nearby facilities..."
                    className="min-h-[120px]"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="amenities">{t("listForm.amenities")}</Label>
                  <Input
                    id="amenities"
                    placeholder="e.g., Parking, Pool, Gym, Pet-friendly"
                  />
                </div>
              </div>

              {/* Image Upload */}
              <div className="space-y-4">
                <Label>{t("listForm.propertyImages")}</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label htmlFor="image-upload" className="cursor-pointer">
                    <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-sm text-foreground mb-1">
                      {t("listForm.clickUpload")}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {t("listForm.uploadDesc")}
                    </p>
                  </label>
                </div>
                {images.length > 0 && (
                  <p className="text-sm text-muted-foreground">
                    {images.length} {t("listForm.imagesSelected")}
                  </p>
                )}
              </div>

              {/* Property Verification */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Label>{t("listForm.verification")}</Label>
                  <span className="text-xs text-accent font-medium">{t("listForm.verificationRequired")}</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {t("listForm.verificationDesc")}
                </p>
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-accent transition-colors cursor-pointer">
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                    onChange={handleVerificationUpload}
                    className="hidden"
                    id="verification-upload"
                    required
                  />
                  <label htmlFor="verification-upload" className="cursor-pointer">
                    <FileCheck className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-sm text-foreground mb-1">
                      {t("listForm.clickVerification")}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {t("listForm.verificationFileDesc")}
                    </p>
                  </label>
                </div>
                {verificationDoc && (
                  <div className="flex items-center gap-2 text-sm text-accent">
                    <FileCheck className="h-4 w-4" />
                    <span>{verificationDoc.name}</span>
                  </div>
                )}
              </div>

              {/* Contact Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">
                  {t("listForm.contactInfo")}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">{t("listForm.yourName")}</Label>
                    <Input id="name" placeholder="John Doe" required />
                  </div>
                  <div>
                    <Label htmlFor="email">{t("auth.email")}</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">{t("listForm.phone")}</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+1 (555) 123-4567"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="available">{t("listForm.availableFrom")}</Label>
                    <Input id="available" type="date" required />
                  </div>
                </div>
              </div>

              <Button type="submit" className="w-full" size="lg">
                {t("listForm.submitButton")}
              </Button>
            </form>
          </CardContent>
        </Card>
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

export default ListProperty;
