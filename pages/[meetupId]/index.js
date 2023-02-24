import dbconnect from '@/dbconnect';
import { ObjectId } from 'mongodb';
import Head from 'next/head';
import MeetupDetail from '../../components/meetups/MeetupDetail';

function MeetupDetails({meetupData}) {
  return (
    <>
      <Head>
        <title>{meetupData.title}</title>
        <meta name='description' content={meetupData.description} />
      </Head>
      <MeetupDetail
        image={meetupData.image}
        title={meetupData.title}
        address={meetupData.address}
        description={meetupData.description}
      />
    </>
  );
}
export default MeetupDetails

export async function getStaticPaths()
{
  const [client,meetupsCollection]=await dbconnect()
  const meetups=await meetupsCollection.find({},{_id:1}).toArray()
  client.close()

  return {
    fallback: "blocking",
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