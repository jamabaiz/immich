<script lang="ts">
  import type { DownloadQuality } from '#lib/utils.ts';
  import { DownloadImageQuality, DownloadVideoQuality } from '@immich/sdk';
  import { Field, FormModal, HelperText, Select } from '@immich/ui';
  import { t } from 'svelte-i18n';

  type Props = {
    onClose: (quality?: DownloadQuality) => void;
  };

  let { onClose }: Props = $props();

  let imageQuality = $state(DownloadImageQuality.Original);
  let videoQuality = $state(DownloadVideoQuality.Original);

  const imageOptions = [
    { value: DownloadImageQuality.Original, label: $t('download_version_original') },
    { value: DownloadImageQuality.Preview, label: $t('download_version_preview') },
  ];

  const videoOptions = [
    { value: DownloadVideoQuality.Original, label: $t('download_version_original') },
    { value: DownloadVideoQuality.Encoded, label: $t('download_version_transcoded') },
  ];

  const onSubmit = () => onClose({ imageQuality, videoQuality });
</script>

<FormModal
  size="small"
  title={$t('download_with_options')}
  submitText={$t('download')}
  onClose={() => onClose()}
  {onSubmit}
>
  <div class="flex flex-col gap-4">
    <Field label={$t('download_photos')}>
      <Select bind:value={imageQuality} options={imageOptions} />
    </Field>

    <Field label={$t('download_videos')}>
      <Select bind:value={videoQuality} options={videoOptions} />
      <HelperText>{$t('download_version_fallback_description')}</HelperText>
    </Field>
  </div>
</FormModal>
