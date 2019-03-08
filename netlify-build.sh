#!/usr/bin/env bash

# force local packages
npm install ./packages/asciidoc-loader

antora --html-url-extension-style=indexify --pull site.yml --generator ./lib/generator.js
