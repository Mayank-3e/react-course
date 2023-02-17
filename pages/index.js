import dbconnect from '@/functions/dbconnect';
import MeetupList from '../components/meetups/MeetupList';

function HomePage(props)
{
  return <MeetupList meetups={props.meetups}/>
}

export const getStaticProps=async()=>
{
  const [client,meetupsCollection]=await dbconnect()
  const meetups=await meetupsCollection.find().toArray()
  client.close()

  return {
    props: {meetups: meetups.map(meetup=>
      {
        meetup.id=meetup._id.toString()
        delete meetup._id
        return meetup
      })},
    revalidate: 1
  }
}

export default HomePage;