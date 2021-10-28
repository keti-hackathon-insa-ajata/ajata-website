import styles from '../styles/Legend.module.css';
import { useSpring, animated } from 'react-spring';

type Props = {
  open: boolean;
};

export default function Legend(props: Props) {
  const animation = useSpring({
    transform: props.open ? 'translateX(-200px)' : 'translateX(0px)',
  });
  return (
    <animated.div style={animation} className={styles.container}>
      <iframe
        src={'https://www.cyclosm.org/legend.html'}
        className={styles.frame}
      ></iframe>
    </animated.div>
  );
}
