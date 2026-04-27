"use client";

import { PageShell } from "@/components/page-shell";
import { trpc } from "@/components/providers";
import {
  PointHistoryCard,
  RewardGridCard,
  SectionHeading,
} from "@/components/racebowl-primitives";
import { formatCompactNumber } from "@/lib/utils";
import { Card } from "@racebowl/ui/card";
import { Progress } from "@racebowl/ui/progress";
import { Gift, Ticket } from "lucide-react";

export function RacePointsClient() {
  const { data } = trpc.points.useQuery();

  if (!data) {
    return (
      <PageShell title="Detail Point">
        <div className="h-80 rounded-[32px] bg-white/5" />
      </PageShell>
    );
  }

  return (
    <PageShell title="Detail Point" backHref="/profile">
      <div className="space-y-5">
        <Card className="relative overflow-hidden p-5">
          <div className="absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(circle_at_right,rgba(255,106,0,0.25),transparent_70%)]" />
          <div className="relative space-y-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-white/50">
                  Total Race Points
                </p>
                <div className="race-title text-[4rem] leading-none text-orange-400">
                  {formatCompactNumber(data.total)}
                </div>
                <p className="mt-2 max-w-[220px] text-sm leading-6 text-white/60">
                  Poin loyalitas yang bisa kamu kumpulkan dan tukarkan dengan
                  hadiah menarik.
                </p>
              </div>
              <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-3">
                <Gift className="size-8 text-orange-400" />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3 rounded-[24px] border border-white/10 bg-white/[0.03] p-4">
              <div>
                <div className="text-xs uppercase tracking-[0.2em] text-white/40">
                  Point Masuk
                </div>
                <div className="mt-2 text-2xl font-black text-lime-300">
                  +1.850
                </div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-[0.2em] text-white/40">
                  Point Keluar
                </div>
                <div className="mt-2 text-2xl font-black text-red-300">
                  -600
                </div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-[0.2em] text-white/40">
                  Saldo Saat Ini
                </div>
                <div className="mt-2 text-2xl font-black text-orange-400">
                  1.250
                </div>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between text-sm text-white/55">
            <span>Progress ke hadiah harian</span>
            <span>120 / 200</span>
          </div>
          <Progress value={60} className="mt-3 h-3" />
        </Card>

        <div className="space-y-4">
          <SectionHeading title="Riwayat Transaksi" action="Lihat semua" />
          <div className="space-y-3">
            {data.history.map((item) => (
              <PointHistoryCard key={item.title} item={item} />
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <SectionHeading title="Cara Dapetin Point" action="Lihat semua" />
          <div className="grid grid-cols-2 gap-3">
            {[
              ["Buat Pesanan", "+10 Point"],
              ["Beri Rating & Ulasan", "+20 Point"],
              ["Ajak Teman", "+100 Point"],
              ["Selesaikan Misi", "Hingga +300 Point"],
              ["Spin Wheel", "Hingga +2.000 Point"],
              ["Gunakan Voucher", "Hingga +200 Point"],
            ].map(([title, value]) => (
              <Card key={title} className="space-y-3 p-4">
                <div className="flex size-12 items-center justify-center rounded-2xl bg-orange-500/10 text-orange-400">
                  <Ticket className="size-6" />
                </div>
                <div className="race-title text-[1.2rem] leading-none">
                  {title}
                </div>
                <div className="text-sm text-orange-300">{value}</div>
              </Card>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <SectionHeading title="Lihat Hadiah" action="Riwayat Hadiah" />
          <div className="grid grid-cols-2 gap-4">
            {data.rewards.map((reward) => (
              <RewardGridCard key={reward.slug} {...reward} />
            ))}
          </div>
        </div>
      </div>
    </PageShell>
  );
}
