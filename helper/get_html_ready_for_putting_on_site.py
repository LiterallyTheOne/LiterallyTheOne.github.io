from pathlib import Path
from bs4 import BeautifulSoup
from shutil import copyfile


def main():
    html_path = Path("../site/static/slides/tutorials/arduino/docs/1-gpio/1-gpio.html")

    ready_path = html_path.parent.name

    if "slides" in str(html_path):
        ready_path = Path("slides") / ready_path

    ready_path = Path("to_upload") / ready_path

    if not ready_path.exists():
        ready_path.mkdir(parents=True, exist_ok=True)

    print(ready_path)

    destination_html = ready_path / html_path.name

    with html_path.open("r") as html_file:
        content = html_file.read()
        parsed_content = BeautifulSoup(content, features="html.parser")
        all_img_tags = parsed_content.find_all("img")
        for img_tag in all_img_tags:
            previous_src = img_tag.get("src", "")
            new_src = str(previous_src).split("/")[-1]

            copy_src = Path("../site/content") / previous_src.replace("/", "", 1)
            if copy_src.exists():
                copyfile(copy_src, ready_path / new_src)
                content = content.replace(previous_src, new_src)

                print("*" * 20)
                print(previous_src)
                print(copy_src)
                print(new_src)

    with destination_html.open("w") as destination_file:
        destination_file.write(content)


if __name__ == "__main__":
    main()
