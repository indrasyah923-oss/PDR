import React, { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { pdrMenuItems } from "@/modules/pdr/menu";
import type { MenuItem } from "@/shared/types/types";

const lazyLoad = (loader: () => Promise<{ default: React.ComponentType }>) => {
  const Component = React.lazy(loader);
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Component />
    </Suspense>
  );
};

const generateRoutesFromMenuItems = (menuItems: MenuItem[]): React.ReactElement[] => {
  return menuItems.flatMap((item) => {
    const routes: React.ReactElement[] = [];
    if (item.isExternalLink || !item.href) return [];
    if (item.component) {
      routes.push(<Route key={item.id} path={item.href} element={lazyLoad(item.component)} />);
    }
    if (item.children && item.children.length > 0) {
      routes.push(...generateRoutesFromMenuItems(item.children));
    }
    return routes;
  });
};

const mainRoutes = generateRoutesFromMenuItems([pdrMenuItems]);

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/pdr/landing" replace />} />
      {mainRoutes}
    </Routes>
  );
}