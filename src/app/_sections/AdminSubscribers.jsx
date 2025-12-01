'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { deleteSubscriber } from '../_api/serverFunctions';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { BsTrash, BsEnvelope } from 'react-icons/bs';
import Modal from '../_components/Modal';

export default function AdminSubscribers({ initialSubscribers }) {
  const router = useRouter();
  const [subscribers, setSubscribers] = useState(initialSubscribers || []);
  const [showModal, setShowModal] = useState(false);
  const [selectedSubscriberId, setSelectedSubscriberId] = useState(null);

  const handleDeleteClick = (id) => {
    setSelectedSubscriberId(id);
    setShowModal(true);
  };

  const handleDeleteAction = async (currentState, formData) => {
    const result = await deleteSubscriber(currentState, formData);
    return result;
  };

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
    <div className="mt-8">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h2 className="text-lg font-semibold text-primary-200">
            Newsletter Subscribers ({subscribers.length})
          </h2>
        </div>
        {subscribers.length === 0 ? (
          <div className="p-12 text-center text-primary-160">
            <BsEnvelope size={48} className="mx-auto mb-4 text-primary-170 opacity-50" />
            <p>No subscribers yet</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="w-16">#</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Subscribed On</TableHead>
                  <TableHead className="w-24 text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {subscribers.map((subscriber, i) => {
                  // Handle different possible ID field names
                  const subscriberId = subscriber.id || subscriber.ID || subscriber.subscriber_id;
                  return (
                    <TableRow key={subscriberId || i} className="hover:bg-gray-50">
                      <TableCell className="font-medium">{i + 1}</TableCell>
                      <TableCell className="font-semibold text-primary-200">
                        {subscriber.name || 'N/A'}
                      </TableCell>
                      <TableCell>
                        <a
                          href={`mailto:${subscriber.email}`}
                          className="text-primary-150 hover:underline"
                        >
                          {subscriber.email}
                        </a>
                      </TableCell>
                      <TableCell className="text-sm text-primary-160">
                        {formatDate(subscriber.created_at)}
                      </TableCell>
                      <TableCell>
                        {subscriberId ? (
                          <button
                            onClick={() => handleDeleteClick(subscriberId)}
                            className="mx-auto flex items-center justify-center w-8 h-8 text-red-600 hover:bg-red-50 rounded transition-colors"
                            title="Delete subscriber"
                          >
                            <BsTrash size={16} />
                          </button>
                        ) : (
                          <span className="text-xs text-gray-400">No ID</span>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        )}
      </div>

      {selectedSubscriberId && (
        <Modal
          id={selectedSubscriberId}
          isOpen={showModal}
          onClose={() => {
            setShowModal(false);
            setSelectedSubscriberId(null);
          }}
          message="Are you sure you want to delete this subscriber? This action cannot be undone."
          onConfirm={handleDeleteAction}
        />
      )}
    </div>
  );
}
