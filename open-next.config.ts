import { defineCloudflareConfig } from '@opennextjs/cloudflare';

// The site is fully static, so the default (no incremental cache) configuration is enough.
export default defineCloudflareConfig();
