import React, { useEffect, useState } from "react";
import { fetchedData, MyProps } from "./DisplayPanelTypes";
import {
  MdCheckBox,
  MdDelete,
  MdCheckBoxOutlineBlank,
  MdEdit,
} from "react-icons/md";
import { Button } from "@mui/material";
import EditPanel from "./EditPanel";

const DisplayPanel: React.FC<MyProps> = ({ isNewTask, setIsNewTask }) => {
  const [data, setData] = useState<fetchedData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [editId, setEditId] = useState<string>("");
  const [isEdit, setIsEdit] = useState<boolean>(false);

  useEffect(() => {
    fetch("http://localhost:5000/todo")
      .then((res) => res.json())
      .then((data) => setData(data))
      .then(() => setIsLoading(false))
      .then(() => setIsNewTask(false));
  }, [isNewTask]);

  const handleCheck = (item: fetchedData) => {
    console.log(item._id);
    fetch(`http://localhost:5000/todo/${item._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        done: !item.done,
      }),
    }).then(() => setIsNewTask(true));
  };
  const handleEdit = (item: fetchedData) => {
    const id = item._id;
    setIsEdit(true);
    setEditId(id);
  };

  const handleRemove = (item: fetchedData) => {
    fetch(`http://localhost:5000/todo/${item._id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => setIsNewTask(true));
  };

  return (
    <>
      <div className="display-wrapper">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <div className="display">
            {!isEdit ? (
              <>
                {data.map((item, index) => {
                  return (
                    <div
                      className="display-tile"
                      key={index}
                      style={
                        index % 2 === 0
                          ? { backgroundColor: "lightsteelblue" }
                          : { backgroundColor: "white" }
                      }
                    >
                      {item.title}.
                      <div className="display-buttons" style={{ fontSize: 20 }}>
                        {item.done ? (
                          <MdCheckBox onClick={() => handleCheck(item)} />
                        ) : (
                          <MdCheckBoxOutlineBlank
                            onClick={() => handleCheck(item)}
                          />
                        )}
                        <div onClick={() => handleEdit(item)}>
                          <MdEdit />
                        </div>
                        <MdDelete onClick={() => handleRemove(item)} />
                      </div>
                    </div>
                  );
                })}
              </>
            ) : (
              <EditPanel
                editId={editId}
                data={data}
                setIsNewTask={setIsNewTask}
              />
            )}
          </div>
        )}
      </div>
      <Button
        variant="contained"
        style={{ marginTop: "20px" }}
        onClick={() => setIsEdit(false)}
      >
        Go back
      </Button>
    </>
  );
};

export default DisplayPanel;
