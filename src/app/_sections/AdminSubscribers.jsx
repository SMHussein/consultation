import { getNewsletterEmails } from '../_api/services';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default async function AdminSubscribers() {
  const subscribers = await getNewsletterEmails();

  return (
    <Table className="mt-20">
      <TableHeader>
        <TableRow>
          <TableHead>#</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {subscribers.map((subscriber, i) => (
          <TableRow key={i}>
            <TableCell>{i + 1}</TableCell>
            <TableCell>{subscriber.name}</TableCell>
            <TableCell>{subscriber.email}</TableCell>
          </TableRow>
        ))}
        <TableRow></TableRow>
      </TableBody>
    </Table>
  );
}
