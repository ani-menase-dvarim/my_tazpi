import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
} from "@mui/material";
import { Database } from "../../../database.types";
import { Dispatch, FC, SetStateAction, ReactNode } from "react";
import { CalendarIcon } from "@mui/x-date-pickers";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { PeopleOutline } from "@mui/icons-material";

// 🟢 קומפוננטה גנרית לשורה עם אייקון וטקסט
interface InfoRowProps {
  icon: ReactNode;
  label: string;
  value: string | number | null;
}

const InfoRow: FC<InfoRowProps> = ({ icon, label, value }) => (
  <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
    {icon}
    <Box>
      <Typography sx={{ fontWeight: "bold" }}>{label}</Typography>
      <Typography>{value}</Typography>
    </Box>
  </Box>
);

interface ActivityDialogProps {
  open: boolean;
  onClose: Dispatch<SetStateAction<boolean>>;
  event: Database["public"]["Tables"]["tazpi_events"]["Row"];
}

export const ActivityDialog: FC<ActivityDialogProps> = ({
  open,
  onClose,
  event,
}) => {
  // אייקונים עם רקע ועיצוב אחיד
  const iconStyle = {
    backgroundColor: "#F8CA3940",
    borderRadius: "50%",
    color: "#F8CA39",
    width: 40,
    height: 40,
    padding: 1,
  };

  return (
    <Dialog open={open} onClose={() => onClose(false)}>
      <Box sx={{ width: "700px" }}>
        <DialogTitle>{event.title}</DialogTitle>

        <DialogContent>
          <Typography sx={{ fontWeight: "bold", mb: 1 }}>
            תיאור האירוע
          </Typography>
          <Typography sx={{ mb: 3 }}>
            {event.description || "אין תיאור לאירוע זה"}
          </Typography>

          <InfoRow
            icon={<CalendarIcon sx={iconStyle} />}
            label="מועד האירוע"
            value={event.event_date}
          />
          <InfoRow
            icon={<LocationOnIcon sx={iconStyle} />}
            label="מיקום האירוע"
            value={event.location}
          />
          <InfoRow
            icon={<PeopleOutline sx={iconStyle} />}
            label="כמות משתתפים מקסימלית"
            value={event.max_participants || "אין הגבלה"}
          />
        </DialogContent>
      </Box>

      <DialogActions>
        <Button onClick={() => onClose(false)}>סגור</Button>
      </DialogActions>
    </Dialog>
  );
};
