#!/bin/bash


current_dir=$(dirname "$(realpath "$0")")

dir_path=$(dirname "${current_dir}")/site/content/tutorials

header_path="$current_dir"/header.tex
date_format_path="$current_dir"/date-format.lua


find "$dir_path" -name "index.md" -print0 | while IFS= read -r -d $'\0' file; do

    should_delete=("pandoc.md")

    parent_file=$(dirname "$file")

    destination_path=$(echo "$parent_file" | sed "s:/site/content/:/site/public/pdf/:g" )
    if [ ! -d "$destination_path" ]; then
      mkdir -p "$destination_path"
    fi

    echo "$parent_file"
    cd "$parent_file" || exit

    shopt -s nullglob

    for img in *.webp; do
        convert "$img" "${img%.webp}.png"
        should_delete+=("${img%.webp}.png")
    done

    for img in *.gif; do
        convert "${img}[0]" "${img%.gif}.png"
        should_delete+=("${img%.gif}.png")
    done

    shopt -u nullglob

    sed "s:\.webp:\.png:g" index.md > pandoc.md
    sed -i "s:\.gif:\.png:g" pandoc.md

    pandoc \
        pandoc.md \
        -o "$destination_path"/output.pdf \
        --pdf-engine=xelatex \
        --metadata author="Ramin Zarebidoky (LiterallyTheOne)" \
        --include-in-header="$header_path" \
        --highlight-style=tango \
        --lua-filter "$date_format_path"

    for x in "${should_delete[@]}"; do
      rm "$x"
    done


done