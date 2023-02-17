import dbconnect from '@/functions/dbconnect';
import { ObjectId } from 'mongodb';
import MeetupDetail from '../../components/meetups/MeetupDetail';

function MeetupDetails({meetupData}) {
  return (
    <MeetupDetail
      image={meetupData.image}
      title={meetupData.title}
      address={meetupData.address}
      description={meetupData.description}
    />
  );
}

export async function getStaticPaths()
{
  const [client,meetupsCollection]=await dbconnect()
  const meetups=await meetupsCollection.find({},{_id:1}).toArray()
  client.close()

  return {
    fallback: false,
    paths: meetups.map(meetup=>({ params: {meetupId: meetup._id.toString()} }))
  }
}

export async function getStaticProps({params})
{
  const meetupId = params.meetupId;
  const [client,meetupsCollection]=await dbconnect()
  const selectedMeetup=await meetupsCollection.findOne({_id: new ObjectId(meetupId)})
  client.close()
  selectedMeetup.id=selectedMeetup._id.toString()
  delete selectedMeetup._id

  return {
    props: {
      meetupData: selectedMeetup
    }
  };
}

export default MeetupDetails