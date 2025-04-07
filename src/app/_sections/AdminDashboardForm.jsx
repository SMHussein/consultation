'use client';
import { useActionState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { updateJson } from '@/src/app/_api/serverFunctions';
import english from '@/messages/en.json';
import arabic from '@/messages/ar.json';
import Button from '../_components/Button';
import Heading from '../_components/Heading';

const enMessages = english;
const arMessages = arabic;

export default function AdminDashboardForm() {
  const [formState, formAction] = useActionState(updateJson, {});
  const statsPath = enMessages.stats;
  const {
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      nationalities: statsPath.nationalities.number,
      clients: statsPath.clients.number,
      years: statsPath.years.number,
      sectors: statsPath.sectors.number,
      projects: statsPath.projects.number,
    },
  });

  useEffect(() => {
    if (formState.error) {
      toast.error(formState.error);
    }
    if (formState.success) {
      toast.success(formState.success);
    }
  }, [formState]);

  const submitAction = (data) => {
    const sectors = data.get('sectors');
    const years = data.get('years');
    const nationalities = data.get('nationalities');
    const clients = data.get('clients');
    const projects = data.get('projects');

    enMessages.stats.sectors.number = sectors;
    arMessages.stats.sectors.number = sectors;

    enMessages.stats.years.number = years;
    arMessages.stats.years.number = years;

    enMessages.stats.nationalities.number = nationalities;
    arMessages.stats.nationalities.number = nationalities;

    enMessages.stats.clients.number = clients;
    arMessages.stats.clients.number = clients;

    enMessages.stats.projects.number = projects;
    arMessages.stats.projects.number = projects;

    const updatedData = { enMessages, arMessages };

    formAction(updatedData);
  };

  return (
    <>
      <div className=" mt-8 border border-accent-100 py-6 px-4 flex flex-col gap-4">
        <Heading type="secondary"> ECMC Statistics</Heading>

        <form className="flex flex-col gap-4" action={submitAction}>
          <FormItem
            name="years"
            label="Years"
            errors={errors}
            register={register}
          />
          <FormItem
            name="sectors"
            label="Sectors"
            errors={errors}
            register={register}
          />
          <FormItem
            name="nationalities"
            label="Nationalities"
            errors={errors}
            register={register}
          />
          <FormItem
            name="clients"
            label="Clients"
            errors={errors}
            register={register}
          />
          <FormItem
            name="projects"
            label="Projects"
            errors={errors}
            register={register}
          />

          <div>
            <Button
              type="submit"
              className="flex gap-2 justify-center items-center"
            >
              Update Stats
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}

function FormItem({ name, label, errors, register }) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        id={name}
        required
        {...register(name)}
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />
      {errors.name && (
        <span className="text-red-500 text-sm">This field is required</span>
      )}
    </div>
  );
}
