run:
	@docker build -f docker/Dockerfile.local -t owasp-route . \
	&& docker run -p 3000:3000 -v ./:/home/owasp --name owasp-route owasp-route

check:
	@pnpm format && pnpm lint
