import './DayView.css';
import { CalendarEvent } from 'components';
import { Event } from 'types/Event';

interface DayViewProps {
  currentDate: Date;
  displayEvents: Event[];
  eventColors: Record<string, string>;
  setSelectedEvent: (event: Event, x: number, y: number) => void;
}

const DayView = ({ currentDate, displayEvents, eventColors, setSelectedEvent }: DayViewProps) => {
  const dateStr = currentDate.toISOString().split('T')[0];
  const dayEvents = displayEvents.filter((event) => event.date === dateStr);

  return (
    <div className="day-view">
      <div className="day-header">
        <span className="day-title">
          {currentDate.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
        </span>
      </div>
      <div className="day-events">
        {dayEvents.length > 0 ? (
          dayEvents.map((event) => (
            <CalendarEvent
              key={event.id}
              name={event.name}
              color={eventColors[event.type]}
              setSelectedEvent={setSelectedEvent}
              event={event}
            />
          ))
        ) : (
          <p className="no-events">No events scheduled</p>
        )}
      </div>
    </div>
  );
};

export default DayView;
