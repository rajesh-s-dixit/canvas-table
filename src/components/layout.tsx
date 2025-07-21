import { PageHeader } from "./header";

export interface ILayoutProps {
  children: React.ReactNode;
}

export const Layout = ({children}: ILayoutProps) => {
  return (
    <div className="layout">
      <header className="layout-header">
        <PageHeader />
      </header>
      <main className="layout-content">
        {children}
      </main>
    </div>
  );
}