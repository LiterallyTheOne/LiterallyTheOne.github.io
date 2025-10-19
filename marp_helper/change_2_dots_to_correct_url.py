from pathlib import Path
import re


def main():
    root_path = Path("../site/static/slides")

    for slide in root_path.rglob("*.html"):
        need_to_replace = str(slide).split("/slides/")[1].split("/docs")[0]
        with open(slide, "r") as slide_file:
            content = slide_file.read()
            content = content.replace("../..", f"/{need_to_replace}")

        with open(slide, "w") as slide_file:
            slide_file.write(content)


if __name__ == "__main__":
    main()
