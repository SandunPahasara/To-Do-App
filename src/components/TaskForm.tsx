import React, { useState, useEffect } from 'react';
import { Priority, Task } from '../types/Task';
import { Plus, Save, Calendar, Flag } from 'lucide-react';

interface TaskFormProps {
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  editTask?: Task;
  updateTask?: (task: Task) => void;
  cancelEdit?: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({
  addTask,
  editTask,
  updateTask,
  cancelEdit
}) => {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [dueDate, setDueDate] = useState<string>('');
  const isEditing = !!editTask;

  useEffect(() => {
    if (editTask) {
      setTitle(editTask.title);
      setPriority(editTask.priority);
      setDueDate(editTask.dueDate || '');
    }
  }, [editTask]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) return;
    
    if (isEditing && updateTask && editTask) {
      updateTask({
        ...editTask,
        title: title.trim(),
        priority,
        dueDate: dueDate || null
      });
      
      if (cancelEdit) cancelEdit();
    } else {
      addTask({
        title: title.trim(),
        completed: false,
        priority,
        dueDate: dueDate || null
      });
    }
    
    // Reset form
    setTitle('');
    setPriority('medium');
    setDueDate('');
  };

  const priorityColors = {
    low: 'bg-green-100 text-green-800 border-green-300 dark:bg-green-900 dark:text-green-200 dark:border-green-700',
    medium: 'bg-yellow-100 text-yellow-800 border-yellow-300 dark:bg-yellow-900 dark:text-yellow-200 dark:border-yellow-700',
    high: 'bg-red-100 text-red-800 border-red-300 dark:bg-red-900 dark:text-red-200 dark:border-red-700',
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8 bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md transition-all duration-200">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-grow">
          <label htmlFor="task-input" className="sr-only">
            {isEditing ? 'Update task' : 'Add a new task'}
          </label>
          <input
            id="task-input"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={isEditing ? 'Update task...' : 'Add a new task...'}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all duration-200"
            autoFocus
          />
        </div>
        
        <div className="flex gap-2">
          <div className="relative">
            <label htmlFor="due-date" className="sr-only">Due Date</label>
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Calendar className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            </div>
            <input
              id="due-date"
              type="datetime-local"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="pl-10 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all duration-200"
            />
          </div>
          
          <div className="relative">
            <label htmlFor="priority-select" className="sr-only">Priority</label>
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Flag className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            </div>
            <select
              id="priority-select"
              value={priority}
              onChange={(e) => setPriority(e.target.value as Priority)}
              className="pl-10 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all duration-200"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
          >
            {isEditing ? (
              <>
                <Save className="h-5 w-5" />
                <span>Update</span>
              </>
            ) : (
              <>
                <Plus className="h-5 w-5" />
                <span>Add</span>
              </>
            )}
          </button>
          
          {isEditing && cancelEdit && (
            <button
              type="button"
              onClick={cancelEdit}
              className="px-6 py-3 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200"
            >
              Cancel
            </button>
          )}
        </div>
      </div>
      
      <div className="mt-4 flex gap-2">
        <p className="text-sm text-gray-600 dark:text-gray-400">Priority:</p>
        <div className="flex gap-2">
          {(['low', 'medium', 'high'] as Priority[]).map((p) => (
            <button
              key={p}
              type="button"
              className={`text-xs px-2 py-1 rounded-full border ${priorityColors[p]} ${priority === p ? 'ring-2 ring-offset-2 ring-blue-500' : ''} capitalize transition-all duration-200`}
              onClick={() => setPriority(p)}
            >
              {p}
            </button>
          ))}
        </div>
      </div>
    </form>
  );
};

export default TaskForm;