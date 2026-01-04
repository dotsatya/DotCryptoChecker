import React from 'react'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

interface CoinsPaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
}

const CoinsPagination = ({ currentPage, totalPages, totalItems }: CoinsPaginationProps) => {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
      endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();
  const hasPrevious = currentPage > 1;
  const hasNext = currentPage < totalPages;

  return (
    <div className="flex items-center justify-between mt-4">
      <p className=" hidden md:block text-sm text-muted-foreground">
        Showing {((currentPage - 1) * 10) + 1} to {Math.min(currentPage * 10, totalItems)} of {totalItems} coins
      </p>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href={hasPrevious ? `/coins?page=${currentPage - 1}` : undefined}
              className={!hasPrevious ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>

          {pageNumbers[0] > 1 && (
            <>
              <PaginationItem>
                <PaginationLink href="/coins?page=1">1</PaginationLink>
              </PaginationItem>
              {pageNumbers[0] > 2 && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}
            </>
          )}

          {pageNumbers.map((page) => (
            <PaginationItem key={page}>
              <PaginationLink href={`/coins?page=${page}`} isActive={page === currentPage}>
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}

          {pageNumbers[pageNumbers.length - 1] < totalPages && (
            <>
              {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}
              <PaginationItem>
                <PaginationLink href={`/coins?page=${totalPages}`}>{totalPages}</PaginationLink>
              </PaginationItem>
            </>
          )}

          <PaginationItem>
            <PaginationNext
              href={hasNext ? `/coins?page=${currentPage + 1}` : undefined}
              className={!hasNext ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}

export default CoinsPagination
