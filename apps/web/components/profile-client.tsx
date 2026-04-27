"use client";

import { trpc } from "@/components/providers";
import { Button } from "@racebowl/ui/button";
import { Card } from "@racebowl/ui/card";
import { MobileShell } from "@racebowl/ui/mobile-shell";
import { Progress } from "@racebowl/ui/progress";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const profileLinks = [
  ["Informasi Akun", "/profile/account"],
  ["Metode Pembayaran", "/profile/payment-methods"],
  ["Menu Favorit", "/profile/favorites"],
  ["Voucher Saya", "/voucher"],
  ["Riwayat Race Points", "/race-points"],
  ["Bantuan & Dukungan", "/profile/help"],
  ["Tentang Racebowl", "/profile/about"],
] as const;

export function ProfileClient() {
  const { data } = trpc.profile.useQuery();

  if (!data) {
    return (
      <MobileShell>
        <div className="h-80 rounded-[32px] bg-white/5" />
      </MobileShell>
    );
  }

  return (
    <MobileShell className="space-y-5">
      <div className="flex items-center justify-between">
        <div className="race-title text-[2.8rem] leading-none">Profil</div>
        <div className="flex gap-2">
          <div className="relative flex size-10 items-center justify-center rounded-full border border-white/10 bg-white/5">
            <span className="absolute right-1 top-1 flex size-4 items-center justify-center rounded-full bg-orange-500 text-[10px] font-bold text-black">
              2
            </span>
          </div>
          <div className="flex size-10 items-center justify-center rounded-full border border-white/10 bg-white/5" />
        </div>
      </div>

      <Card className="overflow-hidden p-5">
        <div className="flex gap-4">
          <div className="relative size-24 overflow-hidden rounded-full border border-orange-500/35 bg-white/[0.03]">
            <Image
              src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80"
              alt="avatar"
              fill
              className="object-cover"
            />
          </div>
          <div className="min-w-0 flex-1 space-y-2">
            <div className="race-title text-[2rem] leading-none">
              Raka Pratama
            </div>
            <div className="w-fit rounded-full bg-orange-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-orange-300">
              Racer
            </div>
            <div className="text-sm text-white/65">+62 812-3456-7890</div>
            <div className="text-sm text-white/65">raka.pratama@gmail.com</div>
          </div>
        </div>
        <Card className="mt-4 bg-white/[0.03] p-4">
          <div className="grid grid-cols-3 gap-3">
            <div>
              <div className="text-sm text-white/50">Race Points</div>
              <div className="mt-2 text-3xl font-black text-orange-400">
                1.250
              </div>
            </div>
            <div>
              <div className="text-sm text-white/50">
                Menuju Level Berikutnya
              </div>
              <div className="mt-2 text-3xl font-black text-orange-400">
                250
              </div>
            </div>
            <div>
              <div className="text-sm text-white/50">Tier</div>
              <div className="mt-2 text-3xl font-black text-orange-400">
                Racer
              </div>
            </div>
          </div>
          <Progress value={82} className="mt-4 h-3" />
        </Card>
      </Card>

      <Card className="p-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="race-title text-[1.55rem] leading-none">
              Pesan Lebih Cepat
            </div>
            <p className="mt-2 text-sm leading-6 text-white/60">
              Simpan alamat dan menu favorit untuk experience yang lebih cepat.
            </p>
          </div>
          <Button className="rounded-xl px-4">Atur Sekarang</Button>
        </div>
      </Card>

      <Card className="overflow-hidden">
        {profileLinks.map(([label, href], index) => (
          <Link
            key={label}
            href={href}
            className={`flex items-center justify-between px-5 py-4 ${index !== profileLinks.length - 1 ? "border-b border-white/10" : ""}`}
          >
            <span className="text-lg text-white/85">{label}</span>
            <ChevronRight className="size-5 text-white/35" />
          </Link>
        ))}
      </Card>

      <Card className="overflow-hidden p-5">
        <div className="rounded-[24px] border border-orange-500/25 bg-[radial-gradient(circle_at_right,rgba(255,106,0,0.18),transparent_60%)] p-4">
          <div className="race-title text-[1.8rem] leading-none">
            Ajak Teman, Dapatkan Bonus!
          </div>
          <p className="mt-2 max-w-[240px] text-sm leading-6 text-white/60">
            Dapatkan 20.000 Race Points untuk kamu dan temanmu.
          </p>
          <Button className="mt-4 rounded-xl px-4">Ajak Teman</Button>
        </div>
      </Card>
    </MobileShell>
  );
}
