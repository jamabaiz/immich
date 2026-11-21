<script lang="ts">
  import MenuOption from '#lib/components/shared-components/context-menu/MenuOption.svelte';
  import { assetMultiSelectManager } from '#lib/managers/asset-multi-select-manager.svelte.ts';
  import DownloadOptionsModal from '#lib/modals/DownloadOptionsModal.svelte';
  import { downloadArchive } from '#lib/utils/asset-utils.ts';
  import { modalManager } from '@immich/ui';
  import { mdiDownloadMultiple } from '@mdi/js';
  import { t } from 'svelte-i18n';

  interface Props {
    filename?: string;
  }

  let { filename = 'immich' }: Props = $props();

  const handleDownload = async () => {
    const quality = await modalManager.show(DownloadOptionsModal, {});
    if (!quality) {
      return;
    }

    const assetIds = assetMultiSelectManager.assets.map((asset) => asset.id);
    assetMultiSelectManager.clear();
    await downloadArchive(filename, { assetIds }, quality);
  };
</script>

<MenuOption text={$t('download_with_options')} icon={mdiDownloadMultiple} onClick={handleDownload} />
