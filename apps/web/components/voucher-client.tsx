"use client";

import { PageShell } from "@/components/page-shell";
import { trpc } from "@/components/providers";
import { SectionHeading, VoucherCard } from "@/components/racebowl-primitives";
import { Card } from "@racebowl/ui/card";
import { TicketPercent } from "lucide-react";

export function VoucherClient() {
  const { data } = trpc.vouchers.useQuery();

  if (!data) {
    return (
      <PageShell title="Voucher">
        <div className="h-80 rounded-[32px] bg-white/5" />
      </PageShell>
    );
  }

  const available = data.filter((voucher) => voucher.status === "available");
  const expired = data.filter((voucher) => voucher.status === "expired");

  return (
    <PageShell title="Voucher" backHref="/profile">
      <div className="space-y-5">
        <Card className="relative overflow-hidden p-5">
          <div className="absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(circle_at_right,rgba(255,106,0,0.25),transparent_70%)]" />
          <div className="relative flex items-center justify-between gap-3">
            <div>
              <div className="text-sm uppercase tracking-[0.25em] text-white/50">
                Race Points Kamu
              </div>
              <div className="race-title text-[3.8rem] leading-none text-orange-400">
                1.250
              </div>
              <p className="mt-2 text-sm leading-6 text-white/60">
                Tukar poin ke voucher diskon, gratis ongkir, dan benefit
                eksklusif.
              </p>
            </div>
            <div className="flex size-16 items-center justify-center rounded-[26px] bg-orange-500/10 text-orange-400">
              <TicketPercent className="size-8" />
            </div>
          </div>
        </Card>

        <div className="space-y-4">
          <SectionHeading title="Voucher Tersedia" />
          <div className="space-y-3">
            {available.map((voucher) => (
              <VoucherCard key={voucher.code} {...voucher} />
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <SectionHeading title="Voucher Kedaluwarsa" />
          <div className="space-y-3">
            {expired.map((voucher) => (
              <VoucherCard key={voucher.code} {...voucher} />
            ))}
          </div>
        </div>
      </div>
    </PageShell>
  );
}
