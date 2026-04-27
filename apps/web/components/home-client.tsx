"use client";

import { HeaderActions } from "@/components/page-shell";
import { trpc } from "@/components/providers";
import {
  HeroBanner,
  MenuCard,
  SectionHeading,
  ShortcutGrid,
  StatStrip,
} from "@/components/racebowl-primitives";
import { Button } from "@racebowl/ui/button";
import { Card } from "@racebowl/ui/card";
import { MobileShell } from "@racebowl/ui/mobile-shell";
import { Sparkles } from "lucide-react";
import Link from "next/link";

export function HomeClient() {
  const { data } = trpc.home.useQuery();

  if (!data) {
    return (
      <MobileShell className="space-y-4">
        <div className="h-12 rounded-2xl bg-white/5" />
        <div className="h-72 rounded-[32px] bg-white/5" />
        <div className="grid grid-cols-4 gap-3">
          {["a", "b", "c", "d"].map((slot) => (
            <div key={slot} className="h-24 rounded-[24px] bg-white/5" />
          ))}
        </div>
      </MobileShell>
    );
  }

  const [hero] = data.heroSlides;

  return (
    <MobileShell className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <div className="race-title text-[3.1rem] leading-[0.82] text-white">
            RACE
            <br />
            <span className="text-orange-500">BOWL</span>
          </div>
          <p className="mt-3 max-w-[220px] text-sm leading-6 text-white/60">
            Street racing fast food experience dengan reward loop yang bikin
            balik lagi.
          </p>
        </div>
        <HeaderActions />
      </div>

      <HeroBanner
        eyebrow={hero.eyebrow}
        title={hero.title}
        subtitle={hero.subtitle}
        cta={hero.cta}
        image="https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=900&q=80"
      />

      <ShortcutGrid items={data.homeShortcuts} />
      <StatStrip stats={data.featuredStats} />

      <Card className="overflow-hidden p-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="race-title text-[1.7rem] leading-none text-orange-400">
              Pesan Sekarang
            </div>
            <p className="mt-2 text-sm leading-6 text-white/60">
              Pilih lokasi restoran lalu gas ke customize bowl favoritmu.
            </p>
          </div>
          <Button className="rounded-xl px-4">Pilih Lokasi</Button>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <Link href="/menu/customize">
            <div className="rounded-[24px] bg-gradient-to-br from-orange-500 to-orange-400 p-4 text-black">
              <div className="race-title text-[1.7rem] leading-none">
                Pickup
              </div>
              <p className="mt-2 text-sm font-medium text-black/80">
                Ambil langsung di resto
              </p>
            </div>
          </Link>
          <Link href="/menu/customize">
            <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-4">
              <div className="race-title text-[1.7rem] leading-none">
                Delivery
              </div>
              <p className="mt-2 text-sm font-medium text-white/65">
                Pesan diantar ke lokasi kamu
              </p>
            </div>
          </Link>
        </div>
      </Card>

      <div className="space-y-4">
        <SectionHeading title="Menu Ngebut" action="Lihat semua" />
        <div className="grid gap-4">
          {data.featuredMenus.map((item, index) => (
            <MenuCard
              key={item.slug}
              title={item.title}
              category={item.category}
              price={item.price}
              image={item.image}
              badge={index === 0 ? "Hot" : undefined}
            />
          ))}
        </div>
      </div>

      <Card className="overflow-hidden p-5">
        <div className="checker-fade absolute inset-0" />
        <div className="relative flex items-center gap-4">
          <div className="flex size-14 items-center justify-center rounded-2xl bg-orange-500/10 text-orange-400">
            <Sparkles className="size-7" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="race-title text-[1.7rem] leading-none">
              Refer & Earn
            </div>
            <p className="mt-2 text-sm leading-6 text-white/60">
              Ajak teman, dapatkan voucher spesial, dan naikkan progres level
              lebih cepat.
            </p>
          </div>
          <Button className="rounded-xl px-4">Ajak Sekarang</Button>
        </div>
      </Card>
    </MobileShell>
  );
}
