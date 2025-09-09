#!/bin/bash


current_dir=$(dirname "$(realpath "$0")")

header_path="$current_dir"/header.tex
date_format_path="$current_dir"/date-format.lua


dir_path=$(dirname "${current_dir}")/site/content/tutorials


for tutorial in $dir_path/*; do
    if [ -d $tutorial ]; then

      # Get the list of files
      list_of_mds=()
      resources=""

      should_delete=()

      # Define destination path
      destination_path=$(echo "$tutorial" | sed "s:/site/content/:/site/public/pdf/:g" )
      if [ ! -d "$destination_path" ]; then
        mkdir -p "$destination_path"
      fi

      while IFS= read -r -d $'\0' file; do

        parent_file=$(dirname "$file")
        resources=$resources:"$parent_file"

        list_of_mds+=("$parent_file"/pandoc.md)
        should_delete+=("$parent_file"/pandoc.md)

        # Go to md's directory
        echo "$parent_file"
        cd "$parent_file"

        # Convert WebPs and gifs to png
        shopt -s nullglob

        for img in *.webp; do
#            magick "$img" "${img%.webp}.png"
            convert "$img" "${img%.webp}.png"
            should_delete+=("${parent_file}/${img%.webp}.png")
        done

        for img in *.gif; do
#            magick "${img}[0]" "${img%.gif}.png"
            convert "${img}[0]" "${img%.gif}.png"
            should_delete+=("${parent_file}/${img%.gif}.png")
        done

        shopt -u nullglob

        sed "s:\.webp:\.png:g" index.md > pandoc.md
        sed -i "" "s:\.gif:\.png:g" pandoc.md

      done < <(find "$tutorial" -name "index.md" -print0)


    sorted_list_of_mds=()

     while IFS= read -r line; do
      sorted_list_of_mds+=("$line")
     done < <(printf '%s\n' "${list_of_mds[@]}" | sort -V)


      pandoc \
        "${sorted_list_of_mds[@]}" \
        -o "$destination_path"/output.pdf \
        --resource-path="$resources" \
        --pdf-engine=xelatex \
        --metadata author="Ramin Zarebidoky (LiterallyTheOne)" \
        --metadata title="$(basename "$destination_path")" \
        --include-in-header="$header_path" \
        --highlight-style=tango \
        --lua-filter "$date_format_path"

      for x in "${should_delete[@]}"; do
        rm "$x"
      done

    fi
done
#
#
#find "$dir_path" -name "index.md" -print0 | while IFS= read -r -d $'\0' file; do
#
#    should_delete=("pandoc.md")
#
#    parent_file=$(dirname "$file")
#
#    destination_path=$(echo "$parent_file" | sed "s:/site/content/:/site/public/pdf/:g" )
#    if [ ! -d "$destination_path" ]; then
#      mkdir -p "$destination_path"
#    fi
#
#    echo "$parent_file"
#    cd "$parent_file"
#
#    shopt -s nullglob
#
#    for img in *.webp; do
#        magick "$img" "${img%.webp}.png"
#        should_delete+=("${img%.webp}.png")
#    done
#
#    for img in *.gif; do
#        magick "${img}[0]" "${img%.gif}.png"
#        should_delete+=("${img%.gif}.png")
#    done
#
#    shopt -u nullglob
#
#    sed "s:\.webp:\.png:g" index.md > pandoc.md
#    sed -i "" "s:\.gif:\.png:g" pandoc.md
#
#    pandoc \
#        pandoc.md \
#        -o "$destination_path"/output.pdf \
#        --pdf-engine=xelatex \
#        --metadata author="Ramin Zarebidoky (LiterallyTheOne)" \
#        --include-in-header="$header_path" \
#        --highlight-style=tango \
#        --lua-filter "$date_format_path"
#
#    for x in "${should_delete[@]}"; do
#      rm "$x"
#    done
#
#
#done