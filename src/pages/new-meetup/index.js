import React from "react";
import NewMeetupForm from "../../../components/meetups/NewMeetupForm";
import Head from "next/head";
import { useRouter } from "next/router";

const NewMeetupPage = () => {
  const router = useRouter();
  async function addMeetupHandler(enteredMeetupData) {
    console.log(enteredMeetupData, "dataa");
    try {
      const response = await fetch("/api/new-meetup", {
        method: "POST",
        body: JSON.stringify(enteredMeetupData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data);
      router.push("/");
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <>
      <Head>
        <title>Add a new meetup</title>
        <meta name="desciption" content="add your own meetups" />
      </Head>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </>
  );
};

export default NewMeetupPage;
