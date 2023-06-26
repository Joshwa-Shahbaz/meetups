import MeetupDetail from "../../../components/meetups/MeetupDetail";
import { MongoClient } from "mongodb";
import Head from "next/head";
import { ObjectId } from "mongodb";

const MeetupDetails = (props) => {
  console.log(props.meetupData);
  if (!props.meetupData) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name="desciption" content="description about the meetup" />
      </Head>
      <MeetupDetail
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </>
  );
};

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://admin:joshwa12345@cluster0.25bh1y9.mongodb.net/"
  );

  const db = client.db("meetups");
  const meetupscollection = db.collection("user");

  const meetup = await meetupscollection.find({}, { _id: 1 }).toArray();
  console.log(meetup, ">>>>>>>");

  client.close();

  return {
    fallback: "blocking",
    paths: meetup.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;

  const client = await MongoClient.connect(
    "mongodb+srv://admin:joshwa12345@cluster0.25bh1y9.mongodb.net/"
  );

  const db = client.db("meetups");
  const meetupscollection = db.collection("user");

  console.log("id _----> ", meetupId);
  const selectedMeetup = await meetupscollection.findOne({
    _id: new ObjectId(meetupId),
  });
  selectedMeetup._id = selectedMeetup._id.toString();

  client.close();

  return {
    props: {
      meetupData: selectedMeetup.data,
    },
  };
}

export default MeetupDetails;
