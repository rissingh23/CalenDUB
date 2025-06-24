import { useEffect } from 'react';
import { Event } from 'types/Event';
import './PageHeader.css';

interface PageHeaderProps {
  filterEvents: (field: keyof Event, value: string) => void;
  resetFilters: () => void;
  eventColors: Record<string, string>;
}

const PageHeader = (props: PageHeaderProps) => {
  const filterEvents = props.filterEvents;
  const resetFilters = props.resetFilters;
  const eventColors = props.eventColors;
  const eventTypes = Object.keys(eventColors);

  useEffect(() => {
    // This is how filterEvents works (uncomment to see it in action)
    // Use this function to implement filters for types
    // filterEvents('type', 'Club Meeting');
    //
    // Reset filters to show all events with this
    // resetFilters();
    //
    // console.log(eventColors);
    // console.log(eventTypes);
  }, [eventTypes]);

  return (
    <div className="block">
      <div className="page-header card">
        <h2>Explore</h2>
        <p> Discover the most liked and anticipated events of the month!</p>
        <br></br>
        <p> Popular tags</p>
        <div>
          <button className="filter">testing</button>
          <button className="filter">testing2</button>
          <button className="filter">testing3</button>
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
