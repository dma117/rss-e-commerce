import styles from './style.module.css';

import { FC } from 'react';

interface ButtonUnderlinedProps {
  title: string;
  onButtonClick: () => void;
}

const ButtonUnderlined: FC<ButtonUnderlinedProps> = ({
  title,
  onButtonClick,
}: ButtonUnderlinedProps) => {
  return (
    <button className={styles.button} onClick={onButtonClick}>
      {title}
    </button>
  );
};

export default ButtonUnderlined;
