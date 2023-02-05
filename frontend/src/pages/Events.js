import { Suspense } from "react";
import { Await, defer, json, useLoaderData } from "react-router-dom";

import EventsList from "../components/EventsList";

function EventsPage() {
  const {events} = useLoaderData()

  return <Suspense fallback={<p style={{textAlign: 'center'}}>Loading...</p>}>
    <Await resolve={events}>
      {loadedEvents => <EventsList events={loadedEvents}/>}
    </Await>
  </Suspense>
}
export default EventsPage

const loadEvents = async () => 
{
  const response = await fetch("http://localhost:8080/events");
  if (!response.ok) return json(
        { message: "Internal server error."},
        {status: 500 })
  const data=await response.json()
  return data.events
}

export const loader = () => defer({events: loadEvents()})