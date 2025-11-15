run:
	@docker build -f docker/Dockerfile.local -t owasp-route . \
	&& docker run -p 3000:3000 -v ./:/home/owasp --rm --name owasp-route owasp-route

check:
	@pnpm format && pnpm lint

test:
	@docker build -f docker/Dockerfile.test -t owasp-route-test . \
	&& docker run --rm --name owasp-route-test owasp-route-test pnpm test
