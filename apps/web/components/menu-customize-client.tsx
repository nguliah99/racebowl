"use client";

import { PageShell } from "@/components/page-shell";
import { trpc } from "@/components/providers";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@racebowl/ui/button";
import { Card } from "@racebowl/ui/card";
import { ChevronRight, Flame, ShoppingCart } from "lucide-react";
import Image from "next/image";

export function MenuCustomizeClient() {
  const { data } = trpc.menu.useQuery();

  if (!data) {
    return (
      <PageShell title="Menu">
        <div className="h-80 rounded-[32px] bg-white/5" />
      </PageShell>
    );
  }

  const featured = data.menuItems.filter(
    (item) => item.category === "Rice Bowl",
  );
  const drinks = data.customizer.drinks;

  return (
    <PageShell title="Customize Bowl" backHref="/">
      <div className="space-y-5">
        <Card className="relative overflow-hidden p-5">
          <div className="absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(circle_at_right,rgba(255,106,0,0.28),transparent_70%)]" />
          <div className="relative space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-orange-400">
                  Step 1
                </p>
                <h2 className="race-title speed-lines text-[2.6rem] leading-[0.9]">
                  Pilih Menu
                </h2>
                <p className="mt-2 max-w-[240px] text-sm leading-6 text-white/60">
                  Rice bowl signature dengan flow cepat: protein, customize,
                  drink, review.
                </p>
              </div>
              <div className="flex size-14 items-center justify-center rounded-full bg-white/5 text-orange-400">
                <ShoppingCart className="size-7" />
              </div>
            </div>
            <div className="grid grid-cols-4 gap-2 text-center text-xs text-white/40">
              {(
                [
                  { step: "1", label: "Pilih Menu", active: true },
                  { step: "2", label: "Protein", active: true },
                  { step: "3", label: "Customize", active: true },
                  { step: "4", label: "Review", active: false },
                ] as const
              ).map(({ step, label, active }) => (
                <div key={label} className="space-y-2">
                  <div
                    className={`mx-auto flex size-9 items-center justify-center rounded-full border ${active ? "border-orange-400 bg-orange-500 text-black" : "border-white/15 bg-white/5 text-white"}`}
                  >
                    {step}
                  </div>
                  <div>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <div className="grid gap-4">
          {featured.map((item) => (
            <Card key={item.slug} className="overflow-hidden p-4">
              <div className="flex gap-4">
                <div className="relative h-28 w-28 overflow-hidden rounded-[24px]">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1 space-y-3">
                  <div>
                    <div className="race-title text-[1.7rem] leading-none">
                      {item.title}
                    </div>
                    <p className="mt-1 text-sm text-white/60">
                      {item.description}
                    </p>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <div className="text-xl font-black text-orange-400">
                        {formatCurrency(item.price)}
                      </div>
                      <div className="text-xs text-white/50">
                        {item.points} Race Points
                      </div>
                    </div>
                    <Button className="rounded-xl px-4">Pilih</Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <Card className="space-y-5 p-5">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-orange-400">
              Step 2
            </p>
            <h3 className="race-title text-[2.25rem] leading-none">
              Customize Racebowl
            </h3>
          </div>

          <div className="space-y-4">
            <div>
              <div className="mb-3 flex items-center justify-between">
                <div className="race-title text-[1.3rem] leading-none">
                  1. Pilih Nasi
                </div>
                <span className="rounded-full bg-orange-500/10 px-3 py-1 text-xs font-semibold text-orange-300">
                  Wajib dipilih
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {data.customizer.riceOptions.map((option) => (
                  <button
                    type="button"
                    key={option.title}
                    className={`rounded-[24px] border p-4 text-left ${option.selected ? "border-orange-400 bg-orange-500/8 shadow-[0_0_24px_rgba(249,115,22,0.15)]" : "border-white/10 bg-white/[0.03]"}`}
                  >
                    <div className="race-title text-[1.2rem] leading-none">
                      {option.title}
                    </div>
                    <div className="mt-2 text-sm text-white/55">
                      {option.price === 0
                        ? "Rp 0"
                        : `+ ${formatCurrency(option.price)}`}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="mb-3 flex items-center justify-between">
                <div className="race-title text-[1.3rem] leading-none">
                  2. Pilih Saus
                </div>
                <span className="rounded-full bg-white/5 px-3 py-1 text-xs font-semibold text-white/55">
                  Bisa pilih lebih dari 1
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {data.customizer.sauces.map((option) => (
                  <button
                    type="button"
                    key={option.title}
                    className={`rounded-[24px] border p-4 text-left ${option.selected ? "border-orange-400 bg-orange-500/8" : "border-white/10 bg-white/[0.03]"}`}
                  >
                    <div className="flex items-center gap-2">
                      <div className="race-title text-[1.15rem] leading-none">
                        {option.title}
                      </div>
                      {option.title.includes("Spicy") ? (
                        <Flame className="size-4 text-orange-400" />
                      ) : null}
                    </div>
                    <div className="mt-2 text-sm text-white/55">
                      {option.price === 0
                        ? "Rp 0"
                        : `+ ${formatCurrency(option.price)}`}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="mb-3 flex items-center justify-between">
                <div className="race-title text-[1.3rem] leading-none">
                  3. Mau Telur?
                </div>
                <span className="rounded-full bg-orange-500/10 px-3 py-1 text-xs font-semibold text-orange-300">
                  Wajib dipilih
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {data.customizer.eggs.map((option) => (
                  <button
                    type="button"
                    key={option.title}
                    className={`rounded-[24px] border p-4 text-left ${option.selected ? "border-orange-400 bg-orange-500/8" : "border-white/10 bg-white/[0.03]"}`}
                  >
                    <div className="race-title text-[1.15rem] leading-none">
                      {option.title}
                    </div>
                    <div className="mt-2 text-sm text-white/55">
                      Rp {option.price}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-[26px] border border-white/10 bg-white/[0.03] p-4">
            <div className="mb-3 flex items-center justify-between">
              <div className="race-title text-[1.3rem] leading-none">
                Step 3 - Pilih Minumanmu
              </div>
              <span className="text-sm font-semibold text-orange-400">
                Upgrade combo
              </span>
            </div>
            <div className="overflow-x-auto hide-scrollbar">
              <div className="flex gap-3 pb-2">
                {drinks.map((drink) => (
                  <button
                    type="button"
                    key={drink.title}
                    className={`min-w-[138px] rounded-[22px] border p-4 text-left ${drink.selected ? "border-orange-400 bg-orange-500/10" : "border-white/10 bg-white/[0.03]"}`}
                  >
                    <div className="race-title text-[1.15rem] leading-none">
                      {drink.title}
                    </div>
                    <div className="mt-2 text-sm text-orange-300">
                      {formatCurrency(drink.price)}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Card>

        <Card className="space-y-5 p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-orange-400">
                Step 4
              </p>
              <div className="race-title text-[2.2rem] leading-none">
                Review Pesanan
              </div>
            </div>
            <ChevronRight className="mt-2 size-5 text-white/45" />
          </div>
          <div className="space-y-4 rounded-[24px] border border-white/10 bg-white/[0.03] p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="race-title text-[1.5rem] leading-none">
                  Racebowl Chicken
                </div>
                <p className="mt-1 text-sm text-white/60">
                  Nasi Putih • Race Sauce • Spicy Mayo • Teriyaki • Setengah
                  Matang
                </p>
              </div>
              <div className="text-right text-xl font-black text-orange-400">
                {formatCurrency(28000)}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="race-title text-[1.35rem] leading-none">
                  Lemon Tea
                </div>
                <p className="mt-1 text-sm text-white/60">
                  Regular • Es Normal
                </p>
              </div>
              <div className="text-right text-xl font-black text-orange-400">
                {formatCurrency(12000)}
              </div>
            </div>
            <div className="space-y-2 border-t border-white/10 pt-3 text-sm">
              <div className="flex justify-between text-white/60">
                <span>Subtotal</span>
                <span>{formatCurrency(40000)}</span>
              </div>
              <div className="flex justify-between text-lime-300">
                <span>Diskon Promo (RACE20)</span>
                <span>- {formatCurrency(8000)}</span>
              </div>
              <div className="flex justify-between text-white/60">
                <span>Ongkir</span>
                <span>{formatCurrency(6000)}</span>
              </div>
              <div className="flex justify-between text-lg font-black text-orange-400">
                <span>Total</span>
                <span>{formatCurrency(38000)}</span>
              </div>
            </div>
          </div>
          <Button className="h-14 w-full rounded-[22px] text-base">
            Lanjut ke Pembayaran
          </Button>
        </Card>
      </div>
    </PageShell>
  );
}
