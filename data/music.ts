/**
 * 侧栏音乐播放器本地曲目数据源
 * 用于 music.yaml 中的 local 与 mixed 模式
 */

export interface TrackDescriptor {
	id: string;
	title: string;
	artist?: string;
	cover?: string;
	source: string;
	duration?: number;
}

export const musicTracks: readonly TrackDescriptor[] = [
	{
		id: "sample-track-1",
		title: "口笛で愛は歌えない",
		artist: "Dazbee",
		cover: "assets/images/music/dazbee.webp",
		source: "/assets/music/url/dazbee.mp3",
		duration: 241,
	},
	{
		id: "sample-track-2",
		title: "ひとり上手",
		artist: "Kaya",
		cover: "assets/images/music/hitori.webp",
		source: "/assets/music/url/hitori.mp3",
		duration: 253,
	},
];
