import { MongoClient } from 'mongodb';
import MeetupList from '../components/meetups/MeetupList';

const DUMMY_MEETUPS = [
  {
    id: 'm1',
    title: 'A First Meetup',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg',
    address: 'Some address 5, 12345 Some City',
    description: 'This is a first meetup!'
  },
  {
    id: 'm2',
    title: 'A Second Meetup',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg',
    address: 'Some address 10, 12345 Some City',
    description: 'This is a second meetup!'
  }
];

function HomePage(props)
{
  return <MeetupList meetups={props.meetups}/>
}

export const getStaticProps=async()=>
{
  const client = await MongoClient.connect(`mongodb+srv://${process.env.username}:${process.env.password}@cluster0.szwbefi.mongodb.net/meetups?retryWrites=true&w=majority`)
  const db = client.db()
  const meetupsCollection = db.collection('meetups')
  const meetups=await meetupsCollection.find().toArray()
  client.close()

  return {
    props: {meetups: meetups.map(meetup=>
      {
        meetup._id=meetup._id.toString()
        return {...meetup, id: meetup._id}
      })},
    revalidate: 1
  }
}

export default HomePage;