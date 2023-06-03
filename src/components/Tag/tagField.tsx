import { ChangeEvent } from "react";
import styles from "./page.module.css"


const Tag: React.FC<{ textContent:string, color:string, isChecked: boolean; onChange: (event: ChangeEvent<HTMLInputElement>) => void }> = ({ textContent, color, isChecked, onChange }) => {
    return (
      <label style={styles.checkbox}>
        <input type="checkbox" checked={isChecked} onChange={onChange} />
        {textContent}
      </label>
    );
  };
  
  export default Tag;