import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import TaskForm from './components/TaskForm';
import FilterBar from './components/FilterBar';
import TaskList from './components/TaskList';
import Calendar from './components/Calendar';
import Footer from './components/Footer';
import { Task, Filter } from './types/Task';
import useLocalStorage from './hooks/useLocalStorage';

function App() {
  const [darkMode, setDarkMode] = useLocalStorage<boolean>('darkMode', false);
  const [tasks, setTasks] = useLocalStorage<Task[]>('tasks', []);
  const [filter, setFilter] = useState<Filter>('all');
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [showCalendar, setShowCalendar] = useState<boolean>(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const addTask = (taskData: Omit<Task, 'id' | 'createdAt'>) => {
    const newTask: Task = {
      ...taskData,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString()
    };
    
    setTasks([newTask, ...tasks]);
  };

  const toggleComplete = (id: string) => {
    setTasks(
      tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const startEditing = (task: Task) => {
    setEditingTask(task);
  };

  const cancelEditing = () => {
    setEditingTask(null);
  };

  const updateTask = (updatedTask: Task) => {
    setTasks(
      tasks.map(task => (task.id === updatedTask.id ? updatedTask : task))
    );
    setEditingTask(null);
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  const taskCounts = {
    all: tasks.length,
    active: tasks.filter(task => !task.completed).length,
    completed: tasks.filter(task => task.completed).length,
  };

  return (
    <>
      <div className="animated-bg" />
      <div className="min-h-screen bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm text-gray-900 dark:text-gray-100 flex flex-col transition-colors duration-200">
        <Header 
          darkMode={darkMode} 
          toggleDarkMode={toggleDarkMode}
          showCalendar={showCalendar}
          setShowCalendar={setShowCalendar}
        />
        
        <main className="flex-grow container mx-auto px-4 pb-12 max-w-3xl">
          <TaskForm 
            addTask={addTask} 
            editTask={editingTask || undefined}
            updateTask={updateTask}
            cancelEdit={cancelEditing}
          />
          
          {showCalendar && <Calendar tasks={tasks} />}
          
          <FilterBar 
            currentFilter={filter}
            setFilter={setFilter}
            taskCounts={taskCounts}
          />
          
          <TaskList
            tasks={filteredTasks}
            toggleComplete={toggleComplete}
            deleteTask={deleteTask}
            startEditing={startEditing}
          />
        </main>
        
        <Footer />
      </div>
    </>
  );
}

export default App;