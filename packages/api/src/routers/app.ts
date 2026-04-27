import {
  events,
  aboutCards,
  accountDetails,
  accountOverview,
  customizer,
  faqs,
  favoriteItems,
  featuredStats,
  heroSlides,
  homeShortcuts,
  menuItems,
  missions,
  orders,
  paymentMethods,
  pointHistory,
  rewards,
  supportChannels,
  vouchers,
  wheelRewards,
} from "@racebowl/db";
import { z } from "zod";
import { publicProcedure, router } from "../trpc";

export const appRouter = router({
  home: publicProcedure.query(() => ({
    heroSlides,
    homeShortcuts,
    featuredStats,
    featuredMenus: menuItems.slice(0, 4),
    rewards: rewards.slice(0, 3),
  })),
  menu: publicProcedure.query(() => ({
    menuItems,
    customizer,
  })),
  profile: publicProcedure.query(() => ({
    accountOverview,
    favoriteItems,
    paymentMethods,
  })),
  orders: publicProcedure.query(() => orders),
  orderById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ input }) => {
      return orders.find((order) => order.id === input.id) ?? orders[0];
    }),
  points: publicProcedure.query(() => ({
    total: accountOverview.points,
    history: pointHistory,
    rewards,
    missions,
    wheelRewards,
  })),
  vouchers: publicProcedure.query(() => vouchers),
  missions: publicProcedure.query(() => missions),
  events: publicProcedure.query(() => events),
  support: publicProcedure.query(() => ({
    faqs,
    supportChannels,
  })),
  about: publicProcedure.query(() => ({
    aboutCards,
    accountDetails,
  })),
});

export type AppRouter = typeof appRouter;
