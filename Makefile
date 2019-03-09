# BIN = ./node_modules/.bin
# SRC = $(wildcard src/*.js)
# LIB = $(SRC:src/%.js=lib/%.js)

# build: $(LIB)

# lib/%.js: src/%.js
#   @mkdir -p $(@D)
#   @cat $< > $@

# test: build
#   @$(BIN)/mocha -b specs

# clean:
#   @rm -f $(LIB)

# install link:
#   @npm $@

# define release
#   VERSION=`node -pe "require('./package.json').version"` && \
#   NEXT_VERSION=`node -pe "require('semver').inc(\"$$VERSION\", '$(1)')"` && \
#   node -e "\
#     var j = require('./package.json');\
#     j.version = \"$$NEXT_VERSION\";\
#     var s = JSON.stringify(j, null, 2);\
#     require('fs').writeFileSync('./package.json', s);" && \
#   git commit -m "release $$NEXT_VERSION" -- package.json && \
#   git tag "$$NEXT_VERSION" -m "release $$NEXT_VERSION"
# endef

# release-patch: build test
#   @$(call release,patch)

# release-minor: build test
#   @$(call release,minor)

# release-major: build test
#   @$(call release,major)

# publish:
#   git push --tags origin HEAD:master
#   npm publish




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
	mocha --recursive --reporter spec
.PHONY: test


# test: all
# 	@node_modules/.bin/vows $(shell find . -name "*-test.js" \! -path "./node_modules/*")

clean:
	rm -f astral*.js
.PHONY: clean
