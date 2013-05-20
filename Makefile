all: \
	astral.js \
	astral.min.js

astral.js: $(shell node_modules/.bin/smash --list src/index.js)
	@rm -f $@
	node_modules/.bin/smash src/index.js | node_modules/.bin/uglifyjs - \
		-b indent-level=2 \
		-c dead-code=false,unused=false \
		-o $@
	@chmod a-w $@


astral.min.js: astral.js
	@rm -f $@
	node_modules/.bin/uglifyjs $< \
		-c dead-code=false,unused=false \
		-m \
		-o $@

test: all
	@node_modules/.bin/vows $(shell find . -name "*-test.js" \! -path "./node_modules/*")

clean:
	rm -f astral*.js
