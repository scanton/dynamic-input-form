"use client";

import { useMemo, useState } from "react";
import {
  MAX_EVENT_DETAILS,
  createEmptyRow,
  detailTypeByType,
  sampleEventRows
} from "@/data/detailTypes";
import type { EventDetailPreviewItem, EventDetailRow } from "@/types/eventDetails";
import { DetailRow } from "@/components/DetailRow";

export function EventDetailsModal() {
  const [rows, setRows] = useState<EventDetailRow[]>(() => [createEmptyRow()]);

  const selectedRows = useMemo(() => rows.filter((row) => row.type), [rows]);
  const selectedStandardTypes = useMemo(
    () =>
      new Set(
        selectedRows
          .filter((row) => row.type !== "custom")
          .map((row) => row.type)
      ),
    [selectedRows]
  );

  const previewItems = useMemo<EventDetailPreviewItem[]>(
    () =>
      selectedRows.map((row) => {
        const definition = detailTypeByType.get(row.type);
        const isCustom = row.type === "custom";

        return {
          type: isCustom ? "custom" : row.type,
          label: isCustom ? row.customLabel?.trim() || "Custom Detail" : definition?.label ?? row.type,
          value: row.value
        };
      }),
    [selectedRows]
  );

  const previewJson = useMemo(
    () => JSON.stringify({ eventDetails: previewItems }, null, 2),
    [previewItems]
  );

  const completedCount = selectedRows.length;
  const reachedMax = completedCount >= MAX_EVENT_DETAILS;

  const updateRow = (updatedRow: EventDetailRow) => {
    setRows((currentRows) => {
      const nextRows = currentRows.map((row) => (row.id === updatedRow.id ? updatedRow : row));
      const selectedCount = nextRows.filter((row) => row.type).length;
      const hasEmptyRow = nextRows.some((row) => !row.type);

      if (updatedRow.type && selectedCount < MAX_EVENT_DETAILS && !hasEmptyRow) {
        return [...nextRows, createEmptyRow()];
      }

      if (selectedCount >= MAX_EVENT_DETAILS) {
        return nextRows.filter((row) => row.type);
      }

      return nextRows;
    });
  };

  const removeRow = (id: string) => {
    setRows((currentRows) => {
      const remainingRows = currentRows.filter((row) => row.id !== id);
      const selectedCount = remainingRows.filter((row) => row.type).length;
      const hasEmptyRow = remainingRows.some((row) => !row.type);

      if (selectedCount === 0) {
        return [createEmptyRow()];
      }

      if (selectedCount < MAX_EVENT_DETAILS && !hasEmptyRow) {
        return [...remainingRows, createEmptyRow()];
      }

      return remainingRows;
    });
  };

  const loadSampleEvent = () => {
    setRows(sampleEventRows());
  };

  const clearAll = () => {
    setRows([createEmptyRow()]);
  };

  return (
    <section className="mx-auto w-full max-w-7xl rounded-2xl border border-white/70 bg-white p-8 shadow-modal">
      <div className="mb-7 flex items-start justify-between gap-6">
        <div>
          <h1 className="text-3xl font-semibold tracking-normal text-stone-950">Event Details</h1>
          <p className="mt-2 text-sm text-stone-500">
            Add up to 10 details that should appear on the invitation.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            className="rounded-md border border-stone-300 bg-white px-4 py-2 text-sm font-medium text-stone-700 transition hover:bg-stone-100 focus:outline-none focus:ring-2 focus:ring-stone-300"
            onClick={loadSampleEvent}
          >
            Load Sample Event
          </button>
          <button
            type="button"
            className="rounded-md bg-stone-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-stone-700 focus:outline-none focus:ring-2 focus:ring-stone-400 focus:ring-offset-2"
            onClick={clearAll}
          >
            Clear All
          </button>
        </div>
      </div>

      <div className="grid grid-cols-[minmax(0,1.2fr)_minmax(390px,0.8fr)] gap-7">
        <div>
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm font-medium text-stone-700">Invitation details</p>
            <p className="rounded-full bg-stone-100 px-3 py-1 text-xs font-medium text-stone-600">
              {completedCount} / {MAX_EVENT_DETAILS} details added
            </p>
          </div>

          <div className="max-h-[620px] space-y-3 overflow-y-auto pr-2">
            {rows.map((row) => (
              <DetailRow
                key={row.id}
                row={row}
                selectedStandardTypes={selectedStandardTypes}
                canRemove={Boolean(row.type)}
                selectorDisabled={!row.type && reachedMax}
                onChange={updateRow}
                onRemove={removeRow}
              />
            ))}
          </div>
        </div>

        <aside className="min-w-0">
          <div className="mb-3 flex h-7 items-center justify-between">
            <p className="text-sm font-medium text-stone-700">Live JSON preview</p>
            <span className="text-xs text-stone-400">selected rows only</span>
          </div>

          <pre className="h-[620px] overflow-auto rounded-lg border border-stone-800 bg-[#1f1d1a] p-5 text-sm leading-6 text-stone-100 shadow-inner">
            <code>{previewJson}</code>
          </pre>
        </aside>
      </div>
    </section>
  );
}
