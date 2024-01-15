import { useState, createContext } from 'react';
import { nanoid } from 'nanoid';
import { toast } from 'react-hot-toast';

export const TaskContext = createContext();

export const TaskProvider = props => {
  const [tasks, setTasks] = useState([
    {
      title: 'Learn JavaScript',
      completed: true,
      id: 1,
    },
    {
      title: 'Learn React',
      completed: false,
      id: 2,
    },
  ]);

  const addTask = title => {
    const newTask = {
      title: title,
      completed: false,
      id: nanoid(),
    };

    setTasks(prevTasks => [...prevTasks, newTask]);
  };

  const updateTaskStatus = taskId => {
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        task.completed = !task.completed;
      }
      return task;
    });
    setTasks(updatedTasks);
    toast.success('Task status updated!');
  };

  const editTask = (taskId, editTaskTitle) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        task.title = editTaskTitle;
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const deleteTask = taskId => {
    const confirmation = confirm('Are you sure?');
    if (confirmation) {
      setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
      toast.success('Task Deleted!');
    }
  };

  const value = {
    tasks,
    addTask,
    updateTaskStatus,
    editTask,
    deleteTask,
  };

  return (
    <TaskContext.Provider value={value}>{props.children}</TaskContext.Provider>
  );
};
