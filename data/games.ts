/**
 * 游戏展示页数据源
 * 行为与分类规则由 config/games.yaml 控制
 */

export type GameStatus = "playing" | "completed" | "backlog" | "wishlist";

export interface GameItem {
	enable?: boolean;
	id: string;
	name: string;
	developer: string;
	category: string;
	status: GameStatus;
	/** 横屏封面（建议 16:9 或更宽）：
	 *  - 省略时回退渲染 icon 图标卡片；
	 *  - 支持内容仓 assets/ 相对路径（参与构建期压缩转码）、
	 *    /public 绝对路径与远程 URL 三种写法。 */
	cover?: string;
	icon?: string;
	rating?: number;
	hours?: number;
	platform?: string;
	year?: string;
	tags?: string[];
	description: string;
	link?: string;
	featured?: boolean;
}

export const gamesData: GameItem[] = [
	{
		id: "nte-neverness-to-everness",
		name: "NTE: Neverness to Everness",
		developer: "Hotta Studio",
		category: "open-world",
		status: "playing",
		icon: "material-symbols:explore-outline-rounded",
		rating: 4.5,
		hours: 86,
		platform: "PC",
		year: "2026",
		tags: ["Open World", "Urban", "Supernatural"],
		description:
			"都市超自然开放世界 RPG。作为能感知人与异象「波纹」的异能者，加入 E.T.D 第六小队，调查城市中的怪奇事件。",
		link: "https://yh.wanmei.com/main.html",
		featured: true,
	},
	{
		id: "minecraft",
		name: "Minecraft",
		developer: "Mojang Studios",
		category: "sandbox",
		status: "playing",
		icon: "material-symbols:widgets-rounded",
		rating: 5,
		hours: 420,
		platform: "PC",
		year: "2011",
		tags: ["Sandbox", "Survival", "Building"],
		description:
			"方块世界沙盒游戏。挖掘、合成、建造，在程序生成的世界里生存闯荡——独自一人，或与朋友一起。",
		link: "https://www.minecraft.net/",
	},
];
