"use client";

import { trpc } from "@/components/providers";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@racebowl/ui/button";
import {
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Coins,
  Egg,
  Flag,
  Flame,
  Info,
  Minus,
  Pencil,
  Plus,
  ShieldCheck,
  ShoppingCart,
  Soup,
  Tag,
  Trash2,
  Zap,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

type Step = 1 | 2 | 3 | 4;

type CustomizerOption = {
  title: string;
  price: number;
  selected?: boolean;
  tone?: string;
  image?: string;
  badge?: "spicy" | "new";
};

const STEP_LABELS: Record<Step, [string, string, string, string]> = {
  1: ["Pilih Menu", "Protein", "Customize", "Review"],
  2: ["Protein", "Customize", "Review", "Selesai"],
  3: ["Protein", "Customize", "Drink", "Review"],
  4: ["Protein", "Customize", "Drink", "Review"],
};

export function MenuCustomizeClient() {
  const { data } = trpc.menu.useQuery();
  const [step, setStep] = useState<Step>(1);
  const [menuTypeSlug, setMenuTypeSlug] = useState("rice-bowl");
  const [proteinSlug, setProteinSlug] = useState("Chicken");
  const [riceTitle, setRiceTitle] = useState("Nasi Putih");
  const [sauceTitles, setSauceTitles] = useState<string[]>([
    "Race Sauce",
    "Spicy Mayo",
    "Teriyaki",
  ]);
  const [eggTitle, setEggTitle] = useState("Setengah Matang");
  const [drinkTitle, setDrinkTitle] = useState("Lemon Tea");
  const [bowlQty, setBowlQty] = useState(1);
  const [drinkQty, setDrinkQty] = useState(1);

  if (!data) {
    return (
      <div className="mx-auto min-h-screen w-full max-w-[430px] bg-black px-4 pt-10">
        <div className="h-80 animate-pulse rounded-[32px] bg-white/5" />
      </div>
    );
  }

  const { customizer } = data;
  const protein =
    customizer.proteins.find((p) => p.title === proteinSlug) ??
    customizer.proteins[0];
  const rice =
    customizer.riceOptions.find((r) => r.title === riceTitle) ??
    customizer.riceOptions[0];
  const eggOption =
    customizer.eggs.find((e) => e.title === eggTitle) ?? customizer.eggs[0];
  const drink =
    customizer.drinks.find((d) => d.title === drinkTitle) ??
    customizer.drinks[0];
  const sauces = customizer.sauces.filter((s) => sauceTitles.includes(s.title));

  const bowlPrice =
    protein.price +
    rice.price +
    sauces.reduce((s, x) => s + x.price, 0) +
    eggOption.price;
  const drinkPrice = drink.price;
  const bowlTotal = bowlPrice * bowlQty;
  const drinkTotal = drinkPrice * drinkQty;
  const subtotal = bowlTotal + drinkTotal;
  const total = subtotal + customizer.ongkir;
  const earnPoints = Math.round(total / 100) * 10;
  const cartCount = bowlQty + drinkQty;

  const toggleSauce = (title: string) => {
    setSauceTitles((prev) =>
      prev.includes(title) ? prev.filter((s) => s !== title) : [...prev, title],
    );
  };

  return (
    <div className="mx-auto min-h-screen w-full max-w-[430px] bg-black text-white">
      <div className="px-4 pb-32 pt-6">
        <Header
          title={step === 1 ? "Menu" : "Customize Bowl"}
          step={step}
          cartCount={cartCount}
          onBack={() => setStep((s) => (s > 1 ? ((s - 1) as Step) : s))}
          rightSlot={step === 1 ? <RaceModeBadge /> : null}
        />

        <StepIndicator step={step} labels={STEP_LABELS[step]} />

        <div className="mt-6 space-y-5">
          {step === 1 && (
            <Step1
              menuTypes={customizer.menuTypes}
              menuTypeSlug={menuTypeSlug}
              setMenuTypeSlug={setMenuTypeSlug}
              proteins={customizer.proteins}
              proteinSlug={proteinSlug}
              setProteinSlug={setProteinSlug}
            />
          )}
          {step === 2 && (
            <Step2
              protein={protein}
              riceOptions={customizer.riceOptions}
              riceTitle={riceTitle}
              setRiceTitle={setRiceTitle}
              sauces={customizer.sauces}
              sauceTitles={sauceTitles}
              toggleSauce={toggleSauce}
              eggs={customizer.eggs}
              eggTitle={eggTitle}
              setEggTitle={setEggTitle}
              bowlPrice={bowlPrice}
              onEditProtein={() => setStep(1)}
            />
          )}
          {step === 3 && (
            <Step3
              drinks={customizer.drinks}
              drinkTitle={drinkTitle}
              setDrinkTitle={setDrinkTitle}
              comboUpgradePrice={customizer.comboUpgradePrice}
              protein={protein}
              rice={rice}
              sauces={sauces}
              eggOption={eggOption}
              bowlPrice={bowlPrice}
              drink={drink}
              cartCount={cartCount}
              onEditBowl={() => setStep(2)}
            />
          )}
          {step === 4 && (
            <Step4
              protein={protein}
              rice={rice}
              sauces={sauces}
              eggOption={eggOption}
              drink={drink}
              bowlPrice={bowlPrice}
              bowlQty={bowlQty}
              drinkQty={drinkQty}
              setBowlQty={setBowlQty}
              setDrinkQty={setDrinkQty}
              subtotal={subtotal}
              total={total}
              ongkir={customizer.ongkir}
              earnPoints={earnPoints}
              onEditBowl={() => setStep(2)}
              onEditDrink={() => setStep(3)}
            />
          )}
        </div>
      </div>

      <StickyFooter
        step={step}
        protein={protein}
        bowlPrice={bowlPrice}
        subtotal={subtotal}
        total={total}
        cartCount={cartCount}
        onNext={() => setStep((s) => (s < 4 ? ((s + 1) as Step) : s))}
      />
    </div>
  );
}

function Header({
  title,
  step,
  cartCount,
  onBack,
  rightSlot,
}: {
  title: string;
  step: Step;
  cartCount: number;
  onBack: () => void;
  rightSlot?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between">
      <button
        type="button"
        onClick={onBack}
        className="flex size-10 items-center justify-center rounded-full border border-white/10 bg-white/5"
        aria-label="Back"
      >
        <ChevronLeft className="size-5" />
      </button>
      <h1 className="race-title text-[1.6rem] leading-none">{title}</h1>
      <div className="flex items-center gap-2">
        {rightSlot}
        {step !== 1 && cartCount > 0 ? (
          <div className="relative flex size-10 items-center justify-center rounded-full border border-white/10 bg-white/5">
            <ShoppingCart className="size-4" />
            <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-orange-500 text-[11px] font-black text-black">
              {cartCount}
            </span>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function RaceModeBadge() {
  return (
    <div className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-2">
      <span className="race-title text-[0.78rem] leading-none">RACE MODE</span>
      <Flag className="size-3.5 text-orange-400" />
    </div>
  );
}

function StepIndicator({
  step,
  labels,
}: {
  step: Step;
  labels: [string, string, string, string];
}) {
  const items = labels.map((label, idx) => ({
    n: idx + 1,
    label,
    active: idx + 1 === step,
    done: idx + 1 < step,
  }));
  return (
    <div className="mt-6 border-y border-white/10 py-4">
      <div className="flex items-center justify-between gap-1">
        {items.map((item, idx) => (
          <div
            key={item.label}
            className="flex flex-1 items-center gap-1 last:flex-none"
          >
            <div className="flex flex-1 flex-col items-center gap-2">
              <div
                className={`flex size-8 items-center justify-center rounded-full border text-xs font-black ${
                  item.active
                    ? "border-orange-400 bg-orange-500 text-black"
                    : item.done
                      ? "border-orange-400 bg-orange-500/20 text-orange-300"
                      : "border-white/15 bg-white/5 text-white/60"
                }`}
              >
                {item.done ? <Check className="size-4" /> : item.n}
              </div>
              <span
                className={`text-[10.5px] font-semibold uppercase tracking-[0.05em] ${
                  item.active
                    ? "text-orange-400"
                    : item.done
                      ? "text-white/70"
                      : "text-white/40"
                }`}
              >
                {item.label}
              </span>
            </div>
            {idx < items.length - 1 ? (
              <div
                className={`mb-5 h-px flex-1 ${
                  item.done ? "bg-orange-400" : "bg-white/15"
                }`}
              />
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ───────── Step 1 ───────── */

function Step1({
  menuTypes,
  menuTypeSlug,
  setMenuTypeSlug,
  proteins,
  proteinSlug,
  setProteinSlug,
}: {
  menuTypes: { slug: string; title: string; subtitle: string; image: string }[];
  menuTypeSlug: string;
  setMenuTypeSlug: (s: string) => void;
  proteins: CustomizerOption[];
  proteinSlug: string;
  setProteinSlug: (s: string) => void;
}) {
  return (
    <>
      <SectionTitle index="1" label="Pilih Tipe Menu" />
      <div className="grid grid-cols-2 gap-3">
        {menuTypes.map((m) => {
          const selected = m.slug === menuTypeSlug;
          return (
            <button
              type="button"
              key={m.slug}
              onClick={() => setMenuTypeSlug(m.slug)}
              className={`relative overflow-hidden rounded-[24px] border p-4 text-left ${
                selected
                  ? "border-orange-400 bg-orange-500/10 shadow-[0_0_28px_rgba(249,115,22,0.25)]"
                  : "border-white/10 bg-white/[0.03]"
              }`}
            >
              {selected ? (
                <span className="absolute right-3 top-3 flex size-7 items-center justify-center rounded-full bg-orange-500 text-black">
                  <Check className="size-4" />
                </span>
              ) : null}
              <div className="race-title text-[1.4rem] leading-none">
                {m.title}
              </div>
              <p className="mt-1 text-xs text-white/55">{m.subtitle}</p>
              <div className="mt-3 aspect-[4/3] overflow-hidden rounded-2xl bg-black/40">
                <Image
                  src={m.image}
                  alt={m.title}
                  width={400}
                  height={300}
                  className="size-full object-cover"
                />
              </div>
            </button>
          );
        })}
      </div>
      <div className="mt-2 flex items-center justify-center gap-2 border-y border-white/10 py-3 text-xs text-white/55">
        <Info className="size-3.5" />
        Semua menu dimasak fresh setiap hari!
      </div>

      <SectionTitle
        index="2"
        label="Pilih Protein"
        hint="Pilih protein favoritmu"
      />
      <div className="-mx-4 overflow-x-auto px-4 hide-scrollbar">
        <div className="flex gap-3 pb-2">
          {proteins.map((p) => {
            const selected = p.title === proteinSlug;
            return (
              <button
                type="button"
                key={p.title}
                onClick={() => setProteinSlug(p.title)}
                className={`relative w-[136px] shrink-0 overflow-hidden rounded-[20px] border p-3 text-left ${
                  selected
                    ? "border-orange-400 bg-orange-500/10 shadow-[0_0_28px_rgba(249,115,22,0.25)]"
                    : "border-white/10 bg-white/[0.03]"
                }`}
              >
                {selected ? (
                  <span className="absolute right-2 top-2 flex size-6 items-center justify-center rounded-full bg-orange-500 text-black">
                    <Check className="size-3.5" />
                  </span>
                ) : null}
                {p.badge === "spicy" ? (
                  <span className="absolute left-2 top-2 flex size-7 items-center justify-center rounded-full bg-red-500/90 text-white">
                    <Flame className="size-3.5" />
                  </span>
                ) : null}
                {p.badge === "new" ? (
                  <span className="absolute left-2 top-2 rounded-full bg-orange-500 px-2 py-0.5 text-[10px] font-black uppercase text-black">
                    NEW
                  </span>
                ) : null}
                <div className="aspect-square overflow-hidden rounded-2xl bg-black/30">
                  {p.image ? (
                    <Image
                      src={p.image}
                      alt={p.title}
                      width={300}
                      height={300}
                      className="size-full object-cover"
                    />
                  ) : null}
                </div>
                <div className="mt-3 race-title text-center text-[0.95rem] leading-none">
                  {p.title.toUpperCase()}
                </div>
                <div className="mt-1 text-center text-xs font-bold text-orange-400">
                  {formatCurrency(p.price)}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="rounded-[22px] border border-orange-500/30 bg-orange-500/[0.06] p-4">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-2xl bg-orange-500/20 text-orange-400">
            <Zap className="size-5" />
          </div>
          <div className="flex-1">
            <div className="race-title text-[0.95rem] leading-none">
              Perfect Match
            </div>
            <p className="mt-1 text-xs text-white/60">
              Chicken dengan Saus Original & Telur Setengah Matang
            </p>
          </div>
          <ChevronRight className="size-5 text-white/40" />
        </div>
      </div>
    </>
  );
}

/* ───────── Step 2 ───────── */

function Step2({
  protein,
  riceOptions,
  riceTitle,
  setRiceTitle,
  sauces,
  sauceTitles,
  toggleSauce,
  eggs,
  eggTitle,
  setEggTitle,
  bowlPrice,
  onEditProtein,
}: {
  protein: CustomizerOption;
  riceOptions: CustomizerOption[];
  riceTitle: string;
  setRiceTitle: (t: string) => void;
  sauces: CustomizerOption[];
  sauceTitles: string[];
  toggleSauce: (t: string) => void;
  eggs: CustomizerOption[];
  eggTitle: string;
  setEggTitle: (t: string) => void;
  bowlPrice: number;
  onEditProtein: () => void;
}) {
  return (
    <>
      <div className="relative overflow-hidden rounded-[24px]">
        <div className="absolute inset-0 bg-linear-to-r from-black via-black/70 to-transparent" />
        <div className="absolute -right-8 -top-6 size-56 rounded-full bg-orange-500/30 blur-2xl" />
        {protein.image ? (
          <Image
            src={protein.image}
            alt={protein.title}
            width={500}
            height={300}
            className="absolute right-0 top-2 size-44 object-cover"
          />
        ) : null}
        <div className="relative space-y-1 p-4">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-orange-400">
            Step 2
          </p>
          <h2 className="race-title text-[2.4rem] leading-[0.9]">
            CUSTOMIZE
            <br />
            <span className="text-orange-400">RACEBOWL</span>
          </h2>
          <p className="text-xs text-white/60">
            Atur bowl favoritmu sesuai selera!
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={onEditProtein}
        className="flex w-full items-center justify-between rounded-[20px] border border-orange-500/30 bg-white/[0.03] p-3 text-left"
      >
        <div>
          <div className="text-[10px] font-black uppercase tracking-[0.18em] text-orange-400">
            Protein Pilihan
          </div>
          <div className="race-title text-[1.25rem] leading-none">
            {protein.title.toUpperCase()}
          </div>
        </div>
        <span className="flex items-center gap-1 text-sm font-semibold text-orange-300">
          Ubah <Pencil className="size-3.5" />
        </span>
      </button>

      <SectionGroup
        index="1"
        title="Pilih Nasi"
        hint="Wajib dipilih"
        hintTone="orange"
      >
        <div className="grid grid-cols-4 gap-2">
          {riceOptions.map((r) => (
            <ChipCard
              key={r.title}
              option={r}
              selected={r.title === riceTitle}
              onSelect={() => setRiceTitle(r.title)}
              ThumbIcon={Soup}
            />
          ))}
        </div>
      </SectionGroup>

      <SectionGroup index="2" title="Pilih Saus" hint="Bisa pilih lebih dari 1">
        <div className="-mx-4 overflow-x-auto px-4 hide-scrollbar">
          <div className="flex gap-2 pb-2">
            {sauces.map((s) => (
              <ChipCard
                key={s.title}
                option={s}
                selected={sauceTitles.includes(s.title)}
                multi
                onSelect={() => toggleSauce(s.title)}
                ThumbIcon={Soup}
                width="min-w-[112px] w-[112px]"
              />
            ))}
          </div>
        </div>
      </SectionGroup>

      <SectionGroup
        index="3"
        title="Mau Telur?"
        hint="Wajib dipilih"
        hintTone="orange"
      >
        <div className="grid grid-cols-4 gap-2">
          {eggs.map((e) => (
            <ChipCard
              key={e.title}
              option={e}
              selected={e.title === eggTitle}
              onSelect={() => setEggTitle(e.title)}
              ThumbIcon={Egg}
            />
          ))}
        </div>
      </SectionGroup>

      <Summary
        protein={protein}
        rice={riceOptions.find((r) => r.title === riceTitle) ?? riceOptions[0]}
        sauces={sauces.filter((s) => sauceTitles.includes(s.title))}
        egg={eggs.find((e) => e.title === eggTitle) ?? eggs[0]}
        total={bowlPrice}
      />
    </>
  );
}

function SectionGroup({
  index,
  title,
  hint,
  hintTone,
  children,
}: {
  index: string;
  title: string;
  hint?: string;
  hintTone?: "orange" | "muted";
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-4">
      <div className="mb-3 flex items-center justify-between">
        <div className="race-title text-[1.05rem] leading-none">
          <span className="text-orange-400">{index}.</span>{" "}
          {title.toUpperCase()}
        </div>
        {hint ? (
          <span
            className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${
              hintTone === "orange"
                ? "bg-orange-500/15 text-orange-300"
                : "bg-white/5 text-white/55"
            }`}
          >
            {hint}
          </span>
        ) : null}
      </div>
      {children}
    </div>
  );
}

function ChipCard({
  option,
  selected,
  multi,
  onSelect,
  ThumbIcon,
  width,
}: {
  option: CustomizerOption;
  selected: boolean;
  multi?: boolean;
  onSelect: () => void;
  ThumbIcon: typeof Soup;
  width?: string;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`relative ${width ?? ""} overflow-hidden rounded-[18px] border p-2.5 text-left ${
        selected
          ? "border-orange-400 bg-orange-500/10"
          : "border-white/10 bg-white/[0.04]"
      }`}
    >
      {selected ? (
        <span className="absolute right-1.5 top-1.5 flex size-5 items-center justify-center rounded-full bg-orange-500 text-black">
          <Check className="size-3" />
        </span>
      ) : !multi ? (
        <span className="absolute right-1.5 top-1.5 size-5 rounded-full border border-white/20" />
      ) : null}
      <div
        className={`mx-auto flex aspect-square w-full items-center justify-center rounded-2xl ${option.tone ?? "bg-white/5"}`}
      >
        <ThumbIcon className="size-5 text-black/60" />
      </div>
      <div className="mt-2 race-title text-[0.78rem] leading-tight">
        {option.title}
      </div>
      <div className="mt-1 text-[10.5px] font-bold text-orange-400">
        {option.price === 0 ? "Rp 0" : `+ ${formatCurrency(option.price)}`}
      </div>
    </button>
  );
}

function SectionTitle({
  index,
  label,
  hint,
}: {
  index: string;
  label: string;
  hint?: string;
}) {
  return (
    <div className="mt-2 flex items-end justify-between">
      <div className="race-title text-[1.15rem] leading-none">
        {index}. {label.toUpperCase()}
      </div>
      {hint ? (
        <p className="text-xs font-semibold text-orange-300">{hint}</p>
      ) : null}
    </div>
  );
}

function Summary({
  protein,
  rice,
  sauces,
  egg,
  total,
}: {
  protein: CustomizerOption;
  rice: CustomizerOption;
  sauces: CustomizerOption[];
  egg: CustomizerOption;
  total: number;
}) {
  return (
    <div className="rounded-[22px] border border-white/10 bg-white/[0.03] p-3">
      <div className="text-[10px] font-black uppercase tracking-[0.18em] text-orange-400">
        Ringkasan
      </div>
      <div className="mt-2 grid grid-cols-2 items-center gap-2 text-xs text-white/70">
        <SummaryChip icon="🔥" label={protein.title} />
        <SummaryChip icon="🍚" label={rice.title} />
        <SummaryChip
          icon="🥣"
          label={sauces.map((s) => s.title).join(", ") || "Tanpa saus"}
        />
        <SummaryChip icon="🥚" label={egg.title} />
      </div>
      <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-3">
        <span className="text-[10px] font-black uppercase tracking-[0.18em] text-white/55">
          Total Harga
        </span>
        <span className="race-title text-[1.45rem] leading-none text-orange-400">
          {formatCurrency(total)}
        </span>
      </div>
    </div>
  );
}

function SummaryChip({ icon, label }: { icon: string; label: string }) {
  return (
    <div className="flex min-w-0 items-center gap-2">
      <span className="text-base">{icon}</span>
      <span className="truncate">{label}</span>
    </div>
  );
}

/* ───────── Step 3 ───────── */

function Step3({
  drinks,
  drinkTitle,
  setDrinkTitle,
  comboUpgradePrice,
  protein,
  rice,
  sauces,
  eggOption,
  bowlPrice,
  drink,
  cartCount,
  onEditBowl,
}: {
  drinks: CustomizerOption[];
  drinkTitle: string;
  setDrinkTitle: (t: string) => void;
  comboUpgradePrice: number;
  protein: CustomizerOption;
  rice: CustomizerOption;
  sauces: CustomizerOption[];
  eggOption: CustomizerOption;
  bowlPrice: number;
  drink: CustomizerOption;
  cartCount: number;
  onEditBowl: () => void;
}) {
  return (
    <>
      <div className="relative overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.03] p-4">
        <div className="absolute -right-6 -top-4 size-40 rounded-full bg-orange-500/20 blur-2xl" />
        <div className="absolute right-3 top-3 select-none text-[3.6rem]">
          🐤
        </div>
        <p className="text-sm font-black uppercase tracking-[0.18em] text-orange-400">
          Step 3
        </p>
        <h2 className="race-title text-[2.1rem] leading-[0.9]">
          PILIH MINUMANMU
        </h2>
        <p className="mt-1 text-xs text-white/60">
          Lengkapi bowl kamu dengan minuman favorit!
        </p>
      </div>

      <SectionGroup index="🥤" title="Pilih Minuman">
        <div className="-mx-4 overflow-x-auto px-4 hide-scrollbar">
          <div className="flex gap-3 pb-2">
            {drinks.map((d) => {
              const selected = d.title === drinkTitle;
              return (
                <button
                  type="button"
                  key={d.title}
                  onClick={() => setDrinkTitle(d.title)}
                  className={`relative w-[120px] shrink-0 overflow-hidden rounded-[18px] border p-3 text-left ${
                    selected
                      ? "border-orange-400 bg-orange-500/10 shadow-[0_0_24px_rgba(249,115,22,0.2)]"
                      : "border-white/10 bg-white/[0.04]"
                  }`}
                >
                  {selected ? (
                    <span className="absolute right-2 top-2 flex size-6 items-center justify-center rounded-full bg-orange-500 text-black">
                      <Check className="size-3.5" />
                    </span>
                  ) : (
                    <span className="absolute right-2 top-2 size-6 rounded-full border border-white/20" />
                  )}
                  <div
                    className={`mx-auto flex aspect-[3/4] w-full items-end justify-center rounded-xl ${d.tone ?? "bg-white/5"} pb-2`}
                  >
                    <span className="race-title text-[0.7rem] leading-none text-white/70">
                      {d.title.split(" ")[0].toUpperCase()}
                    </span>
                  </div>
                  <div className="mt-2 text-[12px] font-bold">{d.title}</div>
                  <div className="text-xs font-black text-orange-400">
                    {formatCurrency(d.price)}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </SectionGroup>

      <div className="flex items-center gap-3 rounded-[22px] border border-orange-500/40 bg-linear-to-r from-orange-500/10 to-transparent p-3">
        <div className="flex size-12 items-center justify-center rounded-2xl bg-orange-500/15 text-orange-300">
          <Zap className="size-5" />
        </div>
        <div className="flex-1">
          <div className="race-title text-[1rem] leading-none">
            UPGRADE <span className="text-orange-400">COMBO</span>
          </div>
          <p className="mt-1 text-[11px] text-white/60">
            Minuman +{formatCurrency(comboUpgradePrice).replace("Rp", "")}
            RB dapat ukuran besar!
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="rounded-full border-orange-400/60 px-3 text-[10px]"
        >
          UPGRADE
          <ChevronRight className="size-3.5" />
        </Button>
      </div>

      <div className="space-y-3 rounded-[24px] border border-white/10 bg-white/[0.03] p-4">
        <div className="flex items-center gap-3">
          {protein.image ? (
            <Image
              src={protein.image}
              alt={protein.title}
              width={80}
              height={80}
              className="size-16 rounded-2xl object-cover"
            />
          ) : null}
          <div className="min-w-0 flex-1">
            <div className="race-title text-[1.05rem] leading-none">
              RACEBOWL {protein.title.toUpperCase()}
            </div>
            <p className="mt-1 text-[11px] text-white/55">
              {protein.title} • {rice.title} •{" "}
              {sauces.map((s) => s.title).join(", ")} • {eggOption.title}
            </p>
          </div>
          <button
            type="button"
            onClick={onEditBowl}
            className="flex items-center gap-1 text-xs font-semibold text-orange-300"
          >
            Ubah <Pencil className="size-3" />
          </button>
        </div>
        <div className="border-t border-dashed border-white/10" />
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[10px] font-black uppercase tracking-[0.18em] text-orange-400">
              Minuman
            </div>
            <div className="text-[13px] font-bold">{drink.title}</div>
          </div>
          <div className="text-right">
            <div className="text-[10px] font-black uppercase tracking-[0.18em] text-white/50">
              Harga
            </div>
            <div className="text-[13px] font-black text-orange-400">
              {formatCurrency(drink.price)}
            </div>
          </div>
          <span className="ml-2 text-xs font-semibold text-orange-300">
            Ubah
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Button
          variant="secondary"
          className="h-14 flex-col gap-0 rounded-[20px] border-dashed border-white/20 bg-transparent text-left"
          asChild
        >
          <button type="button" className="flex">
            <span className="flex items-center gap-2 race-title text-[0.85rem]">
              <Plus className="size-4 text-orange-400" />
              TAMBAH MENU LAIN
            </span>
            <span className="text-[10px] font-medium text-white/45">
              Mau tambah menu lainnya?
            </span>
          </button>
        </Button>
        <Button
          variant="outline"
          className="h-14 flex-col gap-0 rounded-[20px] border-orange-500/60 bg-orange-500/[0.06] text-left"
          asChild
        >
          <button type="button" className="flex">
            <span className="flex items-center gap-2 race-title text-[0.85rem]">
              <ShoppingCart className="size-4" />
              LIHAT KERANJANG ({cartCount})
            </span>
            <span className="text-[10px] font-medium text-white/45">
              Lanjut ke pembayaran
            </span>
          </button>
        </Button>
      </div>
    </>
  );
}

/* ───────── Step 4 ───────── */

function Step4({
  protein,
  rice,
  sauces,
  eggOption,
  drink,
  bowlPrice,
  bowlQty,
  drinkQty,
  setBowlQty,
  setDrinkQty,
  subtotal,
  total,
  ongkir,
  earnPoints,
  onEditBowl,
  onEditDrink,
}: {
  protein: CustomizerOption;
  rice: CustomizerOption;
  sauces: CustomizerOption[];
  eggOption: CustomizerOption;
  drink: CustomizerOption;
  bowlPrice: number;
  bowlQty: number;
  drinkQty: number;
  setBowlQty: (n: number) => void;
  setDrinkQty: (n: number) => void;
  subtotal: number;
  total: number;
  ongkir: number;
  earnPoints: number;
  onEditBowl: () => void;
  onEditDrink: () => void;
}) {
  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="race-title text-[1.6rem] leading-none">
            KERANJANG KAMU
          </h2>
          <span className="speed-lines block h-3 w-10 bg-orange-400" />
        </div>
        <Button variant="outline" size="sm" className="rounded-full">
          <Pencil className="size-3.5" /> Edit
        </Button>
      </div>

      <CartItem
        index={1}
        image={protein.image ?? ""}
        title={`Racebowl ${protein.title}`}
        price={bowlPrice}
        qty={bowlQty}
        setQty={setBowlQty}
        onEdit={onEditBowl}
        details={[
          { icon: "🔥", label: "Protein", value: protein.title },
          { icon: "🍚", label: "Nasi", value: rice.title },
          {
            icon: "🥣",
            label: "Saus",
            value: sauces.map((s) => s.title).join(", "),
          },
          { icon: "🥚", label: "Telur", value: eggOption.title },
        ]}
      />
      <CartItem
        index={2}
        image=""
        title={drink.title}
        price={drink.price}
        qty={drinkQty}
        setQty={setDrinkQty}
        onEdit={onEditDrink}
        tone={drink.tone}
        details={[
          { icon: "🥤", label: "Ukuran", value: "Regular" },
          { icon: "🧊", label: "Es", value: "Normal" },
          { icon: "📝", label: "Catatan", value: "-" },
        ]}
      />

      <button
        type="button"
        className="flex w-full items-center justify-between rounded-[22px] border border-dashed border-white/20 bg-white/[0.02] p-4 text-left"
      >
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-orange-500/10 text-orange-400">
            <Tag className="size-5" />
          </div>
          <div>
            <div className="text-sm font-bold">Punya kode promo?</div>
            <div className="text-[11px] text-white/55">
              Masukkan kode promo disini
            </div>
          </div>
        </div>
        <ChevronRight className="size-5 text-white/40" />
      </button>

      <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-4">
        <div className="text-[11px] font-black uppercase tracking-[0.18em] text-orange-400">
          Ringkasan
        </div>
        <div className="mt-3 space-y-2 text-sm">
          <Row label="Subtotal (2 Menu)" value={formatCurrency(subtotal)} />
          <Row
            label="Ongkir"
            value={formatCurrency(ongkir)}
            icon={<Info className="size-3.5 text-white/40" />}
          />
          <div className="border-t border-white/10 pt-2" />
          <div className="flex items-center justify-between">
            <span className="race-title text-[1rem] leading-none">TOTAL</span>
            <span className="race-title text-[1.4rem] leading-none text-orange-400">
              {formatCurrency(total)}
            </span>
          </div>
        </div>
        <div className="mt-3 flex items-center gap-3 rounded-2xl border border-orange-500/30 bg-orange-500/[0.08] p-3">
          <div className="flex size-10 items-center justify-center rounded-full bg-orange-500/30 text-orange-200">
            <Coins className="size-5" />
          </div>
          <div className="text-[12px]">
            <div className="race-title text-[0.85rem] leading-none">
              KAMU AKAN MENDAPATKAN
            </div>
            <div className="mt-1 text-orange-300">
              <span className="font-black">+ {earnPoints}</span>{" "}
              <span className="text-white/70">Race Points</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {[
          { icon: Flame, title: "FRESH & FAST", desc: "Dimasak setelah order" },
          {
            icon: ShieldCheck,
            title: "QUALITY",
            desc: "Bahan pilihan kualitas terbaik",
          },
          {
            icon: Coins,
            title: "RACE POINT",
            desc: "Kumpulkan poin dan dapatkan reward",
          },
          {
            icon: ShieldCheck,
            title: "SECURE PAYMENT",
            desc: "Pembayaran aman 100% terpercaya",
          },
        ].map(({ icon: Icon, title, desc }) => (
          <div
            key={title}
            className="flex items-start gap-2 rounded-[18px] border border-white/10 bg-white/[0.03] p-3"
          >
            <div className="flex size-8 items-center justify-center rounded-xl bg-orange-500/10 text-orange-400">
              <Icon className="size-4" />
            </div>
            <div>
              <div className="race-title text-[0.78rem] leading-none">
                {title}
              </div>
              <p className="mt-1 text-[10px] text-white/55">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function CartItem({
  index,
  image,
  title,
  price,
  qty,
  setQty,
  onEdit,
  details,
  tone,
}: {
  index: number;
  image: string;
  title: string;
  price: number;
  qty: number;
  setQty: (n: number) => void;
  onEdit: () => void;
  details: { icon: string; label: string; value: string }[];
  tone?: string;
}) {
  return (
    <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-3">
      <div className="flex gap-3">
        <div
          className={`relative h-32 w-24 shrink-0 overflow-hidden rounded-2xl ${
            image ? "" : (tone ?? "bg-white/5")
          }`}
        >
          <span className="absolute left-1.5 top-1.5 z-10 flex size-6 items-center justify-center rounded-full bg-orange-500 text-[11px] font-black text-black">
            {index}
          </span>
          {image ? (
            <Image src={image} alt={title} fill className="object-cover" />
          ) : (
            <div className="flex h-full w-full items-end justify-center pb-2">
              <span className="race-title text-[0.85rem] leading-none">
                RACE
              </span>
            </div>
          )}
          <button
            type="button"
            className="absolute bottom-1.5 left-1.5 flex size-7 items-center justify-center rounded-full bg-black/70 text-red-400"
            aria-label="hapus"
          >
            <Trash2 className="size-3.5" />
          </button>
          <div className="absolute bottom-1.5 right-1.5 flex items-center gap-1 rounded-full bg-black/70 px-1.5 py-0.5 text-[11px] font-black text-white">
            <button
              type="button"
              onClick={() => setQty(Math.max(1, qty - 1))}
              className="flex size-5 items-center justify-center rounded-full text-orange-400"
              aria-label="kurang"
            >
              <Minus className="size-3" />
            </button>
            <span className="w-3 text-center">{qty}</span>
            <button
              type="button"
              onClick={() => setQty(qty + 1)}
              className="flex size-5 items-center justify-center rounded-full text-orange-400"
              aria-label="tambah"
            >
              <Plus className="size-3" />
            </button>
          </div>
        </div>
        <div className="min-w-0 flex-1 space-y-2">
          <div className="flex items-start justify-between gap-2">
            <div className="race-title text-[1rem] leading-none">
              {title.toUpperCase()}
            </div>
            <div className="text-right race-title text-[1rem] leading-none text-orange-400">
              {formatCurrency(price)}
            </div>
          </div>
          <ul className="space-y-1 text-[11px] text-white/65">
            {details.map((d) => (
              <li key={d.label} className="flex items-start gap-1.5">
                <span>{d.icon}</span>
                <span className="text-white/45">{d.label}</span>
                <span className="ml-auto text-white">{d.value}</span>
              </li>
            ))}
          </ul>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onEdit}
              className="flex items-center gap-1 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-semibold"
            >
              Edit <Pencil className="size-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between text-white/65">
      <span className="flex items-center gap-1.5">
        {label} {icon}
      </span>
      <span className="font-bold text-white">{value}</span>
    </div>
  );
}

/* ───────── Sticky Footer ───────── */

function StickyFooter({
  step,
  protein,
  bowlPrice,
  subtotal,
  total,
  cartCount,
  onNext,
}: {
  step: Step;
  protein: CustomizerOption;
  bowlPrice: number;
  subtotal: number;
  total: number;
  cartCount: number;
  onNext: () => void;
}) {
  if (step === 1) {
    return (
      <div className="fixed inset-x-0 bottom-0 mx-auto w-full max-w-[430px] border-t border-white/10 bg-black/90 px-4 pb-5 pt-3 backdrop-blur">
        <div className="flex items-center gap-3">
          {protein.image ? (
            <Image
              src={protein.image}
              alt={protein.title}
              width={56}
              height={56}
              className="size-12 rounded-xl object-cover"
            />
          ) : null}
          <div className="flex-1">
            <div className="text-[12px] font-bold">
              Rice Bowl {protein.title}
            </div>
            <div className="text-[10px] text-white/55">Mulai dari</div>
            <div className="race-title text-[1.1rem] leading-none text-orange-400">
              {formatCurrency(protein.price)}
            </div>
          </div>
          <Button onClick={onNext} className="h-12 rounded-2xl px-4">
            <span className="race-title text-[0.8rem]">
              LANJUT KE CUSTOMIZE
            </span>
            <ChevronRight className="size-4" />
          </Button>
        </div>
        <div className="mt-2 flex items-center gap-2 text-[10px] text-white/45">
          <span>3 Step Lagi</span>
          <div className="flex flex-1 items-center gap-1">
            <span className="h-1 flex-1 rounded-full bg-orange-400" />
            <span className="h-1 flex-1 rounded-full bg-orange-400/30" />
            <span className="h-1 flex-1 rounded-full bg-white/10" />
            <span className="h-1 flex-1 rounded-full bg-white/10" />
          </div>
        </div>
      </div>
    );
  }
  if (step === 2) {
    return (
      <div className="fixed inset-x-0 bottom-0 mx-auto w-full max-w-[430px] border-t border-white/10 bg-black/90 px-4 pb-5 pt-3 backdrop-blur">
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <div className="race-title text-[1.4rem] leading-none text-orange-400">
              {formatCurrency(bowlPrice)}
            </div>
            <div className="mt-1 flex items-center gap-1 text-[10px] text-white/55">
              Lihat Detail <ChevronDown className="size-3" />
            </div>
          </div>
          <Button onClick={onNext} className="h-12 flex-1 rounded-2xl">
            <span className="race-title text-[0.85rem]">LANJUT KE REVIEW</span>
            <ChevronRight className="size-4" />
          </Button>
        </div>
      </div>
    );
  }
  if (step === 3) {
    return (
      <div className="fixed inset-x-0 bottom-0 mx-auto w-full max-w-[430px] border-t border-white/10 bg-black/90 px-4 pb-5 pt-3 backdrop-blur">
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <div className="text-[10px] font-black uppercase tracking-[0.18em] text-white/55">
              Total Harga
            </div>
            <div className="race-title text-[1.5rem] leading-none">
              {formatCurrency(subtotal)}
            </div>
          </div>
          <Button onClick={onNext} className="h-12 flex-1 rounded-2xl">
            <span className="race-title text-[0.85rem]">LANJUT KE REVIEW</span>
            <ChevronRight className="size-4" />
          </Button>
        </div>
      </div>
    );
  }
  // step 4
  return (
    <div className="fixed inset-x-0 bottom-0 mx-auto w-full max-w-[430px] border-t border-white/10 bg-black/90 px-4 pb-5 pt-3 backdrop-blur">
      <div className="grid grid-cols-2 gap-3">
        <Button
          variant="secondary"
          className="h-14 rounded-[18px] border-dashed border-white/20 bg-transparent"
          asChild
        >
          <button type="button" className="flex flex-col items-start text-left">
            <span className="flex items-center gap-1 race-title text-[0.78rem]">
              <Plus className="size-3.5 text-orange-400" /> TAMBAH MENU LAIN
            </span>
            <span className="text-[10px] font-medium text-white/45">
              Mau pesan menu lainnya?
            </span>
          </button>
        </Button>
        <Button className="h-14 rounded-[18px]" asChild>
          <button type="button" className="flex flex-col items-start text-left">
            <span className="flex items-center gap-1 race-title text-[0.85rem]">
              <Flag className="size-3.5" /> PESAN SEKARANG
            </span>
            <span className="text-[10px] font-medium text-black/55">
              Lanjut ke pembayaran
            </span>
          </button>
        </Button>
      </div>
    </div>
  );
}
