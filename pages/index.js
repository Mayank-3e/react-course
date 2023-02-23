import dbconnect from '@/dbconnect';
import Head from 'next/head';
import MeetupList from '../components/meetups/MeetupList';

function HomePage(props)
{
  return(
    <>
      <Head>
        <title>React Meetups</title>
        <meta
          name='description'
          content='Browse a huge list of highly active React meetups!'
        />
      </Head>
      <MeetupList meetups={props.meetups}/>
    </>
  )
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