import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Home, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { VerificationUpload } from "@/components/verification";
import { useListing } from "@/hooks";
import { useAuth } from "@/contexts/AuthContext";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function ListingVerification() {
  const { listingId } = useParams<{ listingId: string }>();
  const navigate = useNavigate();
  const { user, isAuthenticated, isLoading: isAuthLoading } = useAuth();

  const listingIdNum = listingId ? parseInt(listingId, 10) : 0;
  const { data: listing, isLoading: isListingLoading } = useListing(listingIdNum);

  // Check authentication
  if (!isAuthLoading && !isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1 container mx-auto px-4 py-8">
          <Alert variant="destructive">
            <AlertTitle>Authentication Required</AlertTitle>
            <AlertDescription>
              Please{" "}
              <Link to="/auth" className="underline font-medium">
                sign in
              </Link>{" "}
              to access verification.
            </AlertDescription>
          </Alert>
        </main>
        <Footer />
      </div>
    );
  }

  // Check if user is a landlord
  if (!isAuthLoading && user?.role !== "LANDLORD" && user?.role !== "ADMIN") {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1 container mx-auto px-4 py-8">
          <Alert variant="destructive">
            <AlertTitle>Access Denied</AlertTitle>
            <AlertDescription>
              Only landlords can access the verification page.
            </AlertDescription>
          </Alert>
        </main>
        <Footer />
      </div>
    );
  }

  // Loading state
  if (isAuthLoading || isListingLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto space-y-6">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-64 w-full" />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Invalid listing ID
  if (!listingIdNum || !listing) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1 container mx-auto px-4 py-8">
          <Alert variant="destructive">
            <AlertTitle>Listing Not Found</AlertTitle>
            <AlertDescription>
              The listing you're looking for doesn't exist or has been removed.
            </AlertDescription>
          </Alert>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <Navigation />

      <main className="flex-1 container mx-auto px-4 py-6 sm:py-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="mb-6 sm:mb-8">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(-1)}
              className="mb-4 -ml-2"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>

            <div className="flex items-start gap-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 shrink-0">
                <ShieldCheck className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                  Property Verification
                </h1>
                <p className="text-muted-foreground mt-1">
                  Verify your property ownership to build trust with potential tenants
                </p>
              </div>
            </div>
          </div>

          {/* Property Info Summary */}
          <div className="flex items-center gap-3 p-4 rounded-lg bg-card border mb-6">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-muted shrink-0">
              <Home className="w-5 h-5 text-muted-foreground" />
            </div>
            <div className="min-w-0">
              <p className="font-medium truncate">{listing.title}</p>
              <p className="text-sm text-muted-foreground">{listing.city}</p>
            </div>
          </div>

          {/* Verification Upload Component */}
          <VerificationUpload listingId={listingIdNum} listingTitle={listing.title} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
