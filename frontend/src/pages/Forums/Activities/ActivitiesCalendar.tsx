import { Box, Button, Tooltip, Typography } from "@mui/material";
import {
  DateCalendar,
  ArrowRightIcon,
  ArrowLeftIcon,
  PickersDay,
} from "@mui/x-date-pickers";
import { Dayjs } from "dayjs";
import { FC, useState } from "react";
import { Database } from "../../../database.types";
import { ActivityDialog } from "./ActivityDialog";

interface ActivitiesCalendarProps {
  events: Database["public"]["Tables"]["tazpi_events"]["Row"][];
}

export const ActivitiesCalendar: FC<ActivitiesCalendarProps> = ({ events }) => {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<
    Database["public"]["Tables"]["tazpi_events"]["Row"] | null
  >(null);
  const [dayEvents, setDayEvents] = useState<
    Database["public"]["Tables"]["tazpi_events"]["Row"][] | string
  >("בחרו יום על מנת להציג אירועים");

  const getEvents = (day: Dayjs) =>
    events.filter((e) => e.event_date === day.format("YYYY-MM-DD"));

  const showDayEvents = (
    day: Dayjs,
    events: Database["public"]["Tables"]["tazpi_events"]["Row"][],
  ) => {
    setSelectedDate(day);
    setDayEvents(events);
  };

  return (
    <Box
      sx={{
        backgroundColor: "#FFF",
        padding: "25px",
        borderRadius: "10px",
        width: "35%",
        paddingLeft: "15px",
      }}
    >
      <Typography variant="h5" fontWeight={400} marginBottom={"20px"}>
        {"לוח פעילויות שנתי"}
      </Typography>

      <DateCalendar
        value={selectedDate}
        onChange={(newValue) => setSelectedDate(newValue)}
        slots={{
          leftArrowIcon: ArrowRightIcon,
          rightArrowIcon: ArrowLeftIcon,
          day: (props) => {
            const { day, ...other } = props;
            const events = getEvents(day);
            const count = events.length;

            return (
              <Box
                sx={{
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Tooltip
                  arrow
                  placement="top"
                  title={events.map((e) => e.title).join(", ")}
                >
                  <PickersDay
                    {...props}
                    onClick={() => showDayEvents(day, events)}
                  />
                </Tooltip>
                {count > 0 && (
                  <Box
                    sx={{
                      mt: "1px", // קצת רווח מהמספר
                      width: 14,
                      height: 14,
                      borderRadius: "50%",
                      backgroundColor: "#F8CA39",
                      color: "#000",
                      fontSize: 10,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {count > 1 ? (
                      <Typography fontSize={"0.7rem"}>{count}</Typography>
                    ) : (
                      ""
                    )}
                  </Box>
                )}
              </Box>
            );
          },
        }}
        slotProps={{
          day: {
            sx: {
              "&.MuiPickersDay-today": {
                backgroundColor: "#F8CA3940",
                border: "none",
              },
            },
          },
          calendarHeader: {
            sx: {
              position: "relative",
              "& .MuiPickersCalendarHeader-labelContainer": {
                position: "absolute",
                left: "50%",
                transform: "translateX(-50%)",
              },
              "& .MuiPickersCalendarHeader-switchViewButton": {
                display: "none",
              },
              "& .MuiPickersArrowSwitcher-root": {
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
              },
            },
          },
        }}
      />
      <Box
        height={"15vh"}
        overflow={"auto"}
        bgcolor={"#EFEDE8"}
        borderRadius={"10px"}
        padding={"10px"}
      >
        {typeof dayEvents === "string" ? (
          <Typography
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            height={"100%"}
          >
            {dayEvents}
          </Typography>
        ) : (
          dayEvents.map((event) => (
            <Box
              key={event.title}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"space-between"}
              marginBottom={"10px"}
            >
              <Typography>{event.title}</Typography>
              <Button
                onClick={() => {
                  setSelectedEvent(event);
                  setIsModalOpen(true);
                }}
                sx={{
                  backgroundColor: "#F8CA39",
                  color: "#fff",
                  borderRadiu: "10px",
                  height: "20px",
                  ":hover": {
                    color: "#F8CA39",
                    backgroundColor: "#fff",
                    transition: "all 0.3s ease-in-out",
                  },
                }}
              >
                פרטים
              </Button>
            </Box>
          ))
        )}
      </Box>
      {selectedEvent && (
        <ActivityDialog
          open={isModalOpen}
          onClose={setIsModalOpen}
          event={selectedEvent}
        />
      )}
    </Box>
  );
};
