import EventItem from "../components/EventItem";
import {json, useLoaderData} from 'react-router-dom'

function EventDetailPage()
{
  const data=useLoaderData()
  
  return <EventItem event={data.event} />
}
export default EventDetailPage

export async function loader({params})
{
  const id = params.eventId;

  const response = await fetch('http://localhost:8080/events/' + id)

  if (response.ok) return response
  throw json(
    {message: 'Could not fetch details for selected event.'},
    {status: 500})
}