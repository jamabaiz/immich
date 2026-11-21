import type { DownloadQuality } from '#lib/utils.ts';
import { SvelteMap } from 'svelte/reactivity';

export interface DownloadState {
  url: string;
  assetIds: string[];
  archiveName: string;
  total: number;
  quality: DownloadQuality;
  downloaded: boolean;
}

class DownloadManager {
  assets = new SvelteMap<string, DownloadState>();

  isDownloading = $derived(this.assets.size > 0);

  add(key: string, url: string, assetIds: string[], archiveName: string, total: number, quality: DownloadQuality = {}) {
    this.assets.set(key, { url, assetIds, archiveName, total, quality, downloaded: false });
  }

  clearAll() {
    this.assets.clear();
  }

  markDownloaded(key: string) {
    const state = this.assets.get(key);
    if (state) {
      this.assets.set(key, { ...state, downloaded: true });
    }
  }
}

export const downloadManager = new DownloadManager();
