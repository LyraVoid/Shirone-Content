/**
 * 开源项目数据源
 * 用于 /projects/ 页面展示
 */

export type ProjectPhase = "shipped" | "building" | "exploring";

export interface ProjectItem {
	enable?: boolean;
	key: string;
	title: string;
	summary: string;
	category: string;
	phase: ProjectPhase;
	technologies: string[];
	icon?: string;
	cover?: string;
	coverAlt?: string;
	featured?: boolean;
	website?: string;
	repository?: string;
	year?: string;
}

export const projectsData: ProjectItem[] = [
	{
		key: "shirone",
		title: "Shirone",
		summary: "基于 Material 3 设计规范与原子化组件体系构建的开源二次元博客主题。",
		category: "theme",
		phase: "building",
		technologies: ["Astro", "Svelte", "TypeScript", "Tailwind CSS"],
		icon: "material-symbols:palette-outline-rounded",
		featured: true,
		repository: "https://github.com/LyraVoid/Shirone",
		website: "https://shirone.mysqil.com",
		year: "2026",
	},
];

export function getProjectsList(): ProjectItem[] {
	return projectsData;
}
