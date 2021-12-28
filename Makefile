include .env

release:
	echo GITHUB_TOKEN=${GITHUB_TOKEN} npm run release