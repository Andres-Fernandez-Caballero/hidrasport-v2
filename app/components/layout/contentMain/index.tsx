import { ReactNode } from "react";
import styles from "./styles.module.css"

interface ContentMainProps {
  children: React.ReactNode;
  title?: ReactNode;
}

const ContentMain: React.FC<ContentMainProps> = ({ children, title }) => (
  <main className="py-14  w-100">
    <div >
      <header className={styles.sectionName}>
        <h2
        >
          {title ? title : ""}
        </h2>
      </header>
      <div className={styles.childrenContainer}>
      <>{children}</>

      </div>
    </div>
  </main>
);

export default ContentMain;
