import styles from "./styles.module.css"

interface ContentMainProps {
  children: React.ReactNode;
}

const ContentMain: React.FC<ContentMainProps> = ({ children }) => {
  return (
    <div className="w-full pt-14">
      <div className={styles.childrenContainer}>
        {children}
      </div>
    </div>
  );
};

export default ContentMain;
