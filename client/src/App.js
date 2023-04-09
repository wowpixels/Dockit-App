import { useState, useEffect } from "react";

const API_BASE = "http://localhost:3001";

// app skeleton
function App() {
  // create const and asign state
  const [dockits, setDockits] = useState([]);
  const [popupActive, setPopupActive] = useState(false);
  const [newDockit, setNewDockit] = useState("");

  // call the function useEffect
  useEffect(() => {
    GetDockits();
  }, []);

  // create function to fetch api_base
  const GetDockits = () => {
    fetch(API_BASE + "/dockits")
      .then((res) => res.json())
      .then((data) => setDockits(data))
      .catch((err) => console.error("Error: ", err));
  };

  // function completed dockit items
  const completeDockit = async (id) => {
    const data = await fetch(API_BASE + "/dockit/complete/" + id).then(
      (res) => res.json()
    );

    setDockits((dockits) =>
      dockits.map((dockit) => {
        if (dockit._id === data._id) {
          dockit.complete = data.complete;
        }
        return dockit;
      })
    );
  };

  // function delete dockit item
  const deleteDockit = async (id) => {
    const data = await fetch(API_BASE + "/dockit/delete/" + id, {
      method: "DELETE",
    }).then((res) => res.json());

    setDockits((dockits) =>
      dockits.filter((dockit) => dockit._id !== data._id)
    );
  };

  // add a new task to the dock
  const addDockit = async () => {
    const data = await fetch(API_BASE + "/dockit/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: newDockit,
      }),
    }).then((res) => res.json());

    setDockits([...dockits, data]);
    setPopupActive(false);
    setNewDockit("");
  };

  // handle on change
  const handleChange = (e) => {
    setNewDockit(e.target.value);
  };

  // handle on keydown
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      // 👇 Get input value
      setNewDockit(e.target.value);
      addDockit();
    }
  };

  // show frontend app
  return (
    <div className="App">
      <h1 className="text-center">Welcome,</h1>
      <h4 className="text-center">What do you want to dock today?</h4>
      <div className="dockits">
        {dockits.map((dockit) => (
          <div
            className={"dockit " + (dockit.complete ? "is-complete" : "")}
            key={dockit._id}
            onClick={() => completeDockit(dockit._id)}>
            <div className="checkbox"></div>
            <div className="text">{dockit.text}</div>
            <div
              className="delete-dockit"
              onClick={(e) => {
                e.stopPropagation();
                deleteDockit(dockit._id);
              }}>
              x
            </div>
          </div>
        ))}
      </div>
      <div className="addPopup" onClick={() => setPopupActive(true)}>
        +
      </div>
      {popupActive ? (
        <div className="popup">
          <div
            className="closePopup"
            onClick={() => setPopupActive(false)}>
            x
          </div>
          <div className="content">
            <h3>Add Task</h3>
            <input
              type="text"
              className="add-dockit-input"
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              value={newDockit}
            />
            <div className="button" onClick={addDockit}>
              Dock a Task
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default App;
