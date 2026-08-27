/**
 * 大事记时间线数据源
 * 用于 /timeline/ 页面展示
 */

export interface TimelineLink {
	label: string;
	url: string;
	icon?: string;
}

export interface TimelineItem {
	enable?: boolean;
	title: string;
	date: string;
	category?: string;
	subtitle?: string;
	location?: string;
	description?: string;
	highlights?: string[];
	tags?: string[];
	links?: TimelineLink[];
	icon?: string;
	featured?: boolean;
}

export const timelineData: TimelineItem[] = [
	{
		title: "Shirone 主题内容分离架构上线",
		date: "2026.08",
		category: "milestone",
		subtitle: "开源主题升级",
		description: "重构内容与主题代码解耦机制，实现纯数据驱动的内容外置、无缝合并与强类型校验。",
		highlights: [
			"代码仓与私有内容仓完全分离",
			"对象递归合并与 TypeScript 编译期拦截",
			"自动化多端部署与全量静态资源生成",
		],
		tags: ["Astro", "TypeScript", "架构升级"],
		links: [
			{
				label: "主题源码",
				url: "https://github.com/LyraVoid/Shirone",
				icon: "fa6-brands:github",
			},
		],
		icon: "material-symbols:rocket-launch-rounded",
		featured: true,
	},
];
