import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { availabilitySlotsApi } from "@/api/availability-slots";
import { Loader2 } from "lucide-react";

interface AvailabilitySlotFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  listingId: number;
  landlordId: number;
  onSuccess?: () => void;
}

const AvailabilitySlotForm = ({
  open,
  onOpenChange,
  listingId,
  landlordId,
  onSuccess,
}: AvailabilitySlotFormProps) => {
  const { toast } = useToast();
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!date || !startTime || !endTime) {
      toast({
        title: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    const startDateTime = new Date(`${date}T${startTime}`);
    const endDateTime = new Date(`${date}T${endTime}`);

    if (endDateTime <= startDateTime) {
      toast({
        title: "End time must be after start time",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);
    try {
      await availabilitySlotsApi.create({
        listingId,
        landlordId,
        startTime: startDateTime.toISOString(),
        endTime: endDateTime.toISOString(),
      });

      toast({
        title: "Availability slot added",
      });

      setDate("");
      setStartTime("");
      setEndTime("");
      onOpenChange(false);
      onSuccess?.();
    } catch (err) {
      console.error("Failed to create availability slot:", err);
      toast({
        title: "Failed to add availability slot",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Availability Slot</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div>
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="startTime">Start Time</Label>
              <Input
                id="startTime"
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="endTime">End Time</Label>
              <Input
                id="endTime"
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={submitting}>
              {submitting && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
              Add Slot
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AvailabilitySlotForm;
