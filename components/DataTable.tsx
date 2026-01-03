import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface DataTableColumn<T> {
  header: React.ReactNode;
  cell: (row: T, index: number) => React.ReactNode;
  headClassName?: string;
  cellClassName?: string;
}

interface DataTableProps<T> {
  columns: DataTableColumn<T>[];
  data: T[];
  rowKey: (row: T, index: number) => React.Key;
  tableClassName?: string;
  headerClassName?: string;
  headerRowClassName?: string;
  headerCellClassName?: string;
  bodyRowClassName?: string;
  bodyCellClassName?: string;
}

const DataTable = <T,>({
  columns,
  data,
  rowKey,
  tableClassName = "w-full table-fixed",
  headerClassName = "bg-black/5 dark:bg-white/5",
  headerRowClassName = "border-b border-black/10 dark:border-white/10",
  headerCellClassName = "px-3 py-3 text-xs font-medium uppercase text-stone-500 dark:text-stone-400",
  bodyRowClassName = "border-b border-black/5 dark:border-white/5 hover:bg-black/5 dark:hover:bg-white/5 transition-colors",
  bodyCellClassName = "px-3 py-3 text-sm align-middle",
}: DataTableProps<T>) => {
  return (
    <div className="w-full overflow-x-auto">
      <Table className={tableClassName}>
        <TableHeader className={headerClassName}>
          <TableRow className={headerRowClassName}>
            {columns.map((col, idx) => (
              <TableHead
                key={idx}
                className={`${headerCellClassName} ${col.headClassName ?? ""}`}
              >
                {col.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((row, index) => (
            <TableRow
              key={rowKey(row, index)}
              className={bodyRowClassName}
            >
              {columns.map((col, colIdx) => (
                <TableCell
                  key={colIdx}
                  className={`${bodyCellClassName} ${col.cellClassName ?? ""}`}
                >
                  {col.cell(row, index)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default DataTable;
