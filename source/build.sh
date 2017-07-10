#!/usr/bin/env bash

SOURCE_DIR="./source"
OUT_DIR="."

mkdir -p "$OUT_DIR/css"

pug -P "$SOURCE_DIR/index.pug" -o "$OUT_DIR"
lessc "$SOURCE_DIR/css/style.less" "$OUT_DIR/css/style.css"
