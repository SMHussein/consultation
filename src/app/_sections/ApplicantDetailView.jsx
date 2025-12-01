'use client';

import { useState } from 'react';
import Button from '@/src/app/_components/Button';
import Modal from '@/src/app/_components/Modal';
import { archiveApplicant } from '../_api/serverFunctions';
import {
  BsEnvelope,
  BsTelephone,
  BsGlobe,
  BsCash,
  BsFillPinMapFill,
  BsBuildings,
  BsCardChecklist,
  BsSliders2,
  BsEnvelopePaper,
  BsLinkedin,
  BsFileEarmarkPerson,
  BsDownload,
} from 'react-icons/bs';

const fieldConfig = {
  email: { icon: BsEnvelope, label: 'Email' },
  phone: { icon: BsTelephone, label: 'Phone Number' },
  nationality: { icon: BsGlobe, label: 'Nationality' },
  salary: { icon: BsCash, label: 'Expected Salary (SAR)' },
  location: { icon: BsFillPinMapFill, label: 'Current Location' },
  company: { icon: BsBuildings, label: 'Current Company' },
  university: { icon: BsCardChecklist, label: 'University Degree' },
  arabic: { icon: BsSliders2, label: 'Arabic Proficiency' },
  english: { icon: BsSliders2, label: 'English Proficiency' },
  extraInfo: { icon: BsEnvelopePaper, label: 'Extra Information' },
};

export default function ApplicantDetailView({ applicant, jobId, isArchive = false }) {
  const [showModal, setShowModal] = useState(false);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return dateString;
    }
  };

  const { name, linkedin, cv, extraInfo, created_at, ...fields } = applicant;

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-150 to-primary-160 px-8 py-6 text-white">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-2xl font-bold">
            {name?.charAt(0)?.toUpperCase() || 'A'}
          </div>
          <div>
            <h1 className="text-3xl font-bold">{name || 'N/A'}</h1>
            <p className="text-white/90 mt-1">Applied on {formatDate(created_at)}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        {/* Contact Information */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-primary-200 mb-4 flex items-center gap-2">
            <BsFileEarmarkPerson className="text-primary-150" size={24} />
            Contact Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(fieldConfig)
              .filter(([key]) => fields[key] && key !== 'extraInfo')
              .map(([key, config]) => {
                const Icon = config.icon;
                return (
                  <div
                    key={key}
                    className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200"
                  >
                    <Icon className="text-primary-150 mt-1 flex-shrink-0" size={20} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-primary-160 mb-1">
                        {config.label}
                      </p>
                      <p className="text-primary-200 font-semibold break-words">
                        {fields[key]}
                      </p>
                    </div>
                  </div>
                );
              })}
          </div>
        </section>

        {/* Extra Information */}
        {extraInfo && (
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-primary-200 mb-4 flex items-center gap-2">
              <BsEnvelopePaper className="text-primary-150" size={24} />
              Additional Information
            </h2>
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-primary-200 whitespace-pre-wrap">{extraInfo}</p>
            </div>
          </section>
        )}

        {/* Links and Documents */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-primary-200 mb-4">Links & Documents</h2>
          <div className="flex flex-wrap gap-4">
            {linkedin && (
              <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                <BsLinkedin size={20} />
                View LinkedIn Profile
              </a>
            )}
            {cv && (
              <a
                href={cv}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary-150 text-white rounded-lg hover:bg-primary-160 transition-colors font-medium"
              >
                <BsDownload size={20} />
                Download CV
              </a>
            )}
          </div>
        </section>

        {/* Actions */}
        {!isArchive && (
          <section className="pt-6 border-t border-gray-200">
            <div className="flex gap-4">
              <Button onClick={() => setShowModal(true)}>Archive Applicant</Button>
              <Modal
                id={applicant.id}
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                message="Are you sure you want to archive this applicant? This action is irreversible."
                onConfirm={archiveApplicant}
              />
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

