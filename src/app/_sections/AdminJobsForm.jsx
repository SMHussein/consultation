'use client';
import { useActionState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { updateJson } from '@/src/app/_api/serverFunctions';
import english from '@/messages/en.json';
import arabic from '@/messages/ar.json';
import Button from '../_components/Button';
import Heading from '../_components/Heading';
import { splitByComma, toCamelCase } from '../_utils/helpers';

const enMessages = english;
const arMessages = arabic;

export default function AdminJobsForm() {
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
    const nameEn = data.get('nameEn');
    const nameAr = data.get('nameAr');
    const subtitleEn = data.get('subtitleEn');
    const subtitleAr = data.get('subtitleAr');
    const text1En = data.get('text1En');
    const text1Ar = data.get('text1Ar');
    const text2En = data.get('text2En');
    const text2Ar = data.get('text2Ar');
    const text3En = data.get('text3En');
    const text3Ar = data.get('text3Ar');
    const itemsEn = splitByComma(data.get('itemsEn'));
    const itemsAr = splitByComma(data.get('itemsAr'));
    const image = data.get('image');

    const serviceEn = {};
    const serviceAr = {};
    const serviceKey = toCamelCase(nameEn);

    serviceEn.title = nameEn;
    serviceAr.title = nameAr;
    serviceEn.subTitle = subtitleEn;
    serviceAr.subTitle = subtitleAr;
    serviceEn.text1 = text1En;
    serviceAr.text1 = text1Ar;
    serviceEn.text2 = text2En;
    serviceAr.text2 = text2Ar;
    serviceEn.text3 = text3En;
    serviceAr.text3 = text3Ar;
    serviceEn.items = itemsEn;
    serviceAr.items = itemsAr;
    serviceEn.src = serviceAr.src = `/services/${image}`;
    serviceEn.href = serviceAr.href = nameEn;
    serviceEn.btnText = 'Read More';
    serviceAr.btnText = 'اقرأ المزيد';

    if (enMessages.OurServices[serviceKey]) {
      return toast.error('Service already exists!');
    }

    enMessages.OurServices[serviceKey] = serviceEn;
    arMessages.OurServices[serviceKey] = serviceAr;

    const updatedData = { enMessages, arMessages };
    // formAction(updatedData);
    console.log(enMessages.OurServices[serviceKey]);
    console.log(arMessages.OurServices[serviceKey]);
  };

  return (
    <>
      <div className=" mt-8 border border-accent-100 py-6 px-4 flex flex-col gap-4">
        <Heading type="secondary">Add new service</Heading>

        <form className="flex flex-col gap-4" action={submitAction}>
          <FormItem
            name="nameEn"
            label="Service Name English"
            placeholder="ex: Organizational Excellency"
            errors={errors}
            register={register}
          />
          <FormItem
            name="nameAr"
            label="Service Name Arabic"
            placeholder="ex: التميز المؤسسي"
            errors={errors}
            register={register}
          />
          <FormItem
            name="subtitleEn"
            label="Subtitle English"
            errors={errors}
            register={register}
          />
          <FormItem
            name="subtitleAr"
            label="Subtitle Arabic"
            errors={errors}
            register={register}
          />
          <FormItem
            name="text1En"
            label="First Text English"
            errors={errors}
            register={register}
          />
          <FormItem
            name="text1Ar"
            label="First Text Arabic"
            errors={errors}
            register={register}
          />
          <FormItem
            name="text2En"
            label="Second Text English"
            errors={errors}
            register={register}
          />
          <FormItem
            name="text2Ar"
            label="Second Text Arabic"
            errors={errors}
            register={register}
          />
          <FormItem
            name="text3En"
            label="Third Text English"
            errors={errors}
            register={register}
          />
          <FormItem
            name="text3Ar"
            label="Third Text Arabic"
            errors={errors}
            register={register}
          />
          <FormItem
            name="itemsEn"
            label="Items Arabic"
            placeholder="add items seperated with comma ex: Strategy development,Strategy execution"
            errors={errors}
            register={register}
          />
          <FormItem
            name="itemsAr"
            label="Items Arabic"
            placeholder="add items seperated with comma in arabic"
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

function FormItem({ name, label, errors, register, placeholder }) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        placeholder={placeholder}
        id={name}
        {...register(name)}
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />
      {errors.name && (
        <span className="text-red-500 text-sm">This field is required</span>
      )}
    </div>
  );
}
