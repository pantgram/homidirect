import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { availabilitySlotsApi } from "@/api/availability-slots";
import type { AvailabilitySlot } from "@/api/types";
import AvailabilitySlotForm from "@/components/AvailabilitySlotForm";
import { Calendar, Clock, Trash2, Plus, Loader2 } from "lucide-react";
import { format, isPast } from "date-fns";

interface AvailabilitySlotsManagerProps {
  listingId: number;
  landlordId: number;
}

const AvailabilitySlotsManager = ({
  listingId,
  landlordId,
}: AvailabilitySlotsManagerProps) => {
  const { toast } = useToast();
  const [slots, setSlots] = useState<AvailabilitySlot[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const fetchSlots = async () => {
    setLoading(true);
    try {
      const data = await availabilitySlotsApi.getByListingId(listingId);
      setSlots(data);
    } catch (err) {
      console.error("Failed to fetch availability slots:", err);
      toast({
        title: "Failed to load availability slots",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSlots();
  }, [listingId]);

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this slot?")) {
      return;
    }

    setDeletingId(id);
    try {
      await availabilitySlotsApi.delete(id);
      setSlots((prev) => prev.filter((s) => s.id !== id));
      toast({
        title: "Slot deleted",
      });
    } catch (err) {
      console.error("Failed to delete slot:", err);
      toast({
        title: "Failed to delete slot",
        variant: "destructive",
      });
    } finally {
      setDeletingId(null);
    }
  };

  const formatSlotDateTime = (startTime: string, endTime: string) => {
    const start = new Date(startTime);
    const end = new Date(endTime);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const isToday = start.toDateString() === today.toDateString();
    
    return {
      date: isToday ? "Today" : format(start, "MMM d, yyyy"),
      time: `${format(start, "HH:mm")} - ${format(end, "HH:mm")}`,
    };
  };

  const pastSlots = slots.filter((slot) => isPast(new Date(slot.endTime)));
  const upcomingSlots = slots.filter((slot) => !isPast(new Date(slot.endTime)));

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Availability Slots
        </CardTitle>
        <Button size="sm" onClick={() => setShowForm(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Slot
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {loading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : slots.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No availability slots added yet</p>
            <p className="text-sm mt-1">
              Add time slots when you're available for property viewings
            </p>
          </div>
        ) : (
          <>
            {upcomingSlots.length > 0 && (
              <div>
                <h4 className="font-semibold mb-3 text-sm">Upcoming Slots</h4>
                <div className="space-y-2">
                  {upcomingSlots.map((slot) => {
                    const { date, time } = formatSlotDateTime(
                      slot.startTime,
                      slot.endTime
                    );
                    return (
                      <div
                        key={slot.id}
                        className="flex items-center justify-between p-3 border rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <Clock className="h-4 w-4 text-primary" />
                          <div>
                            <p className="font-medium">{time}</p>
                            <p className="text-sm text-muted-foreground">{date}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {slot.isBooked && (
                            <Badge className="bg-yellow-500/10 text-yellow-600">
                              Booked
                            </Badge>
                          )}
                          {!slot.isBooked && (
                            <Badge className="bg-green-500/10 text-green-600">
                              Available
                            </Badge>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(slot.id)}
                            disabled={deletingId === slot.id || slot.isBooked}
                          >
                            {deletingId === slot.id ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <Trash2 className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {pastSlots.length > 0 && (
              <div className="mt-6">
                <h4 className="font-semibold mb-3 text-sm">Past Slots</h4>
                <div className="space-y-2">
                  {pastSlots.map((slot) => {
                    const { date, time } = formatSlotDateTime(
                      slot.startTime,
                      slot.endTime
                    );
                    return (
                      <div
                        key={slot.id}
                        className="flex items-center justify-between p-3 border rounded-lg opacity-60"
                      >
                        <div className="flex items-center gap-3">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="font-medium">{time}</p>
                            <p className="text-sm text-muted-foreground">{date}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {slot.isBooked && (
                            <Badge className="bg-yellow-500/10 text-yellow-600">
                              Booked
                            </Badge>
                          )}
                          {!slot.isBooked && (
                            <Badge className="bg-gray-500/10 text-gray-600">
                              Unbooked
                            </Badge>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </>
        )}
      </CardContent>

      {showForm && (
        <AvailabilitySlotForm
          open={showForm}
          onOpenChange={setShowForm}
          listingId={listingId}
          landlordId={landlordId}
          onSuccess={fetchSlots}
        />
      )}
    </Card>
  );
};

export default AvailabilitySlotsManager;
