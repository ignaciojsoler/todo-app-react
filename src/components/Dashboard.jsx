import React, { useState, useEffect, useRef } from "react";
import Column from "./Column";
import nextId from "react-id-generator";
import { useDraggable } from "react-use-draggable-scroll";

const Dashboard = ({ categoryName, categoriesList }) => {

  const ref = useRef(); // We will use React useRef hook to reference the wrapping div:
  const { events } = useDraggable(ref); // Now we pass the reference to the useDraggable hook:

  //States to order the columns by
  const taskState = ["To-Do", "Doing", "Completed"];

  //Random id
  const taskId = nextId()

  let userTaskCollection = JSON.parse(localStorage.getItem(categoryName));

  if (!userTaskCollection) {
    userTaskCollection = [];
  }

  const [taskCollection, setTaskCollection] = useState(userTaskCollection);

  //Creates a form to put a new task data
  const createNewTask = (state) => {
    setTaskCollection((taskCollection) => [
      ...taskCollection,
      {
        id: taskId,
        taskTitle: "",
        taskDescription: "",
        state: state,
        editable: true,
      },
    ]);
  };

  //Add a new task and change its editable mode to false
  const addNewTask = (newTaskId, newTaskTitle, newTaskDescription, newTaskState) => {
    setTaskCollection(
      taskCollection.map((task) => {
        return task.id === newTaskId
          ? {
              ...task,
              taskTitle: newTaskTitle,
              taskDescription: newTaskDescription,
              state: newTaskState,
              editable: false,
            }
          : { ...task };
      })
    );
  };

  //Changes task mode to editable
  const setEditableMode = (selectedTaskId) => {
    setTaskCollection(
      taskCollection.map((task) => {
        return task.id === selectedTaskId
          ? { ...task, editable: !task.editable }
          : { ...task };
      })
    );
  };

  //Changes editable mode
  const deleteTask = (selectedTaskId) => {
    setTaskCollection(
      taskCollection.filter((task) => task.id !== selectedTaskId)
    );
  };

  //Change the column of the task according to its status
  const changeTaskState = (taskId, newTaskState) => {
    setTaskCollection(
      taskCollection.map((task) => {
        return task.id === taskId
          ? { ...task, state: newTaskState }
          : { ...task };
      })
    );
  };

  useEffect(() => {
    localStorage.setItem(categoryName, JSON.stringify(taskCollection));
  }, [taskCollection]);

  useEffect(() => {
    setTaskCollection(userTaskCollection)
  }, [categoriesList])
  

  return (
    <div className="py-16 overflow-scroll scrollbar-hide min-h-screen max-h-screen sm:ml-80 sm:pl-8 sm:py-2">

      <div className="relative right-10 mt-5 text-right hidden md:block">
        <h3 className="font-semibold text-2xl text-primary">To-Do App</h3>
        <h6 className="mt-1 text-xs text-gray">Developed by Ignacio Soler</h6>
      </div>

      <h3 className="mt-8 ml-6 text-2xl font-semibold sm:ml-0">{categoryName}</h3>
      <div className="mt-8 pl-6 flex overflow-x-scroll scrollbar-hide sm:pl-0 min-h-dashboard" {...events} ref={ref} >
        {taskState.map((state, idx) => {
          let filteredTaskCollection = taskCollection.filter(
            (task) => task.state === state
          );
          return (
            <Column
              key={idx}
              taskCollection={filteredTaskCollection}
              taskState={state}
              createNewTask={createNewTask}
              addNewTask={addNewTask}
              setEditableMode={setEditableMode}
              deleteTask={deleteTask}
              changeTaskState={changeTaskState}
              className="cursor-grab"
            />
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
