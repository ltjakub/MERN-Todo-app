import React, { useState } from "react";
import DisplayPanel from "./DisplayPanel";
import { Checkbox, TextField, FormControlLabel, Button } from "@mui/material";

const InputPanel = () => {
  const [title, setTitle] = useState<String>("");
  const [description, setDescription] = useState<String>("");
  const [done, setDone] = useState<boolean>(false);
  const [isNewTask, setIsNewTask] = useState<boolean>(false);

  const handleType = (e: React.ChangeEvent<HTMLInputElement>) => {
    const id: string = e.target.id;
    const value: string = e.target.value;
    if (id === "title") {
      setTitle(value);
    } else if (id === "description") {
      setDescription(value);
    }
  };
  const addTask = () => {
    fetch("http://localhost:5000/todo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        description: description,
        done: done,
      }),
    })
      .then(() => console.log(`Success...`))
      .then(() => setIsNewTask(true))
      .catch((err) => {
        console.error(err);
      });
    setTitle("");
    setDescription("");
    setDone(false);
  };

  return (
    <>
      <div className="input-panel">
        Add new task!
        <TextField
          id="title"
          label="Title"
          variant="outlined"
          required
          onChange={handleType}
          value={title}
        />
        <TextField
          id="description"
          label="Description"
          variant="outlined"
          required
          onChange={handleType}
          value={description}
        />
        <FormControlLabel
          control={<Checkbox />}
          label="Done"
          onChange={() => setDone(!done)}
        />
        <Button variant="contained" onClick={addTask}>
          Submit{" "}
        </Button>
      </div>
      <DisplayPanel isNewTask={isNewTask} setIsNewTask={setIsNewTask} />
    </>
  );
};

export default InputPanel;
