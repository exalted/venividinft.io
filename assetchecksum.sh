#!/usr/bin/env bash

cd docs/

assets=$(find . \( \
     -iname '*.png' \
  -o -iname '*.jpeg' \
  -o -iname '*.jpeg' \
  -o -iname '*.xml' \
  -o -iname '*.ico' \
  -o -iname '*.svg' \
  -o -iname '*.webmanifest' \
  -o -iname '*.css' \
\))

contents=$(find . \( \
     -iname '*.htm' \
  -o -iname '*.html' \
  -o -iname '*.md' \
  -o -iname '*.xml' \
  -o -iname '*.webmanifest' \
\))

for asset_path in $assets
do
  asset_checksum=$(md5sum $asset_path | cut -d' ' -f1)
  asset_filename=$(basename $asset_path)
  # echo "$asset_checksum ==> $asset_filename ($asset_path)"

  for content_path in $contents
  do
    # echo "$content_path"

    # NOTE: `sed -i''` VS `sed -i ''`.
    # Former is for Linux (ie github actions), whilst latter is for macOS… 😞
    sed -i'' "s/$asset_filename/$asset_filename?checksum=$asset_checksum/g" $content_path 2> /dev/null \
    || sed -i '' "s/$asset_filename/$asset_filename?checksum=$asset_checksum/g" $content_path
  done
done
