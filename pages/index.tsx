import Component from "../components/login-btn";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  const test = () => {
    if (!session?.access_token) {
      console.error("no access_token");
      return;
    }
    fetch(
      "https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=UCXOBLGJdYA1mfhOrDwQESTg",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${session?.access_token}`,
          Accept: "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => console.log(data));
  };
  console.log(session?.access_token);
  return (
    <>
      <Component />
      {session?.access_token && <button onClick={test}>test</button>}
    </>
  );
}
