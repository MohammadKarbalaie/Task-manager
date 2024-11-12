"use client";
import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { updateTask } from '../../../api/services/update-services'; 
import { httpClient } from '../../../api/client';
import { urls } from '../../../api/urls'; 
import { ITask } from '@/app/types/ITask';

function InProgress() {
  const queryClient = useQueryClient();

  const { data: tasks, isLoading, error } = useQuery<ITask[]>({
    queryKey: ['tasks', 'inProgress'],
    queryFn: async () => {
      const authToken = localStorage.getItem('authToken');
      if (!authToken) {
        throw new Error('No authentication token found.');
      }

      try {
        const res = await httpClient().get(urls.list, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        console.log('Response data:', res.data);
        if (Array.isArray(res.data.items)) {
          return res.data.items.filter((task: ITask) => !task.completed);
        } else {
          throw new Error('Data is not an array');
        }
      } catch (err) {
        console.error('Error fetching tasks:', err);
        throw err;  
      }
    },
  });

  const mutation = useMutation({
    mutationFn: (task: ITask) => updateTask(task.id, { ...task, completed: true } as ITask), 
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks', 'inProgress'] }); 
    },
    onError: (err) => {
      console.error('Error updating task:', err); 
    },
  });

  if (isLoading) return <p>Loading</p>;
  if (error instanceof Error) {
    return <p>{`Error fetching data : ${error.message}`}</p>;
  }

  const handleCheckboxChange = (task: ITask) => {
    mutation.mutate(task); 
  };

  return (
    <div className="p-6 h-screen">
      <div className="bg-[#fceede] w-full flex flex-col gap-4 p-4 h-screen">
        <p className="text-xl p-2 font-semibold">Loading</p>

        {tasks?.map((task) => (
          <div className="flex gap-4 items-center" key={task.id}>
            <input
              type="checkbox"
              checked={task.completed} 
              onChange={() => handleCheckboxChange(task)}  
            />
            <p>{task.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default InProgress;
