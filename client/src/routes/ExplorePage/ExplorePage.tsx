import { useState, useEffect } from 'react';
import {
  HeaderTitle,
  Calendar,
  EventDetails,
  PageHeader,
  CalendarHeader,
  Header,
} from 'components';
import { Event } from 'types/Event';
import './ExplorePage.css';
import { useAuth } from 'context/AuthContext.tsx';

const ExplorePage = () => {
  // TODO: How will this be structured?
  // Test events => feel free to change the values for testing
  // date and time field NOT FINAL => need to account for timezones (unless it's worked out in the backend)
  const { currentUser, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      console.log('Current User:', currentUser);
      getEvents();
    }
  }, [loading, currentUser]);

  const validateEvents = (data: any): data is Event[] => {
    return (
      Array.isArray(data) &&
      data.every(
        (event) =>
          typeof event.id === 'number' &&
          typeof event.name === 'string' &&
          typeof event.date === 'string' &&
          typeof event.date === 'string' &&
          typeof event.location === 'string' &&
          typeof event.description === 'string' &&
          typeof event.type === 'string'
      )
    );
  };

  const getEvents = async () => {
    try {
      const response = await fetch('/api/events');
      const data = await response.json();
      if (validateEvents(data)) {
        updateEvents(data);
        return data;
      } else {
        console.error('Invalid data received:', data);
        return [];
      }
    } catch (error) {
      console.error('Error fetching events:', error);
      return [];
    }
  };

  const [events, setEvents] = useState<Event[]>([]); // actual events kept in state
  const [displayEvents, setDisplayEvents] = useState<Event[]>(events); // what events are displayed on the calendar (this is to allow filtering without losing the original events)
  const [currentDate, setCurrentDate] = useState(new Date()); // the current date being viewed on the calendar (used for month navigation)

  // Filter events by field and value, and sets events to the filtered events
  // e.g. (field: 'type', value: 'Club Meeting') => only show club meetings
  // e.g. (field: 'username', value: 'hcp.uw') => only show events by hcp.uw
  // e.g. (field: 'location', value: 'MOR 220') => only show events at MOR 220
  const filterEvents = (field: keyof Event, value: string) => {
    resetFilters();
    setDisplayEvents(events.filter((event) => event[field] === value));
  };

  // Reset the filter to show all events
  const resetFilters = () => {
    setDisplayEvents(events);
  };

  // Update events with new events (used for adding, deleting, and updating events)
  // e.g. (newEvents: [event1, event2, event3]) => set events to [event1, event2, event3]
  const updateEvents = (newEvents: Event[]) => {
    setEvents(newEvents);
    setDisplayEvents(newEvents);
  };

  // Updates the current date (to navigate the calendar)
  const updateCurrentDate = (newCurrentDate: Date) => {
    setCurrentDate(newCurrentDate);
  };

  // Hardcoded event types/colors for now
  const eventColors = {
    'Club Meeting': '#d39d9d',
    'Some type': '#d3b49d',
    'Another type': '#d2d39d',
    'Some other type': '#9dd3ad',
    'Sports Match': '#9db4d3',
    'UW Event': '#ad9dd3',
  };

  return (
    <div>
      <div className="explore-page">
        <div className="header-container">
          <Header />
        </div>
        <div className="explore-page-body">
          <div className="sidebar">
            <PageHeader
              filterEvents={filterEvents}
              resetFilters={resetFilters}
              eventColors={eventColors}
            />
            <div></div>
          </div>
          <Calendar
            updateCurrentDate={updateCurrentDate}
            events={events}
            updateEvents={updateEvents}
            displayEvents={displayEvents}
            eventColors={eventColors}
            currentDate={currentDate}
          />
        </div>
      </div>
    </div>
  );
};

export default ExplorePage;
