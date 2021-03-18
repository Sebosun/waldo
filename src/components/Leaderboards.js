import React, { useState, useEffect } from "react";
import { firebase } from "@firebase/app";
import "./Leaderboards.css";

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
  }, []);

  return (
    <div className="leaderboards">
      <div className="container">
        {leader
          ? leader.map((record, index) => {
              return (
                <div className="record" key={index}>
                  <div>{record.userName}</div>
                  <div>{record.time}s</div>
                </div>
              );
            })
          : null}
      </div>
      <button onClick={props.showLeaderboards}>Close</button>
    </div>
  );
}
