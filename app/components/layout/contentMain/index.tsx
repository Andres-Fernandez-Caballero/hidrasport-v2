import { ReactNode } from "react";

interface ContentMainProps {
  children: React.ReactNode;
  title?: ReactNode;
}

const ContentMain: React.FC<ContentMainProps> = ({ children, title }) => (
  <main className="bg-gray-200">
    <div className="mx-auto max-w-2xl px-2 py-12 sm:px-4 sm:py-12 lg:max-w-7xl lg:px-6">
      <header>
        <h2
          className={`${
            !title && "sr-only"
          } text-2xl font-bold tracking-tight text-gray-900 mb-9`}
        >
          {title ? title : ""}
        </h2>
      </header>
      <>{children}</>
    </div>
  </main>
);

export default ContentMain;
