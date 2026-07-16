export type ReservationStatus =
  | "draft"
  | "hold"
  | "confirmed"
  | "picked_up"
  | "returned"
  | "cancelled";

export interface Product {
  id: string;
  sku: string | null;
  name: string;
  category: string;
  description: string;
  rental_rate_cents: number;
  total_quantity: number;
  maintenance_quantity: number;
  image_url: string | null;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  notes: string;
}

export interface Reservation {
  id: string;
  customer_id: string;
  event_start: string;
  event_end: string;
  status: ReservationStatus;
  hold_expires_at: string | null;
  venue: string;
  fulfillment: "pickup" | "delivery" | "unsure";
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface ReservationListItem extends Reservation {
  customers: Pick<Customer, "name" | "email"> | null;
  reservation_items: Array<{ quantity: number }>;
}

export interface ReservationItem {
  id: string;
  reservation_id: string;
  product_id: string;
  quantity: number;
  unit_price_cents: number;
  products: Pick<Product, "name" | "sku" | "total_quantity" | "maintenance_quantity"> | null;
}

export interface ProductAvailability {
  product_id: string;
  sku: string | null;
  product_name: string;
  total_quantity: number;
  maintenance_quantity: number;
  reserved_quantity: number;
  available_quantity: number;
}

export const reservationStatuses: ReservationStatus[] = [
  "draft",
  "hold",
  "confirmed",
  "picked_up",
  "returned",
  "cancelled",
];

export function formatMoney(cents: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(cents / 100);
}

export function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${value}T00:00:00Z`));
}

export function labelStatus(status: ReservationStatus) {
  return status.replace("_", " ");
}
