import React, {
  createContext,
  useReducer,
  useContext,
  useEffect,
  ReactNode,
} from "react";

interface Task {
  id: string;
  title: string;
  description: string;
}

interface State {
  tasks: Task[];
}

interface Action {
  type: string;
  payload: any;
}

interface ContextType {
  state: State;
  dispatch: React.Dispatch<Action>;
}

const TaskContext = createContext<ContextType | undefined>(undefined);

const initialState: State = {
  tasks: [],
};

const taskReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_TASK":
      console.log("dispatch add", action.payload);
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };
    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };
    case "SET_TASKS":
      return {
        ...state,
        tasks: action.payload.tasks,
      };
    case "UPDATE_TASK":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.task.id ? action.payload.task : task
        ),
      };
    default:
      return state;
  }
};

export const TaskProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("http://10.0.2.2:3000/tasks"); // Adjust the URL to your API endpoint
        if (!response.ok) {
          throw new Error("Failed to fetch tasks");
        }
        const data: Task[] = await response.json();
        console.log("initially fetched", data);
        dispatch({ type: "SET_TASKS", payload: { tasks: data } });
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = (): ContextType => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTaskContext must be used within a TaskProvider");
  }
  return context;
};
