all: \
	astral.js \
	astral.min.js

astral.js: $(shell ls src/*.js)
	@rm -f $@
	cat \
		src/start.js \
		src/astral-basic.js \
		src/astral-calendrica.js \
		src/astral-astronomy.js \
		src/end.js > $@
	@chmod a-w $@

astral.min.js: astral.js
	@rm -f $@
	node_modules/.bin/uglifyjs $< -c -m -o $@

test: all
	@node_modules/.bin/vows $(shell find . -name "*-test.js" \! -path "./node_modules/*")

clean:
	rm -f astral*.js
