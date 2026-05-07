"use client";

import { detailTypes } from "@/data/detailTypes";
import type { EventDetailRow } from "@/types/eventDetails";

type DetailRowProps = {
  row: EventDetailRow;
  selectedStandardTypes: Set<string>;
  canRemove: boolean;
  selectorDisabled: boolean;
  onChange: (row: EventDetailRow) => void;
  onRemove: (id: string) => void;
};

const fieldClassName =
  "w-full rounded-md border border-stone-300 bg-white px-3 py-2 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-stone-500 focus:ring-2 focus:ring-stone-200 disabled:cursor-not-allowed disabled:bg-stone-100 disabled:text-stone-400";

export function DetailRow({
  row,
  selectedStandardTypes,
  canRemove,
  selectorDisabled,
  onChange,
  onRemove
}: DetailRowProps) {
  const selectedDefinition = detailTypes.find((detailType) => detailType.type === row.type);

  const updateRow = (updates: Partial<EventDetailRow>) => {
    onChange({ ...row, ...updates });
  };

  return (
    <div className="rounded-lg border border-stone-200 bg-stone-50/75 p-4 shadow-sm">
      <div className="grid grid-cols-[210px_minmax(0,1fr)_36px] items-start gap-3">
        <select
          aria-label="Detail type"
          className={fieldClassName}
          disabled={selectorDisabled}
          value={row.type}
          onChange={(event) =>
            onChange({
              id: row.id,
              type: event.target.value,
              value: "",
              customLabel: undefined
            })
          }
        >
          <option value="">Select detail</option>
          {detailTypes.map((detailType) => {
            const isDuplicate =
              !detailType.allowMultiple &&
              detailType.type !== row.type &&
              selectedStandardTypes.has(detailType.type);

            return (
              <option key={detailType.type} value={detailType.type} disabled={isDuplicate}>
                {detailType.label}
              </option>
            );
          })}
        </select>

        <div>{selectedDefinition ? renderInput() : <div className="h-10" />}</div>

        {canRemove ? (
          <button
            type="button"
            aria-label="Remove detail"
            className="flex h-10 w-9 items-center justify-center rounded-md border border-stone-300 bg-white text-lg leading-none text-stone-500 transition hover:border-red-300 hover:bg-red-50 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-200"
            onClick={() => onRemove(row.id)}
          >
            ×
          </button>
        ) : (
          <div className="h-10 w-9" />
        )}
      </div>
    </div>
  );

  function renderInput() {
    if (!selectedDefinition) {
      return null;
    }

    if (selectedDefinition.inputKind === "custom") {
      return (
        <div className="grid grid-cols-2 gap-3">
          <input
            className={fieldClassName}
            placeholder="Custom label/name"
            type="text"
            value={row.customLabel ?? ""}
            onChange={(event) => updateRow({ customLabel: event.target.value })}
          />
          <input
            className={fieldClassName}
            placeholder="Custom value"
            type="text"
            value={row.value}
            onChange={(event) => updateRow({ value: event.target.value })}
          />
        </div>
      );
    }

    if (selectedDefinition.inputKind === "select") {
      return (
        <select
          aria-label={`${selectedDefinition.label} value`}
          className={fieldClassName}
          value={row.value}
          onChange={(event) => updateRow({ value: event.target.value })}
        >
          <option value="">Select {selectedDefinition.label.toLowerCase()}</option>
          {selectedDefinition.options?.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      );
    }

    if (selectedDefinition.inputKind === "textarea") {
      return (
        <textarea
          className={`${fieldClassName} min-h-20 resize-y`}
          placeholder={selectedDefinition.label}
          value={row.value}
          onChange={(event) => updateRow({ value: event.target.value })}
        />
      );
    }

    return (
      <input
        className={fieldClassName}
        placeholder={selectedDefinition.label}
        type={selectedDefinition.inputKind}
        value={row.value}
        onChange={(event) => updateRow({ value: event.target.value })}
      />
    );
  }
}
