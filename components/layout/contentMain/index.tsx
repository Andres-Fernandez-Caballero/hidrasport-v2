import { ReactNode } from "react";

interface ContentMainProps {
  children: React.ReactNode;
  title?: ReactNode;
}

const ContentMain: React.FC<ContentMainProps> = ({ children, title }) => (
  <main className="bg-white">
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <header>
        <h2
          className={`${
            !title && "sr-only"
          } text-2xl font-bold tracking-tight text-gray-900`}
        >
          {title ? title : ""}
        </h2>
      </header>
      <>{children}</>
    </div>
  </main>
);

export default ContentMain;
