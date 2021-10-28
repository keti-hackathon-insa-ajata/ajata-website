import React, { useState } from 'react';
import styles from '../styles/Layout.module.css';
import Footer from './footer';
import LegendDrawer from './legend-drawer';
import MenuDrawer from './menu-drawer';
import { useRouter } from 'next/router';

type Props = {
  children: React.ReactElement;
};

export default function Layout(props: Props) {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [legendOpen, setLegendOpen] = useState(false);
  const isRoot = router.pathname === '/';
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        {props.children}
        <MenuDrawer open={menuOpen} onClose={() => setMenuOpen(false)} />
        <LegendDrawer
          open={legendOpen && isRoot && !menuOpen}
          onClose={() => setLegendOpen(false)}
        />
      </main>
      <Footer
        onMenuClick={() => setMenuOpen(!menuOpen)}
        onLegendClick={() => setLegendOpen(!legendOpen)}
        showLegend={isRoot}
      />
    </div>
  );
}
