import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { Task } from '../types/Task';

interface CalendarProps {
  tasks: Task[];
}

const Calendar: React.FC<CalendarProps> = ({ tasks }) => {
  const events = tasks.map(task => ({
    title: task.title,
    start: task.dueDate,
    className: `priority-${task.priority} ${task.completed ? 'completed' : ''}`,
    backgroundColor: task.completed ? '#9CA3AF' : getPriorityColor(task.priority),
  }));

  function getPriorityColor(priority: string): string {
    switch (priority) {
      case 'high':
        return '#EF4444';
      case 'medium':
        return '#F59E0B';
      case 'low':
        return '#10B981';
      default:
        return '#3B82F6';
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 mb-8">
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events}
        height="auto"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth'
        }}
        className="task-calendar"
      />
    </div>
  );
};

export default Calendar;