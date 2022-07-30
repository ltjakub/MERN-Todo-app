import {
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { editProps, fetchedData } from "./DisplayPanelTypes";

const EditPanel: React.FC<editProps> = ({ editId, data, setIsNewTask }) => {
  const [newTitle, setNewTitle] = useState<string>("");
  const [newDescription, setNewDescription] = useState<string>("");
  const [newDone, setNewDone] = useState<boolean>(false);
  const elementData = data.find((item) => item._id === editId);
  const handleSave = () => {
    console.log(editId);
    fetch(`http://localhost:5000/todo/${editId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: newTitle,
        description: newDescription,
        done: newDone,
      }),
    })
      .then(() => console.log(`Success...`))
      .then(() => setIsNewTask(true))
      .catch((err) => console.log(err));
  };

  const handleType = (e: React.ChangeEvent<HTMLInputElement>) => {
    const id: string = e.target.id;
    const value: string = e.target.value;
    if (id === "newTitle") {
      setNewTitle(value);
    } else if (id === "newDescription") {
      setNewDescription(value);
    }
  };

  return (
    <div className="edit-display">
      <h2>Edition tools</h2>
      <Typography>Title:</Typography>
      <TextField
        placeholder={elementData?.title}
        id="newTitle"
        onChange={handleType}
      />
      <Typography>Description:</Typography>
      <TextField
        placeholder={elementData?.description}
        id="newDescription"
        onChange={handleType}
      />
      <FormControlLabel
        control={<Checkbox />}
        label="Done"
        onChange={() => setNewDone(!newDone)}
      />
      <Button variant="contained" color="success" onClick={handleSave}>
        Save
      </Button>
    </div>
  );
};

export default EditPanel;
