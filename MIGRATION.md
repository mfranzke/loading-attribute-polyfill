# Migration guidelines

## 2.0.0 migration guide

You'll need to wrap the `<picture>` tag instead of the included HTML tags with `<noscript>`.

##### Previously

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

##### Now

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
