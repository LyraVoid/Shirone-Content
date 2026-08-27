/**
 * 技能图谱数据源
 * 用于 /skills/ 页面展示
 */

export type SkillLevel = "beginner" | "intermediate" | "advanced" | "expert";

export interface SkillItem {
	enable?: boolean;
	name: string;
	description?: string;
	icon?: string;
	category: string;
	level: SkillLevel;
}

export const skillsData: SkillItem[] = [
	{
		name: "TypeScript",
		description: "强类型代码架构设计与严谨的接口类型契约编写。",
		icon: "simple-icons:typescript",
		category: "frontend",
		level: "expert",
	},
	{
		name: "Astro",
		description: "以内容驱动的高性能多页面架构与现代静态站点构建。",
		icon: "simple-icons:astro",
		category: "frontend",
		level: "advanced",
	},
	{
		name: "Svelte",
		description: "高响应性轻量级交互岛屿与响应式组件封装。",
		icon: "simple-icons:svelte",
		category: "frontend",
		level: "advanced",
	},
	{
		name: "Node.js",
		description: "高性能服务端运行环境与工程化自动化构建脚本开发。",
		icon: "simple-icons:nodedotjs",
		category: "backend",
		level: "advanced",
	},
];
