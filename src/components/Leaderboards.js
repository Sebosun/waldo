import React, { useState, useEffect } from "react";
import { firebase } from "@firebase/app";

export default function Leaderboards(props) {
  let [leader, setLeader] = useState(null);
  function loadScores() {
    // Create the query to load the last 12 messages and listen for new ones.
    const query = firebase
      .firestore()
      .collection("leaderboards")
      .orderBy("time", "asc")
      .limit(10);
    query.onSnapshot(function (snapshot) {
      let leaderRecord = snapshot.docChanges().map(function (change) {
        let message = change.doc.data();
        return message;
      });
      setLeader(leaderRecord);
    });
  }

  useEffect(() => {
    loadScores();
    console.log(leader);
  }, []);

  // Start listening to the query
  // query.onSnapshot(function (snapshot) {
  //   snapshot.docChanges().forEach(function (change) {
  //     if (change.type === "removed") {
  //       deleteMessage(change.doc.id);
  //     } else {
  //       var message = change.doc.data();
  //       displayMessage(
  //         change.doc.id,
  //         message.timestamp,
  //         message.name,
  //         message.text,
  //         message.profilePicUrl,
  //         message.imageUrl
  //       );
  //     }
  //   });
  // });
  // }
  return (
    <div className="Leaderboards">
      {leader
        ? leader.map((record) => {
            return (
              <div>
                <div>{record.userName}</div>
                <div>{record.time}</div>
              </div>
            );
          })
        : null}
    </div>
  );
}
