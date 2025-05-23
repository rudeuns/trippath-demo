'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { SearchIcon, SlidersHorizontalIcon } from 'lucide-react';

interface TripFilterProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  sortBy: string;
  onSortChange: (value: string) => void;
  tripCount: number;
}

export default function TripFilter({
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  tripCount,
}: TripFilterProps) {
  return (
    <div className="flex flex-col gap-3">
      <div className="relative w-full">
        <SearchIcon className="text-muted-foreground absolute top-1/2 left-2 size-4 -translate-y-1/2" />
        <Input
          placeholder="여행 검색"
          className="pl-8"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <div className="flex items-center justify-between">
        <span className="text-muted-foreground ml-1 text-sm">
          {tripCount}개의 여행
        </span>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="size-6">
              <SlidersHorizontalIcon />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="min-w-0 px-2">
            <DropdownMenuRadioGroup value={sortBy} onValueChange={onSortChange}>
              <DropdownMenuRadioItem value="newest">
                최신순
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="oldest">
                과거순
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
