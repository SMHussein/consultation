import { getMessages } from '../_api/services';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default async function AdminMessages() {
  const messages = await getMessages();

  return (
    <Table className="mt-20">
      <TableHeader>
        <TableRow>
          <TableHead>#</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Phone</TableHead>
          <TableHead>Message</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {messages.map((message, i) => (
          <TableRow key={i}>
            <TableCell>{i + 1}</TableCell>
            <TableCell>{message.name}</TableCell>
            <TableCell>{message.email}</TableCell>
            <TableCell>{message.phone}</TableCell>
            <TableCell>{message.message}</TableCell>
          </TableRow>
        ))}
        <TableRow></TableRow>
      </TableBody>
    </Table>
  );
}
