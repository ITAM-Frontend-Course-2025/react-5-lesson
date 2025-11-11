import { lazy, Suspense, useMemo } from "react";
import { Link, NavLink, Route, Routes, useLocation } from "react-router";
import Home from "./pages/Home";

type TaskModule = { default: () => JSX.Element };

const tasksGlob = import.meta.glob("./tasks/**/answer.tsx") as Record<
	string,
	() => Promise<TaskModule>
>;

function useTaskIndex() {
	const entries = useMemo(() => {
		return Object.keys(tasksGlob).map((fullPath) => {
			// fullPath example: ./tasks/routing/browserRouter/task-1/answer.tsx
			const rel = fullPath.replace("./tasks/", "").replace(/\.tsx$/, "");
			const segments = rel.split("/");
			const category = segments[0] || "misc";
			const slug = rel.replace(/\/answer$/, ""); // e.g. routing/browserRouter/task-1
			return { fullPath, rel, category, slug };
		});
	}, []);

	const categories = useMemo(() => {
		const byCat: Record<string, { slug: string; rel: string }[]> = {};
		for (const e of entries) {
			if (!byCat[e.category]) byCat[e.category] = [];
			byCat[e.category].push({ slug: e.slug, rel: e.rel });
		}
		// sort slugs within category
		for (const cat of Object.keys(byCat)) {
			byCat[cat].sort((a, b) => a.slug.localeCompare(b.slug));
		}
		return byCat;
	}, [entries]);

	const slugToImporter = useMemo(() => {
		const map: Record<string, () => Promise<TaskModule>> = {};
		for (const e of entries) {
			map[e.slug] = tasksGlob[e.fullPath];
		}
		return map;
	}, []);

	return { categories, slugToImporter };
}

function Header() {
	const { categories } = useTaskIndex();
	const location = useLocation();

	return (
		<header
			style={{
				display: "flex",
				gap: 12,
				flexWrap: "wrap",
				alignItems: "center",
				padding: 12,
				borderBottom: "1px solid #e5e7eb",
			}}
		>
			<NavLink to="/" style={({ isActive }) => ({ fontWeight: isActive ? 700 : 500 })}>
				Home
			</NavLink>
			<span style={{ opacity: 0.5 }}>|</span>
			{Object.keys(categories)
				.sort()
				.map((cat) => (
					<NavLink
						key={cat}
						to={`/tasks/${cat}`}
						style={({ isActive }) => ({
							fontWeight:
								isActive || location.pathname.startsWith(`/tasks/${cat}`) ? 700 : 500,
						})}
					>
						{cat}
					</NavLink>
				))}
		</header>
	);
}

function TasksCategoryPage() {
	const { categories } = useTaskIndex();
	const location = useLocation();
	const [, , category = ""] = location.pathname.split("/");
	const list = categories[category] || [];

	return (
		<div style={{ padding: 16 }}>
			<h2 style={{ margin: "8px 0 16px" }}>Tasks: {category || "unknown"}</h2>
			{list.length === 0 && <div>No tasks found for this category.</div>}
			<ul
				style={{
					display: "grid",
					gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
					gap: 8,
					listStyle: "none",
					padding: 0,
				}}
			>
				{list.map((t) => (
					<li
						key={t.slug}
						style={{ border: "1px solid #e5e7eb", borderRadius: 8, padding: 12 }}
					>
						<div style={{ fontSize: 14, marginBottom: 8 }}>{t.slug}</div>
						<Link to={`/tasks/play/${t.slug}`} style={{ fontWeight: 600 }}>
							Open
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
}

function TaskRunner() {
	const { slugToImporter } = useTaskIndex();
	const location = useLocation();
	// /tasks/play/<slug...>
	const slug = location.pathname.replace(/^\/tasks\/play\//, "");
	const importer = slugToImporter[slug];

	if (!slug || !importer) {
		return <div style={{ padding: 16 }}>Task not found.</div>;
	}

	const Component = lazy(importer);
	return (
		<div style={{ padding: 16 }}>
			<div style={{ marginBottom: 12 }}>
				<Link to={`/tasks/${slug.split("/")[0]}`}>← Back to category</Link>
			</div>
			<Suspense fallback={<div>Loading task...</div>}>
				<Component />
			</Suspense>
		</div>
	);
}

export default function App() {
	return (
		<div
			style={{
				fontFamily:
					"ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, Helvetica Neue, Arial, Apple Color Emoji, Segoe UI Emoji",
			}}
		>
			<Header />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/tasks/:category" element={<TasksCategoryPage />} />
				<Route path="/tasks/play/*" element={<TaskRunner />} />
				<Route path="*" element={<Home />} />
			</Routes>
		</div>
	);
}
