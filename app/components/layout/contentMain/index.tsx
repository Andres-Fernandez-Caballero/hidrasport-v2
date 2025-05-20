import styles from "./styles.module.css"

interface ContentMainProps {
  children: React.ReactNode;
}

const ContentMain: React.FC<ContentMainProps> = ({ children }) => {
  return (
    <div className="pt-14 w-100">
      <div className={styles.childrenContainer}>
        {children}
      </div>
    </div>
  );
};

export default ContentMain;
