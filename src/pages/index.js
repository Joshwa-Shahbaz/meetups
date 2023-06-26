import MeetupList from "../../components/meetups/MeetupList";
import { MongoClient } from "mongodb";
import Head from "next/head";

const HomePage = (props) => {
  return (
    <>
      <Head>
        <title>Meetups</title>
        <meta
          name="desciption"
          content="Browse a huge list of higly active React meetups"
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </>
  );
};

export async function getStaticProps() {
  let meetups = [];

  try {
    const client = await MongoClient.connect(
      "mongodb+srv://admin:joshwa12345@cluster0.25bh1y9.mongodb.net/"
    );

    const db = client.db("meetups");
    const meetupscollection = db.collection("user");

    meetups = await meetupscollection.find().toArray();

    client.close();
  } catch (error) {
    console.error(error);
  }

  return {
    props: {
      meetups:
        meetups.length > 0
          ? meetups.map((meetup) => {
              return {
                title: meetup.data.title || "",
                address: meetup.data.address || "",
                image: meetup.data.image || "",
                id: meetup._id.toString(),
              };
            })
          : null,
    },
    revalidate: 10,
  };
}

export default HomePage;
