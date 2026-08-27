/**
 * 个人设备展示页数据源
 * 行为与分类规则由 config/devices.yaml 控制
 */

export type DeviceStatus = "active" | "backup" | "archived" | "wishlist";

export interface DeviceSpecItem {
	key: string;
	label: string;
	value: string;
}

export interface DeviceItem {
	enable?: boolean;
	id: string;
	name: string;
	brand: string;
	category: string;
	status: DeviceStatus;
	specs: string;
	specDetails?: DeviceSpecItem[];
	description: string;
	image?: string;
	icon?: string;
	link?: string;
	featured?: boolean;
	year?: string;
}

export const devicesData: DeviceItem[] = [
	{
		id: "macbook-pro",
		name: "MacBook Pro 16",
		brand: "Apple",
		category: "desk",
		status: "active",
		specs: "M3 Max / 64GB / 2TB",
		description: "主力开发与设计工作站，提供强劲性能与优秀的视网膜屏幕表现。",
		icon: "material-symbols:laptop-mac-rounded",
		featured: true,
		year: "2024",
		link: "https://www.apple.com/macbook-pro/",
	},
	{
		id: "iphone",
		name: "iPhone 16 Pro",
		brand: "Apple",
		category: "mobile",
		status: "active",
		specs: "原色钛金属 / 256GB",
		description: "主力随身移动设备，高刷新率屏幕与优秀的色彩管理。",
		icon: "material-symbols:phone-iphone",
		featured: true,
		year: "2024",
	},
];
