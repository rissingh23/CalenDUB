import './Calendar.css';
import { useState, useRef } from 'react';
import { FaPlus } from 'react-icons/fa';
import { CalendarHeader, AddEventModal, EventDetails } from 'components';
import { Event } from 'types/Event';
import MonthView from './MonthView/MonthView';
import WeekView from './WeekView/WeekView';
import DayView from './DayView/DayView';

interface CalendarProps {
  updateCurrentDate: (date: Date) => void;
  events: Event[];
  displayEvents: Event[];
  eventColors: Record<string, string>;
  updateEvents: (events: Event[]) => void;
  currentDate: Date;
}

const Calendar = (props: CalendarProps) => {
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day'>('month');
  const [eventDetailsPopup, setEventDetailsPopup] = useState({
    show: false,
    x: 0,
    y: 0,
    event: {} as Event,
  });

  const addEventRef = useRef<HTMLDialogElement>(null);

  const closeEventDetailsPopup = () => {
    setEventDetailsPopup({ ...eventDetailsPopup, show: false });
  };

  const setSelectedEvent = (event: Event, x: number, y: number) => {
    setEventDetailsPopup({
      show: true,
      x: x,
      y: y,
      event: event,
    });
  };

  return (
    <div className="calendar">
      <div className="calendar-bar">
        <CalendarHeader
          currentDate={props.currentDate}
          updateCurrentDate={props.updateCurrentDate}
          viewMode={viewMode}
        />
        <div className="calendar-options">
          <select onChange={(e) => setViewMode(e.target.value as 'month' | 'week' | 'day')}>
            <option value="month">Month</option>
            <option value="week">Week</option>
            <option value="day">Day</option>
          </select>
          <button onClick={() => addEventRef.current?.showModal()}>
            <FaPlus size={8} />
            Add event
          </button>
        </div>
      </div>

      {eventDetailsPopup.show && (
        <div
          style={{
            left: eventDetailsPopup.x,
            top: eventDetailsPopup.y,
            position: 'absolute',
            transform: 'translate(-50%, 0%)',
          }}
        >
          <EventDetails
            selectedEvent={eventDetailsPopup.event}
            eventColors={props.eventColors}
            closeEventDetailsPopup={closeEventDetailsPopup}
          />
        </div>
      )}

      <div className="calendar-grid card">
        {viewMode === 'month' && (
          <MonthView
            currentDate={props.currentDate}
            displayEvents={props.displayEvents}
            eventColors={props.eventColors}
            setSelectedEvent={setSelectedEvent}
          />
        )}
        {viewMode === 'week' && (
          <WeekView 
            currentDate={props.currentDate}
            displayEvents={props.displayEvents}
            eventColors={props.eventColors}
            setSelectedEvent={setSelectedEvent}
          />
        )}
        {viewMode === 'day' && (
          <DayView 
            currentDate={props.currentDate}
            displayEvents={props.displayEvents}
            eventColors={props.eventColors}
            setSelectedEvent={setSelectedEvent}
          />
        )}
      </div>

      <AddEventModal
        addEventRef={addEventRef}
        events={props.events}
        updateEvents={props.updateEvents}
        eventColors={props.eventColors}
      />
    </div>
  );
};

export default Calendar;