"use client";

import { HeaderActions, PageShell } from "@/components/page-shell";
import { trpc } from "@/components/providers";
import { SectionHeading } from "@/components/racebowl-primitives";
import { Button } from "@racebowl/ui/button";
import { Card } from "@racebowl/ui/card";
import { MapPin } from "lucide-react";
import Image from "next/image";

export function EventsClient() {
  const { data } = trpc.events.useQuery();

  if (!data) {
    return (
      <PageShell title="Event">
        <div className="h-80 rounded-[32px] bg-white/5" />
      </PageShell>
    );
  }

  return (
    <PageShell title="Event" backHref="/" rightSlot={<HeaderActions />}>
      <div className="space-y-5">
        <Card className="relative overflow-hidden p-5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_right,rgba(255,106,0,0.25),transparent_65%)]" />
          <div className="relative space-y-2">
            <div className="race-title text-[2.7rem] leading-[0.9]">
              Racebowl On Event!
            </div>
            <p className="max-w-[260px] text-sm leading-6 text-white/60">
              Ikuti keseruan Racebowl di berbagai event seru di kotamu.
            </p>
          </div>
        </Card>

        <div className="space-y-4">
          <SectionHeading title="Event Mendatang" />
          <div className="space-y-4">
            {data.map((event) => (
              <Card key={event.slug} className="overflow-hidden p-4">
                <div className="flex gap-4">
                  <div className="relative h-36 w-28 shrink-0 overflow-hidden rounded-[24px]">
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1 space-y-3">
                    <div className="rounded-full bg-orange-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-orange-300 w-fit">
                      Akan Hadir
                    </div>
                    <div className="race-title text-[1.7rem] leading-none">
                      {event.title}
                    </div>
                    <div className="text-sm text-white/60">{event.date}</div>
                    <div className="flex items-start gap-2 text-sm text-white/60">
                      <MapPin className="mt-0.5 size-4 shrink-0 text-orange-400" />
                      {event.location}
                    </div>
                    <p className="text-sm leading-6 text-white/55">
                      {event.description}
                    </p>
                    <Button variant="outline" className="rounded-xl px-4">
                      Lihat Detail
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </PageShell>
  );
}
