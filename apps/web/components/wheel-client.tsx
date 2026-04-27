"use client";

import { PageShell } from "@/components/page-shell";
import { trpc } from "@/components/providers";
import { Button } from "@racebowl/ui/button";
import { Card } from "@racebowl/ui/card";
import { Ticket } from "lucide-react";

export function WheelClient() {
  const { data } = trpc.points.useQuery();

  if (!data) {
    return (
      <PageShell title="Wheel">
        <div className="h-80 rounded-[32px] bg-white/5" />
      </PageShell>
    );
  }

  return (
    <PageShell title="Wheel" backHref="/">
      <div className="space-y-5">
        <Card className="relative overflow-hidden p-5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,106,0,0.24),transparent_60%)]" />
          <div className="relative space-y-3">
            <div className="race-title text-[2.9rem] leading-[0.9]">
              Spin Wheel, Menangkan Hadiahnya!
            </div>
            <p className="max-w-[280px] text-sm leading-6 text-white/60">
              Spin harian dengan reward points, tiket diskon, gratis ongkir,
              sampai merchandise eksklusif.
            </p>
            <div className="flex gap-3">
              <Card className="flex-1 bg-white/[0.03] p-4">
                <div className="text-sm text-white/50">Race Points</div>
                <div className="mt-2 text-3xl font-black text-orange-400">
                  1.250
                </div>
              </Card>
              <Card className="flex-1 bg-white/[0.03] p-4">
                <div className="text-sm text-white/50">Tiket Wheel</div>
                <div className="mt-2 text-3xl font-black text-orange-400">
                  3
                </div>
              </Card>
            </div>
          </div>
        </Card>

        <Card className="overflow-hidden p-5">
          <div className="relative mx-auto flex aspect-square w-full max-w-[360px] items-center justify-center rounded-full border-[10px] border-orange-500/50 bg-[radial-gradient(circle,rgba(255,106,0,0.16),rgba(0,0,0,0.95)_70%)] shadow-[0_0_60px_rgba(255,106,0,0.2)]">
            <div className="absolute inset-4 rounded-full border border-orange-500/20" />
            <div className="absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,#2a1608_0_45deg,#0d0d0d_45deg_90deg,#2a1608_90deg_135deg,#0d0d0d_135deg_180deg,#2a1608_180deg_225deg,#0d0d0d_225deg_270deg,#2a1608_270deg_315deg,#0d0d0d_315deg_360deg)] opacity-95" />
            <div className="absolute top-3 h-0 w-0 border-x-[16px] border-b-[26px] border-x-transparent border-b-orange-400" />
            <div className="absolute inset-0">
              {data.wheelRewards.map((reward, index) => {
                const angle = (index / data.wheelRewards.length) * Math.PI * 2;
                const x = 50 + Math.cos(angle - Math.PI / 2) * 34;
                const y = 50 + Math.sin(angle - Math.PI / 2) * 34;
                return (
                  <div
                    key={reward}
                    className="absolute w-24 -translate-x-1/2 -translate-y-1/2 text-center text-xs font-semibold text-white/90"
                    style={{ left: `${x}%`, top: `${y}%` }}
                  >
                    {reward}
                  </div>
                );
              })}
            </div>
            <div className="relative z-10 flex size-36 flex-col items-center justify-center rounded-full border-4 border-orange-400 bg-black text-center shadow-[0_0_30px_rgba(255,106,0,0.2)]">
              <div className="race-title text-[2rem] leading-none">Spin</div>
              <div className="mt-1 text-sm font-semibold text-orange-300">
                1 Ticket
              </div>
            </div>
          </div>
          <div className="mt-5 grid grid-cols-2 gap-3">
            <Button className="rounded-xl">Spin Sekarang</Button>
            <Button variant="outline" className="rounded-xl">
              <Ticket className="size-4" />
              Beli Tiket
            </Button>
          </div>
        </Card>
      </div>
    </PageShell>
  );
}
