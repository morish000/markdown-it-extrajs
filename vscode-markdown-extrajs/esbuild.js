import esbuild from "esbuild";

const production = process.argv.includes('--production');
const watch = process.argv.includes('--watch');

const esbuildProblemMatcherPlugin = {
	name: 'esbuild-problem-matcher',

	setup(build) {
		build.onStart(() => {
			console.log('[watch] build started');
		});
		build.onEnd((result) => {
			result.errors.forEach(({ text, location }) => {
				console.error(`✘ [ERROR] ${text}`);
				console.error(`    ${location.file}:${location.line}:${location.column}:`);
			});
			console.log('[watch] build finished');
		});
	},
};

async function main() {
	const extensionCtx = await esbuild.context({
		entryPoints: ["src/extension.ts"],
		outdir: "dist",
		bundle: true,
		format: "cjs",
		minify: production,
		sourcemap: !production,
		sourcesContent: false,
		platform: "node",
		external: ["vscode"],
		logLevel: "silent",
		outExtension: {
			".js": ".cjs",
		},
		plugins: [
			esbuildProblemMatcherPlugin,
		],
	});
	const previewCtx = await esbuild.context({
		entryPoints: ["src/preview.ts"],
		outdir: "dist",
		bundle: true,
		format: "iife",
		minify: production,
		sourcemap: !production,
		sourcesContent: false,
		platform: "browser",
		logLevel: "silent",
		external: ["vscode"],
		plugins: [
			esbuildProblemMatcherPlugin,
		],
	});
	if (watch) {
		await Promise.all([extensionCtx.watch(), previewCtx.watch()]);
	} else {
		await Promise.all([extensionCtx.rebuild(), previewCtx.rebuild()]);
		await Promise.all([extensionCtx.dispose(), previewCtx.dispose()]);
		esbuild.stop();
	}
}

main().catch((e) => {
	console.error(e);
	process.exit(1);
});
