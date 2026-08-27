/**
 * 站点罗盘导航数据源
 * 用于 /compass/ 页面展示
 */

export interface CompassEntry {
	label: string;
	href: string;
	note?: string;
	icon?: string;
	image?: string;
}

export interface CompassShelf {
	key: string;
	name: string;
	icon?: string;
	blurb?: string;
	entries: CompassEntry[];
}

export const compassData: CompassShelf[] = [
	{
		key: "dev",
		name: "开发常用",
		icon: "material-symbols:code-rounded",
		blurb: "日常编码与查阅文档的核心导航",
		entries: [
			{
				label: "GitHub",
				href: "https://github.com",
				note: "全球领先的开源代码托管平台",
				icon: "fa6-brands:github",
			},
			{
				label: "MDN Web Docs",
				href: "https://developer.mozilla.org",
				note: "权威的现代前端技术标准文档",
				icon: "material-symbols:menu-book-rounded",
			},
		],
	},
];
