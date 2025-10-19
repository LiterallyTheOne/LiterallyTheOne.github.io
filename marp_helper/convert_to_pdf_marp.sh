#!/bin/bash


current_dir=$(dirname "$(realpath "$0")")

dir_path=$(dirname "${current_dir}")/site/content/tutorials


while IFS= read -r -d $'\0' file; do

  head_2=$(head -n 5 "$file")

  if [[ "$head_2" != *"marp: true"* ]]; then
    continue
  fi

  parent_file=$(dirname "$file")

  destination_path=$(echo "$parent_file" | sed "s:/site/content/:/site/public/marp-pdf/:g" )
  if [ ! -d "$destination_path" ]; then
    mkdir -p "$destination_path"
  fi

  echo "$parent_file"
  cd "$parent_file" || exit

  file_name=$(basename $file)

  marp "$file_name" --pdf --allow-local-files  -o "$destination_path/output.pdf" </dev/null



done < <(find "$dir_path" -name "*.md" -print0)



