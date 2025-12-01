'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  BsEnvelope,
  BsTelephone,
  BsGlobe,
  BsCash,
  BsFillPinMapFill,
  BsBuildings,
  BsCardChecklist,
  BsLinkedin,
  BsFileEarmarkPerson,
  BsSearch,
  BsEye,
} from 'react-icons/bs';

export default function AdminApplicantsList({ applicants, jobId, isArchive = false }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredApplicants = applicants.filter((applicant) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      applicant.name?.toLowerCase().includes(searchLower) ||
      applicant.email?.toLowerCase().includes(searchLower) ||
      applicant.phone?.toLowerCase().includes(searchLower) ||
      applicant.location?.toLowerCase().includes(searchLower) ||
      applicant.company?.toLowerCase().includes(searchLower)
    );
  });

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch {
      return dateString;
    }
  };

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative">
        <BsSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary-160 text-lg" />
        <input
          type="text"
          placeholder="Search by name, email, phone, location, or company..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-150 focus:border-transparent"
        />
      </div>

      {/* Results Count */}
      <div className="text-sm text-primary-160">
        Showing {filteredApplicants.length} of {applicants.length} applicants
      </div>

      {/* Applicants Grid */}
      {filteredApplicants.length === 0 ? (
        <div className="text-center py-12 text-primary-160">
          {searchTerm ? 'No applicants found matching your search.' : 'No applicants yet!'}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredApplicants.map((applicant) => (
            <div
              key={applicant.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow overflow-hidden"
            >
              <div className="p-5">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-primary-150 flex items-center justify-center text-white font-semibold">
                      {applicant.name?.charAt(0)?.toUpperCase() || 'A'}
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary-200 text-lg">
                        {applicant.name || 'N/A'}
                      </h3>
                      <p className="text-sm text-primary-160">
                        Applied {formatDate(applicant.created_at)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Quick Info */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-primary-160">
                    <BsEnvelope className="text-primary-170" size={16} />
                    <span className="truncate">{applicant.email || 'N/A'}</span>
                  </div>
                  {applicant.phone && (
                    <div className="flex items-center gap-2 text-sm text-primary-160">
                      <BsTelephone className="text-primary-170" size={16} />
                      <span>{applicant.phone}</span>
                    </div>
                  )}
                  {applicant.location && (
                    <div className="flex items-center gap-2 text-sm text-primary-160">
                      <BsFillPinMapFill className="text-primary-170" size={16} />
                      <span className="truncate">{applicant.location}</span>
                    </div>
                  )}
                  {applicant.company && (
                    <div className="flex items-center gap-2 text-sm text-primary-160">
                      <BsBuildings className="text-primary-170" size={16} />
                      <span className="truncate">{applicant.company}</span>
                    </div>
                  )}
                  {applicant.salary && (
                    <div className="flex items-center gap-2 text-sm text-primary-160">
                      <BsCash className="text-primary-170" size={16} />
                      <span>{applicant.salary} SAR</span>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-4 border-t border-gray-100">
                  <Link
                    href={`/admin/${isArchive ? 'archive' : 'jobs'}/${jobId}/applicant/${applicant.id}`}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-primary-150 text-white rounded-md hover:bg-primary-160 transition-colors text-sm font-medium"
                  >
                    <BsEye size={16} />
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

