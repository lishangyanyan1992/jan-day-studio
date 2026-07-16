"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { requireStaff } from "@/lib/inventory/auth";
import { reservationStatuses, type ReservationStatus } from "@/lib/inventory/types";
import { createClient } from "@/lib/supabase/server";

function textValue(formData: FormData, key: string) {
  return formData.get(key)?.toString().trim() ?? "";
}

function integerValue(formData: FormData, key: string, fallback = 0) {
  const value = Number.parseInt(textValue(formData, key), 10);
  return Number.isFinite(value) ? value : fallback;
}

function moneyToCents(formData: FormData, key: string) {
  const value = Number.parseFloat(textValue(formData, key));
  return Number.isFinite(value) ? Math.round(value * 100) : 0;
}

function destination(path: string, kind: "success" | "error", message: string) {
  const separator = path.includes("?") ? "&" : "?";
  return `${path}${separator}${kind}=${encodeURIComponent(message)}`;
}

export async function sendMagicLinkAction(formData: FormData) {
  const email = textValue(formData, "email");
  const supabase = await createClient();

  if (!supabase) {
    redirect("/admin/login?error=setup-required");
  }

  const requestHeaders = await headers();
  const origin = requestHeaders.get("origin") ?? "http://localhost:3000";
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      shouldCreateUser: false,
      emailRedirectTo: `${origin}/auth/confirm?next=/admin`,
    },
  });

  if (error) redirect("/admin/login?error=magic-link");
  redirect("/admin/login?sent=true");
}

export async function signOutAction() {
  const supabase = await createClient();
  if (supabase) await supabase.auth.signOut();
  redirect("/admin/login");
}

export async function createProductAction(formData: FormData) {
  const { supabase } = await requireStaff();
  if (!supabase) redirect("/admin/inventory?error=setup-required");

  const name = textValue(formData, "name");
  const totalQuantity = integerValue(formData, "total_quantity");
  const maintenanceQuantity = integerValue(formData, "maintenance_quantity");

  if (!name) redirect(destination("/admin/inventory", "error", "Product name is required."));
  if (totalQuantity < 0 || maintenanceQuantity < 0 || maintenanceQuantity > totalQuantity) {
    redirect(destination("/admin/inventory", "error", "Check the inventory quantities."));
  }

  const { error } = await supabase.from("products").insert({
    name,
    sku: textValue(formData, "sku") || null,
    category: textValue(formData, "category") || "Uncategorized",
    description: textValue(formData, "description"),
    rental_rate_cents: moneyToCents(formData, "rental_rate"),
    total_quantity: totalQuantity,
    maintenance_quantity: maintenanceQuantity,
    image_url: textValue(formData, "image_url") || null,
  });

  if (error) redirect(destination("/admin/inventory", "error", error.message));
  revalidatePath("/admin");
  revalidatePath("/admin/inventory");
  redirect(destination("/admin/inventory", "success", `${name} was added.`));
}

export async function adjustInventoryAction(formData: FormData) {
  const { supabase } = await requireStaff();
  if (!supabase) redirect("/admin/inventory?error=setup-required");

  const productId = textValue(formData, "product_id");
  const delta = integerValue(formData, "quantity_delta");
  const { error } = await supabase.rpc("adjust_inventory", {
    p_product_id: productId,
    p_quantity_delta: delta,
    p_reason: textValue(formData, "reason") || "manual_adjustment",
    p_notes: textValue(formData, "notes"),
  });

  if (error) redirect(destination("/admin/inventory", "error", error.message));
  revalidatePath("/admin");
  revalidatePath("/admin/inventory");
  redirect(destination("/admin/inventory", "success", "Inventory quantity updated."));
}

export async function setMaintenanceAction(formData: FormData) {
  const { supabase } = await requireStaff();
  if (!supabase) redirect("/admin/inventory?error=setup-required");

  const productId = textValue(formData, "product_id");
  const quantity = integerValue(formData, "maintenance_quantity");
  const { error } = await supabase
    .from("products")
    .update({ maintenance_quantity: quantity })
    .eq("id", productId);

  if (error) redirect(destination("/admin/inventory", "error", error.message));
  revalidatePath("/admin");
  revalidatePath("/admin/inventory");
  redirect(destination("/admin/inventory", "success", "Maintenance quantity updated."));
}

export async function toggleProductAction(formData: FormData) {
  const { supabase } = await requireStaff();
  if (!supabase) redirect("/admin/inventory?error=setup-required");

  const productId = textValue(formData, "product_id");
  const active = textValue(formData, "active") === "true";
  const { error } = await supabase.from("products").update({ active }).eq("id", productId);

  if (error) redirect(destination("/admin/inventory", "error", error.message));
  revalidatePath("/admin/inventory");
  redirect(destination("/admin/inventory", "success", active ? "Product restored." : "Product archived."));
}

export async function createReservationAction(formData: FormData) {
  const { supabase } = await requireStaff();
  if (!supabase) redirect("/admin/reservations?error=setup-required");

  const customerName = textValue(formData, "customer_name");
  const eventStart = textValue(formData, "event_start");
  const eventEnd = textValue(formData, "event_end") || eventStart;

  if (!customerName || !eventStart) {
    redirect(destination("/admin/reservations", "error", "Customer name and event date are required."));
  }
  if (eventEnd < eventStart) {
    redirect(destination("/admin/reservations", "error", "The end date cannot be before the start date."));
  }

  const { data: customer, error: customerError } = await supabase
    .from("customers")
    .insert({
      name: customerName,
      email: textValue(formData, "customer_email") || null,
      phone: textValue(formData, "customer_phone") || null,
    })
    .select("id")
    .single();

  if (customerError || !customer) {
    redirect(destination("/admin/reservations", "error", customerError?.message ?? "Could not create customer."));
  }

  const { data: reservation, error: reservationError } = await supabase
    .from("reservations")
    .insert({
      customer_id: customer.id,
      event_start: eventStart,
      event_end: eventEnd,
      venue: textValue(formData, "venue"),
      fulfillment: textValue(formData, "fulfillment") || "pickup",
      notes: textValue(formData, "notes"),
    })
    .select("id")
    .single();

  if (reservationError || !reservation) {
    await supabase.from("customers").delete().eq("id", customer.id);
    redirect(destination("/admin/reservations", "error", reservationError?.message ?? "Could not create reservation."));
  }

  const productId = textValue(formData, "product_id");
  if (productId) {
    const quantity = Math.max(integerValue(formData, "quantity", 1), 1);
    const { data: product } = await supabase
      .from("products")
      .select("rental_rate_cents")
      .eq("id", productId)
      .single();
    const { error: itemError } = await supabase.from("reservation_items").insert({
      reservation_id: reservation.id,
      product_id: productId,
      quantity,
      unit_price_cents: product?.rental_rate_cents ?? 0,
    });
    if (itemError) {
      redirect(destination(`/admin/reservations/${reservation.id}`, "error", itemError.message));
    }
  }

  revalidatePath("/admin");
  revalidatePath("/admin/reservations");
  redirect(destination(`/admin/reservations/${reservation.id}`, "success", "Draft reservation created."));
}

export async function addReservationItemAction(formData: FormData) {
  const { supabase } = await requireStaff();
  const reservationId = textValue(formData, "reservation_id");
  const path = `/admin/reservations/${reservationId}`;
  if (!supabase) redirect(`${path}?error=setup-required`);

  const productId = textValue(formData, "product_id");
  const quantity = integerValue(formData, "quantity", 1);
  if (!productId || quantity < 1) {
    redirect(destination(path, "error", "Choose a product and valid quantity."));
  }

  const [{ data: reservation }, { data: product }] = await Promise.all([
    supabase.from("reservations").select("status").eq("id", reservationId).single(),
    supabase.from("products").select("rental_rate_cents").eq("id", productId).single(),
  ]);

  if (reservation?.status !== "draft") {
    redirect(destination(path, "error", "Move this reservation back to draft before changing its items."));
  }

  const { error } = await supabase.from("reservation_items").insert({
    reservation_id: reservationId,
    product_id: productId,
    quantity,
    unit_price_cents: product?.rental_rate_cents ?? 0,
  });

  if (error) redirect(destination(path, "error", error.message));
  revalidatePath(path);
  redirect(destination(path, "success", "Item added."));
}

export async function removeReservationItemAction(formData: FormData) {
  const { supabase } = await requireStaff();
  const reservationId = textValue(formData, "reservation_id");
  const path = `/admin/reservations/${reservationId}`;
  if (!supabase) redirect(`${path}?error=setup-required`);

  const { error } = await supabase
    .from("reservation_items")
    .delete()
    .eq("id", textValue(formData, "item_id"));

  if (error) redirect(destination(path, "error", error.message));
  revalidatePath(path);
  redirect(destination(path, "success", "Item removed."));
}

export async function updateReservationStatusAction(formData: FormData) {
  const { supabase } = await requireStaff();
  const reservationId = textValue(formData, "reservation_id");
  const path = `/admin/reservations/${reservationId}`;
  if (!supabase) redirect(`${path}?error=setup-required`);

  const status = textValue(formData, "status") as ReservationStatus;
  if (!reservationStatuses.includes(status)) {
    redirect(destination(path, "error", "Invalid reservation status."));
  }

  const { error } = await supabase.rpc("set_reservation_status", {
    p_reservation_id: reservationId,
    p_status: status,
  });

  if (error) redirect(destination(path, "error", error.message));
  revalidatePath("/admin");
  revalidatePath("/admin/reservations");
  revalidatePath(path);
  redirect(destination(path, "success", `Reservation moved to ${status.replace("_", " ")}.`));
}
