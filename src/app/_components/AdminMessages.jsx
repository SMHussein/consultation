'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { deleteMessage } from '../_api/serverFunctions';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { BsTrash, BsEnvelope } from 'react-icons/bs';
import Modal from './Modal';
import { toast } from 'react-hot-toast';

export default function AdminMessages({ initialMessages }) {
  const router = useRouter();
  const [messages, setMessages] = useState(initialMessages || []);
  const [showModal, setShowModal] = useState(false);
  const [selectedMessageId, setSelectedMessageId] = useState(null);

  const handleDeleteClick = (id) => {
    setSelectedMessageId(id);
    setShowModal(true);
  };

  const handleDeleteAction = async (currentState, formData) => {
    const result = await deleteMessage(currentState, formData);
    return result;
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
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
            Messages ({messages.length})
          </h2>
        </div>
        {messages.length === 0 ? (
          <div className="p-12 text-center text-primary-160">
            <BsEnvelope size={48} className="mx-auto mb-4 text-primary-170 opacity-50" />
            <p>No messages yet</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="w-16">#</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Message</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="w-24 text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {messages.map((message, i) => {
                  // Handle different possible ID field names
                  const messageId = message.id || message.ID || message.message_id;
                  return (
                    <TableRow key={messageId || i} className="hover:bg-gray-50">
                      <TableCell className="font-medium">{i + 1}</TableCell>
                      <TableCell className="font-semibold text-primary-200">
                        {message.name}
                      </TableCell>
                      <TableCell>
                        <a
                          href={`mailto:${message.email}`}
                          className="text-primary-150 hover:underline"
                        >
                          {message.email}
                        </a>
                      </TableCell>
                      <TableCell>
                        <a
                          href={`tel:${message.phone}`}
                          className="text-primary-150 hover:underline"
                        >
                          {message.phone}
                        </a>
                      </TableCell>
                      <TableCell>
                        <div className="max-w-md">
                          <p className="text-sm text-primary-160 line-clamp-2">
                            {message.message}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-primary-160">
                        {formatDate(message.created_at)}
                      </TableCell>
                      <TableCell>
                        {messageId ? (
                          <button
                            onClick={() => handleDeleteClick(messageId)}
                            className="mx-auto flex items-center justify-center w-8 h-8 text-red-600 hover:bg-red-50 rounded transition-colors"
                            title="Delete message"
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

      {selectedMessageId && (
        <Modal
          id={selectedMessageId}
          isOpen={showModal}
          onClose={() => {
            setShowModal(false);
            setSelectedMessageId(null);
          }}
          message="Are you sure you want to delete this message? This action cannot be undone."
          onConfirm={handleDeleteAction}
        />
      )}
    </div>
  );
}
