'use client';

import { useState } from 'react';
import { useScheduleContext } from '@/context/schedule-context';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { getModeName } from '@/lib/transport';
import { TransportRoute, TRANSPORT_MODES } from '@/types/schedule';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { PlusIcon } from 'lucide-react';

interface TransportRouteFormProps {
  scheduleId: number;
}

const FormSchema = z.object({
  mode: z.enum(TRANSPORT_MODES, {
    required_error: '교통 수단을 선택해주세요.',
  }),
  from: z.string().nonempty('출발지를 입력해주세요.'),
  to: z.string().nonempty('도착지를 입력해주세요.'),
  memo: z.string().optional(),
});

export default function TransportRouteForm({
  scheduleId,
}: TransportRouteFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { addTransportRoute } = useScheduleContext();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      from: '',
      to: '',
      memo: '',
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const newTransportRoute: TransportRoute = {
      id: Date.now(),
      mode: data.mode,
      from: data.from,
      to: data.to,
      memo: data.memo,
    };

    addTransportRoute(scheduleId, newTransportRoute);
    toast.success('여행 경로가 성공적으로 추가되었습니다.');
    setIsOpen(false);
    form.reset();
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
        if (!open) form.reset();
      }}
    >
      <DialogTrigger asChild>
        <Button size="icon" className="size-6 rounded-full">
          <PlusIcon />
        </Button>
      </DialogTrigger>

      <DialogContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>교통 및 경로</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
            noValidate
          >
            <FormField
              control={form.control}
              name="mode"
              render={({ field }) => (
                <FormItem>
                  <Label>교통 수단</Label>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger size="sm">
                        <SelectValue placeholder="필수 선택" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {TRANSPORT_MODES.map((mode) => (
                        <SelectItem key={mode} value={mode}>
                          {getModeName(mode)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="from"
              render={({ field }) => (
                <FormItem>
                  <Label>출발지</Label>
                  <FormControl>
                    <Input placeholder="필수 입력" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="to"
              render={({ field }) => (
                <FormItem>
                  <Label>도착지</Label>
                  <FormControl>
                    <Input placeholder="필수 입력" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="memo"
              render={({ field }) => (
                <FormItem>
                  <Label>메모</Label>
                  <FormControl>
                    <Input placeholder="선택 입력" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="submit" className="mt-2">
                추가하기
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
