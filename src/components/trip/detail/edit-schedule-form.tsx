'use client';

import { useState } from 'react';
import { useScheduleContext } from '@/context/schedule-context';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { EditIcon, Trash2Icon } from 'lucide-react';

interface EditScheduleFormProps {
  scheduleId: number;
}

export default function EditScheduleForm({
  scheduleId,
}: EditScheduleFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { removeSchedule } = useScheduleContext();

  const handleDelete = () => {
    const confirmed = window.confirm('정말 일정을 삭제하시겠습니까?');
    if (confirmed) {
      setIsOpen(false);
      removeSchedule(scheduleId);
    }
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
      }}
    >
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground mr-1 size-6"
        >
          <EditIcon />
        </Button>
      </DialogTrigger>

      <DialogContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>일정 편집</DialogTitle>
        </DialogHeader>

        <p>일정 편집 기능은 준비중입니다.</p>

        <DialogFooter className="flex justify-between">
          <Button variant="destructive" onClick={handleDelete}>
            <Trash2Icon />
          </Button>
          <Button onClick={() => setIsOpen(false)}>닫기</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
