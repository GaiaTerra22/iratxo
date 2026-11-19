export const STATUSES = [
  { value: "new", label: "Nueva" },
  { value: "in_conversation", label: "En conversación" },
  { value: "quoted", label: "Presupuestada" },
  { value: "confirmed", label: "Cita confirmada" },
  { value: "done", label: "Hecha" },
  { value: "rejected", label: "Rechazada" },
  { value: "cancelled", label: "Cancelada" },
] as const;

export const STATUS_VALUES = STATUSES.map((s) => s.value) as [
  string,
  ...string[],
];

export function statusLabel(value: string) {
  return STATUSES.find((s) => s.value === value)?.label ?? value;
}