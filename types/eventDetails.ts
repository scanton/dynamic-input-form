export type DetailInputKind =
  | "text"
  | "textarea"
  | "date"
  | "datetime-local"
  | "url"
  | "select"
  | "custom";

export type DetailTypeDefinition = {
  type: string;
  label: string;
  inputKind: DetailInputKind;
  options?: string[];
  allowMultiple?: boolean;
};

export type EventDetailRow = {
  id: string;
  type: string;
  value: string;
  customLabel?: string;
};

export type EventDetailPreviewItem = {
  type: string;
  label: string;
  value: string;
};
