import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import dns from 'dns'

dns.setDefaultResultOrder('verbatim')

export default defineConfig({
	plugins: [sveltekit()]
});
