import React, { useState } from 'react';
import { Task } from '../types/Task';
import { Check, Edit, Trash2, Clock, AlertTriangle, Flag } from 'lucide-react';
import { formatDistanceToNow } from '../utils/dateUtils';

interface TaskItemProps {
  task: Task;
  toggleComplete: (id: string) => void;
  deleteTask: (id: string) => void;
  startEditing: (task: Task) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  toggleComplete,
  deleteTask,
  startEditing
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const priorityClasses = {
    low: 'bg-green-100 text-green-800 border-green-300 dark:bg-green-900 dark:text-green-200 dark:border-green-700',
    medium: 'bg-yellow-100 text-yellow-800 border-yellow-300 dark:bg-yellow-900 dark:text-yellow-200 dark:border-yellow-700',
    high: 'bg-red-100 text-red-800 border-red-300 dark:bg-red-900 dark:text-red-200 dark:border-red-700',
  };
  
  const priorityIcon = {
    low: <Flag className="h-4 w-4 text-green-600 dark:text-green-400" />,
    medium: <Flag className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />,
    high: <Flag className="h-4 w-4 text-red-600 dark:text-red-400" />,
  };
  
  const isDueSoon = () => {
    if (!task.dueDate) return false;
    
    const now = new Date();
    const due = new Date(task.dueDate);
    const diffHours = (due.getTime() - now.getTime()) / (1000 * 60 * 60);
    
    return diffHours > 0 && diffHours < 24;
  };
  
  const isOverdue = () => {
    if (!task.dueDate) return false;
    
    const now = new Date();
    const due = new Date(task.dueDate);
    
    return due < now;
  };

  return (
    <div 
      className={`mb-4 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 transition-all duration-200 ${task.completed ? 'opacity-70' : ''} ${isHovered ? 'shadow-md' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-start gap-3 flex-1">
          <button
            onClick={() => toggleComplete(task.id)}
            className={`mt-1 flex-shrink-0 h-6 w-6 rounded-full border-2 ${
              task.completed
                ? 'bg-blue-500 border-blue-500 dark:bg-blue-600 dark:border-blue-600 text-white flex items-center justify-center'
                : 'border-gray-400 dark:border-gray-500'
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200`}
            aria-label={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
          >
            {task.completed && <Check className="h-4 w-4" />}
          </button>
          
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <p className={`text-base text-gray-800 dark:text-gray-200 ${task.completed ? 'line-through text-gray-500 dark:text-gray-400' : ''}`}>
                {task.title}
              </p>
              
              <span className={`text-xs px-2 py-0.5 rounded-full border ${priorityClasses[task.priority]} capitalize flex items-center gap-1`}>
                {priorityIcon[task.priority]}
                {task.priority}
              </span>
              
              {isDueSoon() && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-800 border border-yellow-300 dark:bg-yellow-900 dark:text-yellow-200 dark:border-yellow-700 flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  Due soon
                </span>
              )}
              
              {isOverdue() && !task.completed && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-red-100 text-red-800 border border-red-300 dark:bg-red-900 dark:text-red-200 dark:border-red-700 flex items-center gap-1">
                  <AlertTriangle className="h-3 w-3" />
                  Overdue
                </span>
              )}
            </div>
            
            <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
              <p>Created {formatDistanceToNow(new Date(task.createdAt))} ago</p>
              
              {task.dueDate && (
                <p className={`flex items-center gap-1 ${
                  isOverdue() && !task.completed ? 'text-red-600 dark:text-red-400' : ''
                }`}>
                  <Clock className="h-3 w-3" />
                  Due: {new Date(task.dueDate).toLocaleString()}
                </p>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex gap-2 items-center">
          <button
            onClick={() => startEditing(task)}
            className="p-2 text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
            aria-label="Edit task"
          >
            <Edit className="h-5 w-5" />
          </button>
          
          <button
            onClick={() => deleteTask(task.id)}
            className="p-2 text-gray-600 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200"
            aria-label="Delete task"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;