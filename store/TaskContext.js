import React, { createContext, useReducer, useContext, useEffect } from "react";

const TaskContext = createContext();

const initialState = {
  tasks: [],
};

const taskReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TASK":
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };
    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((_, index) => index !== action.payload),
        // ...state,
        // tasks: state.tasks.filter((task) => task.id !== action.payload),
      };
    case "SET_TASKS":
      return {
        ...state,
        tasks: action.payload.tasks,
      };

    default:
      return state;
  }
};

export const TaskProvider = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  // useEffect(() => {
  //   const fetchTasks = async () => {
  //     try {
  //       console.log("hi");
  //       const response = await fetch("http://10.0.2.2:3000/tasks"); // Adjust the URL to your API endpoint
  //       if (!response.ok) {
  //         throw new Error("Failed to fetch tasks");
  //       }
  //       const data = await response.json();
  //       dispatch({ type: "SET_TASKS", payload: { tasks: data.tasks } });
  //       console.log(data.tasks);
  //     } catch (error) {
  //       console.error("Error fetching tasks:", error);
  //     }
  //   };

  //   fetchTasks();
  // }, []);

  // useEffect(() => {
  //   const fetchTasks = async () => {
  //     try {
  //       const response = await axios.get(`${BASE_URL}/{state.username}`);
  //       dispatch({ type: "FETCH_TASKS", payload: response.data });
  //     } catch (error) {
  //       console.error("Error fetching tasks:", error.message);
  //     }
  //   };
  //   fetchTasks();
  // }, []);

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => useContext(TaskContext);
