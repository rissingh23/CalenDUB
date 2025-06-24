import { FaClock } from 'react-icons/fa';
import './EventDetails.css';
import { Event } from 'types/Event';
import { FaLocationDot } from 'react-icons/fa6';

interface EventDetailsProps {
  closeEventDetailsPopup: () => void;
  selectedEvent: Event;
  eventColors: Record<string, string>;
}

const EventDetails = (props: EventDetailsProps) => {
  return (
    <div className="event-details card">
      <button className="close-button" onClick={props.closeEventDetailsPopup}>
        ×
      </button>
      <h1 className="event-name">{props.selectedEvent.name}</h1>
      {/* TODO: replace with author (organizer) once backend connected */}
      <span className="author">
        <img src={props.selectedEvent.location} className="icon"></img>
        <h2>{props.selectedEvent.location}</h2>
      </span>
      <span className="time">
        <FaClock className="icon" />
        <h2>{props.selectedEvent.time}</h2>
      </span>
      <span>
        <FaLocationDot className="icon" />
        <p>{props.selectedEvent.location}</p>
      </span>
      <p>{props.selectedEvent.description}</p>
    </div>
  );
};

export default EventDetails;
