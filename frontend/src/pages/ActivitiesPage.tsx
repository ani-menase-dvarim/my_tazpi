import { Box } from "@mui/material";
import { useState, useEffect } from "react";
import { getAllEventsInlastYear } from "../actions";
import { Database } from "../database.types";
import { ActivitiesCalendar } from "./Forums/Activities/ActivitiesCalendar";

export function ActivitiesPage() {
  const [events, setEvents] = useState<
    Database["public"]["Tables"]["tazpi_events"]["Row"][] | null
  >(null);

  useEffect(() => {
    const fetchEvents = async () => {
      const fetchedEvents = await getAllEventsInlastYear();
      setEvents(fetchedEvents);
    };

    fetchEvents();
  }, []);

  return (
    <Box
      display={"flex"}
      flexDirection={"row"}
      gap={"40px"}
      justifyContent={"center"}
      paddingTop={"30px"}
    >
      {events && <ActivitiesCalendar events={events} />}
      <Box bgcolor={"#FFF"} width={"35%"} borderRadius={"10px"}></Box>
    </Box>
  );
}
