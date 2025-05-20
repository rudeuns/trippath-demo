'use client';

import { useState } from 'react';
import { useScheduleContext } from '@/context/schedule-context';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ChevronDownIcon, ChevronUpIcon, PlusIcon } from 'lucide-react';
import { Schedule } from '@/types/trip';

interface NewScheduleFormProps {
  tripId: number;
  dates: string[];
}

const FormSchema = z.object({
  date: z.string().nonempty('날짜를 선택해주세요.'),
  content: z.string().nonempty('일정 내용을 입력해주세요.'),
  time: z
    .object({
      hour: z.string().optional(),
      minute: z.string().optional(),
    })
    .optional()
    .superRefine((val, ctx) => {
      const hour = val?.hour?.trim();
      const minute = val?.minute?.trim();

      if (!hour && !minute) return;

      if (hour && minute) {
        const isHourValid = /^\d{1,2}$/.test(hour) && +hour >= 0 && +hour <= 23;
        const isMinuteValid =
          /^\d{1,2}$/.test(minute) && +minute >= 0 && +minute <= 59;

        if (!isHourValid || !isMinuteValid) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: '0 ~ 23시, 0 ~ 59분 사이의 숫자로 입력해주세요.',
          });
        }
        return;
      }

      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: '시 또는 분을 모두 입력해주세요.',
      });
    }),
  address: z.string().optional(),
  description: z.string().optional(),
});

export default function NewScheduleForm({
  tripId,
  dates,
}: NewScheduleFormProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isCollapsibleOpen, setIsCollapsibleOpen] = useState(false);
  const { addSchedule } = useScheduleContext();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    shouldFocusError: false,
    defaultValues: {
      date: '',
      content: '',
      time: {
        hour: '',
        minute: '',
      },
      address: '',
      description: '',
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const formattedTime =
      data.time?.hour && data.time.minute
        ? `${data.time.hour.padStart(2, '0')}:${data.time.minute.padStart(2, '0')}`
        : undefined;

    const newSchedule: Schedule = {
      id: Date.now(),
      tripId,
      date: data.date,
      content: data.content,
      time: formattedTime,
      address: data.address?.trim() || undefined,
      description: data.description?.trim() || undefined,
    };

    addSchedule(newSchedule);
    toast.success('일정이 성공적으로 추가되었습니다.');
    setIsDialogOpen(false);
    form.reset();
  }

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={(open) => {
        setIsDialogOpen(open);
        if (!open) form.reset();
      }}
    >
      <DialogTrigger asChild>
        <Button className="w-full">
          <PlusIcon />
          일정 추가
        </Button>
      </DialogTrigger>

      <DialogContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>새로운 일정</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <Label>날짜 *</Label>
                  <FormControl>
                    <Select onValueChange={field.onChange}>
                      <SelectTrigger className="w-full cursor-pointer">
                        <SelectValue placeholder="날짜 선택" />
                      </SelectTrigger>
                      <SelectContent>
                        {dates.map((date, index) => (
                          <SelectItem key={index} value={date}>
                            Day {index + 1} ({date})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <Label>일정 내용 *</Label>
                  <FormControl>
                    <Input placeholder="장소명 또는 일정 내용" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Collapsible
              open={isCollapsibleOpen}
              onOpenChange={setIsCollapsibleOpen}
              className="space-y-4"
            >
              <CollapsibleTrigger asChild>
                <button className="flex cursor-pointer items-center gap-2">
                  <p className="text-sm font-medium">선택 입력 사항</p>
                  {isCollapsibleOpen ? (
                    <ChevronUpIcon className="size-4" />
                  ) : (
                    <ChevronDownIcon className="size-4" />
                  )}
                </button>
              </CollapsibleTrigger>

              <CollapsibleContent className="flex flex-col gap-4">
                <FormField
                  control={form.control}
                  name="time"
                  render={({ field }) => (
                    <FormItem>
                      <Label>시간</Label>
                      <FormControl>
                        <div className="flex items-center gap-2">
                          <Input
                            placeholder="시 (0 ~ 23)"
                            inputMode="numeric"
                            value={field.value?.hour ?? ''}
                            onChange={(e) =>
                              field.onChange({
                                ...field.value,
                                hour: e.target.value,
                              })
                            }
                          />
                          <span>:</span>
                          <Input
                            placeholder="분 (0 ~ 59)"
                            inputMode="numeric"
                            value={field.value?.minute ?? ''}
                            onChange={(e) =>
                              field.onChange({
                                ...field.value,
                                minute: e.target.value,
                              })
                            }
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <Label>주소</Label>
                      <FormControl>
                        <Input placeholder="주소 입력" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <Label>메모</Label>
                      <FormControl>
                        <Input placeholder="메모 입력" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CollapsibleContent>
            </Collapsible>

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
