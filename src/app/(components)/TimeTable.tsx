import * as React from "react";
import { Stack, Typography } from "@mui/material";

export default function TimeTable() {
  const [date, setDate] = React.useState(new Date());

  React.useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 6000);

    return () => clearInterval(timer); // Cleanup the interval on component unmount
  }, []);

  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      sx={{ mb: 3, textAlign: "center" }}
    >
      <TimeZone timeZone="Europe/Paris" date={date} />
      <TimeZone timeZone="Asia/Bangkok" date={date} />
      <TimeZone timeZone="Asia/Shanghai" date={date} />
      <TimeZone timeZone="Asia/Tokyo" date={date} />
    </Stack>
  );
}

interface TimeZoneProps {
  timeZone: string;
  date: Date;
}

function TimeZone({ timeZone, date }: TimeZoneProps) {
  return (
    <div style={{ flex: 1 }}>
      <Typography variant="h5" sx={{ mt: 3 }}>
        {timeZone.split("/").pop()}
      </Typography>
      <p>
        {new Intl.DateTimeFormat("fr-FR", {
          hour: "2-digit",
          minute: "2-digit",
          timeZoneName: "short",
          timeZone: timeZone,
        }).format(date)}
      </p>
    </div>
  );
}
