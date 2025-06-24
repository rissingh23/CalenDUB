import { MouseEvent } from 'react';
import './calendarEvent.css';
import { Event } from 'types/Event';

interface CalendarEventProps {
  name: string;
  color: string;
  setSelectedEvent: (event: Event, x: number, y: number) => void;
  event: Event;
}

const CalendarEvent = (props: CalendarEventProps) => {
  const showEventDetails = (e: MouseEvent<HTMLElement>) => {
    const loc = e.currentTarget.getBoundingClientRect();
    const popupHeight =
      20 * parseFloat(getComputedStyle(document.documentElement).fontSize); // 20rem in px
    const showAbove = window.innerHeight - (loc.bottom + popupHeight) < 0; // check if the popup will fit below the event
    const gap = 7; // gap between the event and the popup

    props.setSelectedEvent(
      props.event,
      loc.x + loc.width / 2,
      showAbove ? loc.y - popupHeight - gap : loc.y + loc.height + gap
    );
  };

  return (
    <>
      <div
        className="label"
        style={{ backgroundColor: props.color }}
        onClick={showEventDetails}
      >
        {props.name}
      </div>
    </>
  );
};

export default CalendarEvent;
