# Migration guidelines

## 2.0.0-beta.1 migration guide

We've switched from previously only providing the source and a minified version of the JS, to additionally provide the different relevant JavaScript formats especially regarding modules supported by [microbundle](https://npmjs.com/microbundle). Thatfor we even also changed the location of the generated files as well as pointed the relevant property entries within the `package.json` to those files. Please find all the relevant generated files in the `dist/` folder from now on.

## 2.0.0-beta.0 migration guide

You'll need to wrap the `<picture>` tag instead of the included HTML tags with `<noscript>`.

### Previously

```html
<picture>
	<noscript class="loading-lazy">
		<source srcset="loadinglazy@1x.png 1x, picture-2x-loadinglazy@2x.png 2x" />
		<img
			src="loadinglazy@1.png"
			loading="lazy"
			alt=".."
			width="250"
			height="150"
		/>
	</noscript>
</picture>
```

### Now

```html
<noscript class="loading-lazy">
	<picture>
		<source srcset="loadinglazy@1x.png 1x, picture-2x-loadinglazy@2x.png 2x" />
		<img
			src="loadinglazy@1.png"
			loading="lazy"
			alt=".."
			width="250"
			height="150"
		/>
	</picture>
</noscript>
```
