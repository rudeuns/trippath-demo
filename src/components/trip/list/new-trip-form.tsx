'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { cn } from '@/lib/utils';
import { DateRange } from 'react-day-picker';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
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
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { CalendarIcon, PlusIcon } from 'lucide-react';
import { Trip } from '@/types/trip';

interface NewTripFormProps {
  onCreate: (trip: Trip) => void;
}

const FormSchema = z.object({
  title: z
    .string()
    .nonempty('여행명을 입력해주세요.')
    .max(20, '여행명은 20자 이하로 입력해주세요.'),
  destination: z.string().nonempty('여행지를 입력해주세요.'),
  date: z
    .object({
      from: z.string().optional(),
      to: z.string().optional(),
    })
    .refine((range) => range.from && range.to, {
      message: '여행 기간을 선택해주세요.',
    }),
});

export default function NewTripForm({ onCreate }: NewTripFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [date, setDate] = useState<DateRange | undefined>(undefined);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: '',
      destination: '',
      date: { from: '', to: '' },
    },
  });

  function handleDateSelect(
    range: DateRange | undefined,
    onChange: (value: { from: string | ''; to: string | '' }) => void,
  ) {
    setDate(range);

    if (range?.from && range.to) {
      onChange({
        from: format(range.from, 'yyyy-MM-dd'),
        to: format(range.to, 'yyyy-MM-dd'),
      });
    } else {
      onChange({ from: '', to: '' });
    }
  }

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const newTrip: Trip = {
      id: Date.now(),
      title: data.title,
      destination: data.destination,
      startDate: data.date.from ?? '2025-01-01',
      endDate: data.date.to ?? '2025-01-01',
    };

    onCreate(newTrip);
    toast.success('여행이 성공적으로 추가되었습니다.');
    setIsOpen(false);
    form.reset();
    setDate(undefined);
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
        if (!open) {
          form.reset();
          setDate(undefined);
        }
      }}
    >
      <DialogTrigger asChild>
        <Button>
          <PlusIcon /> 새로운 여행
        </Button>
      </DialogTrigger>

      <DialogContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>새로운 여행</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <Label>여행명</Label>
                  <FormControl>
                    <Input placeholder="예) 크리스마스 여행" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="destination"
              render={({ field }) => (
                <FormItem>
                  <Label>여행지</Label>
                  <FormControl>
                    <Input placeholder="예) 제주도 / 일본, 도쿄" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <Label>여행 기간</Label>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            'w-full justify-start font-normal',
                            !date && 'text-muted-foreground',
                          )}
                        >
                          <CalendarIcon />
                          {date?.from ? (
                            date.to ? (
                              `${format(date.from, 'yyyy.MM.dd')} ~
                                ${format(date.to, 'yyyy.MM.dd')}`
                            ) : (
                              `${format(date.from, 'yyyy.MM.dd')} ~`
                            )
                          ) : (
                            <span className="font-medium">날짜 선택</span>
                          )}
                        </Button>
                      </PopoverTrigger>

                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="range"
                          locale={ko}
                          numberOfMonths={1}
                          selected={date}
                          onSelect={(range) =>
                            handleDateSelect(range, field.onChange)
                          }
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="submit" className="mt-2">
                생성하기
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
