// src/modules/pdr/menu.ts
import type { MenuItem } from "@/shared/types/types";

export const pdrMenuItems: MenuItem = {
  id: "pdr",
  label: "PDR",
  href: "/pdr",
  children: [
    {
      id: "pdr-landing",
      label: "Landing",
      href: "/pdr/landing",
      component: () => import("@/modules/pdr/LandingPage"),
    },
    {
      id: "pdr-competency",
      label: "Competency",
      href: "/pdr/competency",
      component: () => import("@/modules/pdr/features/competency/CompetencyPage"),
    },
    {
      id: "pdr-evaluation",
      label: "Evaluation",
      href: "/pdr/evaluation/:id",
      component: () => import("@/modules/pdr/features/evaluation/Page"),
    },
    {
      id: "pdr-question",
      label: "Question",
      href: "/pdr/LandingPage",
      component: () => import("@/modules/pdr/features/question/Page"),
    },
    {
      id: "pdr-question",
      label: "Question",
      href: "/pdr/QuestionPage",
      component: () => import("@/modules/pdr/features/question/questions/QuestionPage"),
    },
    {
      id: "pdr-question",
      label: "Question",
      href: "/pdr/Done",
      component: () => import("@/modules/pdr/features/question/Done/Done"),
    },
    {
      id: "pdr-auth",
      label: "Authentication",
      href: "/pdr/auth",
      component: () => import("@/modules/pdr/features/auth/Page"),
    },
  ],
};