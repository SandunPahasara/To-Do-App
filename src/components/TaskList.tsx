import React from 'react';
import { Task } from '../types/Task';
import TaskItem from './TaskItem';
import { ClipboardList } from 'lucide-react';

interface TaskListProps {
  tasks: Task[];
  toggleComplete: (id: string) => void;
  deleteTask: (id: string) => void;
  startEditing: (task: Task) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  toggleComplete,
  deleteTask,
  startEditing
}) => {
  if (tasks.length === 0) {
    return (
      <div className="py-12 flex flex-col items-center justify-center text-center bg-gray-50 dark:bg-gray-800 rounded-lg">
        <ClipboardList className="h-12 w-12 text-gray-400 mb-3" />
        <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300 mb-1">No tasks found</h3>
        <p className="text-gray-500 dark:text-gray-400">Create a new task to get started</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          toggleComplete={toggleComplete}
          deleteTask={deleteTask}
          startEditing={startEditing}
        />
      ))}
    </div>
  );
};

export default TaskList;