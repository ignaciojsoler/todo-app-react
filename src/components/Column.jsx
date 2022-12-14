import React from "react";
import AddNewTaskButton from "./AddNewTaskButton";
import TaskList from "./TaskList";

const Column = ({
  taskState,
  createNewTask,
  addNewTask,
  setEditableMode,
  deleteTask,
  taskCollection,
  changeTaskState,
}) => {
  return (
    <div className="mr-5 h-1/3 bg-white bg-opacity-50 p-5 rounded-3xl backdrop-blur-sm transition duration-300">
      <div className="flex justify-between items-center w-60 ">
        <h3 className="text-xl font-medium">{taskState}</h3>
        <AddNewTaskButton createNewTask={createNewTask} taskState={taskState} />
      </div>
      <TaskList
        taskCollection={taskCollection}
        setEditableMode={setEditableMode}
        addNewTask={addNewTask}
        deleteTask={deleteTask}
        taskState={taskState}
        changeTaskState={changeTaskState}
      />
    </div>
  );
};

export default Column;
