import { NavLink, Outlet } from "react-router-dom";
import styles from "./main-layout.module.css";

const navigationItems = [
	{ label: "Todos", to: "/todos" },
];

export const MainLayout = () => {
	return (
		<div className={styles.appShell}>
			<header className={styles.appHeader}>
				<div>
					<h1 className={styles.title}>Task Planner</h1>
					<p className={styles.subtitle}>Учимся работать с данными и axios</p>
				</div>
				<nav className={styles.nav}>
					{navigationItems.map((item) => (
						<NavLink
							key={item.to}
							to={item.to}
							className={({ isActive }) =>
								isActive ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink
							}
						>
							{item.label}
						</NavLink>
					))}
				</nav>
			</header>
			<main className={styles.content}>
				<Outlet />
			</main>
			<footer className={styles.footer}>
				<span>React + axios workshop</span>
			</footer>
		</div>
	);
};

