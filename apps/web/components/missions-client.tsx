"use client";

import { PageShell } from "@/components/page-shell";
import { trpc } from "@/components/providers";
import { MissionRow, SectionHeading } from "@/components/racebowl-primitives";
import { Card } from "@racebowl/ui/card";
import { Progress } from "@racebowl/ui/progress";
import { Gift } from "lucide-react";

export function MissionsClient() {
  const { data } = trpc.missions.useQuery();

  if (!data) {
    return (
      <PageShell title="Missions">
        <div className="h-80 rounded-[32px] bg-white/5" />
      </PageShell>
    );
  }

  const daily = data.filter((mission) => mission.cadence === "Harian");
  const weekly = data.filter((mission) => mission.cadence === "Mingguan");
  const special = data.filter((mission) => mission.cadence === "Spesial");

  return (
    <PageShell title="Missions" backHref="/">
      <div className="space-y-5">
        <Card className="relative overflow-hidden p-5">
          <div className="absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(circle_at_right,rgba(255,106,0,0.25),transparent_70%)]" />
          <div className="relative space-y-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="race-title text-[2.7rem] leading-[0.9]">
                  Selesaikan Misi, Dapatkan Race Points!
                </div>
                <p className="mt-3 text-sm leading-6 text-white/60">
                  Loop retensi utama untuk bikin user datang, main, klaim, lalu
                  beli lagi.
                </p>
              </div>
              <Gift className="size-10 text-orange-400" />
            </div>
            <Card className="bg-white/[0.03] p-4">
              <div className="flex items-center justify-between text-sm text-white/55">
                <span>Progress Harian</span>
                <span>120 / 200 Point</span>
              </div>
              <Progress value={60} className="mt-3 h-3" />
            </Card>
          </div>
        </Card>

        <div className="space-y-4">
          <SectionHeading title="Harian" />
          <div className="space-y-3">
            {daily.map((mission) => (
              <MissionRow key={mission.slug} {...mission} />
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <SectionHeading title="Mingguan" />
          <div className="space-y-3">
            {weekly.map((mission) => (
              <MissionRow key={mission.slug} {...mission} />
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <SectionHeading title="Spesial" />
          <div className="space-y-3">
            {special.map((mission) => (
              <MissionRow key={mission.slug} {...mission} />
            ))}
          </div>
        </div>
      </div>
    </PageShell>
  );
}
