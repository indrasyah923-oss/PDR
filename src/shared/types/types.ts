export type MenuItem = {
  id: string;
  label: string;
  icon?: string;
  href?: string;
  children?: MenuItem[];
  isExternalLink?: boolean;
  hideInMenu?: boolean;
  component?: () => Promise<{ default: React.ComponentType }>;
  dividerAfter?: boolean;
};