#!/bin/bash

dir_path="../site/content"

current_dir="$(realpath .)"

header_path="$current_dir"/header.tex
date_format_path="$current_dir"/date-format.lua


find $dir_path -name "index.md" -print0 | while IFS= read -r -d $'\0' file; do
    parent_file=$(dirname "$file")

    echo "$parent_file"

    cd $current_dir
    cd $parent_file

    shopt -s nullglob

    for img in *.webp; do
        magick "$img" "${img%.webp}.png"
    done

    for img in *.gif; do
        magick "${img}[0]" "${img%.gif}.png"
    done

    shopt -u nullglob

    sed "s:\.webp:\.png:g" index.md > pandoc.md
    sed -i "" "s:\.gif:\.png:g" pandoc.md

    pandoc \
        pandoc.md \
        -o output.pdf \
        --pdf-engine=xelatex \
        --metadata author="Ramin Zarebidoky (LiterallyTheOne)" \
        --include-in-header="$header_path" \
        --highlight-style=tango \
        --lua-filter "$date_format_path"


done