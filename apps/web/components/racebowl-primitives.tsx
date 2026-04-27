import { formatCompactNumber, formatCurrency } from "@/lib/utils";
import { Button } from "@racebowl/ui/button";
import { Card } from "@racebowl/ui/card";
import { Progress } from "@racebowl/ui/progress";
import { cn } from "@racebowl/ui/utils";
import Image from "next/image";
import Link from "next/link";
import { AppIcon } from "./icons";

export function HeroBanner({
  eyebrow,
  title,
  subtitle,
  cta,
  image,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  cta: string;
  image: string;
}) {
  return (
    <Card className="relative overflow-hidden p-5">
      <div className="checker-fade absolute inset-0" />
      <div className="absolute inset-y-0 right-0 w-2/3 bg-[radial-gradient(circle_at_right,rgba(255,106,0,0.28),transparent_65%)]" />
      <div className="relative flex items-center gap-4">
        <div className="max-w-[56%] space-y-3">
          <p className="text-xs uppercase tracking-[0.3em] text-orange-400/90">
            {eyebrow}
          </p>
          <h2 className="race-title speed-lines text-5xl leading-[0.9] text-white">
            {title}
          </h2>
          <p className="text-sm leading-6 text-white/72">{subtitle}</p>
          <Button className="h-11 rounded-xl px-4 text-sm">{cta}</Button>
        </div>
        <div className="relative ml-auto h-52 w-44 shrink-0">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover object-center drop-shadow-[0_18px_30px_rgba(0,0,0,0.5)]"
          />
        </div>
      </div>
    </Card>
  );
}

export function ShortcutGrid({
  items,
}: {
  items: ReadonlyArray<{ title: string; href: string; icon: string }>;
}) {
  return (
    <div className="grid grid-cols-4 gap-3">
      {items.map((item) => (
        <Link key={item.title} href={item.href}>
          <Card className="flex h-[104px] flex-col items-center justify-center gap-3 rounded-[24px] border-white/10 bg-white/[0.03] px-3 text-center">
            <div className="flex size-14 items-center justify-center rounded-[20px] bg-orange-500/10 text-orange-400 shadow-[inset_0_0_0_1px_rgba(255,106,0,0.35)]">
              <AppIcon name={item.icon as never} className="size-7" />
            </div>
            <div className="race-title text-lg leading-none">{item.title}</div>
          </Card>
        </Link>
      ))}
    </div>
  );
}

export function StatStrip({
  stats,
}: {
  stats: { label: string; value: string; caption?: string; accent?: string }[];
}) {
  return (
    <Card className="p-4">
      <div className="grid grid-cols-3 gap-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="space-y-1 rounded-2xl border border-white/8 bg-white/[0.03] p-3"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-white/45">
              {stat.label}
            </p>
            <div className="race-title text-3xl text-orange-400">
              {stat.value}
            </div>
            {stat.caption ? (
              <p className="text-xs text-white/55">{stat.caption}</p>
            ) : null}
          </div>
        ))}
      </div>
    </Card>
  );
}

export function MenuCard({
  title,
  category,
  price,
  image,
  badge,
  href = "/menu/customize",
}: {
  title: string;
  category: string;
  price: number;
  image: string;
  badge?: string;
  href?: string;
}) {
  return (
    <Link href={href}>
      <Card className="overflow-hidden rounded-[26px] border-white/10 bg-white/[0.03]">
        <div className="relative h-40 overflow-hidden">
          <Image src={image} alt={title} fill className="object-cover" />
          <div className="absolute inset-0 bg-linear-to-t from-black via-black/15 to-transparent" />
          {badge ? (
            <div className="absolute left-3 top-3 rounded-full bg-orange-500 px-3 py-1 text-[10px] font-black uppercase tracking-[0.25em] text-black">
              {badge}
            </div>
          ) : null}
        </div>
        <div className="space-y-3 p-4">
          <div>
            <div className="race-title text-[1.55rem] leading-none">
              {title}
            </div>
            <p className="mt-1 text-sm text-white/60">{category}</p>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xl font-black text-orange-400">
                {formatCurrency(price)}
              </div>
              <div className="text-xs text-white/50">
                + {Math.round(price / 100)} Race Points
              </div>
            </div>
            <Button size="sm" className="rounded-xl px-4">
              Pesan
            </Button>
          </div>
        </div>
      </Card>
    </Link>
  );
}

export function SectionHeading({
  title,
  action,
}: { title: string; action?: string }) {
  return (
    <div className="flex items-center justify-between">
      <h3 className="race-title text-[1.75rem] leading-none">{title}</h3>
      {action ? (
        <span className="text-sm font-semibold text-orange-400">{action}</span>
      ) : null}
    </div>
  );
}

export function OrderListCard({
  order,
}: {
  order: {
    id: string;
    total: number;
    status: string;
    payment: string;
    date: string;
    itemCount: number;
    image: string;
  };
}) {
  const statusClasses: Record<string, string> = {
    Selesai: "bg-lime-500/15 text-lime-300",
    Dikirim: "bg-amber-500/15 text-amber-300",
    Diproses: "bg-sky-500/15 text-sky-300",
    Dibatalkan: "bg-white/10 text-white/60",
  };

  return (
    <Card className="overflow-hidden p-4">
      <div className="flex gap-4">
        <div className="relative h-24 w-24 overflow-hidden rounded-2xl">
          <Image
            src={order.image}
            alt={order.id}
            fill
            className="object-cover"
          />
        </div>
        <div className="min-w-0 flex-1 space-y-2">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm text-white/45">Order ID</p>
              <div className="race-title text-[1.8rem] leading-none">
                {order.id}
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-black text-white">
                {formatCurrency(order.total)}
              </div>
              <div className="text-sm text-white/55">{order.payment}</div>
            </div>
          </div>
          <div
            className={cn(
              "inline-flex rounded-full px-3 py-1 text-sm font-semibold",
              statusClasses[order.status],
            )}
          >
            {order.status}
          </div>
          <div className="text-sm text-white/50">{order.date}</div>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3">
        <Button
          variant="secondary"
          className="rounded-xl border-white/10 bg-white/[0.03] text-orange-300"
        >
          Lihat Detail
        </Button>
        <Button variant="outline" className="rounded-xl">
          Pesan Lagi
        </Button>
      </div>
    </Card>
  );
}

export function PointHistoryCard({
  item,
}: {
  item: { title: string; subtitle: string; value: string; positive: boolean };
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-white/8 bg-white/[0.03] p-4">
      <div
        className={cn(
          "flex size-10 items-center justify-center rounded-full",
          item.positive
            ? "bg-lime-500/10 text-lime-300"
            : "bg-red-500/10 text-red-300",
        )}
      >
        {item.positive ? "+" : "-"}
      </div>
      <div className="min-w-0 flex-1">
        <div className="font-semibold text-white">{item.title}</div>
        <div className="text-sm text-white/50">{item.subtitle}</div>
      </div>
      <div
        className={cn(
          "font-black",
          item.positive ? "text-lime-300" : "text-red-300",
        )}
      >
        {item.value}
      </div>
    </div>
  );
}

export function VoucherCard({
  title,
  minSpend,
  expiresAt,
  code,
  imageLabel,
  status,
}: {
  title: string;
  minSpend: number;
  expiresAt: string;
  code: string;
  imageLabel: string;
  status: string;
}) {
  const muted = status !== "available";
  return (
    <Card className={cn("overflow-hidden p-4", muted && "opacity-60")}>
      <div className="flex gap-4">
        <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-[24px] bg-linear-to-br from-orange-500 to-amber-300 text-2xl font-black text-black">
          {imageLabel}
        </div>
        <div className="flex-1 space-y-2">
          <div className="race-title text-[1.6rem] leading-none">{title}</div>
          <p className="text-sm text-white/60">
            Minimal pembelian {formatCurrency(minSpend)}
          </p>
          <div className="flex items-center justify-between gap-3 text-sm">
            <span className="rounded-full border border-orange-500/35 bg-orange-500/10 px-3 py-1 text-orange-300">
              Berlaku hingga {expiresAt}
            </span>
            <span className="font-semibold text-white/60">{code}</span>
          </div>
          <div className="flex justify-end">
            <Button
              size="sm"
              className="rounded-xl px-5"
              variant={status === "available" ? "primary" : "secondary"}
            >
              {status === "available"
                ? "Gunakan"
                : status === "used"
                  ? "Digunakan"
                  : "Kedaluwarsa"}
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}

export function RewardGridCard({
  title,
  points,
  stock,
  image,
  category,
}: {
  title: string;
  points: number;
  stock: number;
  image: string;
  category: string;
}) {
  const visual = image.startsWith("http") ? (
    <Image src={image} alt={title} fill className="object-cover" />
  ) : (
    <div className="flex h-full items-center justify-center bg-linear-to-br from-orange-500/90 to-amber-300 text-2xl font-black text-black">
      {image === "voucher" ? "RP" : "RB"}
    </div>
  );

  return (
    <Card className="overflow-hidden rounded-[26px] border-white/10 bg-white/[0.03]">
      <div className="relative h-40">{visual}</div>
      <div className="space-y-3 p-4">
        <div>
          <div className="text-sm text-white/45">{category}</div>
          <div className="text-xl font-bold text-white">{title}</div>
        </div>
        <div className="flex items-end justify-between">
          <div>
            <div className="text-2xl font-black text-orange-400">
              {formatCompactNumber(points)}
            </div>
            <div className="text-xs text-white/45">Stok: {stock}</div>
          </div>
          <Button size="sm" className="rounded-xl px-4">
            Tukar
          </Button>
        </div>
      </div>
    </Card>
  );
}

export function MissionRow({
  title,
  reward,
  progress,
  target,
  status,
  description,
}: {
  title: string;
  reward: number;
  progress: number;
  target: number;
  status: string;
  description: string;
}) {
  const complete = progress >= target;
  return (
    <Card className="p-4">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <div className="race-title text-[1.45rem] leading-none">{title}</div>
          <p className="max-w-[260px] text-sm leading-6 text-white/60">
            {description}
          </p>
          <div className="text-sm font-semibold text-orange-300">
            {reward} Race Points
          </div>
        </div>
        <Button
          variant={complete ? "secondary" : "outline"}
          className="rounded-xl px-4"
        >
          {status}
        </Button>
      </div>
      <div className="mt-4 space-y-2">
        <div className="flex justify-between text-sm text-white/50">
          <span>Progress</span>
          <span>
            {progress}/{target}
          </span>
        </div>
        <Progress value={(progress / target) * 100} />
      </div>
    </Card>
  );
}
