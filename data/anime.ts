/**
 * 番剧收藏本地数据源
 * 用于番剧展示页：/anime/
 */

export type AnimeStatus =
	| "watching"
	| "completed"
	| "planned"
	| "onHold"
	| "dropped";

export interface AnimeItem {
	title: string;
	cover?: string;
	link?: string;
	status: AnimeStatus;
	rating: number;
	progress: { watched: number; total: number };
	description?: string;
	year: string;
	studio?: string;
	genres: string[];
	period?: { start: string; end: string };
}

export const animeData: AnimeItem[] = [
	{
		title: "Lycoris Recoil",
		cover: "/assets/anime/sample-cover.webp",
		link: "https://www.bilibili.com/bangumi/media/md28338623",
		status: "completed",
		rating: 9.8,
		progress: { watched: 13, total: 13 },
		description: "少女与枪战的日常物语",
		year: "2022",
		studio: "A-1 Pictures",
		genres: ["日常", "动作"],
		period: { start: "2022-07", end: "2022-09" },
	},
	{
		title: "BanG Dream! It's MyGO!!!!!",
		cover: "/assets/anime/sample-cover.webp",
		link: "https://bangumi.tv/subject/424740",
		status: "completed",
		rating: 9.6,
		progress: { watched: 13, total: 13 },
		description: "一辈子在一起的迷茫乐队",
		year: "2023",
		studio: "SANZIGEN",
		genres: ["音乐", "青春"],
		period: { start: "2023-06", end: "2023-09" },
	},
];
